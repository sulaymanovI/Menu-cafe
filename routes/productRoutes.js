const express = require('express')
const {
	AddNewProduct,
	GetProducts,
	GetOneProduct,
	UpdateProduct,
	DeleteProduct,
	SearchProduct
} = require('../controllers/productControllers')
const isAuth = require('../middleware/isAuth')
const router = express.Router()

router.post('/create', isAuth, AddNewProduct)
router.get('/', GetProducts)
router.get('/:id', GetOneProduct)
router.put('/:id', isAuth, UpdateProduct)
router.delete('/:id', isAuth, DeleteProduct)
router.get('/search/:key', SearchProduct)

module.exports = router
