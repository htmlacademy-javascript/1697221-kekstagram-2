import { debounce } from './util.js';
import { renderGallery } from './previews.js';

const RANDOM_PHOTOS_QUANTITY = 10;
const RERENDER_DELAY = 500;

const picturesSection = document.querySelector('.pictures');
const filterSection = document.querySelector('.img-filters');
const filters = filterSection.querySelector('.img-filters__form');
const filterButtons = filterSection.querySelectorAll('.img-filters__button');
const filterDefaultButton = filterSection.querySelector('#filter-default');
const filterRandomButton = filterSection.querySelector('#filter-random');
const filterDiscussedButton = filterSection.querySelector('#filter-discussed');

const removeActiveClass = () => {
  filterButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
};

const clearGallery = () => {
  const pictures = picturesSection.querySelectorAll('.picture');
  if (pictures.length > 0) {
    pictures.forEach((picture) => picture.remove());
  }
};

const rerenderGallery = (array) => {
  clearGallery();
  renderGallery(array);
};

const debouncedRenderGallery = debounce(rerenderGallery, RERENDER_DELAY);

const onFilterDefaultButtonClick = (array) => {
  removeActiveClass();
  filterDefaultButton.classList.add('img-filters__button--active');
  debouncedRenderGallery(array);
};

const sortByRandom = () => Math.random() - 0.5;

const onFilterRandomButtonClick = (array) => {
  removeActiveClass();
  filterRandomButton.classList.add('img-filters__button--active');
  const modifiedArray = array.slice().sort(sortByRandom).slice(0, RANDOM_PHOTOS_QUANTITY);
  debouncedRenderGallery(modifiedArray);
};

const sortByCommentsQuantity = (postA, postB) => postB.comments.length - postA.comments.length;

const onFilterDiscussedButtonClick = (array) => {
  removeActiveClass();
  filterDiscussedButton.classList.add('img-filters__button--active');
  const modifiedArray = array.slice().sort(sortByCommentsQuantity);
  debouncedRenderGallery(modifiedArray);
};

const initFilterSection = (array) => {
  filterSection.classList.remove('img-filters--inactive');
  if (filters) {
    filterDefaultButton.addEventListener('click', () => onFilterDefaultButtonClick(array, debouncedRenderGallery));
    filterRandomButton.addEventListener('click', () => onFilterRandomButtonClick(array, debouncedRenderGallery));
    filterDiscussedButton.addEventListener('click', () => onFilterDiscussedButtonClick(array, debouncedRenderGallery));
  }
};

const initGallery = (array) => {
  renderGallery(array);
  initFilterSection(array);
};

export {initGallery};
