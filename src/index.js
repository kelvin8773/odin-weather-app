import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

import Data from './data';
import UI from './ui';

import './style.scss';

const Controller = (() => {

  const init = () => {
    Data.getWeather('London')
      .then(x => console.log(x));
  }

  return {
    init,
  }

})();

Controller.init();