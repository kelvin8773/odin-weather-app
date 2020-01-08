const Weather = (() => {
  const fetchData = async (input, unit, days) => {
    let city = '';
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/';
    const UNIT_METRIC = '&units=metric';
    const UNIT_IMPERIAL = '&units=imperial';
    const API = `&appid=${process.env.OPEN_WEATHER_API_KEY}`;
    let unitString = UNIT_METRIC;

    if (input) city = input;

    const GET_TODAY = `weather?q=${city}`;
    const GET_5DAYS = `forecast?q=${city}`;

    let queryString = GET_TODAY;
    if (days === 5) queryString = GET_5DAYS;
    if (unit === 'F') unitString = UNIT_IMPERIAL;
    let url = BASE_URL + queryString + unitString + API;

    const response = await fetch(url, { mode: 'cors' });
    return await response.json();

  };

  return {
    fetchData
  }
})();

export default Weather;
