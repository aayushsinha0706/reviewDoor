const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
    company: {type: String, required: true},
    location: {type: String, required: true},
    date: {type: Date, required: true},
    city: {type: String, required: true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
})

companySchema.set('toJSON', {
    transform: (document, returnedObject) =>{
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Company', companySchema)