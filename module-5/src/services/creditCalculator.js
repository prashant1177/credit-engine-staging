

function calculateCredits(baseCredits, spend = 0) {
    const multiplier = 0.1; // 10% of spend as bonus credits
    const bonusCredits = spend * multiplier;
    return baseCredits + bonusCredits;
}
export default calculateCredits