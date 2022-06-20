require('dotenv/config')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const routes = require('./routes')
const errorHandler = require('./middleware/error.middleware')
const notFoundHandler = require('./middleware/not-found.middleware')

if (!process.env.PORT) {
  process.exit(1)
}

const PORT = parseInt(process.env.PORT, 10)
const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use('/api/', routes)

// Threating Errors
app.use(errorHandler)
app.use(notFoundHandler)

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`)
})