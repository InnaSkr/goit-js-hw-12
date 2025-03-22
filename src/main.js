import { getImage } from './js/pixabay-api.js';
import { make } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form-find-img');
const message = document.querySelector('.message');
const gallery = document.querySelector('.gallery');
const input = document.querySelector('.enter-img');
const btnLoadMore = document.querySelector('.more');
let currentPage = 1;
let searchQuery = '';

form.addEventListener('submit', async e => {
  e.preventDefault();
  message.innerHTML = 'Wait, the image is loaded';
  searchQuery = input.value.trim();
  currentPage = 1;
  gallery.innerHTML = '';
  try {
    const images = await getImage(searchQuery, currentPage);
    if (images.hits.length === 0) {
      iziToast.error({
        position: 'topRight',
        message: `Sorry, there are no images matching your search ${searchQuery}. Please try again!`,
      });
      return;
    }
    make(images.hits);
    if (images.totalHits > 40) {
      btnLoadMore.classList.remove('hidden');
    }
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      message: error.message,
    });
  } finally {
    message.textContent = '';
  }
});

btnLoadMore.addEventListener('click', loadMore);

async function loadMore() {
  currentPage++;
  message.innerHTML = 'Wait, the image is loaded';
  try {
    const images = await getImage(searchQuery, currentPage);
    make(images.hits);
    smoothScroll();
    if (currentPage === Math.ceil(images.totalHits / 40)) {
      btnLoadMore.classList.add('hidden');
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      message: error.message,
    });
  } finally {
    message.textContent = '';
  }
}

function smoothScroll() {
  const elem = document.querySelector('.gallery');
  const rect = elem.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: rect.height * 2,
    behavior: 'smooth',
  });
}