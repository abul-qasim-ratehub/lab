# Phase 1A: Unified Member Profile — Quick Start Guide

**TL;DR:** We're taking the WorkOS SSO POC and adding a PostgreSQL database + pre-filled forms. Login works the same, but now form fields auto-fill and logout is truly cross-brand.

---

## Before You Start

1. **Read the architecture** → `POC_TO_PRODUCTION_ROADMAP.md`
2. **Understand the plan** → `PHASE_1A_IMPLEMENTATION_PLAN.md`
3. **Review POC** → `~/code/lab/experiments/workos-sso-poc/BFF_ARCHITECTURE.md`

---

## What You're Building

```
User logs into Ratehub
  ↓
WorkOS auth (same as POC)
  ↓
BFF creates session + member profile in PostgreSQL
  ↓
User visits Moneysense
  ↓
BFF checks Redis session → user automatically logged in
  ↓
Mortgage form calls /profile/pre-fill → fields auto-fill
  ↓
User submits application → tracked in member record
```

---

## Step 1: Database Setup (Week 1, Day 1–2)

### 1a. Create PostgreSQL Database

```bash
# Local development
brew install postgresql@15
brew services start postgresql@15
createdb ratehub_members

# Or Docker
docker run -d \
  -e POSTGRES_DB=ratehub_members \
  -e POSTGRES_PASSWORD=dev \
  -p 5432:5432 \
  postgres:15
```

### 1b. Run Schema Migration

**File: `bff/db/001_create_members_table.sql`**

```sql
CREATE TABLE IF NOT EXISTS members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- WorkOS linking
  workos_user_id VARCHAR(255) UNIQUE NOT NULL,
  
  -- Personal info (from WorkOS initially)
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  
  -- Address (for form pre-fill)
  street_address VARCHAR(255),
  city VARCHAR(100),
  province_code VARCHAR(2),
  postal_code VARCHAR(7),
  
  -- Product tracking
  products_held JSONB DEFAULT '[]'::jsonb,
  products_applied_for JSONB DEFAULT '[]'::jsonb,
  
  -- Engagement metadata
  brand_first_visit VARCHAR(50),  -- 'ratehub', 'moneysense', 'canwise'
  
  -- Consent
  email_marketing_consent BOOLEAN DEFAULT false,
  data_sharing_consent JSONB DEFAULT '{
    "ratehub": false,
    "moneysense": false,
    "canwise": false
  }'::jsonb,
  
  -- Audit
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE INDEX idx_members_workos_user_id ON members(workos_user_id);
CREATE INDEX idx_members_email ON members(email);
```

**Run it:**
```bash
psql ratehub_members < bff/db/001_create_members_table.sql
```

---

## Step 2: Extract BFF Service (Week 1, Day 3–4)

### 2a. Create BFF Directory Structure

```bash
mkdir -p bff/{routes,middleware,db}
cd bff
npm init -y
npm install express cookie-parser @workos-inc/node pg redis dotenv cors
```

### 2b. Copy & Adapt from POC

**File: `bff/app.js`** (adapted from `~/code/lab/experiments/workos-sso-poc/app.js`)

