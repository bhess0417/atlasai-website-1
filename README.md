# Atlas AI — SmartLedger v0.11.2

Sprint 11A.2 stabilization release built from the live GitHub repository.

## Fixes

- Corrected Vite configuration so Vercel can deploy the current code.
- Left navigation buttons route to working views.
- Active navigation state is visible.
- CEO report opens in a full dialog.
- CEO report closes with the close button or Escape key.
- Mobile menu opens and closes correctly.
- Existing CSV import, validation, transaction ledger, and import history remain intact.

## Deployment

Upload every file and folder in this package to the root of the existing GitHub repository, replacing matching files. The important deployment fixes are `package.json` and `vite.config.js`.

Vercel settings:
- Build command: `npm run build`
- Output directory: `dist`
