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

const rerenderGallery = (items) => {
  clearGallery();
  renderGallery(items);
};

const debouncedRenderGallery = debounce(rerenderGallery, RERENDER_DELAY);

const sortByRandom = () => Math.random() - 0.5;

const sortByCommentsQuantity = (postA, postB) => postB.comments.length - postA.comments.length;


const Filters = {
  DEFAULT: {buttonName: filterDefaultButton, arrayModifier: false, },
  RANDOM: {buttonName: filterRandomButton, arrayModifier: true, sortingFunction: sortByRandom, lengthLimit: RANDOM_PHOTOS_QUANTITY},
  DISCUSSED: {buttonName: filterDiscussedButton, arrayModifier: true, sortingFunction: sortByCommentsQuantity},
};

const modifyArray = (items, {arrayModifier, sortingFunction = () => 0, lengthLimit = items.length}) => {
  if (arrayModifier) {
    return items.slice().sort(sortingFunction).slice(0, lengthLimit);
  }
  return items;
};

const applyFilter = (filter, items) => {
  removeActiveClass();
  filter.buttonName.classList.add('img-filters__button--active');
  const filteredItems = modifyArray(items, filter);
  debouncedRenderGallery(filteredItems);
};

const initFilterSection = (items) => {
  filterSection.classList.remove('img-filters--inactive');
  if (filters) {
    filterDefaultButton.addEventListener('click', () => applyFilter(Filters.DEFAULT, items));
    filterRandomButton.addEventListener('click', () => applyFilter(Filters.RANDOM, items));
    filterDiscussedButton.addEventListener('click', () => applyFilter(Filters.DISCUSSED, items));
  }
};

const initGallery = (items) => {
  renderGallery(items);
  initFilterSection(items);
};

export {initGallery};
