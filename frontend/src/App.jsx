import { useState } from 'react'

import Companyform from './components/Companyform'
import Companies from './components/Companies'
const App = () => {

  const [companies, setCompanies] = useState([])
  const [selectCity, setSelectCity] = useState('')
  const [search, setSearch] = useState('')

  const addCompany = ({
    company, location, date, city
  }) => {
    setCompanies(
      companies.concat({
        company,
        location,
        date,
        city
      })
    )
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
