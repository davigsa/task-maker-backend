const { Router } = require('express')

const routes = Router()

routes.get('/', async (req, res, next) => {
    res.status(200).send('Ok')
})

module.exports = routes