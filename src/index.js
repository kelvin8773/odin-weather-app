/* eslint-env browser */

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Data from './data';
import UI from './ui';

import './scss/style.scss';

const Controller = (() => {
  const params = {
    city: 'sydney',
    unit: 'C',
    currentLocation: false,
    latitude: '',
    longitude: '',
    language: 'en'
  };
  const searchForm = document.forms.search;
  const tempUnitC = document.getElementById('temp-unit-c');
  const tempUnitF = document.getElementById('temp-unit-f');

  const updateUI = () => {
    if (params.city.length !== 0 || params.currentLocation) {
      Data.getWeather(params)
        .then(weather => {
          if (weather.cod === "200") {
            params.city = weather.city;
            UI.updateNow(weather);
            UI.updateForecast(weather.forecast);
          }
          else {
            UI.alert('danger', `Error ${weather.cod} - ${weather.message}`);
          }
        });
    }
  };

  const updateLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        params.currentLocation = true;
        params.latitude = pos.coords.latitude.toFixed(2);
        params.longitude = pos.coords.longitude.toFixed(2);
        updateUI();
      });
    }
  }

  const init = () => {
    updateLocation();

    tempUnitC.addEventListener('click', () => {
      params.currentLocation = false;
      params.unit = 'C';
      updateUI();
    });
    tempUnitF.addEventListener('click', () => {
      params.currentLocation = false;
      params.unit = 'F';
      updateUI();
    });

    searchForm.addEventListener('submit', (event) => {
      params.currentLocation = false;
      params.city = UI.getCity();
      params.unit = tempUnitC.checked ? 'C' : 'F';
      updateUI();
      event.preventDefault();
    });
  };

  return {
    init,
  };
})();

Controller.init();