```javascript
require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { Pool } = require('pg');
const { createClient } = require('redis');
const { WorkOS } = require('@workos-inc/node');
const crypto = require('crypto');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [
    'http://localhost:3001',  // Ratehub
    'http://localhost:3002',  // Moneysense
    'http://localhost:3003'   // CanWise (future)
  ],
  credentials: true
}));

// Initialize services
const workos = new WorkOS(process.env.WORKOS_API_KEY);
const db = new Pool({ connectionString: process.env.DATABASE_URL });
const redis = createClient({ url: process.env.REDIS_URL });

redis.connect();

// ============ Session Validation ============
const validateSession = async (sessionId) => {
  if (!sessionId) return null;
  try {
    const data = await redis.get(`session:${sessionId}`);
    if (!data) return null;
    const session = JSON.parse(data);
    // Check expiry
    if (new Date() > new Date(session.expiresAt)) {
      await redis.del(`session:${sessionId}`);
      return null;
    }
    return session;
  } catch (error) {
    console.error('Session validation error:', error);
    return null;
  }
};

// ============ Routes: Auth ============

// GET /auth/login → Redirect to WorkOS
app.get('/auth/login', (req, res) => {
  try {
    const authorizationUrl = workos.userManagement.getAuthorizationUrl({
      provider: 'authkit',
      redirectUri: process.env.WORKOS_REDIRECT_URI,
      clientId: process.env.WORKOS_CLIENT_ID,
    });
    res.json({ loginUrl: authorizationUrl });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to generate login URL' });
  }
});

// GET /auth/callback ← WorkOS returns here
app.get('/auth/callback', async (req, res) => {
  const { code } = req.query;
  if (!code) {
    return res.status(400).send('No authorization code provided.');
  }

  try {
    // Exchange code for user
    const { user } = await workos.userManagement.authenticateWithCode({
      clientId: process.env.WORKOS_CLIENT_ID,
      code,
    });

    // Upsert member profile in PostgreSQL
    const result = await db.query(`
      INSERT INTO members (workos_user_id, email, first_name, last_name, brand_first_visit)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (workos_user_id) DO UPDATE SET
        email = EXCLUDED.email,
        first_name = EXCLUDED.first_name,
        last_name = EXCLUDED.last_name,
        updated_at = CURRENT_TIMESTAMP
      RETURNING id, email, first_name, last_name
    `, [user.id, user.email, user.first_name || '', user.last_name || '', 'ratehub']);

    const member = result.rows[0];

    // Create Redis session
    const sessionId = crypto.randomBytes(32).toString('hex');
    const sessionData = {
      memberId: member.id,
      workosUserId: user.id,
      email: user.email,
      firstName: user.first_name || '',
      lastName: user.last_name || '',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 86400000).toISOString() // 24h
    };

    await redis.setEx(`session:${sessionId}`, 86400, JSON.stringify(sessionData));

    // Set secure cookie
    res.cookie('sessionId', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 86400000 // 24h
    });

    // Redirect to frontend (with app selector if needed)
    const appOrigin = req.query.appOrigin || process.env.RATEHUB_FRONTEND_URL;
    res.redirect(appOrigin);
  } catch (error) {
    console.error('Auth callback error:', error);
    res.status(500).send('Authentication failed. Check logs.');
  }
});

// GET /auth/me → Get current user
app.get('/auth/me', async (req, res) => {
  const session = await validateSession(req.cookies.sessionId);
  
  if (!session) {
    return res.json({ authenticated: false, user: null });
  }

  res.json({ 
    authenticated: true, 
    user: {
      id: session.memberId,
      email: session.email,
      firstName: session.firstName,
      lastName: session.lastName
    }
  });
});

// POST /auth/logout → Delete session everywhere
app.post('/auth/logout', async (req, res) => {
  const sessionId = req.cookies.sessionId;
  
  if (sessionId) {
    await redis.del(`session:${sessionId}`);
  }
  
  res.clearCookie('sessionId');
  res.json({ success: true });
});

// ============ Routes: Profile ============

// GET /profile → Get full member profile
app.get('/profile', async (req, res) => {
  const session = await validateSession(req.cookies.sessionId);
  if (!session) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const result = await db.query(`
    SELECT * FROM members WHERE id = $1 AND deleted_at IS NULL
  `, [session.memberId]);

  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'Member not found' });
  }

  res.json(result.rows[0]);
});

// PATCH /profile → Update member profile
app.patch('/profile', async (req, res) => {
  const session = await validateSession(req.cookies.sessionId);
  if (!session) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const {
    firstName,
    lastName,
    phone,
    streetAddress,
    city,
    provinceCode,
    postalCode,
    emailMarketingConsent,
    dataSharingConsent
  } = req.body;

  const result = await db.query(`
    UPDATE members SET
      first_name = COALESCE($2, first_name),
      last_name = COALESCE($3, last_name),
      phone = COALESCE($4, phone),
      street_address = COALESCE($5, street_address),
      city = COALESCE($6, city),
      province_code = COALESCE($7, province_code),
      postal_code = COALESCE($8, postal_code),
      email_marketing_consent = COALESCE($9, email_marketing_consent),
      data_sharing_consent = COALESCE($10, data_sharing_consent),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $1 AND deleted_at IS NULL
    RETURNING *
  `, [
    session.memberId,
    firstName,
    lastName,
    phone,
    streetAddress,
    city,
    provinceCode,
    postalCode,
    emailMarketingConsent,
    dataSharingConsent ? JSON.stringify(dataSharingConsent) : null
  ]);

  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'Member not found' });
  }

  res.json(result.rows[0]);
});

// GET /profile/pre-fill?product=mortgage → Pre-fillable form fields
app.get('/profile/pre-fill', async (req, res) => {
  const session = await validateSession(req.cookies.sessionId);
  if (!session) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const { product } = req.query;

  const result = await db.query(`
    SELECT 
      email,
      first_name,
      last_name,
      phone,
      street_address,
      city,
      province_code,
      postal_code
    FROM members WHERE id = $1 AND deleted_at IS NULL
  `, [session.memberId]);

  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'Member not found' });
  }

  const member = result.rows[0];

  const preFill = {
    email: member.email || '',
    firstName: member.first_name || '',
    lastName: member.last_name || '',
    phone: member.phone || '',
    address: {
      street: member.street_address || '',
      city: member.city || '',
      province: member.province_code || '',
      postalCode: member.postal_code || ''
    }
  };

  // Product-specific fields (can be extended)
  if (product === 'mortgage') {
    // Could add home value estimate, etc.
  }

  res.json(preFill);
});

// ============ Routes: Applications ============

// POST /applications → Log product application
app.post('/applications', async (req, res) => {
  const session = await validateSession(req.cookies.sessionId);
  if (!session) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const { productType, status } = req.body;

  // Append to products_applied_for array
  const result = await db.query(`
    UPDATE members SET
      products_applied_for = jsonb_set(
        COALESCE(products_applied_for, '[]'::jsonb),
        '{' || (SELECT jsonb_array_length(COALESCE(products_applied_for, '[]'::jsonb))) || '}',
        jsonb_build_object('type', $2, 'status', $3, 'appliedAt', to_jsonb(NOW()))
      ),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $1 AND deleted_at IS NULL
    RETURNING *
  `, [session.memberId, productType, status]);

  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'Member not found' });
  }

  res.json({ success: true });
});

// ============ Health & Monitoring ============

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ============ Start Server ============

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`BFF running at http://localhost:${PORT}`);
  console.log(`  Database: ${process.env.DATABASE_URL}`);
  console.log(`  Redis: ${process.env.REDIS_URL}`);
});
```

### 2c. Create `.env` File

**File: `bff/.env`**

```bash
# WorkOS (from dashboard)
WORKOS_API_KEY=sk_test_your_key_here
WORKOS_CLIENT_ID=client_01abc123...
WORKOS_REDIRECT_URI=http://localhost:3000/auth/callback

