import { useEffect } from "react"
import { useState } from "react"
import weatherService from "./services/weatherService"

const DisplayWeather = ({ weather, city }) => {
    return (
        <div>
            <h2>Weather in {city}</h2>
            <p>Temperature is {weather.main.temp} °C</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
            <p>Wind {weather.wind.speed} m/s</p>
        </div>
    )
}

const DisplayDetails = ({ country }) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        weatherService.getWeather(country)
                      .then(data => setWeather(data))
    }, [country])

    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>
                <p>Capital: {country.capital.join(', ')}</p>
                <p>Area: {country.area}</p>
            </div>
            <h2>Languages</h2>
            <ul>
                {Object.entries(country.languages).map(([code, lang]) => <li key={code}>{lang}</li>)}
            </ul>
            <img style={{border: '0.1px solid gray'}} alt={`${country.flags.alt}`} src={country.flags.png} />
            {weather ? <DisplayWeather weather={weather} city={country.capital[0]} /> : null}
        </div>
    )
}

const DisplaySearchResults = ({ countries }) => {
    const [showCountries, setShowCountries] = useState([])

    useEffect(() => {
        setShowCountries(countries)
    }, [countries])

    if(showCountries.length > 10){
        return (<p>Too many countries, specify another filter</p>)
    }

    if(showCountries.length == 1){
        return <DisplayDetails country={showCountries[0]} />
    }

    return (
        <>
            {showCountries.map(country => {
                return (
                    <div key={country.cca3}>
                        <p>
                            {country.name.common} <button onClick={() => {
                                setShowCountries([country])
                            }}>show</button>
                        </p>
                    </div>
                )
            })}
        </>
    )
}

export default DisplaySearchResults