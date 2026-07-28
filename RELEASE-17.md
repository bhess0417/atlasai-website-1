# Release 17 — Atlas Intelligence Engine

## Objective
Make every ranked recommendation explainable and decision-ready.

## Changed files
- `src/demoData.js`: Added Executive Decision Scores, evidence, next actions, time-to-value, and supporting records.
- `src/intelligence.js`: Added scoring and evidence metadata for customer-imported transaction recommendations.
- `src/main.js`: Added Decision Score labels and a full evidence drawer with supporting records.
- `src/style.css`: Added executive intelligence and evidence-table styling.

## Verification
After deployment, each Action Center card displays an Executive Decision Score. Selecting **Why?** opens a detailed evidence view with confidence, impact, time to value, reasoning, next action, and supporting records.
