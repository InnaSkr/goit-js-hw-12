import axios from 'axios';
import { removeLoadStroke } from './render-functions';

export async function getImage(input) {
    const apiKey = '49113920-f9af0cc3a936c3f1f6e808981';

    const data = await axios.get('https://pixabay.com/api/', {
        params: {
            key: apiKey,
            q: encodeURIComponent(input),
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: page,
            per_page: perPage,
        },
    });

    return data;
}

let page = 1;
const perPage = 15;

export function resetPage() {
    page = 1;
}

export function addPage() {
    page += 1;
}

export function ifEndOfList(data, loadMessageBox) {
    const totalHits = data.data.totalHits;
    const loadMoreButton = document.querySelector('.load-more-button');

    if (totalHits < page * perPage) {
        removeLoadStroke(loadMessageBox);
        loadMoreButton.classList.add('hide');
        loadMessageBox.innerHTML =
            '<p class="loading-text">We\'re sorry, but you\'ve reached the end of search results.</p>';
    } else if (page >= 2) {
        const list = document.querySelector('.gallery-item');
        const rect = list.getBoundingClientRect();
        window.scrollBy({
            top: rect.height * 2,
            behavior: 'smooth',
        });
    }
}