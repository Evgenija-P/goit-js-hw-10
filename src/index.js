import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
var debounce = require('lodash.debounce');

const input = document.querySelector(`#search-box`);
const countryConteiner = document.querySelector(`.country-info`);
const DEBOUNCE_DELAY = 300;

input.addEventListener(`input`, debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
  const seachCountry = input.value.trim();
  console.log(seachCountry);

  fetchCountries(seachCountry)
    .then(listCountry)
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
    });
}

function listCountry(country) {
  listCleaner();
  if (country.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (country.length > 1 && country.length <= 10) {
    listCountryAll(country);
  } else listCountryOne(country);
}

function listCountryOne(country) {
  const language = Object.values(country[0].languages).join(', ');
  const countrysListBildOne = country
    .map(({ name: { official }, flags: { svg }, capital, population }) => {
      return `<li class="list-country">
    <img src="${svg}" alt="${official}" class="list-svg">
          <h2> ${official}</h2></li>
          <li class="list-country-one"><span class="title-country-one">Capital: </span>${capital} </li>
<li class="list-country-one"><span class="title-country-one">Population: </span> ${population}</li>
<li class="list-country-one"><span class="title-country-one">Languages: </span> ${language}</li>`;
    })
    .join('');
  countryConteiner.insertAdjacentHTML('afterbegin', countrysListBildOne);
}

function listCountryAll(country) {
  const countrysListBild = country
    .map(({ name: { official }, flags: { svg } }) => {
      return `<li class="list-country">
    <img src="${svg}" alt="${official}" class="list-svg">
          <h3 class="list-title"> ${official}</h3>
        </li>`;
    })
    .join('');
  countryConteiner.insertAdjacentHTML('afterbegin', countrysListBild);
}

function listCleaner() {
  countryConteiner.innerHTML = '';
}
