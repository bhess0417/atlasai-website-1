# Atlas SmartLedger Sprint 24.2 — Real Conversation Engine

## What changed
- Replaced the narrow phrase-script path with a conversation-first engine.
- Sends recent conversation, active memory, executive brief, and summarized company data to a secure server endpoint.
- Added a privacy-safe local intelligence fallback so Ask Atlas remains useful before the server key is configured.
- Follow-ups can use natural references such as “it,” “these,” “that,” “them,” and “what should we do next?”
- Clarifications are now specific and only used when a requested fact is genuinely unavailable.
- Added an Atlas thinking state and an engine-status badge.

## Secure AI activation on Vercel
Add an environment variable named `OPENAI_API_KEY` to the Vercel project, then redeploy. Optionally add `OPENAI_MODEL`; otherwise the endpoint uses `gpt-5-mini`.

The API key stays on the server and is never placed in browser code.
