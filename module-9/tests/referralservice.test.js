const { processReferral } = require('../services/referralService');

test('should add credits to referrer', () => {
  const creditsDB = {};
  processReferral('user123', creditsDB);
  expect(creditsDB['user123'].thankYouCredits).toBe(20);
});
