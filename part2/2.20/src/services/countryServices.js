import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const baseUrlWeather = 'https://api.openweathermap.org/data/2.5/weather?'
const API_KEY = import.meta.env.VITE_API_KEY

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

const getDataByName = (name) => {
    const request = axios.get(`${baseUrl}/name/${name}`)
    return request.then(response => response.data)
}

const getDataWeatherByLatLon = (lat, lon) => {
    const request = axios.get(`${baseUrlWeather}lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
    return request.then(response => response.data)
}

export default { getAll, getDataByName, getDataWeatherByLatLon }
