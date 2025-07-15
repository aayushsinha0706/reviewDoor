import axios from 'axios'
const baseUrl = "http://localhost:3001/api/companies/"

const getCompanies = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createCompany = async (companyObject) => {
    const response = await axios.post(baseUrl, companyObject)
    return response.data
}

export default {
    getCompanies,
    createCompany
}