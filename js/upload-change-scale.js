const DEFAULT_SCALE_VALUE = 100;
const SCALE_STEP = 25;
const MAX_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;

const controlScaleSmaller = document.querySelector('.scale__control--smaller');
const controlScaleBigger = document.querySelector('.scale__control--bigger');
const controlScaleValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview');

let currentValue = DEFAULT_SCALE_VALUE;

const increaseScale = () => {
  if (currentValue < MAX_SCALE_VALUE) {
    currentValue += SCALE_STEP;
  }
};

const decreaseScale = () => {
  if (currentValue > MIN_SCALE_VALUE) {
    currentValue -= SCALE_STEP;
  }
};

const onControlScaleBiggerClick = () => {
  increaseScale();
  controlScaleValue.value = `${currentValue}%`;
  imagePreview.style.transform = `scale(${ currentValue / 100 })`;
};

const onControlScaleSmallerClick = () => {
  decreaseScale();
  controlScaleValue.value = `${currentValue}%`;
  imagePreview.style.transform = `scale(${ currentValue / 100 })`;
};

controlScaleBigger.addEventListener('click',onControlScaleBiggerClick);
controlScaleSmaller.addEventListener('click', onControlScaleSmallerClick);
