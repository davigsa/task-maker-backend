const { DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')

const sequelize = require('../../config/sequelize')

const User = sequelize.define('User', {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
  },
	firstName: {
		type: DataTypes.STRING,
		allowNull: false,
		field: 'first_name',
		validate: {
			notNull: {
			  msg: 'Please enter your name'
			}
		  }
	},
	lastName: {
		type: DataTypes.STRING,
		field: 'last_name'
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		validate: {
			notNull: {
			  msg: 'Please enter your username'
			}
		  }
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
		set(value) {
			this.setDataValue('password', bcrypt.hashSync(value, 8))
		}
	}
}, {
	
})

module.exports = User