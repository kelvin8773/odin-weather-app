/* eslint-env browser */

import Validate from './util/validate';
import Image from './util/image';

const UI = (() => {
  const infoBar = document.getElementById('info-bar');
  const alertBar = document.getElementById('alert-bar');

  const alert = (type, msg) => {
    const alertClass = `alert-${type}`;
    alertBar.innerHTML = `
      <div id=${alertClass} class="alert ${alertClass} alert-dismissible fade show text-capitalize" role="alert">
        ${msg}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;
  };

  const getCity = () => {
    let city = '';
    const searchInput = document.getElementById('search-input');
    const searchForm = document.forms.search;

    if (Validate.check(searchInput.value, 'city')) {
      city = searchInput.value;
    } else {
      alert('warning', 'Please input a valid City Name!');
      city = '';
    }
    searchForm.reset();
    return city;
  };

  const updateNow = (data) => {
    const weekday = document.getElementsByName('weather-current-weekday')[0];
    const date = document.getElementsByName('weather-date')[0];
    const city = document.getElementsByName('weather-city')[0];
    const country = document.getElementsByName('weather-country')[0];
    const temperature = document.getElementsByName('weather-temperature')[0];
    const temperatureFeel = document.getElementsByName('weather-temperature-feel')[0];
    const weatherDescription = document.getElementsByName('weather-description')[0];
    const windUnit = document.getElementsByName('wind-unit')[0];

    windUnit.innerText = data.unit === 'C' ? 'M/S' : 'M/H';

    document.getElementsByName('weather-wind')[0].innerText = data.wind_speed;
    document.getElementsByName('weather-clouds')[0].innerText = data.clouds;
    document.getElementsByName('weather-humidity')[0].innerText = data.humidity;
    document.getElementsByName('weather-pressure')[0].innerText = data.pressure;


    weekday.innerText = `${data.des_weekday}, `;
    date.innerText = data.des_date;
    city.innerText = data.city;
    country.innerText = data.country;

    temperature.innerHTML = `${data.temperature} <span class="symbol">°</span>${data.unit}`;
    temperatureFeel.innerHTML = `<span class="mr-1"> Feel Like </span> ${data.temperature_feel} <span class="symbol">°</span>${data.unit}`;
    weatherDescription.innerText = data.description;


    const weatherNowCard = document.getElementsByName('weather-now-card')[0];
    const weatherImg = Image.getWeatherImg(data.weather_id, data.night);
    weatherNowCard.style.backgroundImage = `url(${weatherImg})`;

    if (data.night) {
      weatherNowCard.classList.add('text-night-color');
      weatherNowCard.classList.remove('text-day-color');
    } else {
      weatherNowCard.classList.remove('text-night-color');
      weatherNowCard.classList.add('text-day-color');
    }
  };

  const updateForecast = (forecast) => {
    const weeklyNode = document.getElementsByName('weekly-weather')[0];
    weeklyNode.innerHTML = '';

    for (let i = 0; i < forecast.length; i += 1) {
      const oneDay = document.createElement('div');
      let weekday = forecast[i].des_weekday;
      if (i === 0) weekday = 'Today';
      if (i === 1) weekday = 'Tomorrow';
      oneDay.setAttribute('class', 'weekly-weather-item');

      oneDay.innerHTML = `
      <p class="mb-0"> ${weekday} </p> 
        <img src="https://openweathermap.org/img/wn/${forecast[i].weather_icon}.png" alt="weather-icon">
      <p class="mb-0"> ${forecast[i].temperature}° </p>`;

      weeklyNode.appendChild(oneDay);
    }
  };

  const showInfo = (msg) => {
    const infoContent = document.createElement('span');
    const infoSpinner = document.createElement('span');

    infoContent.innerText = msg;
    infoSpinner.innerHTML = `<div class="spinner-border text-warning" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>`;
    infoSpinner.setAttribute('Class', 'ml-5');

    infoBar.append(infoContent);
    infoBar.append(infoSpinner);
  };

  const clearInfo = (time) => {
    setTimeout(() => {
      infoBar.innerHTML = '';
    }, time * 1000);
  };

  return {
    alert,
    getCity,
    updateNow,
    updateForecast,
    showInfo,
    clearInfo,
  };
})();

export default UI;
