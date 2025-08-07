function calculateCredits(action) {
  const multipliers = {
    'tech-module': 10,
    'social-post': 5,
    'referral': 20,
    'coffee-wall': 2,
  };

  return multipliers[action] || 0;
}

module.exports = { calculateCredits };
