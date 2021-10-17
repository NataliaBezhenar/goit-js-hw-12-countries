const BASE_URL = 'https://restcountries.com/v2';

function fetchCountries(searchQuery) {
  return fetch(`${BASE_URL}/name/${searchQuery}`).then(response => {
    {
      if (response.ok) {
        return response.json();
      }
    }
    throw new Error('Not 2xx response');
  });
}

export default { fetchCountries };
