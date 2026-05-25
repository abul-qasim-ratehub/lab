# Phase 1A — Unified Customer Profile Implementation Plan
**Period:** May 2026 (Weeks 1–4)  
**Owner:** Engineering + Product  
**Status:** In Progress

---

## Overview

Transform the WorkOS SSO POC (at `~/code/lab/experiments/workos-sso-poc`) into a production **unified member profile system** that:

1. **Identifies members** across Ratehub, MoneySense, and CanWise with a single SSO
2. **Persists profile data** (name, email, products held, lifecycle stage) in a shared database
3. **Pre-populates forms** with known fields when a member starts an application
4. **Syncs session state** across all three brands so logout from one = logout from all

**Baseline:** POC has WorkOS + cookie-based auth on two apps. We're extending it to production with persistence, data schema, and cross-brand functionality.

---

## Architecture Decision: BFF Pattern

We're using the **Backend For Frontend (BFF)** pattern (documented in the POC at `BFF_ARCHITECTURE.md`):

```
Ratehub (3001) ──┐
                 ├──> BFF Service (3000) ──> WorkOS
Moneysense (3002)┘         │
                           ├──> Redis (session store)
                           └──> PostgreSQL (member profiles)
```

**Why BFF:**
- Single source of truth for auth + session management
- WorkOS credentials only on BFF (secure)
- Easy to add CanWise and other brands later
- Enables pre-population + profile data sharing

---

## Phase 1A Deliverables

### 1. **Member Profile Schema** (Week 1)

**Database:** PostgreSQL  
**Table:** `members`

```sql
CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workos_user_id VARCHAR(255) UNIQUE NOT NULL,  -- From WorkOS
  
  -- Personal Info
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  
  -- Address (for pre-population)
  street_address VARCHAR(255),
  city VARCHAR(100),
  province_code VARCHAR(2),  -- CA provinces
  postal_code VARCHAR(7),
  
  -- Financial Profile
  products_held JSONB DEFAULT '[]',  -- ["mortgage", "credit_card", "insurance"]
  products_applied_for JSONB DEFAULT '[]',
  lifecycle_stage VARCHAR(50),  -- "new", "has_mortgage", "needs_renewal", "multi_product", etc.
  
  -- Engagement
  brand_first_visit TEXT,  -- Which brand brought them in? "ratehub", "moneysense", "canwise"
  preferred_contact_method VARCHAR(50) DEFAULT 'email',  -- email, sms, phone, none
  
  -- Consent & Privacy
  email_marketing_consent BOOLEAN DEFAULT FALSE,
  data_sharing_consent JSONB DEFAULT '{"ratehub": false, "moneysense": false, "canwise": false}',
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP  -- Soft delete for GDPR
);

CREATE INDEX idx_members_workos_user_id ON members(workos_user_id);
CREATE INDEX idx_members_email ON members(email);
```

---

### 2. **BFF Service (Week 1–2)**

**Location:** `~/code/ratehub/bff-service/`

**New endpoints:**

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/auth/login` | Generate WorkOS auth URL |
| GET | `/auth/callback` | WorkOS callback → create session + profile |
| GET | `/auth/me` | Get current user + profile data |
| POST | `/auth/logout` | Delete session (everywhere) |
| GET | `/profile` | Get full member profile |
| PATCH | `/profile` | Update member profile |
| GET | `/profile/pre-fill` | Get pre-fillable fields for a product |

**Key code changes from POC:**

```javascript
// bff/middleware/session.js
const validateSession = async (sessionId) => {
  const session = await redis.get(`session:${sessionId}`);
  if (!session) return null;
  
  const data = JSON.parse(session);
  if (new Date() > new Date(data.expiresAt)) {
    await redis.del(`session:${sessionId}`);
    return null;
  }
  return data;
};

// bff/routes/auth.js
app.get('/auth/callback', async (req, res) => {
  const { code } = req.query;
  try {
    const { user } = await workos.userManagement.authenticateWithCode({
      clientId: process.env.WORKOS_CLIENT_ID,
      code
    });
    
    // NEW: Create or update member profile
    const member = await db.query(`
      INSERT INTO members (workos_user_id, email, first_name, last_name, brand_first_visit)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (workos_user_id) DO UPDATE SET updated_at = CURRENT_TIMESTAMP
      RETURNING id, email, first_name, last_name, products_held
    `, [user.id, user.email, user.first_name || '', user.last_name || '', 'ratehub']);
    
    // Create Redis session
    const sessionId = crypto.randomBytes(32).toString('hex');
    const sessionData = {
      workosUserId: user.id,
      memberId: member.rows[0].id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      expiresAt: new Date(Date.now() + 86400000).toISOString()
    };
    
    await redis.setEx(`session:${sessionId}`, 86400, JSON.stringify(sessionData));
    
    res.cookie('sessionId', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 86400000
    });
    
    res.redirect(process.env.RATEHUB_FRONTEND_URL);
  } catch (error) {
    console.error('Auth callback error:', error);
    res.status(401).send('Authentication failed');
  }
});

