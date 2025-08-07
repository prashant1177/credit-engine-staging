function calculateCredits(spend = 0) {
  const baseCredits = 10;
  const multiplier = spend > 0 ? spend * 0.1 : 0;
  return baseCredits + multiplier;
}

module.exports = { calculateCredits };