const express = require('express')
const app = express()

const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./utils/config')

const companyRouter = require('./controllers/companies')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const reviewsRouter = require('./controllers/review')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

mongoose.set('strictQuery', false)
logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/companies',companyRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/reviews', reviewsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app