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
        .then((data) => {
          if (data.code === '200') {
            UI.updateNow(data);

            Data.getFiveDays(city)
              .then((data) => {
                UI.updateForecast(data);
              });
          } else {
            UI.alert('danger', data.error_message);
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