export function parseCsv(text) {
  const rows = [];
  let row = [], value = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i], next = text[i + 1];
    if (ch === '"' && quoted && next === '"') { value += '"'; i++; continue; }
    if (ch === '"') { quoted = !quoted; continue; }
    if (ch === ',' && !quoted) { row.push(value.trim()); value = ''; continue; }
    if ((ch === '\n' || ch === '\r') && !quoted) {
      if (ch === '\r' && next === '\n') i++;
      row.push(value.trim()); value = '';
      if (row.some(cell => cell !== '')) rows.push(row);
      row = [];
      continue;
    }
    value += ch;
  }
  row.push(value.trim());
  if (row.some(cell => cell !== '')) rows.push(row);
  if (rows.length < 2) return { headers: rows[0] || [], rows: [] };
  const headers = rows[0];
  return { headers, rows: rows.slice(1).map((cells, index) => Object.fromEntries(headers.map((h, i) => [h || `Column ${i+1}`, cells[i] ?? '']))) };
}

export function detectMapping(headers) {
  const rules = {
    date: ['date','posted date','transaction date'],
    description: ['description','memo','details','transaction'],
    vendor: ['vendor','merchant','payee','name'],
    amount: ['amount','debit','charge','withdrawal'],
    credit: ['credit','deposit'],
    category: ['category','type'],
    balance: ['balance','running balance']
  };
  const lower = headers.map(h => h.toLowerCase().trim());
  return Object.fromEntries(Object.entries(rules).map(([target, aliases]) => {
    const index = lower.findIndex(h => aliases.some(a => h === a || h.includes(a)));
    return [target, index >= 0 ? headers[index] : ''];
  }));
}

export function normalizeTransactions(rows, mapping) {
  return rows.map((row, index) => {
    const debit = toNumber(row[mapping.amount]);
    const credit = toNumber(row[mapping.credit]);
    const rawAmount = mapping.credit && credit ? credit : debit;
    const amount = mapping.credit && credit ? Math.abs(credit) : -Math.abs(debit || 0);
    const dateValue = row[mapping.date] || '';
    const date = normalizeDate(dateValue);
    const vendor = (row[mapping.vendor] || row[mapping.description] || 'Unknown vendor').trim();
    return {
      rowNumber: index + 2,
      date,
      dateRaw: dateValue,
      vendor,
      description: (row[mapping.description] || vendor).trim(),
      amount: Number.isFinite(amount) ? amount : 0,
      balance: toNumber(row[mapping.balance]),
      category: (row[mapping.category] || 'Uncategorized').trim(),
      valid: Boolean(date && vendor && rawAmount !== 0)
    };
  });
}

function toNumber(value = '') {
  const cleaned = String(value).replace(/[$,()\s]/g, '').replace(/^$/, '0');
  const number = Number(cleaned);
  return String(value).includes('(') ? -Math.abs(number) : number;
}

function normalizeDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().slice(0,10);
}

export function validateTransactions(transactions) {
  const fingerprints = new Set();
  let duplicates = 0;
  const enriched = transactions.map(tx => {
    const fp = `${tx.date}|${tx.vendor.toLowerCase()}|${tx.amount}`;
    const duplicate = fingerprints.has(fp);
    if (duplicate) duplicates++;
    fingerprints.add(fp);
    return { ...tx, duplicate };
  });
  return {
    rows: enriched,
    summary: {
      total: enriched.length,
      valid: enriched.filter(x => x.valid).length,
      invalid: enriched.filter(x => !x.valid).length,
      duplicates,
      debits: enriched.filter(x => x.amount < 0).reduce((sum,x) => sum + Math.abs(x.amount), 0),
      credits: enriched.filter(x => x.amount > 0).reduce((sum,x) => sum + x.amount, 0)
    }
  };
}
