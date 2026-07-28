# Atlas 19 — Atlas Follows the CEO

This build locks the dashboard layout:

- Every left-side section uses the same full content-column width.
- KPI, action, trend, and evidence cards are formatted inside that shared grid.
- Ask Atlas keeps its current size and stays sticky beside the CEO while the page scrolls.
- Responsive layouts are included for smaller screens.
- The Ask Atlas demo chat and quick actions are functional.

## Deploy

1. Unzip the download.
2. Upload the contents of the folder to the GitHub repository.
3. Commit the changes.
4. Vercel will build automatically.

Build command: `npm run build`  
Output directory: `dist`


## Correction in this build

The Ask Atlas panel now has a full-height right-side track. As the CEO scrolls through
the aligned left-side dashboard, Atlas remains visible and follows the viewport beside
the current section instead of being trapped at its original page position.
