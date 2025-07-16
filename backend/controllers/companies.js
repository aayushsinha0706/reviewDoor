const companyRouter = require('express').Router()
const Company = require('../models/company')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

companyRouter.get('/', async (request, response) => {
    try {
        const companies = await Company
            .find({})
            .populate('user',{username: 1, name: 1})
            .populate('reviews', {
                name: 1, 
                review: 1, 
                rating: 1, 
                createdAt: 1,
                user: 1
            })
        response.json(companies)
    } catch (error) {
        response.status(500).json({ error: 'Internal server error' })
    }
})

companyRouter.get('/:id', async (request, response, next) => {
    try {
        const id = request.params.id
        const company = await Company
            .findById(id)
            .populate('user',{username: 1, name: 1})
            .populate('reviews', {
                name: 1, 
                review: 1, 
                rating: 1, 
                createdAt: 1,
                user: 1
            })
        
        if (company) {
            response.json(company)
        } else {
            response.status(404).end()
        }
    } catch (error) {
        next(error)
    }
})

/*
const getToken = (request) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')){
        return authorization.replace('Bearer ','')
    }
    return null
}*/

companyRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body
        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if (!decodedToken.id){
            return response.status(401).json({error: 'token invalid'})
        }

        const user = await User.findById(decodedToken.id)

        if (!body.company) {
            return response.status(400).json({error: 'Company name is required'})
        }

        const company = new Company({
            ...body,
            user: user.id,
            reviews: []
        })
        const savedCompany = await company.save()

        user.companies = user.companies.concat(savedCompany._id)
        await user.save()

        const populatedCompany = await Company
            .findById(savedCompany._id)
            .populate('user', { username: 1, name: 1 })
    
        response.json(populatedCompany)
    } catch (error) {
        next(error)
    }
})

module.exports = companyRouter