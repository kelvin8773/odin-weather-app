
import clearDay from '../assets/image/clear_day.jpg';
import clearNight from '../assets/image/clear_night.jpg';
import cloudsDay from '../assets/image/clouds_day.jpg';
import cloudsNight from '../assets/image/clouds_night.jpg';
import drizzleDay from '../assets/image/drizzle_day.jpg';
import drizzleNight from '../assets/image/drizzle_night.jpg';
import fogDay from '../assets/image/fog_day.jpg';
import fogNight from '../assets/image/fog_night1.jpg';
import rainDay from '../assets/image/rain_day.jpg';
import rainNight from '../assets/image/rain_night.jpg';
import snowDay from '../assets/image/snow_day.jpg';
import snowNight from '../assets/image/snow_night.jpg';
import thunderstormDay from '../assets/image/thunderstorm_day.jpg';
import thunderstormNight from '../assets/image/thunderstorm_night.jpg';


const Image = (() => {
  const weatherImgs = {
    '200D': thunderstormDay,
    '200N': thunderstormNight,
    '300D': drizzleDay,
    '300N': drizzleNight,
    '500D': rainDay,
    '500N': rainNight,
    '600D': snowDay,
    '600N': snowNight,
    '700D': fogDay,
    '700N': fogNight,
    '800D': clearDay,
    '800N': clearNight,
    '801D': cloudsDay,
    '801N': cloudsNight,
  };

  const getWeatherImg = (weatherId, night) => {
    let imgCode = '';
    const dayNightCode = night ? 'N' : 'D';

    if (weatherId > 800) {
      imgCode = 801 + dayNightCode;
    } else {
      imgCode = Math.round(weatherId / 100) * 100 + dayNightCode;
    }

    return weatherImgs[imgCode];
  };

  return {
    getWeatherImg,
  };
})();

export default Image;
