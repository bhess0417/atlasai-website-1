# Atlas AI 22.0.1 — Navigation Repair

## Objective
Restore all left-sidebar navigation pages without changing the working AI Core, Executive Brief, or CEO Action Center.

## Modified files
- `src/main.js`
- `index.html`
- `package.json`

## Repairs
- Restored the Dashboard snapshot used when returning home.
- Restored Financial Imports page template.
- Restored Transactions page template and CSV export wiring.
- Restored Import History page template.
- Restored Payments & Billing page template and billing actions.
- Restored Settings page template and save controls.
- Preserved Atlas `/api/chat`, Executive Brief, CEO Action Center, login, sign-out, and session behavior.

## QA checklist
- Dashboard button opens Dashboard.
- Financial Imports opens its page.
- Transactions opens its page.
- Import History opens its page.
- Payments & Billing opens its page.
- Settings opens its page.
- Returning to Dashboard restores Atlas chat and dashboard controls.
