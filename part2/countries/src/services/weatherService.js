import axios from 'axios'

const api_key = import.meta.env.VITE_OPENWEATHERMAP_KEY

const baseUrl = new URL('https://api.openweathermap.org/data/2.5/weather')

const getWeather = (country) => {
    const url = baseUrl
    url.searchParams.append('lat', country.capitalInfo.latlng[0])
    url.searchParams.append('lon', country.capitalInfo.latlng[1])
    url.searchParams.append('units', 'metric')
    url.searchParams.append('appid', api_key)
    return axios.get(url)
                .then(res => res.data)
}

export default { getWeather, api_key }

