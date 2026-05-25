# POC to Production: From WorkOS SSO to Unified Member Platform
**Reference:** `~/code/lab/experiments/workos-sso-poc`

---

## What Exists in the POC

### ✅ Already Built
- **WorkOS integration** (`app.js`) — OAuth flow, login/logout
- **Cookie-based sessions** — httpOnly cookies with 24h TTL
- **Express server** — Two separate instances (Ratehub + Moneysense) on ports 3001 & 3002
- **BFF documentation** (`BFF_ARCHITECTURE.md`) — Design pattern for cross-app auth
- **Redis session design** (`REDIS_SESSION_DESIGN.md`) — Shared session store planning
- **Sign-out-everywhere** (`SIGN_OUT_EVERYWHERE.md`) — Logic for revoking all sessions

### ❌ What's Missing (What We Build)
- **Persistent member profile** — No database, just cookies
- **Pre-population logic** — No way to share form fields across apps
- **Unified session store** — Currently each app has its own cookie
- **Data schema** — No definition of what a "member" is
- **Cross-brand sync** — No profile data sharing
- **Consent framework** — No PIPEDA compliance

---

## Migration Path: Three Steps

### Step 1: Add Database Layer (Week 1–2)

**Current:** Cookie → WorkOS  
**After:** Cookie → Redis session → PostgreSQL profile

```javascript
// OLD (POC)
app.get('/callback', async (req, res) => {
  const { user } = await workos.userManagement.authenticateWithCode(...);
  res.cookie(process.env.COOKIE_NAME, user.id);  // Only store user ID
  res.redirect('/');
});

// NEW (Production)
app.get('/callback', async (req, res) => {
  const { user } = await workos.userManagement.authenticateWithCode(...);
  
  // Insert/update member profile in PostgreSQL
  const member = await db.query(`
    INSERT INTO members (workos_user_id, email, first_name, last_name)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (workos_user_id) DO UPDATE SET updated_at = CURRENT_TIMESTAMP
    RETURNING id
  `, [user.id, user.email, user.first_name, user.last_name]);
  
  // Store in Redis for fast lookup
  const sessionId = crypto.randomUUID();
  await redis.setEx(`session:${sessionId}`, 86400, JSON.stringify({
    memberId: member.rows[0].id,
    workosUserId: user.id,
    email: user.email
  }));
  
  res.cookie('sessionId', sessionId);
  res.redirect('/');
});
```

**Files to create:**
- `bff/db/schema.sql` — Member profile table
- `bff/middleware/session.js` — Session validation logic
- `.env` template with DATABASE_URL + REDIS_URL

---

### Step 2: Extract BFF Service (Week 2–3)

**Current:** Two separate apps calling WorkOS independently  
**After:** Two apps call shared BFF, BFF calls WorkOS

```
Before:
Ratehub → WorkOS
Moneysense → WorkOS

After:
Ratehub ──┐
          ├── BFF ──→ WorkOS
Moneysense┘     └──→ Redis
                └──→ PostgreSQL
```

**Files to migrate:**
- `bff/routes/auth.js` — `/login`, `/callback`, `/logout`, `/auth/me`
- `bff/routes/profile.js` — `/profile`, `/profile/pre-fill`, `PATCH /profile`
- `bff/middleware/cors.js` — Allow cross-origin requests
- `bff/app.js` — Main server

**Ratehub & Moneysense changes:**
- Remove WorkOS client instantiation
- Call BFF endpoints instead
- Add `credentials: 'include'` to fetch calls (send cookies)

---

### Step 3: Add Form Pre-population (Week 3–4)

**Current:** Each form starts blank  
**After:** Forms auto-fill with member's known data

```javascript
// Frontend
useEffect(() => {
  fetch('http://bff:3000/profile/pre-fill?product=mortgage', {
    credentials: 'include'
  })
    .then(r => r.json())
    .then(data => {
      form.firstName.value = data.firstName;
      form.lastName.value = data.lastName;
      // ... etc
    });
}, []);
```

**Files to create:**
- `bff/routes/prefill.js` — Smart pre-fill logic per product
- `components/usePreFill.js` — React hook for forms

---

## Concrete Code Changes Reference

### From POC's `app.js` → Production's BFF

| POC | Production | Change |
|-----|-----------|--------|
| `const workos = new WorkOS(...)` | Inside BFF only | Move out of frontend |
| `res.cookie(COOKIE_NAME, user.id)` | Store sessionId in Redis, cookie has sessionId | Add DB lookup |
| `app.get('/')` checks cookie | BFF validates Redis session | Centralize logic |
| No database | Member profile table | Add PostgreSQL |
| `listSessions()` / `revokeSession()` | Same + delete Redis key | Enhance consistency |

### From POC's `.env` Files

**POC Ratehub:**
```bash
WORKOS_API_KEY=sk_test_...
WORKOS_CLIENT_ID=client_01...
APP_NAME=Ratehub
COOKIE_NAME=rh_session
```

