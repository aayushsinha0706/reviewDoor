const mongoose = require("mongoose")


if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://aayushsinha0706:${password}@reviewdoor.suibnjj.mongodb.net/?retryWrites=true&w=majority&appName=reviewdoor`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const companySchema = new mongoose.Schema({
    company: String,
    location: String,
    date: Date,
    city: String
})

const Company = mongoose.model('Company', companySchema)

const company = new Company({
    company: 'Accenture Bengaluru Innovation Hub',
    location: 'Building 14, Pritech Park, Pritech Rd, Bellandur, Bengaluru, Karnataka 560103',
    date: '2017-07-17',
    city: 'Bengaluru'
})

company.save().then(result => {
    console.log('company saved!')
    mongoose.connection.close()
})