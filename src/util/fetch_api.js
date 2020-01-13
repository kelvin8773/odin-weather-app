const fetchData = async (url) => {
  try {
    const response = await fetch(url, { mode: 'cors' });
    return response.json();
  } catch (error) {
    return error;
  }
};

export default fetchData;