**Production Ratehub:**
```bash
NEXT_PUBLIC_BFF_URL=http://localhost:3000
# (WORKOS_API_KEY moved to BFF only)
```

**Production BFF:**
```bash
WORKOS_API_KEY=sk_test_...
WORKOS_CLIENT_ID=client_01...
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
```

---

## Testing Migration

### Before Production Deploy

1. **Spin up BFF** with PostgreSQL + Redis
2. **Run existing POC against new BFF** — should work identically
3. **Add pre-fill endpoint** — test form auto-population
4. **Test cross-brand login** — Ratehub login → visit Moneysense → already logged in
5. **Test cross-brand logout** — Logout from Moneysense → Ratehub session gone

### Backward Compatibility

If new BFF breaks:
1. Revert to POC's `app.js` (standalone instances)
2. No data loss (profiles cached in PostgreSQL)
3. RTO: < 5 min

---

## Performance Considerations

### Current (POC)
- Each login: 1 WorkOS API call
- Each page load: 1 cookie lookup
- Cross-app visibility: None

### After Phase 1A
- Each login: 1 WorkOS API call + 1 DB insert
- Each page load: 1 Redis lookup (fast) + 1 DB query (if needed)
- Cross-app visibility: Full sync via Redis

**Latency:** +50–100ms per request (Redis lookup), worth it for consistency.

---

## Deployment Checklist

- [ ] PostgreSQL database provisioned (dev + staging + prod)
- [ ] Redis cluster running (or managed service like ElastiCache)
- [ ] BFF environment variables documented
- [ ] BFF deployed to staging (test full flow)
- [ ] Ratehub updated to call BFF (no WorkOS client)
- [ ] Moneysense updated to call BFF
- [ ] DNS/proxy routes BFF to stable URL
- [ ] Monitoring: Redis/DB/BFF error rates
- [ ] Rollback runbook written
- [ ] Team trained on BFF architecture

---

## Open Questions for Engineering

1. **Database choice?** — Postgres (relational, JSONB support), or MongoDB for flexibility?
2. **Redis persistence?** — RDB snapshots, or AOF (append-only file)?
3. **Session TTL?** — 24h as in POC, or shorter for security?
4. **PII encryption?** — Encrypt SSN/credit info at rest?
5. **CanWise auth?** — Does CanWise use WorkOS, or separate auth system?

---

## Success Metrics (Phase 1A Complete)

| Metric | Baseline | Target |
|--------|----------|--------|
| Cross-brand auth working | No | Yes (Ratehub ↔ Moneysense) |
| Session consistency | Each app independent | 100% sync |
| Form pre-fill rate | 0% | 60%+ |
| Database uptime | N/A | 99.9% |
| BFF response time | N/A | < 200ms (p95) |

---

## Timeline Reference

| Week | Milestone | POC → Prod Change |
|------|-----------|-------------------|
| W1 | Schema + BFF scaffolding | Add DB layer to existing app.js |
| W2 | BFF endpoints live | Extract auth logic into routes/ |
| W3 | Frontend integration | Call BFF instead of WorkOS |
| W4 | Testing + CanWise planning | Validate cross-brand flows |

---

## File Structure: Before vs. After

**POC:**
```
workos-sso-poc/
├── app.js                     # Single file, two config variants
├── .env.ratehub
├── .env.moneysense
├── BFF_ARCHITECTURE.md        # Design doc (not implemented)
└── REDIS_SESSION_DESIGN.md
```

**Production (end of Phase 1A):**
```
bff-service/
├── app.js                     # Main express server
├── routes/
│   ├── auth.js               # /login, /callback, /logout, /me
│   ├── profile.js            # /profile, PATCH, pre-fill
│   └── applications.js       # Track product applications
├── middleware/
│   ├── session.js            # validateSession()
│   └── cors.js               # Cross-origin config
├── db/
│   ├── schema.sql            # Member table definition
│   └── migrations/           # Flyway/Alembic version control
├── .env                      # Unified (dev)
├── .env.staging
├── .env.production
└── package.json

ratehub-design-system/        # Next.js app, unchanged structure
├── components/
│   ├── AuthProvider.jsx      # NEW: Wrap all pages
│   └── useAuth.js            # NEW: Hook for current user
├── app/
│   └── members/
│       └── page.jsx          # NEW: Dashboard
└── ...existing pages...
```

---

## Security Checklist

- [ ] WorkOS API key never in frontend code
- [ ] Cookies: httpOnly + Secure + SameSite
- [ ] Sessions: 24h TTL + server-side expiry check
- [ ] CORS: Whitelist only known domains
- [ ] Database: Encrypted connection (TLS)
- [ ] Redis: Password-protected (requirepass)
- [ ] Pre-fill: Only return data user consented to share
- [ ] Logging: Mask PII in logs

---

## Next: Detailed Implementation Plan

See `PHASE_1A_IMPLEMENTATION_PLAN.md` for week-by-week breakdown, code samples, and testing checklist.

---

*Document version: 1.0 — May 4, 2026*  
*Based on POC at `~/code/lab/experiments/workos-sso-poc`*
