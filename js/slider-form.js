import {imgUploadPreview} from './form.js';

const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = imgUploadEffectLevel.querySelector('.effect-level__slider');
const effectLevelValue = imgUploadEffectLevel.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const effectsRadio = document.querySelector('.effects__radio');

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

effectLevelSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
});

effectsList.addEventListener('click', (evt) => {
  if (effectsRadio.checked === (effectsRadio.value === 'none')) {
    //effectLevelSlider.setAttribute('disabled', true);
    // effectLevelValue.value = 0;
  } else if (evt.target.value === 'chrome') {
    //effectLevelSlider.setAttribute('disabled', false);
    imgUploadPreview.style.filter = `grayscale(${effectLevelValue.value})`;
  }
});

// if (evt.target.value === 'none') {
//   effectLevelSlider.setAttribute('disabled', true);
// } else
