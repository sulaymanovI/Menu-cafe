const express = require('express')
const mongoose = require('mongoose')
const ProductRoutes = require('./routes/productRoutes')
const CategoryRoutes = require('./routes/categoryRoutes')
const AdminRoutes = require('./routes/adminRoutes')
const isAuth = require('./middleware/isAuth')
const cors = require('cors')
const uploadFile = require('./middleware/uploadFile')

const app = express()
require('dotenv').config()

app.post("/api/upload", isAuth, (req, res) => uploadFile(req, res));
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'));
app.use('/api/products', ProductRoutes)
app.use('/api/category', CategoryRoutes)
app.use('/api/admin', isAuth, AdminRoutes)

async function RunApp() {
	try {
		await mongoose.connect(process.env.MONGO_URI)
		app.listen(5000, () => {
			console.log('Server is running on port 5000')
		})
	} catch (error) {
		console.log(error.message)
	}
}

RunApp()
