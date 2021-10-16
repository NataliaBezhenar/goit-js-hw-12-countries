import API from './fetchCountries';
const debounce = require('lodash.debounce');
import { alert, notice, info, success, error, defaultModules } from '@pnotify/core';
import * as PNotifyDesktop from "@pnotify/desktop";
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';




const searchQuery = document.querySelector('input');


searchQuery.addEventListener('input', 
  debounce(() => {
    console.log(searchQuery.value)
    if (searchQuery.value.length === 0) {
      return;
    }
    API.fetchCountries(searchQuery.value).then(renderCountries).catch(onFetchError);
  }, 1000))


function renderCountries(res) {
  console.log(res[0].name);
  console.log(res.length);
  document.querySelector('.output__text').textContent = res[0].name;
  if (res.length > 10) {
    console.log('res length is ' + res.length);
    
    return notice({text:"Too many matches found. Please enter more specific query!",
  modules: new Map([...defaultModules, [PNotifyDesktop, {}]])})
  }
}

function onFetchError(error) {
  alert('Something went wrong, your country was not found!');
}


