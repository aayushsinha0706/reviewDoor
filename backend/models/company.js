const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.error('Failed to connect to MongoDB', error.message)
    })

const companySchema = new mongoose.Schema({
    company: {type: String, required: true},
    location: String,
    date: Date,
    city: String
})

companySchema.set('toJSON', {
    transform: (document, returnedObject) =>{
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Company', companySchema)