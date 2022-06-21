const Router = require('express')

const userRepository = require('../app/repositories/UserRepository')

const userRoutes = Router()

userRoutes.post('/', async (req, res, next) => {
	const { firstName, lastName, username, password } = req.body

	try {
		const user = await userRepository.create({ firstName, lastName, username, password })

    return res.status(201).send(user)
  } catch (e) {
    res.status(e.statusCode).send(e.message)
  }
})

module.exports = userRoutes