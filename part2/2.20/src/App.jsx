import { useState, useEffect } from 'react'
import countryServices from './services/countryServices'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [countryName, setCountryName] = useState(null)
  const [countryWeather, setCountryWeather] = useState({
    temp: "",
    wind: "",
    icon: ""
  })
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    countryServices.getAll()
      .then(data => setCountries(data))
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredCountries([]);
      setCountry(null);
      setCountryName(null);
      return;
    }

    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredCountries(filtered);

    if (filtered.length === 1) {
      setCountryName(filtered[0].name.common);
    } else {
      setCountryName(null);
      setCountry(null);
    }

  }, [searchQuery, countries]);

  useEffect(() => {
    if (countryName != null) {
      countryServices.getDataByName(countryName)
        .then((data) => {
          setCountry({
            cca2: data.cca2,
            name: data.name.common,
            capital: data.capital,
            area: data.area,
            languages: data.languages,
            flag: data.flags.svg
          })

          countryServices.getDataWeatherByLatLon(data.capitalInfo.latlng[0], data.capitalInfo.latlng[1])
            .then((data) => {
              setCountryWeather({
                temp: data.main.temp,
                wind: data.wind.speed,
                icon: data.weather[0].icon
              })
            })

        })
        .catch(error => console.error(`Error fetching country data for ${countryName}:`, error));
    } else {
      setCountry(null);
    }
  }, [countryName]);

  const handleSearchQuery = (e) => setSearchQuery(e.target.value);
  const handleShowCountry = (name) => {
    setCountryName(name);
    setSearchQuery(name);
  }

  return (
    <div>
      <label>
        Find countries: <input value={searchQuery} onChange={handleSearchQuery} />
      </label>

      {country === null ?
        <ul style={{ listStyle: "none", padding: 0 }}>
          {searchQuery === '' ? null :
            filteredCountries.length > 10 ?
              <li key="warning">Too many matches, specify another filter</li>
              : filteredCountries.length === 0 ?
                <li key="no-results">No countries found</li>
                : filteredCountries.map(country => (
                  <li key={country.cca2}>
                    {country.name.common}{" "}
                    <button onClick={() => handleShowCountry(country.name.common)}>
                      Show
                    </button>
                  </li>
                ))
          }
        </ul>
        :
        <div>
          <h1>{country.name}</h1>
          <p>Capital {country.capital}</p>
          <p>Area {country.area}</p>
          <h2>Languages</h2>
          <ul>
            {Object.values(country.languages).map((lang, index) => (
              <li key={index}>{lang}</li>
            ))}
          </ul>
          {country.flag &&
            <img style={{ border: "1px solid black" }} src={country.flag} width="200" alt={`Flag of ${country.name}`} />
          }
          <h2>Weather in {country.capital}</h2>
          <p>Temperature {countryWeather.temp} Celcius</p>
          {countryWeather.icon &&
            <img src={`https://openweathermap.org/img/wn/${countryWeather.icon}@2x.png`} width="100" alt="Weather icon" />
          }
          <p>Wind {countryWeather.wind} m/s</p>
        </div>
      }
    </div>
  );
}

export default App;
