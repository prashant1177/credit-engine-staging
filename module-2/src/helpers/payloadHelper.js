const Joi = require('joi');

// Joi schemas for validation
const userSignupPayload = Joi.object({
	name: Joi.string().min(3).required(),
	email: Joi.string().email().required(),
	role: Joi.string().optional(),
	password: Joi.string().min(6).required(),
	age: Joi.number().integer().optional()
});

const userLoginPayload = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required()
});

const creditSchema = Joi.object({
	userId: Joi.string().required(),
	actionType: Joi.string().required(),
	amount: Joi.number().required(),
	metadata: Joi.object().optional()
});

module.exports = { userSignupPayload, userLoginPayload, creditSchema };
