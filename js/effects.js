import { hideElement, showElement } from './util.js';

const SLIDER_CONNECT = 'lower';
const EffectSettings = {
  CHROME : { min: 0, max: 1, step: 0.1, start : 1, filter: 'grayscale' },
  SEPIA : { min: 0, max: 1, step: 0.1, start : 1, filter: 'sepia' },
  MARVIN : { min: 0, max: 100, step: 1, start : 100, filter: 'invert', unit: '%'},
  PHOBOS : { min: 0, max: 3, step: 0.1, start : 3, filter: 'blur', unit: 'px' },
  HEAT:  { min: 1, max: 3, step: 0.1, start : 3, filter: 'brightness' },
};

const effectLevel = document.querySelector('.img-upload__effect-level');
const effectSlider = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const effectList = document.querySelector('.effects__list');
const defaultEffect = effectList.querySelector('#effect-none');
const imagePreview = document.querySelector('.img-upload__preview img');

let effect;

const updateEffectVisibillity = (checkedEffect) => {
  if(checkedEffect in EffectSettings) {
    showElement(effectLevel);
  } else {
    hideElement(effectLevel);
    imagePreview.style.filter = 'none';
  }
};

const createSlider = () => {
  noUiSlider.create(effectSlider, {
    range: {
      min: EffectSettings.CHROME.min,
      max: EffectSettings.CHROME.max,
    },
    start: EffectSettings.CHROME.start,
    step: EffectSettings.CHROME.step,
    connect: SLIDER_CONNECT,
    format: {
      to: (value) => +value,
      from: (value) => value,
    },
  });
};

const applyEffect = ({filter, unit = ''}, value) => {
  imagePreview.style.filter = `${ filter }(${ value }${unit })`;
};

const onEffectListChange = (evt) => {
  effect = evt.target.value.toUpperCase();
  updateEffectVisibillity(effect);
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
  defaultEffect.checked = true;

  createSlider ();

  updateEffectVisibillity(defaultEffect.value);

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
