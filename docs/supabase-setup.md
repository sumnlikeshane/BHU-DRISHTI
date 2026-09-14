# Supabase implementation and deployment

The application now uses Supabase for invitation-only authentication, PostGIS
storage, role/scope enforcement, and two authenticated Edge Functions. The
browser never receives the secret key and cannot query the operational schemas
directly.

## Security model

- `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` are embedded in the Vite client.
  Both are public client configuration.
- `SUPABASE_SECRET_KEY` is server-only. Never prefix it with `VITE_`.
- Both Edge Functions use `@supabase/server` with `auth: 'user'`. They verify the
  caller's JWT and use the admin client only to call server-only SQL functions.
- Operational tables have RLS enabled and no browser policies. Authenticated
  users can read only their own row in `public.profiles`.
- `field-evidence` is a private Supabase Storage bucket with no direct client
  object policy; future media endpoints must issue short-lived access after the
  same scope check.
- SQL functions enforce the user's active profile and administrative hierarchy.
  Programme administrators and analysts receive Pan-India scope; other roles
  require an assigned state/district/admin unit.
- Every case transition inserts an immutable `decision.reviews` record before
  changing queue status.

## 1. Configure the project

Create a Supabase project with Postgres 17 and copy `.env.example` to `.env`.
Fill in:

```env
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
SUPABASE_SECRET_KEY=sb_secret_...
SUPABASE_JWKS_URL=https://<project-ref>.supabase.co/auth/v1/.well-known/jwks.json
DATABASE_URL_DIRECT=postgresql://postgres.<project-ref>:<password>@<direct-host>:5432/postgres
```

Vite maps only the URL and publishable key into `import.meta.env`; the secret and
database URL remain unavailable to browser code.

In Supabase Auth URL Configuration, set the deployed site URL and allow these
redirect URLs:

```text
http://localhost:5173/command-centre
https://<your-domain>/command-centre
```

Keep public sign-up disabled. Create users through the Supabase dashboard or an
approved administrative provisioning process.

## 2. Apply the database

The migration runner applies the checked-in SQL files in lexical order and stops
on the first error:

```bash
npm run db:migrate
```

The migrations create PostGIS domain schemas, seed the source registry, add
Supabase Auth profiles and scoped server RPCs, then load a clearly labelled
illustrative Nashik scenario. `004_demo_command_centre.sql` can be omitted in a
production environment that already has authorised programme data.

## 3. Invite and scope a user

After inviting a user, assign the minimum required role in the SQL editor. New
users default to an inactive-data state: `field_officer` with no administrative
scope, so they can authenticate but cannot read cases.

District example:

```sql
update public.profiles
set
  role = 'district_reviewer',
  admin_unit_id = '10000000-0000-4000-8000-000000000002'
where user_id = '<auth-user-uuid>';
```

Pan-India administrator example:

```sql
update public.profiles
set role = 'programme_admin', admin_unit_id = null
where user_id = '<auth-user-uuid>';
```

The fixed Nashik UUID above belongs only to the illustrative seed. Use the
authoritative imported admin-unit UUID in real environments.

## 4. Deploy Edge Functions

Link the Supabase CLI to the project, then deploy both functions:

```bash
npx supabase login
npx supabase link --project-ref <project-ref>
npm run supabase:deploy
```

The Supabase platform injects the URL, key sets, and JWKS used by
`@supabase/server`. Both functions retain the platform JWT check because they
accept only signed-in users.

## 5. Run and verify

```bash
npm install
npm run typecheck
npm run lint
npm test
npm run build
npm run dev
```

Then verify:

1. `/login` accepts an invited user's password or magic-link sign-in.
2. An unscoped field officer receives an access-denied response.
3. A Nashik reviewer sees only Nashik and descendant-unit cases.
4. A programme administrator sees the complete queue.
5. Reviewing a case creates a `decision.reviews` row and changes its status.
6. Signing out returns the user to `/login`.

The production web host must rewrite `/login`, `/command-centre`, and `/demo` to
`index.html`, because routing is handled by the React application.
