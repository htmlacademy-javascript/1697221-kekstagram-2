import {isEscapeKey} from './util.js';
import {initCommentsSection, destroyCommentSection} from './comments.js';


const body = document.body;
const modal = document.querySelector('.big-picture');
const closeButton = modal.querySelector('.big-picture__cancel');
const fullImage = modal.querySelector('.big-picture__img img');
const fullImageDescription = modal.querySelector('.social__caption');
const likesCount = modal.querySelector('.likes-count');


const generateBigPicture = ({url, description, likes}) => {
  fullImage.src = url;
  fullImageDescription.textContent = description;
  likesCount.textContent = likes;
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const openBigPicture = (item) => {
  modal.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  body.classList.add('modal-open');
  generateBigPicture(item);
  initCommentsSection(item);
};

function closeBigPicture () {
  modal.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  body.classList.remove('modal-open');
  destroyCommentSection();
}

const onCloseButtonClick = () => closeBigPicture();

closeButton.addEventListener('click', onCloseButtonClick);

export {openBigPicture, generateBigPicture};
