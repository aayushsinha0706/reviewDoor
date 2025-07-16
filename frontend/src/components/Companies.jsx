const Companies = ({
    companies,
    selectCity,
    search,
    onViewReviews
}) => {
    return(
        <div>
            {
                companies.filter((company) => (
                     company.company.toLowerCase().includes(search.toLowerCase())
                )).filter((company) => (
                    company.city.toLowerCase().includes(selectCity.toLowerCase())
                )).map((company) => (
                <div key={company.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
                    <div>
                        <strong>{company.company}</strong>
                    </div>
                    <div>
                        Location: {company.location}
                    </div>
                    <div>
                        City: {company.city}
                    </div>
                    <div>
                        Founded: {company.date}
                    </div>
                    <div>
                        Reviews: {company.reviews ? company.reviews.length : 0}
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <button onClick={() => onViewReviews(company)}>
                            View Reviews
                        </button>
                    </div>
                </div>
                ))
            }
        </div>
    )
}

export default Companies