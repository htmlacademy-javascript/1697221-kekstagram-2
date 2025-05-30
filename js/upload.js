import {isEscapeKey, hideElement, showElement} from './util.js';
import { pristine, destroyValidator } from './validation.js';
import { initScaling, destroyScaling } from './scaling.js';
import { initSlider, destroySlider } from './effects.js';
import {renderSuccessPostMessage, renderErrorPostMessage, removeMessage} from './alerts.js';
import {sendData} from './api.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const body = document.body;
const uploadForm = document.querySelector('.img-upload__form');
const uploadControl = uploadForm.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview img');
const editingForm = uploadForm.querySelector('.img-upload__overlay');
const closeButton = uploadForm.querySelector('.img-upload__cancel');
const hashtagField = uploadForm.querySelector('.text__hashtags');
const descriptionField = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const miniaturePreviews = document.querySelectorAll('.effects__preview');


const onDocumentKeydown = (evt) => {
  const error = document.querySelector('.error');
  if (error && isEscapeKey(evt)) {
    evt.preventDefault();
    removeMessage();
  } else if ((hashtagField === document.activeElement || descriptionField === document.activeElement) && isEscapeKey(evt)) {
    evt.preventDefault();
  } else if (!error && isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadForm();
  }
};

const showUploadPhoto = () => {
  const file = uploadControl.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const imageUrl = URL.createObjectURL(file);
    preview.src = imageUrl;
    miniaturePreviews.forEach((miniature) => {
      miniature.style.backgroundImage = `url(${ imageUrl })`;
    });
    preview.onload = () => URL.revokeObjectURL(imageUrl);
  }
};

const onUploadControlChange = () => {
  showUploadPhoto();
  showElement(editingForm);
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  initScaling();
  initSlider();
};

function closeUploadForm () {
  hideElement(editingForm);
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  destroyScaling();
  destroySlider();
  destroyValidator();
  uploadControl.value = '';
  hashtagField.value = '';
  descriptionField.value = '';
}

const onCloseButtonClick = () => closeUploadForm();

uploadControl.addEventListener('change', onUploadControlChange);

closeButton.addEventListener('click', onCloseButtonClick);

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

const setUserFormSubmit = () => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          closeUploadForm();
          renderSuccessPostMessage();
        })
        .catch(() => {
          renderErrorPostMessage();
        })
        .finally(() => {
          unblockSubmitButton();
        });
    }
  });
};

export {setUserFormSubmit};

