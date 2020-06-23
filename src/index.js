import './styles.css';
import api from './apiService.js';
import dElements from './template/result.hbs';

import {
  alert,
  defaultModules
} from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';

const refs = {
  input: document.querySelector('#search-form'),
  // inputInput: document.querySelector('.input'),
  ulResult: document.querySelector('.gallery'),
  items: document.querySelector('.photo-card'),
  loadMore: document.querySelector('.load-more_button'),
  image: document.querySelector('.small-image'),
  isOpen: document.querySelector('.js-lightbox'),

};

refs.input.addEventListener('submit', inputLogic);

let page = 1;

function inputLogic(e) {
  page = 1;
  e.preventDefault();
  refs.ulResult.innerHTML = '';
  const form = e.currentTarget;
  const input = form.elements.query;

  if (input.value) {
    api(input.value, page, getData);
  }
}

refs.loadMore.addEventListener('click', pageNumber);

function pageNumber(e) {
  if (refs.loadMore) {
    page += 1;

    const form = refs.input;
    const input = form.elements.query;
    api(input.value, page, getData);
  }
}

function getData(data) {
  if (data.hits.length > 0) {
    showPhotos(data.hits);
  } else {
    onError();
  }
}

function showPhotos(array) {
  const html = array.map(arr => dElements(arr)).join('');

  refs.ulResult.insertAdjacentHTML('beforeend', html);
}

function onError(notification) {
  defaultModules.set(PNotifyMobile, {});

  alert('try something else');
}

// if (refs.input) {
//   refs.loadMore.elements;
// }






function bigImage(e) {
  if (e.target === e.currentTarget) {
    return;
  }
  // e.preventDefault();
  refs.isOpen.classList.add('is-open');
  refs.image.src = e.target.largeImageURL;
  // refs.button.classList.add('lightbox__button');

  // console.log(e)
}

refs.ulResult.addEventListener('click', bigImage);
