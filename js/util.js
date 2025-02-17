const Keys = {
  ESCAPE: 'Escape',
};

const getRandomNumber = (min, max) => { // функция, выбирающая число из заданного диапазона
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getId = () => { // функция, создающая id по порядку
  let startId = 1;
  return function () {
    return startId++;
  };
};

const isEscapeKey = (evt) => evt.key === Keys.ESCAPE;

const hideElement = (element) => {
  element.classList.add('hidden');
};

const showElement = (element) => {
  element.classList.remove('hidden');
};

export {getRandomNumber, getId, isEscapeKey, hideElement, showElement};