# Database
DATABASE_URL=postgresql://postgres:dev@localhost:5432/ratehub_members

# Redis
REDIS_URL=redis://localhost:6379

# URLs
BFF_URL=http://localhost:3000
RATEHUB_FRONTEND_URL=http://localhost:3001
MONEYSENSE_FRONTEND_URL=http://localhost:3002

# Environment
NODE_ENV=development
PORT=3000
```

### 2d. Start BFF

```bash
cd bff
npm install
node app.js
```

**Test it:**
```bash
curl http://localhost:3000/health
# { "status": "ok" }
```

---

## Step 3: Frontend Integration (Week 2–3)

### 3a. Create AuthProvider (Ratehub)

**File: `components/AuthProvider.jsx`** (in Ratehub Design System)

```javascript
'use client'
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:3000/auth/me', {
          credentials: 'include'
        });
        const data = await res.json();
        setUser(data.authenticated ? data.user : null);
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

### 3b. Update `app/layout.jsx`

```javascript
'use client'
import { AuthProvider } from '@/components/AuthProvider';
import { PasswordGate } from '@/components/PasswordGate';
import { SiteShell } from '@/components/SiteShell';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          <PasswordGate>
            <SiteShell>
              {children}
            </SiteShell>
          </PasswordGate>
        </AuthProvider>
      </body>
    </html>
  );
}
```

### 3c. Create usePreFill Hook

**File: `components/usePreFill.js`**

