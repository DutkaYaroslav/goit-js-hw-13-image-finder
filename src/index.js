import './styles.css';
import api from './apiService.js';

import { alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';

const refs = {
  input: document.querySelector('.input'),
  ulResult: document.querySelector('.gallery'),
  likes: document.querySelector('#likes'),
  views: document.querySelector('#views'),
  comments: document.querySelector('#comments'),
  downloads: document.querySelector('#downloads'),
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

  function pageIcrement() {
    let pageNumber = 1;
    const step = 1;

    if (*) {
      pageNumber += step;
    }
  }
}

function onError(notification) {
  defaultModules.set(PNotifyMobile, {});

  alert('try something else');
}
