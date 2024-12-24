const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema(
	{
		fullname: { type: String, required: true, default: 'unknown' },
		phoneNumber: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Admin', AdminSchema)
