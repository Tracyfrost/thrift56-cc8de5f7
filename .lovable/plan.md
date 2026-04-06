

## Fix: Admin Login Fails on Published Site

### Root Cause

The `user_roles` table has two SELECT policies, both requiring `has_role(auth.uid(), 'admin')`. This means only users already confirmed as admin can read the table. When `checkAdmin()` in `useAuth.tsx` queries `user_roles` directly after login, there's a timing window on the published site where the query runs before the JWT is fully applied, returning no rows and setting `isAdmin = false`.

### Solution

Two changes:

**1. Add RLS policy: "Users can read their own roles"**

```sql
CREATE POLICY "Users can read own role"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());
```

This allows any authenticated user to check their own role without needing to already be admin. Eliminates the chicken-and-egg problem.

**2. Update `checkAdmin` in `useAuth.tsx` to use the `has_role` RPC function**

Instead of querying `user_roles` directly (which hits RLS), call the existing `has_role` SECURITY DEFINER function via RPC. This bypasses RLS entirely and is the most reliable approach:

```typescript
const checkAdmin = async (userId: string) => {
  const { data, error } = await supabase.rpc("has_role", {
    _user_id: userId,
    _role: "admin",
  });
  if (error) return false;
  return data === true;
};
```

### Files Changed

| File | Change |
|------|--------|
| Migration SQL | Add "Users can read own role" SELECT policy |
| `src/hooks/useAuth.tsx` | Replace direct query with `supabase.rpc("has_role", ...)` |

