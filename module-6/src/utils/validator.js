// src/utils/validator.js

function validatePayload(payload = {}) {
    const errors = [];
    const { userId, actionType, referrerId, spend } = payload;
  
    if (typeof userId !== 'string' || userId.trim() === '') {
      errors.push('Invalid or missing userId');
    }
  
    if (typeof actionType !== 'string' || actionType.trim() === '') {
      errors.push('Invalid or missing actionType');
    }
  
    if (referrerId !== undefined && typeof referrerId !== 'string') {
      errors.push('referrerId must be a string');
    }
  
    if (spend !== undefined && (typeof spend !== 'number' || spend < 0)) {
      errors.push('spend must be a non-negative number');
    }
  
    return { valid: errors.length === 0, errors };
  }
  
  module.exports = { validatePayload };
  