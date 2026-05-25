# Frontend Integration: AuthProvider & BFF Connection

**Status:** ✅ Complete  
**Date:** May 4, 2026  
**BFF URL:** http://localhost:3000

---

## What Changed

### 1. AuthProvider (`components/AuthProvider.jsx`)

New client component that wraps the entire app and provides authentication context:

```javascript
<AuthProvider>
  <PasswordGate>
    <SiteShell>{children}</SiteShell>
  </PasswordGate>
</AuthProvider>
```

**Features:**
- Validates existing session on mount via `/auth/me`
- Provides `login()` and `logout()` methods
- Exposes `useAuth()` hook for any component
- Fetches pre-fill data via `getPreFill(product)`
- Manages user state, loading, and authentication status

### 2. useAuth Hook

Use in any client component to access authentication state:

```javascript
const { 
  user,              // { id, email, firstName, lastName }
  authenticated,     // boolean
  loading,          // boolean
  login,            // () => void
  logout,           // () => void
  getPreFill,       // (product) => Promise<prefillData>
  updateProfile,    // (updates) => Promise<updatedUser>
  logApplication,   // (productType, status, lender) => Promise
  validateSession,  // () => void
} = useAuth();
```

### 3. LoginButton Component (`components/LoginButton.jsx`)

Shows user info or login/logout buttons:

```javascript
// Desktop header now uses LoginButton instead of static "Sign in" button
<LoginButton />
```

When logged in, displays: `firstName lastName [Logout]`  
When logged out, displays: `[Login]`

### 4. Environment Configuration

Created `.env.local`:

```
NEXT_PUBLIC_BFF_URL=http://localhost:3000
```

The BFF URL is configurable via environment variable (useful for staging/production).

### 5. Members Page Protected

Updated `/members` route to:
- Check authentication on load
- Redirect to login if not authenticated
- Display loading state while validating session
- Pass authenticated user data to dashboard

---

## How to Test

### Setup (Both Services Running)

**Terminal 1 — BFF Service:**
```bash
cd ~/code/ratehub/bff-service
npm run dev
# Runs on http://localhost:3000 (TEST_MODE=true by default)
```

**Terminal 2 — Design System:**
```bash
cd ~/code/ratehub/Ratehub\ Design\ System
npm run dev
# Runs on http://localhost:3001
```

### Full Login Flow

1. **Visit the app**
   ```
   http://localhost:3001
   ```

2. **Click "Login" button** (top right of header)
   - In TEST_MODE: Creates mock session immediately
   - In production: Redirects to WorkOS login

3. **See user info** in header
   - Header shows: `Test User [Logout]`

4. **Visit Members page** (`/members`)
   - Click "Mortgages" → "My mortgage"
   - Dashboard now displays authenticated user data
   - Auto-redirects to login if not authenticated

5. **Logout**
   - Click username → `[Logout]`
   - Session cleared from Redis
   - Redirected to home page

---

## Component Usage Examples

### Simple Login Button

```javascript
'use client';
import { useAuth } from '@/components/AuthProvider';
import { Button } from '@/components/primitives';

export const MyComponent = () => {
  const { authenticated, user, login, logout } = useAuth();

  if (!authenticated) {
    return <Button onClick={login}>Login to continue</Button>;
  }

  return (
    <div>
      <p>Welcome, {user.firstName}!</p>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};
```

### Protected Route

```javascript
'use client';
import { useAuth } from '@/components/AuthProvider';

export default function ProtectedPage() {
  const { authenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!authenticated) return <div>Please log in first</div>;

  return <div>Protected content here</div>;
}
```

### Form Pre-Fill

```javascript
'use client';
import { usePreFill } from '@/components/AuthProvider';
import { Input } from '@/components/primitives';

export const MortgageForm = () => {
  const { preFill, loading } = usePreFill('mortgage');

  if (loading) return <div>Loading form...</div>;

  return (
    <form>
      <Input 
        label="First name"
        defaultValue={preFill?.firstName || ''}
      />
      <Input 
        label="Email"
        defaultValue={preFill?.email || ''}
      />
    </form>
  );
};
```

### Manual Profile Update

