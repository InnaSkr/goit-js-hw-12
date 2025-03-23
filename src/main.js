import { getImage, resetPage, addPage, ifEndOfList } from './js/pixabay-api';
import { galleryMarkup, addLoadStroke, removeLoadStroke } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loadMessageBox = document.querySelector('.load-message-box');
const loadMoreButton = document.querySelector('.load-more-button');

form.addEventListener('submit', handleSubmit);
loadMoreButton.addEventListener('click', loadMoreClick);

function handleSubmit(event) {
    event.preventDefault();

    const inputValue = document.querySelector('.user-input').value.trim();

    if (inputValue === '') {
        return;
    }

    gallery.innerHTML = '';
    addLoadStroke(loadMessageBox);
    loadMoreButton.classList.add('hide');
    resetPage();

    doTheWork(inputValue);
}

function loadMoreClick(event) {
    const inputValue = document.querySelector('.user-input').value.trim();
    addPage();
    addLoadStroke(loadMessageBox);
    doTheWork(inputValue);
}

function doTheWork(inputValue) {
    getImage(inputValue)
        .then(response => {
            galleryMarkup(response);
            removeLoadStroke(loadMessageBox);
            loadMoreButton.classList.remove('hide');
            ifEndOfList(response, loadMessageBox);
        })
        .catch(error => {
            iziToast.show({
                messageColor: '#FAFAFB',
                messageSize: '16px',
                backgroundColor: '#EF4040',
                iconUrl: errorIcon,
                transitionIn: 'bounceInLeft',
                position: 'topRight',
                displayMode: 'replace',
                closeOnClick: true,
                message: 'Something went wrong. Please, try again.',
            });
            console.log(error);
            removeLoadStroke(loadMessageBox);
        });
}