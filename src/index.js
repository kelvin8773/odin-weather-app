import './style.scss';


const getWeather = async (city) => {
  const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/'
  const url = WEATHER_BASE_URL + `weather?q=${city}` + '&appid=' + `${process.env.OPEN_WEATHER_API_KEY}`;

  const response = await fetch(url, { mode: 'cors' });
  const data = await response.json();
  return data;
};

getWeather('London')
  .then(x => console.log(x));