// bff/routes/profile.js
app.get('/profile/pre-fill', async (req, res) => {
  const session = await validateSession(req.cookies.sessionId);
  if (!session) return res.status(401).json({ error: 'Not authenticated' });
  
  const { product } = req.query;  // mortgage, card, insurance
  
  const member = await db.query(`
    SELECT email, first_name, last_name, phone, street_address, city, 
           province_code, postal_code
    FROM members WHERE id = $1
  `, [session.memberId]);
  
  // Filter based on product type
  const preFill = {
    email: member.rows[0].email,
    firstName: member.rows[0].first_name,
    lastName: member.rows[0].last_name,
    phone: member.rows[0].phone,
    address: {
      street: member.rows[0].street_address,
      city: member.rows[0].city,
      province: member.rows[0].province_code,
      postalCode: member.rows[0].postal_code
    }
  };
  
  // Product-specific logic
  if (product === 'mortgage') {
    // Add home value estimate if available
    const homeValue = await db.query(`
      SELECT estimated_value FROM home_estimates
      WHERE member_id = $1 ORDER BY created_at DESC LIMIT 1
    `, [session.memberId]);
    if (homeValue.rows[0]) {
      preFill.estimatedHomeValue = homeValue.rows[0].estimated_value;
    }
  }
  
  res.json(preFill);
});

