const Task = require('../models/Task')
const Project = require('../models/Project')
const HttpException = require('../../common/http-exception')

const taskRepository = {
	create,
	deleteById,
	updateById
}

async function create({ description, priority, completed, projectId }) {
	const newTask = new Task({ description, priority, completed, projectId })

	return newTask.save()
}

async function deleteById({ id }) {
	const task = await Task.findByPk(id)

	if (!task) throw new HttpException(404, 'Task not found')

	await Task.destroy({ where: { id }})
}

async function updateById({ id, description, priority, completed }) {
	const task = await Task.findByPk(id)

	if (!task) throw new HttpException(404, 'Task not found')

	return await Task.update({ description, priority, completed }, { where: { id }})
}

module.exports = taskRepository