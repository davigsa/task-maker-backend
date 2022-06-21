const Project = require('../models/Project')
const Task = require('../models/Task')
const HttpException = require('../../common/http-exception')

const projectRepository = {
	create,
	findByUserId,
	findById,
	deleteById,
	updateById
}

async function create({ projectName, userId }) {
	const newProject = new Project({ projectName, userId })

	return newProject.save()
}

async function findByUserId({ userId }) {
	const projects = await Project.findAll({ where: { userId }, include: Task })

	if (!projects) throw new HttpException(404, 'Projects not found')

	return projects
}

async function findById({ id }) {
	const project = await Project.findByPk(id, { include: Task })

	if (!project) throw new HttpException(404, 'Project not found')

	return project
}

async function deleteById({ id, userId }) {
	const project = await Project.findByPk(id)

	if (!project) throw new HttpException(404, 'Project not found')
	if (project.userId !== userId) throw new HttpException(401, 'Unauthorized')

	await Project.destroy({ where: { id }})
}

async function updateById({ id, projectName, userId }) {
	const project = await Project.findByPk(id)

	if (!project) throw new HttpException(404, 'Project not found')
	if (project.userId !== userId) throw new HttpException(401, 'Unauthorized')

	await Project.update({ projectName }, { where: { id }})
}

module.exports = projectRepository