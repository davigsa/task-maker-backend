const User = require('../models/User')
const HttpException = require('../../common/http-exception')

const userRepository = {
    create: create
}

async function create ({ firstName, lastName, username, password }) {
    const userExists = await User.findOne({ where: { username: username } })

    if (userExists) {
    	throw new HttpException(409, 'User already exists')
    }

		const newUser = new User({firstName, lastName, username, password})
		return newUser.save()
}

module.exports = userRepository