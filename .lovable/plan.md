

## Fix: Admin Login Race Condition on Published Site

### Root Cause

When `signIn` completes, `AdminLogin` immediately calls `navigate("/admin")`. But the `AuthProvider`'s `onAuthStateChange` callback (which sets `user` and `isAdmin`) fires asynchronously. On the published/optimized build, `ProtectedRoute` renders before the auth state updates propagate, sees `user = null` / `isAdmin = false`, and redirects back to `/admin/login`. In the dev preview, the timing is slightly different so it usually works.

### The Fix

Two changes:

**1. `useAuth.tsx` — Make `signIn` wait for the admin check to complete before returning**

Instead of just calling `signInWithPassword` and returning, `signIn` should also immediately set the user/session/isAdmin state before resolving. This way, by the time `AdminLogin` calls `navigate`, the auth context already has the correct values.

```
signIn → signInWithPassword → getUser → checkAdmin → setState → return
```

**2. `AdminLogin.tsx` — React to auth state instead of navigating blindly**

Add a `useEffect` that watches `user` and `isAdmin` from the auth context. When both are truthy, navigate to `/admin`. This provides a reliable fallback regardless of timing.

### Files Changed

| File | Change |
|------|--------|
| `src/hooks/useAuth.tsx` | Update `signIn` to set user/session/isAdmin before returning |
| `src/pages/AdminLogin.tsx` | Add `useEffect` to navigate on auth state change as fallback |

