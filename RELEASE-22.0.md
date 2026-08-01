# Atlas AI 22.0 — Real AI Core

## Purpose
Replace the primary scripted Ask Atlas experience with a secure server-side OpenAI Responses API integration.

## Added
- `api/chat.js` Vercel serverless endpoint.
- Server-side use of `OPENAI_API_KEY`; the secret is never sent to the browser.
- Natural multi-turn AI conversation using recent message history.
- SmartLedger dashboard and demo-company context included with each request.
- Grounding instructions that prevent Atlas from inventing unsupported company facts.
- AI status indicator: AI Connected, Analyzing, or Demo Fallback.
- Local scripted engine remains available only as a fallback if the API endpoint is unavailable.

## Required Vercel environment variable
- `OPENAI_API_KEY`

## Optional Vercel environment variable
- `OPENAI_MODEL` (defaults to `gpt-4.1-mini`)
