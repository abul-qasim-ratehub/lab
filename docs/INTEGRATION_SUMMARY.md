# Frontend-BFF Integration Summary

**Completed:** May 4, 2026  
**Status:** ✅ Ready for Testing

---

## Overview

Ratehub Design System is now fully integrated with the BFF service (Port 3000). Users can:
- Login via header button (TEST_MODE creates instant mock sessions)
- Access member-protected pages (`/members`)
- Get form pre-fill data from their profile
- Logout everywhere with one click

---

## Files Created

### New Components
1. **`components/AuthProvider.jsx`** (140 lines)
   - Context provider for authentication state
   - Exports `useAuth()` hook and `usePreFill()` hook
   - Manages session validation, login, logout, profile updates
   - Graceful error handling with fallbacks

2. **`components/LoginButton.jsx`** (30 lines)
   - Displays login button or user info + logout
   - Shows loading state while checking auth
   - Used in Header (top-right)

### Updated Components
3. **`app/layout.jsx`**
   - Added `AuthProvider` wrapper

4. **`components/Header.jsx`**
   - Imported and used `LoginButton` component
   - Replaced static "Sign in" button with dynamic auth state

5. **`app/members/page.jsx`**
   - Protected route that checks authentication
   - Auto-redirects to login if not authenticated
   - Passes authenticated user data to MembersDashboard

### Configuration
6. **`.env.local`** (new)
   - `NEXT_PUBLIC_BFF_URL=http://localhost:3000`

### Documentation
7. **`docs/FRONTEND_INTEGRATION.md`** (300 lines)
   - Complete integration guide
   - Component usage examples
   - Testing procedures
   - Troubleshooting
   - Cross-brand session explanation

---

## How It Works

### Session Flow

```
User clicks "Login" button
    ↓
LoginButton calls useAuth().login()
    ↓
AuthProvider calls BFF GET /auth/login
    ↓
BFF creates test session (TEST_MODE=true):
  - Generates sessionId
  - Creates memberId
  - Stores in Redis (or in-memory)
  - Returns sessionId
    ↓
Frontend stores sessionId in httpOnly cookie
    ↓
Header shows: "Test User [Logout]"

Later, user visits /members:
    ↓
MembersDashboard checks useAuth().authenticated
    ↓
If not authenticated: auto-redirects to login
If authenticated: displays member data
```

### Authentication Context

Any component can use:
```javascript
const { user, authenticated, loading, login, logout, getPreFill } = useAuth();
```

**Protected pages** can check authentication:
```javascript
if (!authenticated && !loading) {
  return <div>Please log in first</div>;
}
```

**Forms** can pre-fill data:
```javascript
const { preFill } = usePreFill('mortgage');
<Input defaultValue={preFill?.firstName} />
```

---

## Starting the Full Stack

### Setup (One-time)

**BFF Service:**
```bash
cd ~/code/ratehub/bff-service
npm install
cp .env.example .env
# Ensure TEST_MODE=true in .env
npm run dev
# Runs on http://localhost:3000
```

**Design System:**
```bash
cd ~/code/ratehub/Ratehub\ Design\ System
npm install
npm run dev
# Runs on http://localhost:3001
```

### Testing Checklist

#### 1. Health Check (BFF only)
```bash
curl http://localhost:3000/health
# Response: { "status": "ok", "timestamp": "2026-05-04T..." }
```

#### 2. Login Flow (Full stack)
1. Visit http://localhost:3001
2. Click "Login" button (top-right)
3. Header should show: "Test User [Logout]"
4. Check browser DevTools → Application → Cookies → `sessionId` exists

#### 3. Protected Route
1. Click "Mortgages" → "My mortgage" (or navigate to /members)
2. If logged in: Dashboard displays
3. If not logged in: Redirects to login automatically
4. Dashboard title says: "Welcome back, Test User"

#### 4. Logout
1. Click "Test User" → "Logout" button
2. SessionId cookie should be deleted
3. Header shows "Login" again
4. Visiting /members redirects to login

#### 5. Session Persistence
1. Login successfully
2. Refresh page (Cmd+R)
3. Should still be logged in (session is persisted in Redis)
4. Check `/auth/me` returns { authenticated: true, user: {...} }

#### 6. Cross-App Session (future, when Moneysense on 3002)
1. Login via Ratehub (3001)
2. Open new tab → Moneysense (3002)
3. Should be logged in automatically
4. Logout from either app → logged out everywhere

---

## BFF Endpoints Used by Frontend

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/health` | GET | Health check |
| `/auth/login` | GET | Start login (returns test session in TEST_MODE) |
| `/auth/callback` | GET | WorkOS redirects here (not used in TEST_MODE) |
| `/auth/me` | GET | Check current user session |
| `/auth/logout` | POST | Logout (delete session) |
| `/profile/pre-fill` | GET | Get pre-fill data for a form |
| `/profile` | PATCH | Update member profile |
| `/profile` | GET | Get full member profile |
| `/applications` | POST | Log product application |
| `/applications` | GET | List member's applications |

See `~/code/ratehub/bff-service/README.md` for full API reference.

---

## Architecture Diagram

```
┌────────────────────────────────────────────────────────────┐
│                    Next.js 15 (3001)                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ AuthProvider                                        │   │
│  │ ┌───────────────────────────────────────────────┐   │   │
│  │ │ useAuth() Context                             │   │   │
│  │ │ - user state                                  │   │   │
│  │ │ - authenticated flag                          │   │   │
│  │ │ - login() / logout()                          │   │   │
│  │ │ - getPreFill()                                │   │   │
│  │ └───────────────────────────────────────────────┘   │   │
│  │                                                     │   │
│  │ ┌──────────────────┐         ┌─────────────────┐   │   │
│  │ │ Header           │         │ SiteShell       │   │   │
│  │ │ LoginButton ────→│ useAuth │ ProtectedRoute  │   │   │
│  │ └──────────────────┘         └─────────────────┘   │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────┘
                          ↓ HTTP
