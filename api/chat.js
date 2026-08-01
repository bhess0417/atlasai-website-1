const MAX_MESSAGES = 16;
const MAX_TEXT_LENGTH = 4000;

const COMPANY_CONTEXT = {
  company: {
    name: 'Atlas Manufacturing Group',
    industry: 'Manufacturing',
    employees: 187,
    locations: 3,
    transactionsAnalyzed: 9842
  },
  financials: {
    annualRevenue: 28400000,
    cashOnHand: 2840000,
    activeVendors: 412,
    financialHealthScore: 92,
    annualSavingsIdentified: 46100,
    atlasConfidence: 98
  },
  priorities: [
    { rank: 1, item: 'Commercial insurance review', detail: 'Premiums are 18% above peer benchmark; no competitive rebid in 31 months.', estimatedAnnualImpact: 18300 },
    { rank: 2, item: 'Merchant processing renegotiation', detail: 'Effective fees increased 11% this quarter.', estimatedAnnualImpact: 14800 },
    { rank: 3, item: 'Software license consolidation', detail: '27 paid seats show no activity in 90 days.', estimatedAnnualImpact: 7900 },
    { rank: 4, item: 'Freight optimization', detail: 'West-location freight cost is 12% above company average.', estimatedAnnualImpact: 5100 }
  ],
  recentChanges: [
    'Cash on hand improved by $38,200 since yesterday.',
    'One vendor invoice is 22% above that vendor’s six-month average and includes an unusual freight surcharge.',
    'A new $5,100 annual freight savings opportunity was identified.',
    'No new short-term liquidity risk was detected.'
  ],
  limitations: [
    'This is fictional demonstration data.',
    'No live bank, accounting, tax, legal, or external web data is connected yet.',
    'Do not invent company facts that are not in this context.'
  ]
};

function getText(response) {
  if (typeof response?.output_text === 'string' && response.output_text.trim()) return response.output_text.trim();
  const chunks = [];
  for (const item of response?.output || []) {
    for (const content of item?.content || []) {
      if (content?.type === 'output_text' && typeof content.text === 'string') chunks.push(content.text);
      if (typeof content?.text === 'string') chunks.push(content.text);
    }
  }
  return chunks.join('\n').trim();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'Atlas AI is not configured. OPENAI_API_KEY is missing.' });
  }

  const rawMessages = Array.isArray(req.body?.messages) ? req.body.messages : [];
  const currentPage = String(req.body?.currentPage || 'Dashboard').slice(0, 80);
  const messages = rawMessages
    .slice(-MAX_MESSAGES)
    .filter((m) => m && ['user', 'assistant'].includes(m.role) && typeof m.content === 'string')
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_TEXT_LENGTH) }));

  if (!messages.length || messages[messages.length - 1].role !== 'user') {
    return res.status(400).json({ error: 'A user question is required.' });
  }

  const developerPrompt = `You are Atlas, the executive copilot inside SmartLedger.

Your role:
- Help a CEO understand the supplied company data and make better decisions.
- Be calm, concise, direct, analytical, honest, and action-oriented.
- Maintain conversational context across follow-up questions.
- Ground every company-specific claim in the supplied business context.
- Never invent financial values, transactions, customers, vendors, laws, market data, or live internet facts.
- When the data is insufficient, say exactly what additional data is needed.
- Clearly label demonstration data when relevant.
- Do not provide legal, tax, investment, or accounting advice as a substitute for a qualified professional.

Preferred response structure when useful:
1. Direct answer
2. Why it matters
3. Executive recommendation
4. Confidence and data limitation

Current SmartLedger page: ${currentPage}

Business context:
${JSON.stringify(COMPANY_CONTEXT, null, 2)}`;

  try {
    const openaiResponse = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
        instructions: developerPrompt,
        input: messages,
        max_output_tokens: 700
      })
    });

    const data = await openaiResponse.json();
    if (!openaiResponse.ok) {
      console.error('OpenAI API error', openaiResponse.status, data?.error?.message || data);
      return res.status(502).json({ error: data?.error?.message || 'Atlas could not reach the AI service.' });
    }

    const reply = getText(data);
    if (!reply) return res.status(502).json({ error: 'Atlas received an empty AI response.' });

    return res.status(200).json({ reply, source: 'openai', model: data.model || process.env.OPENAI_MODEL || 'gpt-4.1-mini' });
  } catch (error) {
    console.error('Atlas chat error', error);
    return res.status(500).json({ error: 'Atlas encountered a temporary connection error.' });
  }
}
