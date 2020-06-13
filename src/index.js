import './styles.css';
import api from './apiService.js';
import dElements from './template/result.hbs';

import { alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';

const refs = {
  input: document.querySelector('.input'),
  ulResult: document.querySelector('.gallery'),
  items: document.querySelector('.photo-card'),
};

const debounce = require('lodash.debounce');

refs.input.addEventListener('input', debounce(inputLogic, 500));

function inputLogic(e) {
  refs.ulResult.innerHTML = '';
  if (e.target.value) {
    api(refs.input.value, pageIcrement, getData);
  }
}

function getData(data) {
  if (data.length > 0) {
    showPhotos(data);
  } else {
    onError();
  }
}

function showPhotos(array) {
  const html = dElements(array);

  refs.items.insertAdjacentHTML('beforeend', html);
}

function pageIcrement() {
  let pageNumber = 1;
  const step = 1;

  if (aaa) {
    pageNumber += step;
  }
}

function onError(notification) {
  defaultModules.set(PNotifyMobile, {});

  alert('try something else');
}
