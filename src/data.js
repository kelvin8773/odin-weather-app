/* eslint-env browser */

import Weather from './util/weather_api';
import DateConvert from './util/date_convert';

const Data = (() => {

  const getToday = async input => {
    const response = await Weather.fetchData(input, 'C', 1);
    if (response.cod === 200) {
      console.log(response);
      const desOffsetHours = response.timezone / (60 * 60);
      const desLocalTime = DateConvert.getDesLocalTime(desOffsetHours);

      return {
        code: response.cod.toString(),
        weather: response.weather[0].main,
        description: response.weather[0].description,
        temperature: Math.round(response.main.temp),
        temperature_feel: Math.round(response.main.feels_like),
        temperature_min: response.main.temp_min,
        temperature_max: response.main.temp_max,
        pressure: response.main.pressure,
        humidity: response.main.humidity,
        wind_speed: response.wind.speed,
        wind_degree: response.wind.deg,
        city: response.name,
        country: response.sys.country,
        des_date: DateConvert.getDate(desLocalTime),
        des_weekday: DateConvert.getWeekday(desLocalTime),
      }
    }

    return {
      code: response.cod,
      error_message: response.message
    }
  }

  const getFiveDays = async input => {
    const response = await await Weather.fetchData(input, 'C', 5);
    if (response.cod === "200") {
      console.log(response);
      const forecast = [];
      const dataArray = response.list;

      for (let i = 0; i < dataArray.length; i += 8) {
        const oneDay = {
          weather: dataArray[i].weather[0].main,
          description: dataArray[i].weather[0].description,
          temperature: Math.round(dataArray[i].main.temp),
          temperature_feel: Math.round(dataArray[i].main.feels_like),
          temperature_min: Math.round(dataArray[i].main.temp_min),
          temperature_max: Math.round(dataArray[i].main.temp_max),
          des_date: DateConvert.getDate(new Date(dataArray[i].dt_txt)),
          des_weekday: DateConvert.getShortWeekday(new Date(dataArray[i].dt_txt)),
          city: response.city.name,
          country: response.city.country
        }
        forecast.push(oneDay);
      }
      return forecast;
    }
    return response;
  }

  return {
    getToday,
    getFiveDays
  };
})();


export default Data;
