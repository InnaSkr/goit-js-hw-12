import { fetchImages } from './js/paxabay-api.js';
import { renderImages, clearGallery, smoothScroll } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

let query = '';
let page = 1;
const PER_PAGE = 40;

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    query = event.target.elements.searchQuery.value.trim();
    if (!query) {
        iziToast.warning({ title: 'Warning', message: 'Please enter a search term!' });
        return;
    }

    page = 1;
    clearGallery();
    loadMoreBtn.style.display = 'none';
    loader.style.display = 'block';

    try {
        const data = await fetchImages(query, page);
        if (data.hits.length === 0) {
            iziToast.error({ title: 'Error', message: 'Sorry, there are no images matching your search query. Please try again!' });
        } else {
            renderImages(data.hits);
            if (data.totalHits > PER_PAGE) {
                loadMoreBtn.style.display = 'block';
            }
        }
    } catch (error) {
        iziToast.error({ title: 'Error', message: 'Something went wrong. Please try again later.' });
    }

    loader.style.display = 'none';
    form.reset();
});

loadMoreBtn.addEventListener('click', async () => {
    page += 1;
    loader.style.display = 'block';

    try {
        const data = await fetchImages(query, page);
        renderImages(data.hits);
        smoothScroll();

        const maxPages = Math.ceil(data.totalHits / PER_PAGE);
        if (page >= maxPages) {
            loadMoreBtn.style.display = 'none';
            iziToast.info({ title: 'Info', message: "We're sorry, but you've reached the end of search results." });
        }
    } catch (error) {
        iziToast.error({ title: 'Error', message: 'Something went wrong. Please try again later.' });
    }

    loader.style.display = 'none';
});