┌────────────────────────────────────────────────────────────┐
│         Express BFF Service (3000)                         │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ /auth/login (TEST_MODE)                            │   │
│  │ → Creates mock sessionId                           │   │
│  │ → Stores in Redis + Cookies                        │   │
│  │ → Returns { success: true }                        │   │
│  │                                                    │   │
│  │ /auth/me                                           │   │
│  │ → Reads sessionId from cookie                      │   │
│  │ → Looks up in Redis                               │   │
│  │ → Returns { authenticated, user }                 │   │
│  │                                                    │   │
│  │ /auth/logout                                       │   │
│  │ → Deletes session from Redis                      │   │
│  │ → Clears cookie                                   │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────┘
                          ↓ Redis/In-Memory
┌────────────────────────────────────────────────────────────┐
│                  Session Store                             │
│  session:{id} → { memberId, email, firstName, ... }       │
│  TTL: 24 hours (86400 seconds)                             │
└────────────────────────────────────────────────────────────┘
```

---

## Key Design Decisions

1. **AuthProvider in layout.jsx**
   - ✅ Wraps entire app tree
   - ✅ Session validated on app load (via useEffect in AuthProvider)
   - ✅ Persists across page navigations

2. **LoginButton component**
   - ✅ Reusable auth UI component
   - ✅ Shows loading state while checking auth
   - ✅ Displays user info when authenticated

3. **Protected routes**
   - ✅ `/members` checks auth on mount
   - ✅ Auto-redirects to login if not authenticated
   - ✅ Shows loading state while validating

4. **useAuth() hook**
   - ✅ Any component can access auth context
   - ✅ Provides all auth methods (login, logout, getPreFill, etc.)
   - ✅ Error handling with fallbacks

5. **usePreFill() hook**
   - ✅ Convenience hook for form pre-fill
   - ✅ Manages loading state
   - ✅ Can be used multiple times without conflicts

---

## Next Steps

### Phase 1B (This Week)
- [ ] Test full login flow with both services running
- [ ] Verify cross-brand session behavior (once Moneysense integrates)
- [ ] Validate form pre-fill on mortgage pages
- [ ] Check Lighthouse scores post-integration

### Phase 2 (Week 3–4)
- [ ] Add Moneysense frontend integration (same AuthProvider pattern)
- [ ] Add CanWise frontend integration
- [ ] Test cross-brand logout
- [ ] Add CSRF token protection to POST endpoints
- [ ] Add rate limiting to auth endpoints

### Phase 3 (Week 5–8)
- [ ] Add member audit logging
- [ ] Implement email verification
- [ ] Add password reset flow
- [ ] Enable encryption at rest

---

## Troubleshooting

### Frontend won't compile
```
Error: Module not found 'AuthProvider'
→ Verify files are in components/ directory
→ Clear .next build cache: rm -rf .next
→ npm run dev again
```

### Login button doesn't work
```
→ Check BFF is running: curl http://localhost:3000/health
→ Check .env.local has NEXT_PUBLIC_BFF_URL=http://localhost:3000
→ Check browser DevTools → Network tab for failed requests
```

### User data shows mock data instead of real
```
→ Verify TEST_MODE=true in BFF .env
→ Check useAuth() is returning correct authenticated status
→ Clear browser cache + cookies
```

### Session expires immediately
```
→ Check BFF SESSION_TTL_SECONDS in .env (default: 86400)
→ Verify Redis is running (or TEST_MODE using in-memory)
→ Check browser cookie maxAge matches TTL
```

---

## Testing Commands

```bash
# 1. Check both services are running
curl http://localhost:3000/health    # BFF
curl http://localhost:3001           # Design System (should return HTML)

# 2. Test BFF login directly
curl http://localhost:3000/auth/login
# Response: { "success": true, "sessionId": "..." }

# 3. Capture sessionId and test /auth/me
curl -H "Cookie: sessionId=YOUR_SESSION_ID" \
  http://localhost:3000/auth/me
# Response: { "authenticated": true, "user": { ... } }

# 4. Test logout
curl -X POST -H "Cookie: sessionId=YOUR_SESSION_ID" \
  http://localhost:3000/auth/logout
# Response: { "success": true }

# 5. Verify session is deleted
curl -H "Cookie: sessionId=YOUR_SESSION_ID" \
  http://localhost:3000/auth/me
# Response: { "authenticated": false, "user": null }
```

---

## Files Checklist

✅ Created:
- [ ] `components/AuthProvider.jsx` — Auth context + hooks
- [ ] `components/LoginButton.jsx` — Login/logout UI
- [ ] `.env.local` — BFF URL config
- [ ] `docs/FRONTEND_INTEGRATION.md` — Integration guide
- [ ] `docs/INTEGRATION_SUMMARY.md` — This file

✅ Modified:
- [ ] `app/layout.jsx` — AuthProvider wrapper
- [ ] `components/Header.jsx` — LoginButton usage
- [ ] `app/members/page.jsx` — Protected route with auth check

✅ Running:
- [ ] BFF on http://localhost:3000 (TEST_MODE=true)
- [ ] Design System on http://localhost:3001

---

**Ready to test?** See FRONTEND_INTEGRATION.md for the testing procedure.
