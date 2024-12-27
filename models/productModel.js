const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		category: { type: String, required: true },
		description: { type: String, required: true },
		price: { type: Number, required: true, default: 0 },
		image: { type: String, default: 'image.png' },
		liked: { type: Boolean, default: false },
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Product', ProductSchema)
