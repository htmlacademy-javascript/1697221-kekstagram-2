const RANDOM_PHOTOS_QUANTITY = 10;

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

const sortByRandom = () => Math.random() - 0.5;

const sortByCommentsQuantity = (postA, postB) => postB.comments.length - postA.comments.length;

const onFilterDefaultButtonClick = (array, renderGallery) => {
  removeActiveClass();
  filterDefaultButton.classList.add('img-filters__button--active');
  renderGallery(array);
};

const onFilterRandomButtonClick = (array, renderGallery) => {
  removeActiveClass();
  filterRandomButton.classList.add('img-filters__button--active');
  const modifiedArray = array.slice().sort(sortByRandom).slice(0, RANDOM_PHOTOS_QUANTITY);
  renderGallery(modifiedArray);
};

const onFilterDiscussedButtonClick = (array, renderGallery) => {
  removeActiveClass();
  filterDiscussedButton.classList.add('img-filters__button--active');
  const modifiedArray = array.slice().sort(sortByCommentsQuantity);
  renderGallery(modifiedArray);
};

const initFilterSection = (data, renderGallery) => {
  filterSection.classList.remove('img-filters--inactive');
  if (filters) {
    filterDefaultButton.addEventListener('click', () => onFilterDefaultButtonClick(data, renderGallery));
    filterRandomButton.addEventListener('click', () => onFilterRandomButtonClick(data, renderGallery));
    filterDiscussedButton.addEventListener('click', () => onFilterDiscussedButtonClick(data, renderGallery));
  }
};

export {initFilterSection};
