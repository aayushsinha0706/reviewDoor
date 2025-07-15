import { useState } from 'react'

const App = () => {

  const [companies, setCompanies] = useState([])

  const [company, setCompany] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [city, setCity] = useState('')

  const addCompany = (event) => {
    event.preventDefault()
    setCompanies(companies.concat({
      company,
      location,
      date,
      city
    }))
    setCompany('')
    setLocation('')
    setDate('')
    setCity('')
  }

  return(
    <div>
      <form onSubmit={addCompany}>
        <div>
          Company Name:
          <input 
            name = "company"
            type = "text"
            placeholder= "company name"
            value={company}
            onChange={({target}) => setCompany(target.value)}
          />
        </div>

        <div>
          Location:
          <input 
            name = "company"
            type = "text"
            placeholder= "company name"
            value={location}
            onChange={({target}) => setLocation(target.value)}
          />
        </div>

        <div>
          Founded On:
          <input 
            name = "company"
            type = "text"
            placeholder= "company name"
            value={date}
            onChange={({target}) => setDate(target.value)}
          />
        </div>

        <div>
          City:
          <input 
            name = "company"
            type = "text"
            placeholder= "company name"
            value={city}
            onChange={({target}) => setCity(target.value)}
          />
        </div>
        <button type="submit">Add Company</button>
      </form>
      <div>
        {companies.map((company) => (
          <div key = {company.company}>
            {company.company}{' '}{company.location}{' '}{company.date}{' '}{company.city}
          </div>
        ))}
      </div>
    </div>
  )

}

export default App
