const { Router } = require('express')

const userRoutes = require('./user.routes')
const authRoutes = require('./auth.routes')

const routes = Router()

routes.use('/users', userRoutes)
routes.use('/auth', authRoutes)

module.exports = routes