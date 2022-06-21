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

projectRoutes.get('/', authMiddleware, async (req, res, next) => {
	const userId = req.userId

	try {
		const projects = await projectRepository.findByUserId({ userId })

    return res.status(200).send(projects)
  } catch (e) {
    res.status(e.statusCode).send(e.message)
  }
})

projectRoutes.delete('/:id', authMiddleware, async (req, res, next) => {
	const userId = req.userId
	const id = req.params.id 

	try {
		await projectRepository.deleteById({ id, userId })

    return res.status(204)
  } catch (e) {
    res.status(e.statusCode).send(e.message)
  }
})

projectRoutes.put('/:id', authMiddleware, async (req, res, next) => {
	const userId = req.userId
	const id = req.params.id
	const { projectName } = req.body

	try {
		const project = await projectRepository.updateById({ id, projectName, userId })

    return res.status(201).send(project)
  } catch (e) {
    res.status(e.statusCode).send(e.message)
  }
})

module.exports = projectRoutes