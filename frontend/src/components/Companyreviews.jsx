
import { useState, useEffect } from 'react'
import Reviewitem from './Reviewitem'
import Reviewform from './Reviewform'
import reviewService from '../services/review'

const Companyreviews = ({
    company,
    user,
    onGoBack
}) => {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {

        const fetchReviews = async () => {
            try {
                setLoading(true)
                const reviewsData = await reviewService.getReviewsByCompany(company.id)
                setReviews(reviewsData)
            } catch (error) {
                setError('Failed to load reviews', error)
            } finally {
                setLoading(false)
            }
        }

        fetchReviews()
    },[company.id])

    const addReview = async (reviewData) => {
        try {
            setError('')
            const newReview = await reviewService.createReview(company.id, reviewData)
            setReviews([newReview, ...reviews])
        } catch {
            setError('Failed to add review', error)
        }
    }

    if (loading) {
         return <div>Loading reviews...</div>
    }

    return (
        <div>
            <div>
                <button onClick={onGoBack}>← Go Back to Companies Listing</button>
            </div>

            <div>
                <h2>{company.company} Reviews</h2>
                <div>
                    <strong>Company:</strong> {company.company}<br/>
                    <strong>Location:</strong> {company.location}<br/>
                    <strong>City:</strong> {company.city}<br/>
                    <strong>Founded:</strong> {company.date}
                </div>

                {error && (
                     <div style={{ color: 'red', margin: '10px 0' }}>
                        {error}
                    </div>
                )}

                {user && (
                    <div>
                        <Reviewform addReview={addReview} />
                    </div>
                )}
                <div>
                    <h3>Reviews ({reviews.length})</h3>
                    {reviews.length === 0 
                        ? (<p>No reviews yet. Be the first to review the {company.company}!</p>)
                        : (reviews.map(review => (
                            <Reviewitem key={review.id} review={review} />
                        )))
                    }
                </div>
            </div>

        </div>
    )

}

export default Companyreviews