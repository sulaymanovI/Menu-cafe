const mongoose = require('mongoose')
const category_name = require('../models/categoryModel')
const ProductSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
		description: { type: String, required: true },
		price: { type: Number, required: true, default: 0 },
		image: { type: String, required: true },
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Product', ProductSchema)
