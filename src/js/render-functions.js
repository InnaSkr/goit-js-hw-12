import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = null;

export function populateGallery(pixabays = []) {
  const imagesContainer = document.querySelector('.gallery');

  const galleryHTML = pixabays
    .map(image => {
      return `
      <div class="card-container">
        <div class="card">
          <a href="${image.largeImageURL}">
            <img class="card-image" src="${image.webformatURL}" alt="${image.tags}" />
          </a>
          <div class="card-body">
            <div class="card-item">
              <h4>Likes</h4><p>${image.likes}</p>
            </div>
            <div class="card-item">
              <h4>Views</h4><p>${image.views}</p>
            </div>
            <div class="card-item">
              <h4>Comments</h4><p>${image.comments}</p>
            </div>
            <div class="card-item">
              <h4>Downloads</h4><p>${image.downloads}</p>
            </div>
          </div>
        </div>
      </div>
    `;
    })
    .join('');

  imagesContainer.insertAdjacentHTML('beforeend', galleryHTML);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a');
  } else {
    lightbox.refresh();
  }
}
export function clearGallery() {
  const imagesContainer = document.querySelector('.gallery');
  imagesContainer.innerHTML = '';
}