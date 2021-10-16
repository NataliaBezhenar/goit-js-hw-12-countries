const BASE_URL = "https://restcountries.com/v2";

function fetchCountryByName(countryName) {

  return fetch(`${BASE_URL}/name/${countryName}`)
  .then((response) => {
    return response.json();
  });
}

export default { fetchCountryByName };
