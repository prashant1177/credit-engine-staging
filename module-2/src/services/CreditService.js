const { Credit } = require('../models/Credit');
const { ActionTypes } = require('../models');

// implemented bonus for different - different action types
const issueCreditservice = async (userId, actionType, amount, metadata) => {
	try {
		let finalAmount = amount;
		switch (actionType) {
			case ActionTypes.REFERRAL:
				finalAmount = amount * 1.5;
				break;
			case ActionTypes.COFFEE_BUY:
				finalAmount = amount * 0.1;
				break;
			case ActionTypes.TECH_MODULE:
				finalAmount = amount;
				break;
			case ActionTypes.SOCIAL_POST:
				finalAmount = amount;
				break;
			case ActionTypes.SPEND_MULTIPLIER:
				finalAmount = amount * 2;
				break;
			case ActionTypes.EVENT_ATTENDANCE:
				finalAmount = amount * 1.2;
				break;
			case ActionTypes.SURVEY_COMPLETION:
				finalAmount = amount * 1.3;
				break;
			case ActionTypes.CONTENT_CONTRIBUTION:
				finalAmount = amount * 1.4;
				break;
			default:
				finalAmount = amount;
		}

		const newCredit = new Credit({
			userId,
			actionType,
			amount: finalAmount,
			metadata: metadata || {}
		});

		await newCredit.save();
		return newCredit;
	} catch (error) {
		throw new Error('Failed to issue credit. ' + error?.message);
	}
};

const getUserCreditservice = async (userId) => {
	try {
		const credits = await Credit.find({ userId }).sort({ timestamp: -1 }).populate({ path: 'userId', select: 'name email' });
		return credits;
	} catch (error) {
		throw new Error('Failed to retrieve user credits. ' + error?.message);
	}
};

exports.creditService = {
	issueCreditservice,
	getUserCreditservice
};
