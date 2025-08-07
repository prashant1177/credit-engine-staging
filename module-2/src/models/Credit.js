const mongoose = require('mongoose');
const { ActionTypes } = require('./ActionTypes');

const { Schema, model } = mongoose;

const CreditSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			index: true
		},
		actionType: {
			type: String,
			required: true,
			enum: Object.values(ActionTypes)
		},
		amount: {
			type: Number,
			required: true,
			min: 0
		},
		metadata: {
			type: Schema.Types.Mixed,
			default: {}
		},
		timestamp: {
			type: Date,
			default: Date.now,
			index: true
		}
	},
	{
		collection: 'credits',
		timestamps: false,
		versionKey: false
	}
);

const Credit = model('Credit', CreditSchema);

module.exports = { Credit };
