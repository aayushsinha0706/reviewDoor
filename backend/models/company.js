const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
    company: {type: String, required: true},
    location: String,
    date: Date,
    city: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

companySchema.set('toJSON', {
    transform: (document, returnedObject) =>{
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Company', companySchema)