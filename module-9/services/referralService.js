function processReferral(referrerId, creditsDB) {
  if (!creditsDB[referrerId]) {
    creditsDB[referrerId] = { thankYouCredits: 0 };
  }

  creditsDB[referrerId].thankYouCredits += 20;
  return creditsDB[referrerId];
}

module.exports = { processReferral };
