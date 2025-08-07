function validatePayload(payload) {
  const { userId, actionType, referrerId, spend } = payload;
  if (!userId || typeof userId !== 'string') return false;
  if (!actionType || typeof actionType !== 'string') return false;
  if (referrerId && typeof referrerId !== 'string') return false;
  if (spend && typeof spend !== 'number') return false;
  return true;
}

module.exports = { validatePayload };