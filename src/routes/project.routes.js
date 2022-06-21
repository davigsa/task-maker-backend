const Router = require('express')

const projectRepository = require('../app/repositories/ProjectRepository')
const authMiddleware = require('../middleware/auth.middleware')

const projectRoutes = Router()

projectRoutes.post('/', authMiddleware, async (req, res, next) => {
	const { projectName } = req.body
	const userId = req.userId

	try {
		const project = await projectRepository.create({ projectName, userId })
		
    return res.status(201).send(project)
  } catch (e) {
    res.status(e.statusCode).send(e.message)
  }
})

module.exports = projectRoutes