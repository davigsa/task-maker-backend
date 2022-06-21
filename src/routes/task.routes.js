const Router = require('express')

const taskRepository = require('../app/repositories/TaskRepository')
const authMiddleware = require('../middleware/auth.middleware')

const taskRoutes = Router()

taskRoutes.post('/', authMiddleware, async (req, res, next) => {
	const { description, priority, completed, projectId } = req.body

	try {
		const task = await taskRepository.create({ description, priority, completed, projectId })

    return res.status(201).send(task)
  } catch (e) {
    res.status(e.statusCode).send(e.message)
  }
})

taskRoutes.delete('/:id', authMiddleware, async (req, res, next) => {
	const id = req.params.id 

	try {
		await taskRepository.deleteById({ id })

    return res.status(204).send()
  } catch (e) {
    res.status(e.statusCode).send(e.message)
  }
})

taskRoutes.put('/:id', authMiddleware, async (req, res, next) => {
	const id = req.params.id
	const { description, priority, completed } = req.body

	try {
		const task = await taskRepository.updateById({ id, description, priority, completed })

    return res.status(201).send(task)
  } catch (e) {
    res.status(e.statusCode).send(e.message)
  }
})

module.exports = taskRoutes