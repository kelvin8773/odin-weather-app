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
    language: 'en',
  };
  const searchForm = document.forms.search;
  const tempUnitC = document.getElementById('temp-unit-c');
  const tempUnitF = document.getElementById('temp-unit-f');

  const updateUI = () => {
    if (params.city.length !== 0 || params.currentLocation) {
      Data.getWeather(params)
        .then((weather) => {
          if (weather.cod === '200') {
            params.city = weather.city;
            params.latitude = weather.latitude;
            params.longitude = weather.longitude;
            UI.updateNow(weather);
            UI.updateForecast(weather.forecast);
            UI.clearInfo(2);
          } else {
            throw new Error(`${weather.cod} - ${weather.message}`);
          }
        })
        .catch((error) => {
          UI.clearInfo(1);
          UI.alert('danger', error, 3);
        });
    }
  };

  const updateLocation = () => {
    const geoSuccess = (pos) => {
      params.currentLocation = true;
      params.latitude = pos.coords.latitude.toFixed(2);
      params.longitude = pos.coords.longitude.toFixed(2);
      updateUI();
    }

    const geoFail = () => {
      IpLocation.query()
        .then((result) => {
          params.city = result.city;
          params.currentLocation = true;
          params.latitude = Number(result.lat).toFixed(2);
          params.longitude = Number(result.lon).toFixed(2);
          updateUI();
        })
        .catch(() => {
          UI.alert('warning', 'Can\'t Load your City, Search Below Instead ... ^_^', 3);
          UI.clearInfo(2);
        });
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(geoSuccess, geoFail);
    } else {
      UI.clearInfo(3);
      UI.alert('warning', 'Sorry, I can not locate you, search your city below ... ^O^', 6);
    }

  };

  const init = () => {
    UI.showInfo('Loading your city ...');
    updateLocation();

    tempUnitC.addEventListener('click', () => {
      UI.showInfo(`Updating ${params.city} ...`);
      params.currentLocation = false;
      params.unit = 'C';
      updateUI();
    });
    tempUnitF.addEventListener('click', () => {
      UI.showInfo(`Updating ${params.city} ...`);
      params.currentLocation = false;
      params.unit = 'F';
      updateUI();
    });

    searchForm.addEventListener('submit', (event) => {
      params.currentLocation = false;
      params.city = UI.getCity();
      if (params.city.length === 0) {
        UI.alert('warning', 'Please input a valid City Name!', 3);
      } else {
        UI.showInfo(`Loading ${params.city}'s weather ...`);
        params.unit = tempUnitC.checked ? 'C' : 'F';
        updateUI();
      }
      event.preventDefault();
    });
  };

  return {
    init,
  };
})();

Controller.init();