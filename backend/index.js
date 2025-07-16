const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const Company = require('./models/company')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
} 

const errorHandler = (error, request, response, next) => {

  console.error(error.message)
  
  if(error.name === 'CastError') {
    return response.status(400).json({ error: 'Invalid id' })
  }
  else if (error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

const unknownEndpoint = (request,response,next) => {
  response.status(404).json({ error: 'Unknown endpoint' })
}

app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)
app.use(cors())


app.get('/',(request, response) => {
    response.send(
        '<h1> Review Door Home Page</h1>'
    )
})

app.get('/api/companies', (request, response) => {
    Company.find({}).then(companies => {
        response.json(companies)
    })
})

app.get('/api/companies/:id', (request, response, next) => {
    const id = request.params.id
    Company
        .findById(id)
        .then(company => {
            if (company) {
                response.json(company)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.post('/api/companies', (request, response) => {
    const body = request.body

    if (!body.company) {
        return response.status(400).json({error: 'Company name is required'})
    }

    const company = new Company(body)
    company
        .save()
        .then(savedCompany => response.json(savedCompany))
        .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


