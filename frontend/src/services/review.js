import axios from 'axios'
const baseUrl = "/api/reviews"

let token = null

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

const getReviewsByCompany = async (companyId) => {
    const response = await axios.get(`${baseUrl}/company/${companyId}`)
    return response.data
}

const createReview = async (companyId, reviewObject) => {
    const config ={
        headers: {
            Authorization: token
        }
    }

    const response = await axios.post(`${baseUrl}/company/${companyId}`, reviewObject, config)
    return response.data
}

export default {
    getReviewsByCompany,
    createReview,
    setToken
}