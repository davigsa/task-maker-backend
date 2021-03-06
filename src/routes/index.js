const { Router } = require('express')

const userRoutes = require('./user.routes')
const authRoutes = require('./auth.routes')
const projectRoutes = require('./project.routes')
const taskRoutes = require('./task.routes')

const routes = Router()

routes.use('/users', userRoutes)
routes.use('/auth', authRoutes)
routes.use('/projects', projectRoutes)
routes.use('/tasks', taskRoutes)

module.exports = routes