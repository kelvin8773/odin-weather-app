/* eslint-env browser */

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Data from './data';
import UI from './ui';
import './scss/style.scss';

const Controller = (() => {
  let city = 'sydney';
  const searchForm = document.forms.search;
  const tempUnitC = document.getElementById('temp-unit-c');
  const tempUnitF = document.getElementById('temp-unit-f');

  const update = (event) => {
    city = UI.getCity();
    const unit = tempUnitC.checked ? 'C' : 'F';

    if (city) {
      Data.getNow(city, unit)
        .then((now) => {
          if (now.code === '200') {
            UI.updateNow(now);

            Data.getFiveDays(city, unit)
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

  const updateUnit = () => {
    const unit = tempUnitC.checked ? 'C' : 'F';

    Data.getNow(city, unit)
      .then((now) => {
        if (now.code === '200') {
          UI.updateNow(now);

          Data.getFiveDays(city, unit)
            .then((forecast) => {
              UI.updateForecast(forecast);
            });
        } else {
          UI.alert('danger', now.error_message);
        }
      });
  }


  const init = () => {
    tempUnitC.addEventListener('click', updateUnit);
    tempUnitF.addEventListener('click', updateUnit);
    searchForm.addEventListener('submit', update);
  };

  return {
    init,
  };
})();

Controller.init();