# SmartLedger AI — Sprint 9

This is the working Sprint 9 dashboard build for Atlas AI.

## Included

- Premium executive dashboard
- Savings YTD and monthly savings
- Financial Health Score
- Atlas CFO daily briefing
- AI Opportunity Center
- Cash flow and savings charts
- Impact Timeline
- Responsive mobile navigation
- Vite + React project
- Vercel configuration

## Run locally

```bash
npm install
npm run dev
```

## Build for deployment

```bash
npm run build
```

## Deploy through GitHub and Vercel

1. Extract the ZIP.
2. Upload the **contents inside the extracted folder** to the root of your GitHub repository.
3. Commit the files.
4. Vercel should detect Vite and deploy automatically.
5. Build command: `npm run build`
6. Output directory: `dist`

The dashboard currently uses centralized mock data in:

`src/data/mockData.js`

Sprint 10 can replace that mock data with Supabase authentication and persistent company data.
