# Atlas SmartLedger — Release 18 Recovery

Clean single-entry Vite recovery build based on the verified Release 17 workspace with Atlas 18 Investigation Mode.

## Active application entry

- `index.html`
- `src/main.js`
- `src/style.css`

Old React prototype files such as root-level `App.jsx`, `main.jsx`, and component files are not part of this recovery package and are not imported by the application.

## Production build

```bash
npm ci
npm run build
```
