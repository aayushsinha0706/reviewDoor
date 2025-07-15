const express = require('express')
const app = express()

let companies = require('./sampledata')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
} 

app.use(express.json())
app.use(requestLogger)

app.get('/',(request, response) => {
    response.send(
        '<h1> Review Door Home Page</h1>'
    )
})

app.get('/api/companies', (request, response) => {
    response.json(companies)
})

app.get('/api/companies/:id', (request, response) => {
    const id = Number(request.params.id)
    const company = companies.find(c => c.id === id)
    if (!company) {
        return response.status(404).json({ error: 'Company not found' })
    }
    response.json(company)
})

const generateID = () => {
    const maxId = companies.length > 0
    ? Math.max(...companies.map(c => c.id))
    : 0
    return (maxId + 1)
}
app.post('/api/companies', (request, response) => {
    const body = request.body

    if (!body.company) {
        return response.status(400).json({error: 'Company name is required'})
    }

    const company = {
        id: generateID(),
        ...body
    }

    companies = companies.concat(company)
    response.json(company)
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


