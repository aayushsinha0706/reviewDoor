import {useState} from 'react'

const Companyform = ({addCompany}) => {

  const [visible, setVisible] = useState(false)

  const [company, setCompany] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [city, setCity] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    addCompany({
        company, location, date, city
    })
    setCompany('')
    setLocation('')
    setDate('')
    setCity('')
    setVisible(false) 
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      {!visible ? (
        <button onClick={toggleVisibility}> + Add Company</button>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <button type="button" onClick={toggleVisibility}>X</button>
          </div>
          
          <div>
            Company Name:
            <input 
              name="company"
              type="text"
              placeholder="company name"
              value={company}
              onChange={({target}) => setCompany(target.value)}
              required
            />
          </div>

          <div>
            Location:
            <input 
              name="location"
              type="text"
              placeholder="location"
              value={location}
              onChange={({target}) => setLocation(target.value)}
              required
            />
          </div>

          <div>
            Founded On:
            <input 
              name="date"
              type="date"
              placeholder="founded date"
              value={date}
              onChange={({target}) => setDate(target.value)}
              required
            />
          </div>

          <div>
            City:
            <input 
              name="city"
              type="text"
              placeholder="city"
              value={city}
              onChange={({target}) => setCity(target.value)}
              required
            />
          </div>
          <button type="submit">Save</button>
        </form>
      )}
    </div>
  )

}

export default Companyform