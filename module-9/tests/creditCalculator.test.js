const { calculateCredits } = require('../services/creditCalculator');

test('should return correct credits for known actions', () => {
  expect(calculateCredits('tech-module')).toBe(10);
  expect(calculateCredits('referral')).toBe(20);
});

test('should return 0 for unknown action', () => {
  expect(calculateCredits('unknown')).toBe(0);
});
