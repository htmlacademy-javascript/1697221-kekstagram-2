import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
// const shownComments = bigPicture.querySelector('.social__comment-shown-count');
const totalComments = bigPicture.querySelector('.social__comment-total-count');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentSection = bigPicture.querySelector('.social__comment-count');
const commentLoader = bigPicture.querySelector('.comments-loader');
const body = document.querySelector('body');
// const commentsList = bigPicture.querySelector('.social__comments');

const generateBigPicture = ({url, description, likes, comments}) => {
  bigPictureImage.src = url;
  bigPictureDescription.textContent = description;
  likesCount.textContent = likes;
  totalComments.textContent = comments.length;
  // shownComments.textContent = 5;
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture () {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  body.classList.add('modal-open');
}

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  body.classList.remove('modal-open');
}

closeButton.addEventListener('click', closeBigPicture);


export {bigPicture, commentSection, commentLoader, openBigPicture, generateBigPicture};
