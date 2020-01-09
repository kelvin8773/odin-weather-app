/* eslint-env browser */

import Validate from './util/validate';
import './util/utils';

const UI = (() => {

  const alert = (type, msg) => {
    const alertBar = document.getElementById('alert-bar');

    const alertClass = 'alert-' + type;
    alertBar.innerHTML = `
      <div id=${alertClass} class="alert ${alertClass} alert-dismissible fade show" role="alert">
        ${msg}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;

    window.setTimeout(() => {
      document.getElementById(alertClass).remove();
    }, 2500);
  }

  const getCity = () => {
    let city = '';
    const searchInput = document.getElementById('search-input');
    const searchForm = document.forms.search;

    if (Validate.check(searchInput.value, 'city')) {
      city = searchInput.value;
    } else {
      alert('warning', 'Please input a valid City Name!');
      city = null;
    };

    searchForm.reset();
    return city;
  }

  const updateNow = data => {
    const weekday = document.getElementsByName('weather-current-weekday')[0];
    const date = document.getElementsByName('weather-date')[0];
    const location = document.getElementsByName('weather-location')[0];
    const temperature = document.getElementsByName('weather-temperature')[0];
    const temperatureFeel = document.getElementsByName('weather-temperature-feel')[0];
    const weatherDescription = document.getElementsByName('weather-description')[0];
    const weatherIconNow = document.getElementsByName('weather-icon-now')[0];

    document.getElementsByName('weather-wind')[0].innerText = data.wind_speed;
    document.getElementsByName('weather-clouds')[0].innerText = data.clouds;
    document.getElementsByName('weather-humidity')[0].innerText = data.humidity;
    document.getElementsByName('weather-pressure')[0].innerText = data.pressure;


    weekday.innerText = data.des_weekday;
    date.innerText = data.des_date;
    location.innerText = data.city + ', ' + data.country;
    temperature.innerHTML = `${data.temperature} <span class="symbol">°</span>C`;
    temperatureFeel.innerHTML = `<span class="mr-1"> Feel Like </span> ${data.temperature_feel} <span class="symbol">°</span>C`;
    weatherDescription.innerText = data.description.capitalize();
    weatherIconNow.src = `http://openweathermap.org/img/wn/${data.weather_icon}@2x.png`

  }

  const updateForecast = forecast => {
    const weeklyNode = document.getElementsByName('weekly-weather')[0];
    weeklyNode.innerHTML = '';

    for (let i = 0; i < forecast.length; i += 1) {
      let oneDay = document.createElement('div');
      let weekday = forecast[i].des_weekday;
      if (i === 0) weekday = 'Today';
      if (i === 1) weekday = 'Tomorrow';
      oneDay.setAttribute("class", "weekly-weather-item");

      oneDay.innerHTML = `
      <p class="mb-0"> ${weekday} </p> 
        <img src="http://openweathermap.org/img/wn/${forecast[i].weather_icon}.png" alt="weather-icon">
      <p class="mb-0"> ${forecast[i].temperature}° </p>`;

      weeklyNode.appendChild(oneDay);
    }
  }

  return {
    alert,
    getCity,
    updateNow,
    updateForecast
  };
})();

export default UI;
