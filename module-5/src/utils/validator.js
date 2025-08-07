

function validatePayload(payload){
    if (!payload.userId || typeof payload.userId !== 'string') {
    return { valid: false, message: 'Invalid or missing userId' };
  }
  if (!payload.actionType || typeof payload.actionType !== 'string') {
    return { valid: false, message: 'Invalid or missing actionType' };
  }
  if (payload.referrerId && typeof payload.referrerId !== 'string') {
    return { valid: false, message: 'Invalid referrerId' };
  }
  if (payload.spend && typeof payload.spend !== 'number') {
    return { valid: false, message: 'Spend must be a number' };
  }
  return { valid: true };
}
export default validatePayload