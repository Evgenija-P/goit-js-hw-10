import './css/styles.css';

// import isObject from './isObject.js';
// import root from './.internal/root.js';
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');

const countryConteiner = document.querySelector(`.country-info`);
const DEBOUNCE_DELAY = 300;

import { fetchCountries } from './fetchCountries.js';
const input = document.querySelector(`#search-box`);
input.addEventListener(`input`, debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
  const seachCountry = input.value;
  console.log(seachCountry);

  fetchCountries(input.value).then(listCountry).catch().finally();
}

function listCountry(country) {
  //   console.log(country);

  if (country.length === 1) {
    console.log(country[0].name.official);
    const countrysListBild = country
      .map(
        count =>
          `<div>
        <img
      src="${country[0].flags.svg}"
      alt="${country[0].name.official}"/>  
      <span>"${country[0].name.official}"</span></div>`
      )
      .join('');
    countryConteiner.insertAdjacentHTML('afterbegin', countrysListBild);
  } else if (country.length > 1 && country.length < 10) {
    console.log(`amount 1 - 10`);
  } else console.log(`amount != 1`);
}

// countryConteiner.insertAdjacentHTML('afterbegin', countrysListBild);
// console.log(countrysListBild);
// const options {
// name.official - полное имя страны
// capital - столица
// population - население
// flags.svg - ссылка на изображение флага
// languages - массив языков
// }

// function listCountry(countrys) {
//   const bild = countryList(countrys);
// }
// function listCountryOne(countrys) {}
// function listCountryLarge(countrys) {}
