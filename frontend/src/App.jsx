import { useState, useEffect } from 'react'

import Companyform from './components/Companyform'
import Companies from './components/Companies'

import companyService from './services/companies'
const App = () => {

  const [companies, setCompanies] = useState([])
  const [selectCity, setSelectCity] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    companyService
      .getCompanies()
      .then(initialCompanies => {
        setCompanies(initialCompanies)
      })
  },[])

  const addCompany = ({
    company, location, date, city
  }) => {
    const companyObject = {
      company,
      location,
      date,
      city
    }
    companyService
      .createCompany(companyObject)
      .then(addedCompany => {
        setCompanies(companies.concat(addedCompany))
      })
  }

  return(
    <div>
      <div>
        <span>
          <Companyform addCompany={addCompany} />
        </span>
        <span>
          <input onChange={({target}) => setSelectCity(target.value)} placeholder='Find Company in city...' />
        </span>
        <span>
          <input onChange={({target}) => setSearch(target.value)} placeholder='Search Company' />
        </span>
      </div>
      <Companies companies = {companies} selectCity={selectCity} search={search} />
    </div>
  )

}

export default App
