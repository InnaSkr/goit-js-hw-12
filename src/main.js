import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchPixabay, PAGE_SIZE } from './js/pixabay-api';
import { populateGallery, clearGallery } from './js/render-functions';
let currentPage = 1;
let searchQuery = '';
const pixabayRefs = {
  form: document.querySelector('.form'),
  searchQueryInput: document.querySelector('.form-input'),
  imagesContainer: document.querySelector('.gallery'),
  button: document.querySelector('.form-button'),
  loader: document.querySelector('.loader'),
  buttomLoadMore: document.querySelector('.add-posts-button'),
};

pixabayRefs.form.addEventListener('submit', async event => {
  event.preventDefault();
  searchQuery = pixabayRefs.searchQueryInput.value.trim();
  currentPage = 1;
  const container = document.querySelector('.gallery');
  container.innerHTML = '';
  if (!searchQuery) {
    iziToast.error({
      messageColor: '#FAFAFB',
      iconUrl: './img/bi_x-octagon.svg',
      iconColor: 'white',
      message: 'Please enter a search word!',
      position: 'topRight',
      backgroundColor: '#ef4040',
      color: '#fafafb',
    });
    return;
  }
  // clearGallery();

  pixabayRefs.loader.style.display = 'inline-block';

  try {
    const response = await fetchPixabay(searchQuery);
    const totalPages = Math.ceil(response.totalHits / PAGE_SIZE);

    if (response.hits.length === 0) {
      iziToast.error({
        messageColor: '#FAFAFB',
        iconUrl: './img/bi_x-octagon.svg',
        iconColor: 'white',
        message:
          'Sorry, there are no images matching</br> your search query. Please, try again!',
        position: 'topRight',
        backgroundColor: '#ef4040',
        color: '#fafafb',
      });
      pixabayRefs.buttomLoadMore.style.display = 'none';
      return;
    }

    if (totalPages > currentPage) {
      pixabayRefs.buttomLoadMore.style.display = 'flex';
    } else {
      pixabayRefs.buttomLoadMore.style.display = 'none';
      iziToast.error({
        messageColor: '#FAFAFB',
        iconUrl: './img/bi_x-octagon.svg',
        iconColor: 'white',
        message:
          'We are sorry, but you have reached the end of search results.',
        position: 'topRight',
        backgroundColor: '#4e75ff',
        color: '#fafafb',
      });
    }

    populateGallery(response.hits);
    console.log(response);
  } catch (error) {
    iziToast.error({
      messageColor: '#FAFAFB',
      iconUrl: './img/bi_x-octagon.svg',
      iconColor: 'white',
      message:
        'Sorry, there are no images matching</br> your search query. Please, try again!',
      position: 'topRight',
      backgroundColor: '#ef4040',
      color: '#fafafb',
    });
  } finally {
    pixabayRefs.loader.style.display = 'none';
  }
});

pixabayRefs.buttomLoadMore.addEventListener('click', async event => {
  event.preventDefault();
  searchQuery = pixabayRefs.searchQueryInput.value.trim();
  currentPage++;

  try {
    const response = await fetchPixabay(searchQuery, currentPage);

    populateGallery(response.hits);
    console.log(response);

    const card = document
      .querySelector('.card-container')
      .getBoundingClientRect().height;

    window.scrollBy({
      top: card * 2,
      behavior: 'smooth',
    });

    pixabayRefs.buttomLoadMore.style.display = 'flex';

    if (Math.ceil(response.totalHits / PAGE_SIZE) > currentPage) {
      pixabayRefs.buttomLoadMore.style.display = 'flex';
    } else {
      pixabayRefs.buttomLoadMore.style.display = 'none';
      iziToast.error({
        messageColor: '#FAFAFB',
        iconUrl: './img/bi_x-octagon.svg',
        iconColor: 'white',
        message:
          'We are sorry, but you have reached the end of search results.',
        position: 'topRight',
        backgroundColor: '#4e75ff',
        color: '#fafafb',
      });
    }
  } catch (error) {
    iziToast.error({
      messageColor: '#FAFAFB',
      iconUrl: './img/bi_x-octagon.svg',
      iconColor: 'white',
      message:
        'Sorry, there are no images matching</br> your search query. Please, try again!',
      position: 'topRight',
      backgroundColor: '#ef4040',
      color: '#fafafb',
    });
  }
});