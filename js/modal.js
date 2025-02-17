import {isEscapeKey} from './util.js';
import {showComments, onCommentLoader} from './comments.js';

// const STEP = 5;

const body = document.querySelector('body');
const modal = document.querySelector('.big-picture');
const closeButton = modal.querySelector('.big-picture__cancel');
const fullImage = modal.querySelector('.big-picture__img img');
const fullImageDescription = modal.querySelector('.social__caption');
const likesCount = modal.querySelector('.likes-count');
const commentLoader = modal.querySelector('.social__comments-loader');
const totalComments = modal.querySelector('.social__comment-total-count');


const generateBigPicture = ({url, description, likes, comments}) => {
  fullImage.src = url;
  fullImageDescription.textContent = description;
  likesCount.textContent = likes;
  totalComments.textContent = comments.length;
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture (item) {
  modal.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  body.classList.add('modal-open');
  generateBigPicture(item);
  showComments(item);
}

function closeBigPicture () {
  modal.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentLoader.removeEventListener('click', onCommentLoader);
  body.classList.remove('modal-open');
}

closeButton.addEventListener('click', closeBigPicture);

export {openBigPicture, generateBigPicture};
