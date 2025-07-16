const companyRouter = require('express').Router()
const Company = require('../models/company')

companyRouter.get('/', (request, response) => {
    Company.find({}).then(companies => {
        response.json(companies)
    })
})

companyRouter.get('/:id', (request, response, next) => {
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

companyRouter.post('/', (request, response) => {
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

module.exports = companyRouter