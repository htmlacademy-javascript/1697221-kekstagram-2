const DEFAULT_SCALE_VALUE = 100;
const SCALE_STEP = 25;
const MAX_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;

const controlScaleValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview');

let currentValue = DEFAULT_SCALE_VALUE;


const changeScale = (direction) => {
  if (direction === 'increase' && currentValue < MAX_SCALE_VALUE) {
    currentValue += SCALE_STEP;
  } else if (direction === 'decrease' && currentValue > MIN_SCALE_VALUE) {
    currentValue -= SCALE_STEP;
  }
};

const changePictureScale = (value) => {
  controlScaleValue.value = `${value}%`;
  imagePreview.style.transform = `scale(${ value / 100 })`;
};

const onControlScaleBiggerClick = () => {
  changeScale('increase');
  changePictureScale(currentValue);
};

const onControlScaleSmallerClick = () => {
  changeScale('decrease');
  changePictureScale(currentValue);
};

export {onControlScaleBiggerClick, onControlScaleSmallerClick};
