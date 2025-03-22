// import {getRandomNumber} from './util.js';

// const RANDOM_PHOTOS_QUANTITY = 10;

const filterSection = document.querySelector('.img-filters');
const filters = filterSection.querySelector('.img-filters__form');
// const filterDefaultButton = filterSection.querySelector('#filter-default');
// const filterRandomButton = filterSection.querySelector('#filter-random');
// const filterDiscussedButton = filterSection.querySelector('#filter-discussed');

const showFilterSection = () => {
  filterSection.classList.remove('img-filters--inactive');

  if (filters) {
    filters.addEventListener('click', (evt) => {
      const buttons = document.querySelectorAll('.img-filters__button');
      buttons.forEach((button) => button. classList.remove('img-filters__button--active'));
      evt.target.classList.add('img-filters__button--active');
    });
  }
};

// const sortByDefault = () => 0;
// const sortByRandom = () => Math.random() - 0.5;
// const sortByCommentsQuantity = (postA, postB) => postB.comments.length - postA.comments.length;

// onFilterDefault = () => {};

// filterDefault.addEventListener('click', onFilterDefault);


// const getRandomPosts = (array) => {
//   const newArray = [];
//   const numberArray = [];
//   let number;
//   while (numberArray.length < RANDOM_PHOTOS_QUANTITY) {
//     number = getRandomNumber(0, array.length - 1);
//     if (!numberArray.includes(number)) {
//       numberArray.push(number);
//       newArray.push(array[number]);
//     }
//   }
//   return newArray;
// };

// const onFilterDiscussedButtonClick = () => {
//   filterDiscussedButton.classList.add('img-filters__button--active');
//   console.log('click');
// };

// filterDiscussedButton.addEventListener('click', onFilterDiscussedButtonClick);

export {showFilterSection};
