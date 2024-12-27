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
		const { name, category, liked } = req.query

		const nameRegExp = name ? new RegExp(name, 'i') : undefined
		const categoryRegExp = category ? new RegExp(category, 'i') : undefined

		let likedFilter = {}
		if (liked !== undefined) {
			likedFilter.liked = liked === 'true'
		}

		const filter = {
			...(name && { name: nameRegExp }),
			...(category && { category: categoryRegExp }),
			...likedFilter,
		}

		const total = await Product.countDocuments(filter)

		const products = await Product.find(filter)

		return res.status(200).json({ data: products, total })
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

const likeFunc = async (req, res) => {
	try {
		const { id } = req.params
		const product = await Product.findById(id)
		if (!product) {
			return res.status(404).json({ message: 'Mahsulot topilmadi' })
		}
		product.liked = !product.liked
		await product.save()

		return res.status(200).json({ message: product })
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
	likeFunc,
}
