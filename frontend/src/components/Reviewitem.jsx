const ReviewItem = ({ review }) => {
    
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const renderStars = (rating) => {
        return '★'.repeat(rating) + '☆'.repeat(5 - rating)
    }

    return (
        <div style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0' }}>
            <div>
                <h4>{review.name}</h4>
                <div>{renderStars(review.rating)} ({review.rating}/5)</div>
                <div>By: ({review.user.username})</div>
                <div>Date: {formatDate(review.createdAt)}</div>
            </div>
            <div style={{ marginTop: '10px' }}>
                <p>{review.review}</p>
            </div>
        </div>
    )
}

export default ReviewItem