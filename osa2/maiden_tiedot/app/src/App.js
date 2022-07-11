import { useState, useEffect } from 'react'
import axios from 'axios'

const Languages = ({country}) => {
  // TODO: Could this be done better and without Object.entries???
  return (
    <ul>
      {Object.entries(country.languages).map((language) => 
        <li key={language}>{language[1]}</li>
      )}
    </ul>
  )
}

const Country = ({country}) => {

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>

      <h3>languages:</h3>
      <Languages country={country} />

      <img src={country.flags.png} alt="The flag" />
    </div>
  )
}

const Countries = ({countries, filter, setFilter}) => {
  if(filter) {
    const countriesFiltered = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase()))
    countries = countriesFiltered
  }

  if(countries.length >= 10) {
    return <p>Too many matches, specify another filter</p>
  }
  else if ( 1 < countries.length && countries.length < 10) {
    console.log('mapping...');

    return (
      <div>
        {countries.map((country) =>
          // <Country key={country.name.common} name={country.name.common}/>
          <p key={country.name.common}>{country.name.common} <button onClick={() => setFilter(country.name.common)} >show</button></p>
        )}
      </div>
    )
  }
  else if (1 == countries.length) {
    return (
      <div>
        <Country country={countries[0]}/>
      </div>
    )
  }
  else {
    return <p>no match</p>
  }
  
  
}

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  const handleNewFilterChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value)
  }

  useEffect(() => {
    axios
      // .get('http://localhost:3001/all')
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        setCountries(response.data)
      })
  }, [])
  
  return (
    <div>
      find countries <input value={filter} onChange={handleNewFilterChange}/>
      
      <Countries countries={countries} filter={filter} setFilter={setFilter} />
    </div>
  )

}

export default App