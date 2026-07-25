# Atlas SmartLedger — Sprint 11A

## Financial Import Center

This release is a complete front-end implementation of the first Sprint 11 package.

### Working features
- Drag-and-drop CSV upload
- File type and size checks
- CSV parsing with quoted-field support
- Automatic column detection
- Manual column mapping
- Date and currency normalization
- Required-field validation
- Possible duplicate detection
- Debit, credit, and row summaries
- Transaction preview
- Import history and rollback of demo history
- Imported transaction ledger
- Browser-local storage for safe customer demonstrations
- Responsive Atlas premium UI

### Run locally
```bash
npm install
npm run dev
```

### Build for Vercel
```bash
npm run build
```

### Demo
Use **Enter Sprint 11A demo**, then either upload a CSV or click **Use included sample data**.

### Important
This sprint processes and stores demo data in the browser. Production persistence and financial aggregation will use Supabase after the database migration and security review.


## Sprint 11A.1 Stabilization

- Fixed left navigation routing and active-page state.
- Added URL hash navigation for refresh-safe pages.
- Added working expandable CEO report.
- Added Escape-key close behavior and visible keyboard focus.
- Increased navigation click targets for accessibility.
