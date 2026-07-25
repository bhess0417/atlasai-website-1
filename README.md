# Atlas AI — SmartLedger Sprint 10

Sprint 10 adds the identity and company-workspace foundation for SmartLedger.

## Included

- Premium responsive SmartLedger dashboard
- Login, registration, password-reset, and demo-access screens
- Persistent local demo sessions
- Supabase authentication integration (activated by environment variables)
- Company workspace switcher
- Owner, Admin, Accountant, and Employee roles
- Team-management interface
- Notification center
- Profile/company settings
- Billing-plan foundation
- Supabase schema and Row-Level Security starter policies
- Vercel-ready configuration

## Test immediately

```bash
npm install
npm run dev
```

On the login screen, choose **Enter Sprint 10 demo**.

## Connect Supabase

1. Create a Supabase project.
2. Copy `.env.example` to `.env`.
3. Add the project URL and anonymous key.
4. Open the Supabase SQL Editor and run `supabase/schema.sql`.
5. Restart the development server.

## Upload to GitHub

Upload the **contents of this folder**, not the ZIP file itself. Commit the files, then allow Vercel to redeploy.

## Important

The interface and demo workflow are complete. Live production onboarding still requires server-side company creation, invitation emails, Stripe billing, and expanded RLS policies as those features are connected in later sprints.
