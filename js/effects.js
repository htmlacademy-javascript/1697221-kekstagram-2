import { hideElement, showElement } from './util.js';

const EffectSettings = {
  chrome : { min: 0, max: 1, step: 0.1, start : 1, filter: 'grayscale' },
  sepia : { min: 0, max: 1, step: 0.1, start : 1, filter: 'sepia' },
  marvin : { min: 0, max: 100, step: 1, start : 100, filter: 'invert', unit: '%'},
  phobos : { min: 0, max: 3, step: 0.1, start : 3, filter: 'blur', unit: 'px' },
  heat:  { min: 1, max: 3, step: 0.1, start : 3, filter: 'brightness' },
};

const effectLevel = document.querySelector('.img-upload__effect-level');
const effectSlider = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const effectList = document.querySelector('.effects__list');
const imagePreview = document.querySelector('.img-upload__preview');

const needSlider = () => {
  const effect = document.querySelector('input[name="effect"]:checked').value;
  if(effect in EffectSettings) {
    showElement(effectLevel);
    showElement(effectSlider);
  } else {
    hideElement(effectLevel);
    hideElement(effectSlider);
    imagePreview.style.filter = 'none';
  }
};

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const applyEffect = ({filter, unit = ''}, value) => {
  imagePreview.style.filter = `${filter }(${ value }${unit })`;
};

effectSlider.noUiSlider.on('update', () => {
  effectValue.value = effectSlider.noUiSlider.get();
  const currentEffectValue = Number(effectValue.value);
  const effect = document.querySelector('input[name="effect"]:checked').value;
  if (effect in EffectSettings) {
    applyEffect(EffectSettings[effect], currentEffectValue);
  } else {
    imagePreview.style.filter = 'none';
  }
});

effectList.addEventListener('change', (evt) => {
  needSlider();
  const effect = evt.target.value;
  if (effect in EffectSettings) {
    effectSlider.noUiSlider.updateOptions({range: {
      min: EffectSettings[effect].min,
      max: EffectSettings[effect].max,
    },
    step: EffectSettings[effect].step,
    start: EffectSettings[effect].start,});
  }
});

export {needSlider};
