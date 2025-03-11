const DEFAULT_SCALE_VALUE = 100;
const SCALE_STEP = 25;
const MAX_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;
const SCALE_DIRECTION = {
  INCREASE: 'increase',
  DECREASE: 'decrease',
};

const controlScaleValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview');
const controlScaleSmaller = document.querySelector('.scale__control--smaller');
const controlScaleBigger = document.querySelector('.scale__control--bigger');

let currentValue = DEFAULT_SCALE_VALUE;


const changeScale = (direction) => {
  if (direction === SCALE_DIRECTION.INCREASE && currentValue < MAX_SCALE_VALUE) {
    currentValue += SCALE_STEP;
  } else if (direction === SCALE_DIRECTION.DECREASE && currentValue > MIN_SCALE_VALUE) {
    currentValue -= SCALE_STEP;
  }
  return currentValue;
};

const changePictureScale = (direction) => {
  changeScale(direction);
  controlScaleValue.value = `${currentValue}%`;
  imagePreview.style.transform = `scale(${ currentValue / 100 })`;
};

const onControlScaleBiggerClick = () => {
  changePictureScale(SCALE_DIRECTION.INCREASE);
};

const onControlScaleSmallerClick = () => {
  changePictureScale(SCALE_DIRECTION.DECREASE);
};


const initScaling = () => {
  controlScaleBigger.addEventListener('click', onControlScaleBiggerClick);
  controlScaleSmaller.addEventListener('click', onControlScaleSmallerClick);
};

const destroyScaling = () => {
  controlScaleBigger.removeEventListener('click', onControlScaleBiggerClick);
  controlScaleSmaller.removeEventListener('click', onControlScaleSmallerClick);
};

export { initScaling, destroyScaling };
