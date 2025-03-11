import { hideElement, showElement } from './util.js';

const SLIDER_CONNECT = 'lower';
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

const updateEffectVisibillity = () => {
  const effect = document.querySelector('input[name="effect"]:checked').value;
  if(effect in EffectSettings) {
    showElement(effectLevel);
  } else {
    hideElement(effectLevel);
    imagePreview.style.filter = 'none';
  }
};

const createSlider = () => {
  noUiSlider.create(effectSlider, {
    range: {
      min: EffectSettings.chrome.min,
      max: EffectSettings.chrome.max,
    },
    start: EffectSettings.chrome.start,
    step: EffectSettings.chrome.step,
    connect: SLIDER_CONNECT,
    format: {
      to: function (value) {
        return +value;
      },
      from: function (value) {
        return value;
      },
    },
  });
};

const applyEffect = ({filter, unit = ''}, value) => {
  imagePreview.style.filter = `${ filter }(${ value }${unit })`;
};

let effect;

const onEffectListChange = (evt) => {
  updateEffectVisibillity();
  effect = evt.target.value;
  if (effect in EffectSettings) {
    effectSlider.noUiSlider.updateOptions(
      {range: {
        min: EffectSettings[effect].min,
        max: EffectSettings[effect].max,
      },
      step: EffectSettings[effect].step,
      start: EffectSettings[effect].start,});
  }
};

const initSlider = () => {
  createSlider ();

  updateEffectVisibillity();

  effectList.addEventListener('change', onEffectListChange);

  effectSlider.noUiSlider.on('update', () => {
    const currentEffectValue = effectSlider.noUiSlider.get();
    effectValue.value = currentEffectValue;
    if (effect in EffectSettings) {
      applyEffect(EffectSettings[effect], currentEffectValue);
    } else {
      imagePreview.style.filter = 'none';
    }
  });
};

const destroySlider = () => {
  effectSlider.noUiSlider.destroy();
  effectList.removeEventListener('change', onEffectListChange);
};


export { initSlider, destroySlider};
