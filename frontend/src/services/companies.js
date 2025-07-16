import axios from 'axios'
const baseUrl = "/api/companies"

let token = null

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

const getCompanies = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createCompany = async (companyObject) => {

    const config = {
        headers: {
            Authorization: token
        }
    }
    const response = await axios.post(baseUrl, companyObject, config)
    return response.data
}

export default {
    getCompanies,
    createCompany,
    setToken
}