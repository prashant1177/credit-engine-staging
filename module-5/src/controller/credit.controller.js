
import userCredits from "../memmory/userCredits.js";
export function creditUser(req, res) {

    try {
        const { userId } = req.params;

        const userData = userCredits[userId];

        if (!userData) {
            return res.status(404).json({ error: 'User not found or not enrolled yet' });
        }

        return res.status(200).json(userData);
    } catch (error) {

        console.error("Error in the creditUser controller",error)
        res.status(500).json({message:"Internal server error"})
    }

}