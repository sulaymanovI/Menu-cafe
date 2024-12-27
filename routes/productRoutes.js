const express = require('express')
const {
	AddNewProduct,
	GetProducts,
	GetOneProduct,
	UpdateProduct,
	DeleteProduct,
	likeFunc,
} = require('../controllers/productControllers')
const isAuth = require('../middleware/isAuth')
const router = express.Router()

router.post('/create', isAuth, AddNewProduct)
router.get('/', GetProducts)
router.get('/:id', GetOneProduct)
router.put('/:id', isAuth, UpdateProduct)
router.delete('/:id', isAuth, DeleteProduct)
router.post('/like/:id', likeFunc)

module.exports = router
