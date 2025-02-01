import {createPhotoArray} from './data.js';

const picturesSection = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const fragment = document.createDocumentFragment();

const pictureArray = createPhotoArray();

const generatePicture = ({url, description, likes, comments}) => {
  const element = pictureTemplate.cloneNode(true);
  const img = element.querySelector('.picture__img');
  img.src = url;
  img.alt = description;

  element.querySelector('.picture__likes').textContent = likes;

  element.querySelector('.picture__comments').textContent = comments.length;

  return element;
};

const generatePosts = (array) => {
  array.forEach((item) => {
    const post = generatePicture(item);
    fragment.append(post);
  });
};

generatePosts(pictureArray);

picturesSection.append(fragment);

