import './style.scss';

const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/'

const getWeather = async (city) => {
  const url = WEATHER_BASE_URL + `weather?q=${city}` + '&appid=' + `${process.env.OPEN_WEATHER_API_KEY}`;

  const response = await fetch(url, { mode: 'cors' });
  console.log(response);
  const data = await response.json();

  return data.data;
}


const weather = getWeather('London');

console.log(weather);
