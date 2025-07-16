
import { useState, useEffect } from 'react'

import Companyform from './components/Companyform'
import Companies from './components/Companies'
import CompanyReviews from './components/CompanyReviews'
import Loginform from './components/Loginform'
import Togglable from './components/Togglable'
import Filter from './components/Filter'
import Signupform from './components/Signupform'

import companyService from './services/companies'
import loginService from './services/login'
import signupService from './services/signup'
import reviewService from './services/review'

const App = () => {

  const [companies, setCompanies] = useState([])
  const [selectCity, setSelectCity] = useState('')
  const [search, setSearch] = useState('')

  const [selectedCompany, setSelectedCompany] = useState(null)
  const [viewMode, setViewMode] = useState('companies')

  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchCompanies = async() => {
      try {
        const initialCompanies = await companyService.getCompanies()
        setCompanies(initialCompanies)
      } catch (err) {
        console.error(err)
      }
    }
    fetchCompanies()
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
      reviewService.setToken(user.token)
      setUser(user)
    } catch (error) {
      console.error(error)
    }
  }

  const signupFunc = async ({username, password, name}) => {
    try {
      await signupService.signup({
        username, password, name
      })
      await loginFunc({username, password})
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const handleViewReviews = (company) => {
    setSelectedCompany(company)
    setViewMode('reviews')
  }

  const handleGoBackToCompanies = () => {
    setViewMode('companies')
    setSelectedCompany(null)
  }

  return(
    <div>
      {user==null 
        && 
        <div>
          <Togglable buttonlabel="log in">
            <Loginform loginFunc={loginFunc}/>
          </Togglable>
          <Togglable buttonlabel="sign up">
            <Signupform signupFunc={signupFunc} />
          </Togglable>
        </div>
      } 
      
      {viewMode === 'companies' && (
        <div>
          <div>
            <span>
              {user!==null && <Companyform addCompany={addCompany} />}
            </span>
            <span>
              <Filter setSelectCity={setSelectCity} setSearch={setSearch} />
            </span>
          </div>
          <Companies 
            companies={companies} 
            selectCity={selectCity} 
            search={search}
            onViewReviews={handleViewReviews}
          />
        </div>
      )}

      {viewMode === 'reviews' && selectedCompany && (
        <CompanyReviews 
          company={selectedCompany}
          user={user}
          onGoBack={handleGoBackToCompanies}
        />
      )}

      {user!==null && <p>{user.name} is logged-in currently</p>}
      {user!==null && <button onClick={handleLogout}>Logout</button>}
    </div>
  )

}

export default App
