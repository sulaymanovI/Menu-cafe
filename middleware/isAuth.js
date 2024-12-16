const jwt = require('jsonwebtoken')

const sendErrorResponse = (res, statusCode, message) => {
	return res.status(statusCode).json({ message })
}

const isAuth = (req, res, next) => {
	const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
	if (!token) return sendErrorResponse(res, 409, 'Access not allowed!⛔️')
	const { adminId } = jwt.verify(token, process.env.JWT_SECRET)
	req.userInfo = { adminId }
	// console.log(token)
	next()
}

module.exports = isAuth
