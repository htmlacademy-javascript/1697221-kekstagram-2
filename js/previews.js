import {dataArray} from './data.js';
import {openBigPicture} from './modal.js';


const picturesSection = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const generatePicture = ({url, description, likes, comments, id}) => {
  const element = pictureTemplate.cloneNode(true);
  const img = element.querySelector('.picture__img');
  img.src = url;
  img.alt = description;
  element.querySelector('.picture__likes').textContent = likes;
  element.querySelector('.picture__comments').textContent = comments.length;
  element.dataset.id = id;

  return element;
};

const generatePosts = (array) => {
  const fragment = document.createDocumentFragment();

  array.forEach((item) => {
    const post = generatePicture(item);
    fragment.append(post);
  });

  picturesSection.append(fragment);
};


picturesSection.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();

    const getPictureData = (id) => dataArray.find((dataItem) => dataItem.id === id);

    const idNumber = Number(evt.target.closest('.picture').dataset.id);
    const item = getPictureData (idNumber);
    openBigPicture(item);
  }
});

export {picturesSection, generatePosts};