```javascript
'use client';
import { useAuth } from '@/components/AuthProvider';
import { Button } from '@/components/primitives';

export const UpdateProfileButton = () => {
  const { updateProfile } = useAuth();

  const handleUpdate = async () => {
    const result = await updateProfile({
      firstName: 'John',
      lastName: 'Doe',
      phone: '416-555-0123',
    });
    if (result) {
      console.log('Profile updated:', result);
    }
  };

  return <Button onClick={handleUpdate}>Update Profile</Button>;
};
```

---

## BFF Endpoints Used

### Authentication
- `GET /auth/login` — Start login flow (returns loginUrl or creates test session)
- `GET /auth/me` — Check current session (called on app load)
- `POST /auth/logout` — Logout (clears session in Redis)

### Profile
- `GET /profile/pre-fill?product=mortgage` — Get pre-fill data
- `PATCH /profile` — Update member profile
- `GET /profile` — Get full member profile

### Applications
- `POST /applications` — Log a product application
- `GET /applications` — List member's applications

See `~/code/ratehub/bff-service/README.md` for full API reference.

---

## Session Details

### Session Storage
- **Location:** Redis (with in-memory fallback in TEST_MODE)
- **TTL:** 24 hours (configurable via BFF .env SESSION_TTL_SECONDS)
- **Format:** JSON with memberId, email, firstName, lastName, expiresAt

### Cross-Brand Synchronization
When a user logs in via Ratehub:
1. Session created in Redis with sessionId
2. SessionId stored in httpOnly cookie
3. Same sessionId cookie works on Moneysense (port 3002) and CanWise (port 3003)
4. All apps read the same Redis session → user is logged in everywhere

When a user logs out from any app:
1. Session cleared from Redis
2. Cookie cleared
3. Other apps check session on next request → find it missing → logout user

---

## Testing Cross-Brand Logout

**In theory (when Moneysense is running on 3002):**

1. Login via Ratehub (3001)
   - Session created in Redis
2. Open Moneysense in new tab (3002)
   - Loads same sessionId cookie
   - Calls `/auth/me` → authenticated
3. Logout from Moneysense
   - Session deleted from Redis
4. Go back to Ratehub tab
   - Next action that checks `/auth/me` → not authenticated
   - User is logged out everywhere

---

## Troubleshooting

### "Login button doesn't work"
- Check BFF is running: `curl http://localhost:3000/health`
- Check `.env.local` has `NEXT_PUBLIC_BFF_URL=http://localhost:3000`
- Check browser console for CORS errors
- Ensure BFF has `TEST_MODE=true` in `.env`

### "Pre-fill data not loading"
- Verify user is authenticated (check `/auth/me`)
- Check BFF `/profile/pre-fill?product=mortgage` endpoint works
- Ensure BFF session is valid (hasn't expired)

### "Session expires too quickly"
- Check BFF `SESSION_TTL_SECONDS` in `.env` (default: 86400 = 24h)
- Session validation happens on component mount and explicitly on login
- Redis TTL is automatic via BFF

### "CORS errors in browser"
- Check BFF `.env` has frontend URL in CORS whitelist
- Default: `http://localhost:3001` should be allowed
- For staging/prod, update CORS origins in BFF app.js line 52–56

---

## Files Changed

- `app/layout.jsx` — Wrap with AuthProvider
- `components/AuthProvider.jsx` — New context + hooks
- `components/LoginButton.jsx` — New button component
- `components/Header.jsx` — Use LoginButton
- `app/members/page.jsx` — Protected route with auth check
- `.env.local` — BFF URL config

---

## Next Steps

1. ✅ BFF service fully functional
2. ✅ Frontend authentication integrated
3. 🔄 Test full login flow (you are here)
4. 📋 Integrate Moneysense frontend
5. 📋 Integrate CanWise frontend
6. 📋 Add CSRF protection (Phase 2)
7. 📋 Add rate limiting (Phase 2)

---

**Start Development:**
```bash
# Terminal 1
cd ~/code/ratehub/bff-service && npm run dev

# Terminal 2
cd ~/code/ratehub/Ratehub\ Design\ System && npm run dev

# Then visit http://localhost:3001 and click "Login"
```
