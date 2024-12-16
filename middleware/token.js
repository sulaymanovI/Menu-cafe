const jwt = require('jsonwebtoken')
require('dotenv').config();

const generateJWTToken = adminId => {
	const accessToken = jwt.sign({ adminId }, process.env.JWT_SECRET, {
		expiresIn: '30d'
	})
	return accessToken
}

module.exports =  generateJWTToken ;
