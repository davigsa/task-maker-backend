const Project = require('../models/Project')
const HttpException = require('../../common/http-exception')

const projectRepository = {
	create,
	findByUserId,
	deleteById,
	updateById
}

async function create({ projectName, userId }) {
	const newProject = new Project({ projectName, userId })

	return newProject.save()
}

async function findByUserId({ userId }) {
	const projects = await Project.findAll({ where: { userId }})

	return projects
}

async function deleteById({ id, userId }) {
	const project = await Project.findOne({ where: { id }})

	if (!project) throw new HttpException(404, 'Project not found')
	if (project.userId !== userId) throw new HttpException(401, 'Unauthorized')

	await Project.destroy({ where: { id }})
}

async function updateById({ id, projectName, userId }) {
	const project = await Project.findOne({ where: { id }})

	if (!project) throw new HttpException(404, 'Project not found')
	if (project.userId !== userId) throw new HttpException(401, 'Unauthorized')

	await Project.update({ projectName }, { where: { id }})
}

module.exports = projectRepository