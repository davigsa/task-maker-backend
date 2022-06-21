require('dotenv/config')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const sequelize = require('./config/sequelize')
const routes = require('./routes')
const errorHandler = require('./middleware/error.middleware')
const notFoundHandler = require('./middleware/not-found.middleware')

if (!process.env.PORT) {
  process.exit(1)
}

sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.')
})
.catch(error => {
  console.error('Unable to connect to the database:', error)
})

const PORT = parseInt(process.env.PORT, 10)
const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use('/api/', routes)

// Threating Errors
app.use(errorHandler)
app.use(notFoundHandler)

sequelize.sync()
.then(() => {
  app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`)
  })
})
.catch(error => {
  console.error('Error', error)
})