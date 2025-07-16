import { useState, useEffect } from 'react'

import Companyform from './components/Companyform'
import Companies from './components/Companies'
import Loginform from './components/Loginform'
import Togglable from './components/Togglable'
import Filter from './components/Filter'

import companyService from './services/companies'
import loginService from './services/login'

const App = () => {

  const [companies, setCompanies] = useState([])
  const [selectCity, setSelectCity] = useState('')
  const [search, setSearch] = useState('')

  const [user, setUser] = useState(null)

  useEffect(() => {
    companyService
      .getCompanies()
      .then(initialCompanies => {
        setCompanies(initialCompanies)
      })
  },[])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      companyService.setToken(user.token)
    }
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

  const loginFunc = async ({username, password}) => {
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      companyService.setToken(user.token)
      setUser(user)
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  return(
    <div>
      {user==null 
        && 
        <Togglable buttonlabel="log in">
          <Loginform loginFunc={loginFunc}/>
        </Togglable>
      } 
      <div>
        <span>
          {user!==null && <Companyform addCompany={addCompany} />}
        </span>
        <span>
          <Filter setSelectCity={setSelectCity} setSearch={setSearch} />
        </span>
      </div>
      <Companies companies = {companies} selectCity={selectCity} search={search} />
      {user!==null && <p>{user.name} is logged-in currently</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  )

}

export default App
