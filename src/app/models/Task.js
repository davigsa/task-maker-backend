const { DataTypes } = require('sequelize')

const sequelize = require('../../config/sequelize')
const Project = require('./Project')

const Task = sequelize.define('Task', {
	id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
  },
	description: {
		type: DataTypes.STRING,
		allowNull: false
	},
    priority: {
        type: DataTypes.STRING,
        allowNull: false
    },
    completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
	
})

Task.belongsTo(Project, {
	constraints: true,
	foreignKey: 'projectId'
})

Project.hasMany(Task, {
	foreignKey: 'projectId'
})

module.exports = Task