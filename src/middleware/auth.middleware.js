const jwt = require('jsonwebtoken')

const HttpException = require('../common/http-exception')

const authMiddleware = (
    request,
    response,
    next
  ) => {
	const { authorization } = req.headers

	if (!authorization) throw new HttpException(401, 'Not authorized')

	const tokenJwt = authorization.replace('Bearer', '').trim()

	try {
		const data = jwt.verify(tokenJwt, `${process.env.JWT_SECRET}`)
		const { id } = data

		req.userId = id

		return next()
	} catch {
		throw new HttpException(401, 'Not authorized')
	}
}
  
  module.exports = authMiddleware