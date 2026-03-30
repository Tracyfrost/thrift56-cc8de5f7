

## Plan: Harden Overly Permissive INSERT Policies

The scan flags two tables with `WITH CHECK (true)` on INSERT policies:

1. **`subscribers`** — "Anyone can subscribe" allows inserting any data with no validation
2. **`community_suggestions`** — "Anyone can submit suggestions" allows inserting any data with no validation

### Fix (single migration)

**`subscribers`**: Replace `WITH CHECK (true)` with constraints that ensure `email` and `name` are non-empty:
```sql
WITH CHECK (
  char_length(email) > 0 AND char_length(name) > 0
)
```

**`community_suggestions`**: Replace `WITH CHECK (true)` with constraints that ensure `name` and `suggestion` are non-empty:
```sql
WITH CHECK (
  char_length(name) > 0 AND char_length(suggestion) > 0
)
```

Both tables remain open for anonymous inserts (the intended behavior for public forms) but now validate that required fields aren't empty, removing the blanket `true` that triggers the linter warning.

No code changes needed — the frontend already sends valid data for both forms.

