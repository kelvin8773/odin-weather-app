/* eslint-env browser */

import Weather from './util/weather_api';
import DateFns from './util/date_fns';

const Data = (() => {

  const processToday = data => {
    const desOffsetHours = data.timezone / (60 * 60);
    const desLocalTime = DateFns.getDesLocalTime(desOffsetHours);
    const weather = {
      cod: data.cod.toString(),
      latitude: data.coord.lat,
      longitude: data.coord.lon,
      weather_id: data.weather[0].id,
      weather: data.weather[0].main,
      description: data.weather[0].description,
      weather_icon: data.weather[0].icon,
      temperature: Math.round(data.main.temp),
      temperature_feel: Math.round(data.main.feels_like),
      temperature_min: data.main.temp_min,
      temperature_max: data.main.temp_max,
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      wind_speed: data.wind.speed,
      wind_degree: data.wind.deg,
      clouds: data.clouds.all,
      city_id: data.id,
      city: data.name,
      country: data.sys.country,
      des_date: DateFns.getDate(desLocalTime),
      des_weekday: DateFns.getWeekday(desLocalTime),
      night: DateFns.checkNight(desLocalTime),
    };
    return weather;
  };

  const processForecast = data => {
    const forecast = [];
    const dataArray = data.list;
    for (let i = 3; i < dataArray.length; i += 8) {
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
      };
      forecast.push(oneDay);
    }
    return forecast;
  };

  const getWeather = async (params) => {
    const data = await Weather.getWeatherData(params);

    if (data[0].cod === 200) {
      const weather = processToday(data[0]);
      weather.unit = params.unit;
      weather.forecast = processForecast(data[1]);
      return weather;
    }
    else {
      return {
        cod: data[0].cod,
        message: "Something Wrong, Please Try Again!"
      }
    }
  }

  return {
    getWeather,
  };
})();


export default Data;
