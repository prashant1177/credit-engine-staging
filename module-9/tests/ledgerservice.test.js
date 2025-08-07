const { addLedgerEntry, getLedger } = require('../services/ledgerService');

test('should add and retrieve ledger entries', () => {
  addLedgerEntry('user1', 'tech-module', 10);
  const entries = getLedger();
  expect(entries.length).toBeGreaterThan(0);
  expect(entries[0].userId).toBe('user1');
});
