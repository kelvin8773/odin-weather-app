import fetchData from './fetch_api';

const IpLocation = (() => {
  const IP_LOCATION_URL = 'https://extreme-ip-lookup.com/json/';

  const query = async () => {
    const response = await fetchData(IP_LOCATION_URL);
    return (response.status === "success") ? response : false;
  }

  return {
    query,
  }

})();

export default IpLocation;