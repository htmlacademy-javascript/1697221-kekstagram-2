import {isEscapeKey, hideElement, showElement} from './util.js';
import { pristine } from './validation.js';
import { initScaling, destroyScaling } from './scaling.js';
import { initSlider, destroySlider } from './effects.js';
import {renderSuccessPostMessage, renderErrorPostMessage} from './alerts.js';
import {sendData} from './api.js';

const body = document.body;
const uploadForm = document.querySelector('.img-upload__form');
const uploadControl = uploadForm.querySelector('.img-upload__input');
const editingForm = uploadForm.querySelector('.img-upload__overlay');
const closeButton = uploadForm.querySelector('.img-upload__cancel');
const hashtagField = uploadForm.querySelector('.text__hashtags');
const descriptionField = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');

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

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};


const setUserFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          onSuccess();
          renderSuccessPostMessage();
        })
        .catch(() => {
          renderErrorPostMessage();
        })
        .finally(unblockSubmitButton);
    }
  });
};


export {setUserFormSubmit, closeUploadForm};

