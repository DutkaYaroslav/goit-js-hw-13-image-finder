import './styles.css';
import api from './apiService.js';
import dElements from './template/result.hbs';

console.log(dElements)

import {
  alert,
  defaultModules
} from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';

const refs = {
  input: document.querySelector('.search-form'),
  ulResult: document.querySelector('.gallery'),
  items: document.querySelector('.photo-card'),
};



function inputLogic(e) {
  refs.ulResult.innerHTML = '';
  if (e.target.value) {
    api(refs.input.value, 1, getData);
  }
}

refs.input.addEventListener('submit', inputLogic);


function getData(data) {
  if (data.length > 0) {
    showPhotos(data);
  } else {
    onError();
  }
}

function showPhotos(array) {
  const html = array.map(arr => dElements(arr)).join('');

  refs.ulResult.insertAdjacentHTML('beforeend', html);
}


// function pageIncrement() {
//   let pageNumber = 1;
//   const step = 1;


//   pageNumber += step;

// }

function onError(notification) {
  defaultModules.set(PNotifyMobile, {});

  alert('try something else');
}


console.log(inputLogic())
