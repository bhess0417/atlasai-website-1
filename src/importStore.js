const KEY = 'atlas-import-history';
const TX_KEY = 'atlas-transactions';

export function getImportHistory() {
  return JSON.parse(localStorage.getItem(KEY) || '[]');
}

export function saveImport(record, transactions) {
  const history = getImportHistory();
  history.unshift(record);
  localStorage.setItem(KEY, JSON.stringify(history.slice(0, 20)));
  const current = JSON.parse(localStorage.getItem(TX_KEY) || '[]');
  localStorage.setItem(TX_KEY, JSON.stringify([...transactions, ...current].slice(0, 5000)));
}

export function removeImport(id) {
  localStorage.setItem(KEY, JSON.stringify(getImportHistory().filter(item => item.id !== id)));
}

export function clearImports() {
  localStorage.removeItem(KEY);
  localStorage.removeItem(TX_KEY);
}
