// src/services/creditCalculator.js

function calculateCredits(baseCredits, spendAmount, multiplier = 0.1) {
    if (typeof baseCredits !== 'number' || typeof spendAmount !== 'number') {
      throw new Error('Invalid input');
    }
  
    const additional = spendAmount * multiplier;
    return baseCredits + additional;
  }
  
  module.exports = { calculateCredits };
  