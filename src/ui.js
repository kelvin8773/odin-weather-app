/* eslint-env browser */

import Validate from './util/validate';

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

  const updateCard = (data) => {
    console.log(data);
    const weekday = document.getElementsByName('weather-current-weekday')[0];
    const date = document.getElementsByName('weather-date')[0];
    const location = document.getElementsByName('weather-location')[0];
    const temperature = document.getElementsByName('weather-temperature')[0];
    const temperatureFeel = document.getElementsByName('weather-temperature-feel')[0];
    const weatherDescription = document.getElementsByName('weather-description')[0];

    weekday.innerText = data.des_weekday;
    date.innerText = data.des_date;
    location.innerText = data.city + ', ' + data.country;
    temperature.innerHTML = `${data.temperature} <span class="symbol">°</span>C`;
    temperatureFeel.innerHTML = `Feel Like ${data.temperature_feel} <span class="symbol">°</span>C`;

    weatherDescription.innerText = data.description;

  }

  return {
    alert,
    getCity,
    updateCard
  };
})();

export default UI;
