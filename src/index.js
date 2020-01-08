/* eslint-env browser */

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

import Data from './data';
import UI from './ui';

import './scss/style.scss';

const Controller = (() => {

  const update = () => {
    const city = UI.getCity();
    if (city) {
      Data.getToday(city)
        .then(data => {
          if (data.code === "200") {
            UI.updateCard(data);
          } else {
            UI.alert('danger', data.error_message.toUpperCase());
          }
        })
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