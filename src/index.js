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
    cityId: '',
    unit: 'C',
    currentLocation: false,
    latitude: '',
    longitude: '',
    language: 'en',
  };

  const searchForm = document.forms.search;
  const tempUnitC = document.getElementById('unit-c');
  const tempUnitF = document.getElementById('unit-f');

  const updateUI = () => {
    if (params.city.length !== 0 || params.currentLocation) {
      Data.getWeather(params)
        .then((weather) => {
          if (weather.cod === '200') {
            params.city = weather.city;
            params.cityId = weather.city_id;
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
    };

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
          UI.clearInfo(2);
          UI.alert('warning', 'Can\'t Load your City, Search Below Instead ... ^_^', 3);
        });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(geoSuccess, geoFail);
    } else {
      UI.clearInfo(3);
      UI.alert('warning', 'Sorry, I can not locate you, search your city below ... ^O^', 6);
    }
  };

  const init = () => {
    Data.getCities()
      .then((data) => {
        UI.citiesSuggestion(data);
      });

    UI.showInfo('Loading your city ...');
    updateLocation();

    tempUnitC.addEventListener('click', () => {
      UI.showInfo(`Updating ${params.city} ...`);
      tempUnitC.classList = 'unit-selected';
      tempUnitF.classList = 'unit-not-selected';
      // params.currentLocation = false;
      params.unit = 'C';
      updateUI();
    });

    tempUnitF.addEventListener('click', () => {
      UI.showInfo(`Updating ${params.city} ...`);
      tempUnitF.classList = 'unit-selected';
      tempUnitC.classList = 'unit-not-selected';
      // params.currentLocation = false;
      params.unit = 'F';
      updateUI();
    });

    searchForm.addEventListener('submit', (event) => {
      params.currentLocation = false;
      [params.city, params.cityId] = UI.getCity();
      if (params.city === undefined) {
        UI.alert('warning', 'Please input a valid City Name!', 3);
      } else {
        UI.showInfo(`Loading ${params.city}'s weather ...`);
        params.unit = (tempUnitC.classList.value === 'unit-selected') ? 'C' : 'F';
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