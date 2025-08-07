const { collectLog } = require('../config');
const { creditSchema } = require('../helpers');
const { ActionTypes, User } = require('../models');

const issueCredit = async (req, res) => {
	try {
		const { userId, actionType, amount, metadata } = req.body;

		const { error } = creditSchema.validate(req.body);
		if (error) {
			return res.status(400).json({ error: error.details[0].message });
		}

		if (!Object.values(ActionTypes).includes(actionType)) {
			return res.status(400).json({ error: 'Invalid actionType provided.' });
		}

		if (typeof amount !== 'number' || amount <= 0) {
			return res.status(400).json({ error: 'Amount must be a positive number.' });
		}

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: 'User not found.' });
		}
		const { creditService } = require('../services');

		const newCredit = await creditService.issueCreditservice(userId, actionType, amount, metadata);

		return res.status(201).json({ message: 'Credit issued successfully', credit: newCredit });
	} catch (error) {
		return res.status(500).json({ error: 'Failed to issue credit due to an internal server error. ' + error.message });
	}
};

const getUserCredits = async (req, res) => {
	try {
		const userId = req.params.userId;
		const { creditService } = require('../services'); // lazy loading service to avoid circular dependency issues

		const credits = await creditService.getUserCreditservice(userId);

		if (!credits || credits.length === 0) {
            return res.status(200).json({ message: 'No credit transactions found for this user.', totalCredits:0 });
		}
        const totalCredits = credits.reduce((acc, credit) => acc + credit.amount, 0);
        if (totalCredits <= 0) {
            return res.status(200).json({ message: 'No credits available for this user.', totalCredits:0 });
        }
		return res.status(200).json({ userId,totalCredits, credits });
	} catch (error) {
        collectLog.error('Error retrieving user credits:', error);
		return res.status(500).json({ error: 'Failed to retrieve user credits. ' });
	}
};

exports.CreditController = {
	issueCredit,
	getUserCredits
};
