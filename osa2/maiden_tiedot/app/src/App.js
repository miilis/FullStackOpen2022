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

const Weather = ({country}) => {
  const api_key = process.env.REACT_APP_API_KEY
  if (!api_key) {
    console.log('No API key in REACT_APP_API_KEY');
  }

  const lat = country.latlng[0]
  const long = country.latlng[1]
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude=hourly,daily&appid=${api_key}`
  console.log(url);

  axios
    .get(url)
    .then((response) => {
      // TODO: response is always "Request failed with status code 401" (Invalid API key). Api key checked and waited over a day after account creation.
      console.log(response.data);
    })

  return (
    <div>
      <h1>Weather in {country.capital}</h1>
    </div>
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

      <Weather country={country} />
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