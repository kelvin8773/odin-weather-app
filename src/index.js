/* eslint-env browser */

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Data from './data';
import UI from './ui';

import './scss/style.scss';

const Controller = (() => {
  const update = (event) => {
    const city = UI.getCity();
    if (city) {
      Data.getNow(city)
        .then((now) => {
          if (now.code === '200') {
            UI.updateNow(now);
            console.log(now);

            Data.getFiveDays(city)
              .then((forecast) => {
                UI.updateForecast(forecast);
              });
          } else {
            UI.alert('danger', now.error_message);
          }
        });
    }
    event.preventDefault();
  };

  const init = () => {
    const searchForm = document.forms.search;
    searchForm.addEventListener('submit', update);
  };

  return {
    init,
  };
})();

Controller.init();