/* eslint-env browser */

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Data from './data';
import UI from './ui';
import './util/utils';

import './scss/style.scss';

const Controller = (() => {

  const update = () => {
    const city = UI.getCity();
    if (city) {
      Data.getToday(city)
        .then(data => {
          if (data.code === "200") {
            UI.updateCard(data);

            Data.getFiveDays(city)
              .then(data => {
                console.log(data);
                UI.updateForecast(data);
              });

          } else {
            UI.alert('danger', data.error_message.capitalize());
          }
        });


    }
    event.preventDefault();
  }

  const init = () => {
    const searchForm = document.forms.search;
    searchForm.addEventListener('submit', update);
  };

  return {
    init,
  };
})();

Controller.init();