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
            params.latitude = weather.latitude;
            params.longitude = weather.longitude;
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
    } else {
      UI.alert("warning", "Can't Load your City ..., Try to type your city below instead! ^_^")
    }

  }

  const init = () => {
    UI.showInfo("Loading your city ...");
    UI.clearInfo(2);
    updateLocation();

    tempUnitC.addEventListener('click', () => {
      UI.showInfo("Updating ...");
      UI.clearInfo(1);
      params.currentLocation = false;
      params.unit = 'C';
      updateUI();
    });
    tempUnitF.addEventListener('click', () => {
      UI.showInfo("Updating ...");
      UI.clearInfo(1);
      params.currentLocation = false;
      params.unit = 'F';
      updateUI();
    });

    searchForm.addEventListener('submit', (event) => {
      UI.showInfo("Loading weather ...");
      UI.clearInfo(1.5);
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