/* eslint-env browser */

const Data = (() => {
  const getWeather = async (city) => {
    const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/';
    const CITY_TODAY_SEARCH = `weather?q=${city}`;
    const CITY_FORECAST_SEARCH = `forecast?q=${city}`;
    const UNIT_METRIC = '&units=metric';
    const UNIT_IMPERIAL = '&units=imperial';
    const LANGUAGE_ZH = '&lang=zh_cn';

    const url = `${WEATHER_BASE_URL + CITY_FORECAST_SEARCH + UNIT_METRIC}&appid=${process.env.OPEN_WEATHER_API_KEY}`;

    const response = await fetch(url, { mode: 'cors' });
    const data = await response.json();
    return data;
  };

  return {
    getWeather,
  };
})();


export default Data;
