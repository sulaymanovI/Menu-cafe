const Admin = require('../models/adminModel')
const bcrypt = require('bcrypt')
const generateJWTToken = require('../middleware/token')

const GetAdmins = async (req, res) => {
	try {
		const admins = await Admin.find({})
		return res.status(200).json({ data: admins })
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

const CreateNewAdmin = async (req, res) => {
	const { phoneNumber, password } = req.body
	try {
		const hashedPassword = await bcrypt.hash(password, 10)
		const admin = await Admin.create({ phoneNumber, password: hashedPassword })
		const token = generateJWTToken(admin._id)
		return res.status(200).json({
			message: `Admin muvaffaqiyatli qo'shildi`,
			token,
		})
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

const LoginAdmin = async (req, res) => {
	const { phoneNumber, password } = req.body
	try {
		const admin = await Admin.findOne({ phoneNumber })
		if (!admin) {
			return res.status(404).json({ message: 'Bunday admin mavjud emas!' })
		}
		const isPasswordEqual = await bcrypt.compare(password, admin.password)
		if (!isPasswordEqual) {
			return res.status(400).json({ message: 'Password hato!' })
		}
		const token = generateJWTToken(admin._id)

		return res
			.status(200)
			.json({ message: 'Siz muvaffaqiyatli tizimga kirdingiz!', token })
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

const UpdateAdminData = async (req, res) => {
	const userId = req.params.id
	const { phoneNumber, password } = req.body

	try {
		const user = await Admin.findById(userId)
		if (!user) {
			return res.status(409).json({ message: 'Admin topilmadi' })
		}
		let hashedPassword

		if (password) {
			hashedPassword = await bcrypt.hash(password, 10)
		}

		const updatedUser = await Admin.findByIdAndUpdate(
			userId,
			{
				phoneNumber,
				password: hashedPassword,
			},
			{ new: true }
		)

		return res.status(201).json({
			data: updatedUser,
			message: 'User has been updated successfully',
		})
	} catch (error) {
		return res.status(500).json({ message: error.message})
	}
}

const DeleteAdmin = async (req, res) => {
	try {
		const { id } = req.params
		const user = await Admin.findById(id)
		if (!user) {
			return res.status(409).json({ message: 'Admin topilmadi' })
		}
		await Admin.findByIdAndDelete(id)
		return res.status(200).json({ message: "Admin muvaffaqiyatli o'chirildi" })
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

module.exports = {
	CreateNewAdmin,
	LoginAdmin,
	UpdateAdminData,
	GetAdmins,
	DeleteAdmin,
}
