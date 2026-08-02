# Atlas AI Sprint 23.0.1 — Navigation Recovery

## Fixed
- Restored the missing Financial Imports, Transactions, Import History, Payments & Billing, and Settings page templates.
- Preserved and restored the Sprint 23 dashboard when returning from another page.
- Replaced fragile per-button listeners with scoped sidebar event delegation.
- Restored active-page highlighting and safe fallback behavior.
- Kept the Sprint 23 Executive Action Tracker, Ask Atlas, Executive Brief, billing demonstrations, transaction tools, and sign-out flow intact.

## Root cause
Sprint 23 included `showPage()` calls for `dashboardHTML` and `pageTemplates`, but those definitions were absent from the delivered source file. Clicking a navigation item therefore raised a JavaScript reference error and stopped navigation.
