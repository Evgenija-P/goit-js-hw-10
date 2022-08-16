export function fetchCountries(name) {
  const url = `https://restcountries.com/v3.1/name`;
  return fetch(`${url}/${name}`).then(response => response.json());
}
