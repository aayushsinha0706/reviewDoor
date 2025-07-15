const Companies = ({
    companies,
    selectCity,
    search
}) => {
    return(
        <div>
            {
                companies.filter((company) => (
                     company.company.toLowerCase().includes(search.toLowerCase())
                )).filter((company) => (
                    company.city.toLowerCase().includes(selectCity.toLowerCase())
                )).map((company) => (
                <div key={company.id}>
                    {company.company}{' '}{company.location}{' '}{company.date}{' '}{company.city}
                </div>
                ))
            }
        </div>
    )
}

export default Companies