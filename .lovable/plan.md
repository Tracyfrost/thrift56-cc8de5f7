

## Fix: "Get Drop Alerts" Email Submission Silently Fails

### Root Cause

In `src/hooks/useSupabaseData.ts`, the `useSubscribe` mutation does:

```typescript
const { data, error } = await supabase.from("subscribers").insert(sub).select().single();
```

The `.select().single()` tries to read back the just-inserted row. But the `subscribers` table only has a SELECT policy for **admins** (`has_role(auth.uid(), 'admin')`). Anonymous site visitors can INSERT but cannot SELECT, so `.single()` returns an error (no rows found), causing the mutation to throw — even though the row was actually inserted successfully.

The button shows "Joining..." because the mutation starts, but the response triggers the error path. The error message doesn't contain "duplicate", so the generic "Something went wrong" toast should fire — but the user may not notice it or it may be briefly visible.

### Fix

Remove `.select().single()` from the subscribe mutation in `useSupabaseData.ts`. We don't need the returned data — we just need to know the insert succeeded.

**File: `src/hooks/useSupabaseData.ts` (line 288)**

Change:
```typescript
const { data, error } = await supabase.from("subscribers").insert(sub).select().single();
if (error) throw error;
return data;
```

To:
```typescript
const { error } = await supabase.from("subscribers").insert(sub);
if (error) throw error;
```

This is a one-line fix. The insert will succeed for anonymous users, the success toast will fire, and the email field will clear.

