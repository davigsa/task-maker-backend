const { DataTypes } = require('sequelize')

const sequelize = require('../../config/sequelize')
const User = require('./User')

const Project = sequelize.define('Project', {
	id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
	projectName: {
		type: DataTypes.STRING,
		allowNull: false,
		field: 'project_name'
	}
}, {
	
})

Project.belongsTo(User, {
	constraints: true,
	foreignKey: 'userId'
})

module.exports = Project