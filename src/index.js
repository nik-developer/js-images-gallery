import apiService from './apiService';
import './sass/main.scss';

import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
import * as basicLightbox from 'basiclightbox';

const searchFormRef = document.querySelector('.search-form');
const searchBtnRef = document.querySelector('.btn-search-js');
const loadMoreBtnRef = document.querySelector('.btn-primary-js');
const clearBtnRef = document.querySelector('.btn-clear-js');
const spinnerRef = document.querySelector('.spinner');
const scrollUpBtnRef = document.querySelector('.btn-scroll-js');

const galleryRef = document.querySelector('.js-gallery');

searchFormRef.addEventListener('submit', searchImage);
searchBtnRef.addEventListener('submit', searchImage);
loadMoreBtnRef.addEventListener('click', fetchGAlleryImage);
clearBtnRef.addEventListener('click', clearPage);
scrollUpBtnRef.addEventListener('click', scrollUp);
galleryRef.addEventListener('click', openModal);

function searchImage(event) {
  event.preventDefault();

  const form = event.currentTarget;
  apiService.query = form.elements.query.value;

  clearHits();
  apiService.resetPage();

  fetchGAlleryImage();
  form.reset();
}

function fetchGAlleryImage() {
  loadMoreBtnRef.classList.add('is-hidden');
  scrollUpBtnRef.classList.add('is-hidden');

  spinnerRef.classList.remove('is-hidden');

  apiService
    .fetchGAlleryImage()
    .then(hits => {
      updateGalleryMarkup(hits);
      loadMoreBtnRef.classList.remove('is-hidden');
      scrollUpBtnRef.classList.remove('is-hidden');

      window.scrollTo({
        top: document.documentElement.offsetHeight,
        behavior: 'smooth',
      });
    })
    .finally(() => {
      spinnerRef.classList.add('is-hidden');
    });
}

function updateGalleryMarkup(hits) {
  const markup = hits
    .map(item => {
      return `<li class="gallety-item">
      
      <div class="photo-card">
      <img class="gallery-img" width="500" height="150" src="${item.webformatURL}" data-largeimg="${item.largeImageURL}" alt"${item.tags}">
  <div class="stats">
    <p class="stats-item"> ${item.likes}
     <svg class="svg" style="width:24px;height:24px" viewBox="0 0 24 24">
    <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
     </svg>
    </p>
    <p class="stats-item"> ${item.views}
      <svg class="svg" style="width:24px;height:24px" viewBox="0 0 24 24">
    <path d="M12,2A9,9 0 0,0 3,11C3,14.03 4.53,16.82 7,18.47V22H9V19H11V22H13V19H15V22H17V18.46C19.47,16.81 21,14 21,11A9,9 0 0,0 12,2M8,11A2,2 0 0,1 10,13A2,2 0 0,1 8,15A2,2 0 0,1 6,13A2,2 0 0,1 8,11M16,11A2,2 0 0,1 18,13A2,2 0 0,1 16,15A2,2 0 0,1 14,13A2,2 0 0,1 16,11M12,14L13.5,17H10.5L12,14Z" />
      </svg>
    </p>
    <p class="stats-item"> ${item.comments}
      <svg class="svg" style="width:24px;height:24px" viewBox="0 0 24 24">
    <path d="M3 5H21V9H3V5M3 10H21V14H3V10M3 15H21V19H3V15Z" />
      </svg>
    </p>
    <p class="stats-item"> ${item.downloads}
      <svg class="svg" style="width:24px;height:24px" viewBox="0 0 24 24">
    <path d="M10,4H14V13L17.5,9.5L19.92,11.92L12,19.84L4.08,11.92L6.5,9.5L10,13V4Z" />
      </svg>
    </p>
  </div>
</div>
    </li>`;
    })
    .join('');
  galleryRef.insertAdjacentHTML('beforeend', markup);
}
function openModal(event) {
  const target = event.target;

  if (target.nodeName !== 'IMG') {
    return;
  }
  const url = target.dataset.largeimg;
  const alt = target.alt;

  basicLightbox.create(`<img src=${url} alt=${alt}>`).show();
}
function clearPage() {
  clearHits();
  loadMoreBtnRef.classList.add('is-hidden');
  scrollUpBtnRef.classList.add('is-hidden');
}
function clearHits() {
  galleryRef.innerHTML = '';
}
function scrollUp() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
