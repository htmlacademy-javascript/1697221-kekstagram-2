import {isEscapeKey} from './util.js';
import {renderComments} from './comments.js';

const STEP = 5;

const body = document.querySelector('body');
const modal = document.querySelector('.big-picture');
const closeButton = modal.querySelector('.big-picture__cancel');
const fullImage = modal.querySelector('.big-picture__img img');
const fullImageDescription = modal.querySelector('.social__caption');
const likesCount = modal.querySelector('.likes-count');
const commentLoader = modal.querySelector('.social__comments-loader');
const totalComments = modal.querySelector('.social__comment-total-count');
const commentsList = modal.querySelector('.social__comments');
const shownCommentCounter = modal.querySelector('.social__comment-shown-count');

const generateBigPicture = ({url, description, likes, comments}) => {
  fullImage.src = url;
  fullImageDescription.textContent = description;
  likesCount.textContent = likes;
  totalComments.textContent = comments.length;
  commentsList.innerHTML = '';
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

let onCommentLoader;

function openBigPicture (item) {
  let startValue = 0;
  let finalValue = startValue + STEP;
  modal.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  body.classList.add('modal-open');
  generateBigPicture(item);
  renderComments(startValue, finalValue, item.comments);
  shownCommentCounter.textContent = commentsList.childElementCount;

  if (finalValue >= item.comments.length) {
    commentLoader.classList.add('hidden');
  } else {
    commentLoader.classList.remove('hidden');
  }

  onCommentLoader = () => {
    startValue = startValue + STEP;
    finalValue = startValue + STEP;
    renderComments(startValue, finalValue, item.comments);
    shownCommentCounter.textContent = commentsList.childElementCount;

    console.log(startValue, finalValue, item.comments.length);
    // if (commentsList.childElementCount === item.comments.length) {
    if (finalValue >= item.comments.length) {
      commentLoader.classList.add('hidden');
    }
  };

  commentLoader.addEventListener('click', onCommentLoader);
}

function closeBigPicture () {
  modal.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentLoader.removeEventListener('click', onCommentLoader);
  body.classList.remove('modal-open');
}

closeButton.addEventListener('click', closeBigPicture);

export {openBigPicture, generateBigPicture};
