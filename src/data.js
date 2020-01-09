/* eslint-env browser */

import Weather from './util/weather_api';
import DateFns from './util/date_fns';

const Data = (() => {
  const getNow = async (input) => {
    const response = await Weather.fetchData(input, 'C', 1);
    if (response.cod === 200) {
      console.log(response);
      const desOffsetHours = response.timezone / (60 * 60);
      const desLocalTime = DateFns.getDesLocalTime(desOffsetHours);

      return {
        code: response.cod.toString(),
        weather_id: response.weather[0].id,
        weather: response.weather[0].main,
        description: response.weather[0].description,
        weather_icon: response.weather[0].icon,
        temperature: Math.round(response.main.temp),
        temperature_feel: Math.round(response.main.feels_like),
        temperature_min: response.main.temp_min,
        temperature_max: response.main.temp_max,
        pressure: response.main.pressure,
        humidity: response.main.humidity,
        wind_speed: response.wind.speed,
        wind_degree: response.wind.deg,
        clouds: response.clouds.all,
        city: response.name,
        country: response.sys.country,
        des_date: DateFns.getDate(desLocalTime),
        des_weekday: DateFns.getWeekday(desLocalTime),
        night: DateFns.checkNight(desLocalTime),
      };
    }

    return {
      code: response.cod,
      error_message: response.message,
    };
  };

  const getFiveDays = async (input) => {
    const response = await await Weather.fetchData(input, 'C', 5);
    if (response.cod === '200') {
      const forecast = [];
      const dataArray = response.list;

      for (let i = 0; i < dataArray.length; i += 8) {
        const oneDay = {
          weather: dataArray[i].weather[0].main,
          description: dataArray[i].weather[0].description,
          weather_icon: dataArray[i].weather[0].icon,
          temperature: Math.round(dataArray[i].main.temp),
          temperature_feel: Math.round(dataArray[i].main.feels_like),
          temperature_min: Math.round(dataArray[i].main.temp_min),
          temperature_max: Math.round(dataArray[i].main.temp_max),
          des_date: DateFns.getDate(new Date(dataArray[i].dt_txt)),
          des_weekday: DateFns.getShortWeekday(new Date(dataArray[i].dt_txt)),
          city_id: response.city.id,
          city: response.city.name,
          country: response.city.country,
        };
        forecast.push(oneDay);
      }
      return forecast;
    }
    return response;
  };

  return {
    getNow,
    getFiveDays,
  };
})();


export default Data;
