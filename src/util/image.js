
import clear_day_img from '../assets/image/clear_day.png';
import clear_night_img from '../assets/image/clear_night.png';
import clouds_day_img from '../assets/image/clouds_day.png';
import clouds_night_img from '../assets/image/clouds_night.png';
import drizzle_day_img from '../assets/image/drizzle_day.png';
import drizzle_night_img from '../assets/image/drizzle_night.png';
import fog_day_img from '../assets/image/fog_day.png';
import fog_night_img from '../assets/image/fog_night1.png';
import rain_day_img from '../assets/image/rain_day.png';
import rain_night_img from '../assets/image/rain_night.png';
import snow_day_img from '../assets/image/snow_day.png';
import snow_night_img from '../assets/image/snow_night.png';
import thunderstorm_day_img from '../assets/image/thunderstorm_day.png';
import thunderstorm_night_img from '../assets/image/thunderstorm_night-1.png';


const Image = (() => {
  const weatherImgs = {
    '200D': thunderstorm_day_img,
    '200N': thunderstorm_night_img,
    '300D': drizzle_day_img,
    '300N': drizzle_night_img,
    '500D': rain_day_img,
    '500N': rain_night_img,
    '600D': snow_day_img,
    '600N': snow_night_img,
    '700D': fog_day_img,
    '700N': fog_night_img,
    '800D': clear_day_img,
    '800N': clear_night_img,
    '801D': clouds_day_img,
    '801N': clouds_night_img
  }

  const getWeatherImg = (weatherId, night) => {
    let imgCode = '';
    let dayNightCode = night ? 'N' : 'D';

    if (weatherId > 800) {
      imgCode = 801 + dayNightCode;
    } else {
      imgCode = Math.round(weatherId / 100) * 100 + dayNightCode;
    };

    return weatherImgs[imgCode];
  }

  return {
    getWeatherImg,
  }


})();

export default Image;

