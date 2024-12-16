const Product = require('../models/productModel')

const AddNewProduct = async (req, res) => {
	try {
		const product = await Product.create(req.body)
		return res.status(200).json(product)
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

const GetProducts = async (req, res) => {
	try {
		const { name, category } = req.query
		const nameRegExp = new RegExp(name, 'i')
		const categoryRegExp = new RegExp(category, 'i')

		const total = await Product.countDocuments({
			name: nameRegExp,
			category: categoryRegExp,
		})

		const products = await Product.find({
			name: nameRegExp,
			category: categoryRegExp,
		})

		return res.status(200).json({ data: products, total })
	} catch (error) {
		return sendErrorResponse(res, 500, 'Internal server error.')
	}
}

const GetOneProduct = async (req, res) => {
	try {
		const { id } = req.params
		const product = await Product.findById(id)
		return res.status(200).json(product)
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

const UpdateProduct = async (req, res) => {
	try {
		const { id } = req.params

		const product = await Product.findByIdAndUpdate(id, req.body)

		if (!product) {
			return res.status(404).json({ message: 'Bunday mahsulot mavjud emas' })
		}
		const updatedProduct = await Product.findById(id)

		return res.status(200).json(updatedProduct)
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

const DeleteProduct = async (req, res) => {
	try {
		const { id } = req.params

		const product = await Product.findByIdAndDelete(id)

		if (!product) {
			return res.status(404).json({ message: 'Bunday mahsulot mavjud emas' })
		}

		return res
			.status(200)
			.json({ message: "Mahsulot muvafaqqiyatli o'chirildi" })
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

module.exports = {
	AddNewProduct,
	GetProducts,
	GetOneProduct,
	UpdateProduct,
	DeleteProduct,
}
