import { useState } from 'react'

const ReviewForm = ({ addReview }) => {
    const [name, setName] = useState('')
    const [review, setReview] = useState('')
    const [rating, setRating] = useState(1)

    const handleSubmit = (event) => {
        event.preventDefault()
        
        if (review.length < 5) {
            alert('Review must be at least 5 characters long')
            return
        }
        
        if (review.length > 500) {
            alert('Review must be less than 500 characters')
            return
        }

        addReview({
            name,
            review,
            rating: Number(rating)
        })
        
        setName('')
        setReview('')
        setRating(1)
    }

    return (
        <div>
            <h3>Add a Review</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Full Name:</label>
                    <input 
                        type="text"
                        value={name}
                        onChange={({target}) => setName(target.value)}
                        placeholder="Full Name.."
                        required
                    />
                </div>
                
                <div>
                    <label>Rating:</label>
                    <div>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                onClick={() => setRating(star)}
                                style={{
                                    fontSize: '24px',
                                    cursor: 'pointer',
                                    color: star <= rating ? '#gold' : '#000000',
                                    marginRight: '5px'
                                }}
                            >
                                {star <= rating ? '★' : '☆'}
                            </span>
                        ))}
                        <span style={{ marginLeft: '10px' }}>
                            ({rating}/5)
                        </span>
                    </div>
                </div>
                
                <div>
                    <label>Review:</label>
                    <textarea 
                        value={review}
                        onChange={({target}) => setReview(target.value)}
                        placeholder="Write your review here (5-500 characters)"
                        rows="4"
                        cols="50"
                        required
                    />
                    <div>
                        {review.length}/500 characters
                    </div>
                </div>
                
                <button type="submit">Submit Review</button>
            </form>
        </div>
    )
}

export default ReviewForm