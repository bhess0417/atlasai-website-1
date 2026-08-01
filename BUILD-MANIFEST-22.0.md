# Build Manifest — Atlas AI 22.0

## Modified
- `src/main.js`
- `index.html`
- `package.json`

## Added
- `api/chat.js`
- `RELEASE-22.0.md`
- `BUILD-MANIFEST-22.0.md`

## Verification
- OpenAI key remains server-side through `process.env.OPENAI_API_KEY`.
- Frontend calls only `/api/chat`.
- AI receives recent conversation history, active page, and trusted demo-company context.
- Scripted responses remain as a visible fallback, not the primary response engine.
