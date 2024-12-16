const Category = require('../models/categoryModel')

const AddNewCategory = async (req, res) => {
	try {
		const category = await Category.create(req.body)
		return res.status(200).json(category)
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

const GetCategories = async (req, res) => {
	try {
		const categories = await Category.find()
		return res.status(200).json({ data: categories })
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

const GetOneCategory = async (req, res) => {
	try {
		const { id } = req.params
		const category = await Category.findById(id)
		return res.status(200).json(category)
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

const UpdateCategory = async (req, res) => {
	try {
		const { id } = req.params
		const category = await Category.findByIdAndUpdate(id, req.body)

		if (!category) {
			return res.status(404).json({ message: 'Bunday kategoriya mavjud emas' })
		}
		const updatedCategory = await Category.findById(id)

		return res.status(200).json(updatedCategory)
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

const DeleteCategory = async (req, res) => {
	try {
		const { id } = req.params
		const category = await Category.findByIdAndDelete(id)
		if (!category) {
			return res.status(404).json({ message: 'Bunday kategoriya mavjud emas' })
		}
		return res
			.status(200)
			.json({ message: "Kategoriya muvaffaqiyatli o'chirildi" })
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

module.exports = {
	AddNewCategory,
	GetCategories,
	GetOneCategory,
	UpdateCategory,
	DeleteCategory,
}