```javascript
'use client'
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';

export const usePreFill = (productType) => {
  const { user } = useAuth();
  const [preFill, setPreFill] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchPreFill = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/profile/pre-fill?product=${productType}`,
          { credentials: 'include' }
        );
        const data = await res.json();
        setPreFill(data);
      } catch (error) {
        console.error('Pre-fill fetch failed:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPreFill();
  }, [user, productType]);

  return { preFill, loading };
};
```

### 3d. Use Pre-fill in Mortgage Form

**File: `components/MortgageCalculator.jsx`** (example)

```javascript
'use client'
import { usePreFill } from '@/components/usePreFill';
import { Input } from '@/components/primitives';

export const MortgageCalculator = () => {
  const { preFill, loading } = usePreFill('mortgage');

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <form>
      <Input
        label="Email"
        type="email"
        defaultValue={preFill?.email || ''}
        name="email"
      />
      <Input
        label="First Name"
        defaultValue={preFill?.firstName || ''}
        name="firstName"
      />
      <Input
        label="Last Name"
        defaultValue={preFill?.lastName || ''}
        name="lastName"
      />
      <Input
        label="Phone"
        type="tel"
        defaultValue={preFill?.phone || ''}
        name="phone"
      />
      <fieldset>
        <legend>Address</legend>
        <Input
          label="Street"
          defaultValue={preFill?.address?.street || ''}
          name="street"
        />
        <Input
          label="City"
          defaultValue={preFill?.address?.city || ''}
          name="city"
        />
        <Input
          label="Province"
          defaultValue={preFill?.address?.province || ''}
          name="province"
        />
        <Input
          label="Postal Code"
          defaultValue={preFill?.address?.postalCode || ''}
          name="postalCode"
        />
      </fieldset>
      {/* ... rest of form ... */}
    </form>
  );
};
```

---

## Step 4: Testing (Week 4)

### Checklist

- [ ] BFF starts without errors
- [ ] `GET /health` returns 200
- [ ] Login flow: Ratehub → BFF → WorkOS → back to Ratehub
- [ ] Session created: Check Redis: `redis-cli get "session:*"`
- [ ] Member record created: `SELECT * FROM members;`
- [ ] Visit Moneysense without login → `GET /auth/me` returns current user
- [ ] Logout from Ratehub → Redis key deleted
- [ ] Moneysense shows login page after logout
- [ ] Pre-fill form fields: Mortgage form auto-fills
- [ ] Update profile: Settings page persists to database

### Manual Test Script

```bash
# 1. Login
curl -c cookies.txt http://localhost:3001/login

# 2. Check session
curl -b cookies.txt http://localhost:3000/auth/me
# Should return: { authenticated: true, user: {...} }

# 3. Get pre-fill
curl -b cookies.txt "http://localhost:3000/profile/pre-fill?product=mortgage"
# Should return: { email: "...", firstName: "...", ... }

# 4. Logout
curl -X POST -b cookies.txt http://localhost:3000/auth/logout

# 5. Check session again
curl -b cookies.txt http://localhost:3000/auth/me
# Should return: { authenticated: false, user: null }
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `ECONNREFUSED` on Redis | `brew services start redis` or Docker |
| `ECONNREFUSED` on PostgreSQL | `brew services start postgresql@15` |
| `WORKOS_API_KEY undefined` | Check `.env` file exists in `bff/` |
| Pre-fill returns empty | Check member record in DB: `SELECT * FROM members LIMIT 1;` |
| CORS error | Check BFF `origin` array includes all frontend URLs |
| Session expires too fast | Check Redis TTL: `ttl session:*` |

---

## Next Steps (After Phase 1A Complete)

1. **Add CanWise** — Repeat frontend integration for CanWise
2. **Monitoring** — Set up alerts for BFF/Redis/DB errors
3. **Pre-population logic** — Extend pre-fill with home value, equity, etc.
4. **Documentation** — Update deployment runbooks

---

## Files Created This Week

```
bff/
├── app.js                    # Main BFF server
├── db/
│   └── 001_create_members_table.sql
├── .env
└── package.json

ratehub-design-system/
├── components/
│   ├── AuthProvider.jsx      # NEW
│   └── usePreFill.js         # NEW
└── app/
    └── layout.jsx            # MODIFIED
```

---

## Success Metrics (End of Phase 1A)

- ✅ Cross-brand login working
- ✅ Form pre-fill rate > 60%
- ✅ Session consistency 100%
- ✅ Pre-fill time < 500ms (p95)

---

*Quick Start Version 1.0 — May 4, 2026*
