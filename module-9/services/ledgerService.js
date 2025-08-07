const ledger = [];

function addLedgerEntry(userId, action, credits) {
  ledger.push({ userId, action, credits, timestamp: new Date().toISOString() });
}

function getLedger() {
  return ledger;
}

module.exports = { addLedgerEntry, getLedger };
