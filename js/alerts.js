import {isEscapeKey} from './util.js';

const ALERT_SHOW_TIME = 5000;
const SendingResult = {
  SUCCESS: 'success',
  ERROR: 'error'
};

const body = document.body;
const errorLoadingMessageTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const successfulSendingMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorSendingMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const renderErrorLoadingMessage = () => {
  const message = errorLoadingMessageTemplate.cloneNode(true);
  body.append(message);
  setTimeout(() => {
    message.remove();
  }, ALERT_SHOW_TIME);
};

const renderPostMessage = (result) => {
  let message;
  let button;

  if (result === SendingResult.SUCCESS) {
    message = successfulSendingMessageTemplate.cloneNode(true);
    button = message.querySelector('.success__button');
  } else {
    message = errorSendingMessageTemplate.cloneNode(true);
    button = message.querySelector('.error__button');
  }

  body.append(message);

  const removeMessage = () => {
    message.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  };

  const onButtonClick = () => {
    removeMessage();
  };

  function onDocumentKeydown (evt) {
    if (isEscapeKey(evt)) {
      removeMessage();
    }
  }

  function onDocumentClick (evt) {
    const messageBox = message.querySelector('div');
    const click = evt.composedPath().includes(messageBox);
    if (!click) {
      removeMessage();
    }
  }

  button.addEventListener('click', onButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

const renderSuccessPostMessage = () => {
  renderPostMessage(SendingResult.SUCCESS);
};

const renderErrorPostMessage = () => {
  renderPostMessage(SendingResult.ERROR);
};

export {renderErrorLoadingMessage, renderSuccessPostMessage, renderErrorPostMessage};
