import axios from 'axios'
const baseUrl = "/api/companies"

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