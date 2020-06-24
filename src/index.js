import './styles.css';
import api from './apiService.js';
import dElements from './template/result.hbs';
import * as basicLightbox from 'basiclightbox'
import '../node_modules/basiclightbox/src/styles/main.scss';

import {
  alert,
  defaultModules
} from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';

const refs = {
  input: document.querySelector('#search-form'),
  ulResult: document.querySelector('.gallery'),
  items: document.querySelector('.photo-card'),
  loadMore: document.querySelector('.load-more_button'),
  image: document.querySelector('.small-image'),
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
    refs.loadMore.classList.remove('hidden');
    showPhotos(data.hits);
  } else {
    onError();
  }

  if (page === 1) {
    window.scrollBy({
      top: 0,
    })
  } else {
    window.scrollBy({
      top: 800,
      left: 100,
      behavior: 'smooth'
    });
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



refs.ulResult.addEventListener('click', bigImage)

function bigImage(e) {
  if (e.target.nodeName !== 'IMG') {

    return;

  }
  const largeImageURL = e.target.dataset.original

  const instance = basicLightbox.create(` <img src="${largeImageURL}" width="1280" height="980">
  `)

  instance.show()
}
