const Keys = {
  ESCAPE: 'Escape',
};

const getRandomNumber = (min, max) => { // функция, выбирающая число из заданного диапазона
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const isEscapeKey = (evt) => evt.key === Keys.ESCAPE;

const hideElement = (element) => {
  element.classList.add('hidden');
};

const showElement = (element) => {
  element.classList.remove('hidden');
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomNumber, isEscapeKey, hideElement, showElement, debounce};
