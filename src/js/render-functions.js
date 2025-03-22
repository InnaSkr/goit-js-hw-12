import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const ulGallery = document.querySelector('.gallery');

export function make(imagesArr) {
  const photos = imagesArr
    .map(image => {
      return `
        <li class="gallery-item">
            <a class='gallery-link' href="${image.largeImageURL}">
              <img class="li-img"
              src="${image.webformatURL}" 
              alt="${image.tags}/> 
              <div class="li-text">
                <table class="table">
                    <tr><td>Likes</td><td>Views</td><td>Comment</td><td>Downloads</tr>
                    <tr><td>>${image.likes}</td><td>${image.views}</td><td>${image.comments}</td><td>${image.downloads}</tr>
                </table>   
                </div>
              </a>
            </li>
        `;
    })
    .join('');

  ulGallery.insertAdjacentHTML('beforeend', photos);

  lightbox.refresh();
}

const lightbox = new SimpleLightbox('.gallery' + ' a', {
  captionsData: 'alt',
  captionDelay: 250,
});