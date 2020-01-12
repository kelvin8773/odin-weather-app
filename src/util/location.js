

const Location = (() => {
  let data = {};

  const successUpdate = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    data = {
      code: "200",
      coordination: [latitude, longitude],
      message: "Success!"
    }
    console.log(data, 'before');
    return data;
  }

  const failureUpdate = () => {
    data = {
      code: "404",
      message: "fail to get location"
    }
  }

  const getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successUpdate, failureUpdate);
    }
  }

  const getLocation = () => {
    getGeoLocation();
    return data;
  }


  return {
    getLocation
  }

})();

export default Location;


