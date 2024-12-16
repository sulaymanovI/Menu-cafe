const express = require('express')

const {
	CreateNewAdmin,
	LoginAdmin,
	UpdateAdminData,
	GetAdmins,
	DeleteAdmin,
} = require('../controllers/adminControllers')
const router = express.Router()

router.post('/create', CreateNewAdmin)
router.post('/login', LoginAdmin)
router.put('/:id', UpdateAdminData)
router.get('/get', GetAdmins)
router.delete('/:id', DeleteAdmin)

module.exports = router
