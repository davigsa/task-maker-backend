const Router = require('express')

const authRepository = require('../app/repositories/AuthRepository')

const authRoutes = Router()

authRoutes.post('/', async (req, res, next) => {
	const { username, password } = req.body

	try {
		const data = await authRepository.create({ username, password })

		res.status(200).send(data)
	} catch (e) {
		res.status(e.statusCode).send(e.message)
	}
})

module.exports = authRoutes
  