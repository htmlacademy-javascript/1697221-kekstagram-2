import {isEscapeKey} from './util.js';

const ALERT_SHOW_TIME = 5000;

const body = document.body;
const errorLoadingMessageTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const successfulSendingMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorSendingMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const renderErrorLoadingMessage = () => {
  const errorLoadingMessage = errorLoadingMessageTemplate.cloneNode(true);
  body.append(errorLoadingMessage);
  setTimeout(() => {
    errorLoadingMessage.remove();
  }, ALERT_SHOW_TIME);
};

let message;

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
  const isClickOnMessage = evt.composedPath().includes(messageBox);
  if (!isClickOnMessage) {
    removeMessage();
  }
}

const renderMessage = (messageName) => {
  message = messageName.cloneNode(true);
  const button = message.querySelector('button');
  body.append(message);
  button.addEventListener('click', onButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

const renderSuccessPostMessage = () => {
  renderMessage(successfulSendingMessageTemplate);
};

const renderErrorPostMessage = () => {
  renderMessage(errorSendingMessageTemplate);
};

export {renderErrorLoadingMessage, renderSuccessPostMessage, renderErrorPostMessage, removeMessage};
