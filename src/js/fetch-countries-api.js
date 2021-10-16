import API from './fetchCountries';
const debounce = require('lodash.debounce');
import { alert, notice, info, success, error, defaultModules } from '@pnotify/core';
import * as PNotifyDesktop from '@pnotify/desktop';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import getRefs from "./refs";
import countryCardTmpl from "../templates/country-card.hbs";


const refs = getRefs();


refs.searchQuery.addEventListener(
  'input',
  debounce(() => {

    if (refs.searchQuery.value.length === 0) {
      return;
    }
    API.fetchCountries(refs.searchQuery.value).then(renderCountries).catch(onFetchError);
  }, 1000),
);

function renderCountries(res) {
if(res.length===1){
  const markup = countryCardTmpl(res);
  refs.cardContainer.innerHTML = markup;

}




  refs.output.textContent = res[0].name;
  if (res.length > 10) {
    console.log('res length is ' + res.length);

    error({
      text: 'Too many matches found. Please enter more specific query!',
      modules: new Map([...defaultModules, [PNotifyDesktop, {}]]),
    });
    
    refs.output.textContent = '';
  }
}

function onFetchError(error) {
  alert('Something went wrong, your country was not found!');
  refs.searchQuery.value='';
}
