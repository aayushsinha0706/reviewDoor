const reviewsRouter = require('express').Router()
const Review = require('../models/review')
const Company = require('../models/company')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

reviewsRouter.get('/company/:id', async (request, response, next) => {
    try {
        const reviews = await Review
            .find({company: request.params.id})
            .populate('user', {username: 1, name: 1})
            .populate('company',{company: 1})
            .sort({createdAt: -1})
        
        response.json(reviews)
    } catch (error) {
        next(error)
    }
})

reviewsRouter.post('/company/:id', async (request, response, next) => {
    const { name, review, rating } = request.body
    const token = request.token

    if (!token) {
        return response.status(401).json({ error: 'token required' })
    }

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)

        if(!decodedToken.id){
            return response.status(401).json({ error: 'token invalid' })
        }

        const user = await User.findById(decodedToken.id)
        const company = await Company.findById(request.params.id)

        if (!company){
            return response.status(404).json({ error: 'company not found' })
        }

        const existingReview = await Review.findOne({
            user: user._id,
            company: company._id
        })

        if (existingReview) {
            return response.status(400).json({
                 error: 'you have already reviewed this company' 
            })
        }

        const reviewObject = {
            name,
            review,
            rating,
            user: user._id,
            company: company._id
        }

        const newReview = new Review(reviewObject)
        const savedReview = await newReview.save()

        user.reviews = user.reviews.concat(savedReview._id)
        await user.save()

        company.reviews = company.reviews.concat(savedReview._id)
        await company.save()

        const populatedReview = await Review
            .findById(savedReview._id)
            .populate('user', { username: 1, name: 1 })
            .populate('company', {company: 1})
        response.status(201).json(populatedReview)
    } catch (error){
        next(error)
    }
})

module.exports = reviewsRouter