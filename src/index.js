/* eslint-env browser */

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Data from './data';
import UI from './ui';
import IpLocation from './util/ip_location';

import './scss/style.scss';

const Controller = (() => {
  const params = {
    city: '',
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
            throw new Error(`${weather.cod} - ${weather.message}`);
          }
        })
        .catch(error => {
          UI.alert('danger', error);
        })
    }
  };

  const updateLocation = () => {
    if (!navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        params.currentLocation = true;
        params.latitude = pos.coords.latitude.toFixed(2);
        params.longitude = pos.coords.longitude.toFixed(2);
        updateUI();
      });
    }
    else {
      IpLocation.query()
        .then(result => {
          params.city = result.city;
          params.currentLocation = true;
          params.latitude = Number(result.lat).toFixed(2);
          params.longitude = Number(result.lon).toFixed(2);
          updateUI();
        })
        .catch(error => {
          console.log(error);
          UI.alert("warning", `Can't Load your City, Search Below Instead ... ^_^`);
        });
    }
  }

  const init = () => {
    UI.showInfo("Loading your city ...");
    UI.clearInfo(3);
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