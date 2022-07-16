import API from './fetchCountries';
import getRefs from './refs';
import { error, defaultModules } from '@pnotify/core';
import * as PNotifyDesktop from '@pnotify/desktop';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import countryCardTmpl from '../templates/country-card.hbs';
import countriesListTmpl from '../templates/countries-list.hbs';

const debounce = require('lodash.debounce');
const refs = getRefs();
const onFetchCountries = debounce(() => {
  if (refs.searchQuery.value.length === 0) {
    return;
  }
  API.fetchCountries(refs.searchQuery.value).then(renderCountries).catch(onFetchError);
}, 1000);

refs.searchQuery.addEventListener('input', onFetchCountries);

function renderCountries(res) {
  if (res.status === 404) {
    onFetchError();
  } else if (res.length === 1) {
    refs.cardContainer.innerHTML = countryCardTmpl(res);
  } else if (res.length > 10) {
    renderError('Too many matches found. Please enter more specific query!');
  } else {
    refs.cardContainer.innerHTML = countriesListTmpl(res);
  }
}

function onFetchError() {
  renderError('Something went wrong, your country was not found!');
}

function renderError(errText) {
  refs.cardContainer.innerHTML = '';
  return error({
    text: errText,
    modules: new Map([...defaultModules, [PNotifyDesktop, {}]]),
  });
}
