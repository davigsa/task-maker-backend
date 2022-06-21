const Project = require('../models/Project')
const HttpException = require('../../common/http-exception')

const projectRepository = {
    create: create
}

async function create ({ projectName, userId }) {
	const newProject = new Project({ projectName, userId })
	
	return newProject.save()
}

module.exports = projectRepository