app.patch('/profile', async (req, res) => {
  const session = await validateSession(req.cookies.sessionId);
  if (!session) return res.status(401).json({ error: 'Not authenticated' });
  
  const { firstName, lastName, phone, address } = req.body;
  
  const updated = await db.query(`
    UPDATE members SET
      first_name = COALESCE($2, first_name),
      last_name = COALESCE($3, last_name),
      phone = COALESCE($4, phone),
      street_address = COALESCE($5, street_address),
      city = COALESCE($6, city),
      province_code = COALESCE($7, province_code),
      postal_code = COALESCE($8, postal_code),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *
  `, [
    session.memberId,
    firstName, lastName, phone,
    address?.street, address?.city, address?.province, address?.postalCode
  ]);
  
  res.json(updated.rows[0]);
});
```

---

### 3. **Ratehub Frontend Integration (Week 2–3)**

**Location:** `/app/page.jsx` and new `components/AuthProvider.jsx`

```javascript
// components/AuthProvider.jsx
'use client'
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/auth/me', {
      credentials: 'include'
    })
      .then(r => r.json())
      .then(data => {
        if (data.authenticated) {
          setUser(data.user);
        }
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

**In `app/layout.jsx`:**
```javascript
import { AuthProvider } from '@/components/AuthProvider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          <PasswordGate>
            <SiteShell>{children}</SiteShell>
          </PasswordGate>
        </AuthProvider>
      </body>
    </html>
  );
}
```

**Form pre-population example (mortgage application):**
```javascript
// components/MortgageCalculator.jsx
'use client'
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export const MortgageCalculator = () => {
  const { user } = useAuth();
  const [preFill, setPreFill] = useState({});

  useEffect(() => {
    if (user?.authenticated) {
      fetch('http://localhost:3000/profile/pre-fill?product=mortgage', {
        credentials: 'include'
      })
        .then(r => r.json())
        .then(setPreFill);
    }
  }, [user]);

  return (
    <form>
      <Input
        label="First Name"
        defaultValue={preFill.firstName}
        name="firstName"
      />
      <Input
        label="Last Name"
        defaultValue={preFill.lastName}
        name="lastName"
      />
      <Input
        label="Email"
        defaultValue={preFill.email}
        name="email"
      />
      {/* ... rest of form ... */}
    </form>
  );
};
```

---

### 4. **Consent & Privacy Settings (Week 3)**

**Location:** `/members/settings/page.jsx`

```javascript
// components/PrivacySettings.jsx
'use client'
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export const PrivacySettings = () => {
  const { user } = useAuth();
  const [consent, setConsent] = useState({
    emailMarketing: false,
    ratehubSharing: false,
    moneysensetSharing: false,
    canwiseSharing: false
  });

  const handleSubmit = async () => {
    await fetch('http://localhost:3000/profile', {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emailMarketingConsent: consent.emailMarketing,
        dataSharingConsent: {
          ratehub: consent.ratehubSharing,
          moneysense: consent.moneysensetSharing,
          canwise: consent.canwiseSharing
        }
      })
    });
  };

  return (
    <div className="rh-section">
      <h2>Privacy & Consent</h2>
      <label>
        <input
          type="checkbox"
          checked={consent.emailMarketing}
          onChange={(e) => setConsent({ ...consent, emailMarketing: e.target.checked })}
        />
        Allow marketing emails
      </label>
      
      <h3>Data Sharing</h3>
      <p>Allow Ratehub to share your profile across our family of brands?</p>
      <label>
        <input
          type="checkbox"
          checked={consent.ratehubSharing}
          onChange={(e) => setConsent({ ...consent, ratehubSharing: e.target.checked })}
        />
        Ratehub.ca
      </label>
      <label>
        <input
          type="checkbox"
          checked={consent.moneysensetSharing}
          onChange={(e) => setConsent({ ...consent, moneysensetSharing: e.target.checked })}
        />
        MoneySense.ca
      </label>
      <label>
        <input
          type="checkbox"
          checked={consent.canwiseSharing}
          onChange={(e) => setConsent({ ...consent, canwiseSharing: e.target.checked })}
        />
        CanWise.com
      </label>
      
      <button onClick={handleSubmit}>Save Preferences</button>
    </div>
  );
};
```

---

### 5. **Product Tracking (Week 3–4)**

When a member completes an application on any brand, log it to their profile:

```javascript
// bff/routes/applications.js
app.post('/applications', async (req, res) => {
  const session = await validateSession(req.cookies.sessionId);
  if (!session) return res.status(401).json({ error: 'Not authenticated' });

  const { productType, status, lender } = req.body;  // mortgage, card, insurance
  
  // Track application
  await db.query(`
    INSERT INTO applications (member_id, product_type, status, lender, created_at)
    VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
  `, [session.memberId, productType, status, lender]);
  
  // Update member's products_applied_for
  await db.query(`
    UPDATE members SET
      products_applied_for = jsonb_set(
        COALESCE(products_applied_for, '[]'::jsonb),
        '{' || (jsonb_array_length(COALESCE(products_applied_for, '[]'::jsonb))) || '}',
        $1::jsonb
      )
    WHERE id = $2
  `, [JSON.stringify({ type: productType, appliedAt: new Date().toISOString() }), session.memberId]);
  
  res.json({ success: true });
});
```

---

## Variables & Credentials

### Environment Variables

**BFF (`.env`):**
```bash
# WorkOS
WORKOS_API_KEY=sk_test_...                          # From WorkOS dashboard
WORKOS_CLIENT_ID=client_01...                       # From WorkOS dashboard

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/ratehub_members

# Redis
REDIS_URL=redis://localhost:6379

# URLs
BFF_URL=http://localhost:3000
RATEHUB_FRONTEND_URL=http://localhost:3001
MONEYSENSE_FRONTEND_URL=http://localhost:3002
CANWISE_FRONTEND_URL=http://localhost:3003

# Session
SESSION_SECRET=your-secret-key-here
```

**Ratehub (`.env.local`):**
```bash
NEXT_PUBLIC_BFF_URL=http://localhost:3000
```

---

## Week-by-Week Breakdown

| Week | Task | Owner | Output |
|------|------|-------|--------|
| **W1** | Schema design + DB setup + BFF scaffolding | Backend | `members` table, basic BFF structure |
| **W2** | BFF routes: `/auth/*`, `/profile/*`, `/applications/*` | Backend | All BFF endpoints working with WorkOS |
| **W3** | Frontend: AuthProvider, form pre-population, settings page | Frontend | User can login + pre-fill forms |
| **W4** | Testing, CanWise integration plan, docs | QA + PM | Ready for Week 2 of Phase 1B |

---

## Testing Checklist

- [ ] Login on Ratehub → session cookie set + Redis entry created
- [ ] Visit Moneysense → GET /auth/me returns same user (no re-login)
- [ ] Fill out mortgage form → `/profile/pre-fill?product=mortgage` returns correct fields
- [ ] Update profile from settings page → fields persist across apps
- [ ] Logout from Ratehub → Redis session deleted
- [ ] Visit Moneysense → shows login page (session gone)
- [ ] Data sharing consent is respected (don't cross-populate if disabled)

---

## Known Dependencies

1. **WorkOS** — Already in POC, no changes needed
2. **PostgreSQL** — New (will run locally in dev, managed service in prod)
3. **Redis** — Already in POC
4. **Next.js 15** — Already in Ratehub Design System

---

## Success Criteria (End of Phase 1A)

✅ **Functional:**
- Single login across all three brands
- Unified logout (logout from one = logout from all)
- Member profile persists and syncs

✅ **Technical:**
- All environment variables documented
- BFF can be deployed independently
- Pre-population API fully functional
- Session TTL and expiry working

✅ **Metrics:**
- 60% of returning users have pre-populated applications
- Average fields pre-filled per form: 8+ / 10
- Session consistency: 100% (logout affects all brands)

---

## Rollback Plan

If SSO integration breaks production:
1. Switch BFF to use local auth (skip WorkOS calls, accept hardcoded test user)
2. Brands fall back to individual WorkOS clients
3. Session data preserved in Redis (can restore later)
4. Timeline: < 30 min RTO

---

## Open Questions

1. **CanWise integration timing?** — Is CanWise tech stack compatible with BFF pattern?
2. **PII storage in Redis?** — Or only store sessionId → member_id lookup?
3. **Profile completeness gates?** — Do we require full profile before allowing transactions?
4. **Email validation before cross-population?** — WorkOS + double opt-in?

---

*Plan version: 1.0 — May 4, 2026*  
*Next review: May 11, 2026 (end of W1)*
