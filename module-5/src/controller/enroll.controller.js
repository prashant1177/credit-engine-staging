import userCredits from "../memmory/userCredits.js";
import calculateCredits from "../services/creditCalculator.js";
import validatePayload from "../utils/validator.js";
export function enRoll(req, res) {

    try {
        const payload = req.body
        const validation = validatePayload(payload)
        if (!validation.valid) {
            return res.status(400).json({ error: validation.message })
        }
        const totalCredits = calculateCredits(10, payload.spend || 0);
        userCredits[payload.userId] = {
            userId: payload.userId,
            credits: totalCredits,
            actionType: payload.actionType,
            referrerId: payload.referrerId || null,
        };
        return res.status(200).json({
            message: 'User enrolled successfully',
            ...userCredits[payload.userId]
        });
    } catch (error) {
        console.error("error in enRoll controller", error)
        res.status(500).json({ message: "Internal server Error" })
    }

}