const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const HttpException = require('../../common/http-exception')

const authRepository = {
    create: create
}

async function create ({ username, password }) {
	const user = await User.findOne({ where: { username } })

	if (!user) throw new HttpException(401, 'User not exists')

	const isValidPassword = bcrypt.compare(password, user.password)

	if (!isValidPassword) throw new HttpException(401, 'Wrong password')

	const token = jwt.sign({ id: user.id }, `${process.env.JWT_SECRET}`, { expiresIn: '1d' })

	return { user, token }
}

module.exports = authRepository