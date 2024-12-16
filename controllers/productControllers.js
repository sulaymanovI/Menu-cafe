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
		const products = await Product.find()
		return res.status(200).json({ data: products })
	} catch (error) {
		return res.status(500).json({ message: error.message })
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

const SearchProduct = async (req, res) => {
	try {
		let data = await Product.find({
			$or: [
				{ name: { $regex: req.params.key } },
				// { category: { $regex: req.params.key } },
				// { category: { $regex: req.params.key } }
				// { description: { $regex: req.params.key } },
			],
		})
		return res.status(200).json({ data })
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
	SearchProduct,
}
