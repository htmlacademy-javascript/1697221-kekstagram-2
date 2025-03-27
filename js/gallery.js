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

const sortByRandom = () => Math.random() - 0.5;

const sortByCommentsQuantity = (postA, postB) => postB.comments.length - postA.comments.length;


const Filters = {
  DEFAULT: {buttonName: filterDefaultButton, arrayModifier: false, },
  RANDOM: {buttonName: filterRandomButton, arrayModifier: true, sortingFunction: sortByRandom, lengthLimit: RANDOM_PHOTOS_QUANTITY},
  DISCUSSED: {buttonName: filterDiscussedButton, arrayModifier: true, sortingFunction: sortByCommentsQuantity},
};

const modifyArray = (array, {arrayModifier, sortingFunction = () => 0, lengthLimit = array.length}) => {
  if (arrayModifier) {
    return array.slice().sort(sortingFunction).slice(0, lengthLimit);
  }
  return array;
};

const applyFilter = (filter, array) => {
  removeActiveClass();
  filter.buttonName.classList.add('img-filters__button--active');
  const modifiedArray = modifyArray(array, filter);
  debouncedRenderGallery(modifiedArray);
};

const initFilterSection = (array) => {
  filterSection.classList.remove('img-filters--inactive');
  if (filters) {
    filterDefaultButton.addEventListener('click', () => applyFilter(Filters.DEFAULT, array));
    filterRandomButton.addEventListener('click', () => applyFilter(Filters.RANDOM, array));
    filterDiscussedButton.addEventListener('click', () => applyFilter(Filters.DISCUSSED, array));
  }
};

const initGallery = (array) => {
  renderGallery(array);
  initFilterSection(array);
};

export {initGallery};
