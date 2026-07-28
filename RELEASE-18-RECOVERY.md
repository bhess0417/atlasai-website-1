# Release 18 Recovery

## Recovery corrections

- Uses one production entry point: `/src/main.js`.
- Synchronizes package and lock-file version to `18.0.1`.
- Pins Vite to `5.4.21` in both dependency files.
- Removes unused React prototype files from the deployment package.
- Preserves Release 17 Decision Scores and Atlas 18 Investigation Mode.
- Keeps Supabase disabled until credentials and its package are configured together.

## Visible verification

After deployment, the header displays `ATLAS 18 RECOVERY`.
Action Center recommendations display `Investigation Ready` and `Investigate →`.
