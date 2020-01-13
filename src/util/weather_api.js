import fetchData from './fetch_api';

const Weather = (() => {
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/';
  const UNIT_METRIC = '&units=metric';
  const UNIT_IMPERIAL = '&units=imperial';
  const API = `&appid=${process.env.OPEN_WEATHER_API_KEY}`;

  const getWeatherData = async (params) => {
    const TODAY_QUERY = 'weather?';
    const FORECAST_QUERY = 'forecast?';

    const GET_BY_CITY = `q=${params.city}`;
    const GET_BY_COORDS = `lat=${params.latitude}&lon=${params.longitude}`

    const queryString = params.currentLocation ? GET_BY_COORDS : GET_BY_CITY;
    const unitString = (params.unit === 'C') ? UNIT_METRIC : UNIT_IMPERIAL;
    const lanString = '&lang=' + params.language;

    const todayURL = BASE_URL + TODAY_QUERY + queryString + unitString + lanString + API;
    const forecastURL = BASE_URL + FORECAST_QUERY + queryString + unitString + lanString + API;

    const today = await fetchData(todayURL);
    const forecast = await fetchData(forecastURL);
    return [today, forecast];
  };


  return {
    getWeatherData
  };
})();

export default Weather;
