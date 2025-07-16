const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('companies',{
        company: 1, 
        location: 1, 
        city: 1, 
        date: 1 
    })
    .populate('reviews',{
        name: 1, 
        review: 1, 
        rating: 1, 
        createdAt: 1,
        company: 1 
    })
  response.json(users)
})
usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name, 
        passwordHash,
        companies: [],
        reviews: []
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

module.exports = usersRouter