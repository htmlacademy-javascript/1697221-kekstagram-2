import {isEscapeKey, hideElement, showElement} from './util.js';
import { pristine } from './validation.js';
import { initScaling, destroyScaling } from './scaling.js';
import { initSlider, destroySlider } from './effects.js';

const body = document.body;
const uploadForm = document.querySelector('.img-upload__form');
const uploadControl = uploadForm.querySelector('.img-upload__input');
const editingForm = uploadForm.querySelector('.img-upload__overlay');
const closeButton = uploadForm.querySelector('.img-upload__cancel');
const hashtagField = uploadForm.querySelector('.text__hashtags');
const descriptionField = uploadForm.querySelector('.text__description');


const onDocumentKeydown = (evt) => {
  if ((hashtagField === document.activeElement || descriptionField === document.activeElement) && isEscapeKey(evt)) {
    evt.preventDefault();
  } else if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadForm();
  }
};

const onUploadControlChange = () => {
  showElement(editingForm);
  body.classList.add('modal');
  document.addEventListener('keydown', onDocumentKeydown);
  initScaling();
  initSlider();
};

function closeUploadForm () {
  hideElement(editingForm);
  body.classList.remove('modal');
  document.removeEventListener('keydown', onDocumentKeydown);
  destroyScaling();
  destroySlider();
  uploadControl.value = '';
  hashtagField.value = '';
  descriptionField.value = '';
}

const onCloseButtonClick = () => closeUploadForm();

uploadControl.addEventListener('change', onUploadControlChange);

closeButton.addEventListener('click', onCloseButtonClick);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    uploadForm.submit();
  }
});


