const express = require('express')
const {
	AddNewCategory,
	GetCategories,
	GetOneCategory,
	UpdateCategory,
	DeleteCategory,
} = require('../controllers/categoryControllers')
const isAuth = require('../middleware/isAuth')
const router = express.Router()

router.post('/create', isAuth, AddNewCategory)
router.get('/', GetCategories)
router.get('/:id', GetOneCategory)
router.put('/:id', isAuth, UpdateCategory)
router.delete('/:id', isAuth, DeleteCategory)

module.exports = router
