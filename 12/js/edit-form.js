import {findNumbersAtString} from './utils.js';

const effect = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const effectToFilter = {
  [effect.CHROME]: {
    style: 'grayscale',
    unit: '',
  },
  [effect.SEPIA]: {
    style: 'sepia',
    unit: '',
  },
  [effect.MARVIN]: {
    style: 'invert',
    unit: '%',
  },
  [effect.PHOBOS]: {
    style: 'blur',
    unit: 'px',
  },
  [effect.HEAT]: {
    style: 'brightness',
    unit: '',
  },
};

const effectToSliderOption = {
  [effect.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [effect.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [effect.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [effect.MARVIN]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [effect.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  [effect.HEAT]: {
    min: 0,
    max: 3,
    step: 0.1,
  },
};

const body = document.querySelector('body');
const imgUpload = body.querySelector('.img-upload');
const scaleControlSmaller = imgUpload.querySelector('.scale__control--smaller');
const scaleControlValue = imgUpload.querySelector('.scale__control--value');
const scaleControlBigger = imgUpload.querySelector('.scale__control--bigger');
const imgUploadPreview = imgUpload.querySelector('.img-upload__preview img');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = imgUploadEffectLevel.querySelector('.effect-level__slider');
const effectLevelValue = imgUploadEffectLevel.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');


// Реализация изменения размера изображения
const sizeOption = {
  STEP_BACK: 25,
  STEP_FORWARD: 25,
  MIN_SIZE: 25,
  MAX_SIZE: 100,
  DEFAULT_SIZE: 100,
};

let valueInputScale = sizeOption.DEFAULT_SIZE;

/**
 * Функция для увиличения или ументшения фотографии
 * @param {object} — Настройки контроллера
 */
const editSizePicture = ({ STEP_BACK, STEP_FORWARD, MIN_SIZE, MAX_SIZE }) => {
  let valueSize = '';

  scaleControlSmaller.addEventListener('click', () => {
    if (valueInputScale > MIN_SIZE) {
      valueInputScale -= STEP_BACK;
      scaleControlValue.value = `${valueInputScale}%`;
      imgUploadPreview.style.transform = `scale(${valueInputScale / 100 })`;
    } else {
      valueInputScale = MIN_SIZE;
      imgUploadPreview.style.transform = `scale(${valueInputScale / 100 })`;
      scaleControlValue.value = `${valueInputScale}%`;
    }
  });
  scaleControlValue.addEventListener('keydown', (evt) => {
    scaleControlValue.value = '';
    if(!(Number.isNaN(findNumbersAtString(evt.key))) & +valueSize <= 100){
      valueSize += evt.key;
      valueInputScale = valueSize;
      scaleControlValue.value += `${valueSize}%`;
    }
  });
  scaleControlBigger.addEventListener('click', () => {
    if (valueInputScale < MAX_SIZE) {
      valueInputScale = +valueInputScale + STEP_FORWARD;
      scaleControlValue.value = `${valueInputScale}%`;
      imgUploadPreview.style.transform = `scale(${valueInputScale / 100 })`;
    } else {
      valueInputScale = MAX_SIZE;
      imgUploadPreview.style.transform = `scale(${valueInputScale / 100 })`;
      scaleControlValue.value = `${valueInputScale}%`;
    }
  });

  scaleControlValue.addEventListener('blur', () => {
    valueSize = '';

    if (valueInputScale > MAX_SIZE) {
      valueInputScale = MAX_SIZE;
      scaleControlValue.value = `${valueInputScale}%`;
    } else if (valueInputScale < MIN_SIZE) {
      valueInputScale = MIN_SIZE;
      scaleControlValue.value = `${valueInputScale}%`;
    }

    imgUploadPreview.style.transform = `scale(${valueInputScale / 100 })`;
  });
};

const resetSize = () => {
  valueInputScale = sizeOption.DEFAULT_SIZE;
  imgUploadPreview.style.transform = `scale(${sizeOption.DEFAULT_SIZE / 100 })`;
};

// Реализация слайдера с добавлением эффектов для изображения

let chosenEffect = effect.DEFAULT;

const isDefault = () => chosenEffect === effect.DEFAULT;

const hideSlider = () => {
  imgUploadEffectLevel.classList.add('hidden');
};

const showSlider = () => {
  imgUploadEffectLevel.classList.remove('hidden');
};

const setImageStyle = () => {
  if (isDefault()) {
    imgUploadPreview.style.filter = null;
    return;
  }

  const { value } = effectLevelValue;
  const { style, unit } = effectToFilter[chosenEffect];
  imgUploadPreview.style.filter = `${style}(${value}${unit})`;
};

const onSliderUpdate = () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  setImageStyle();
};

const createSlider = ({ min, max, step }) => {
  noUiSlider.create(effectLevelSlider, {
    range: { min, max },
    start: max,
    step,
    connect: 'lower',
    // format: {
    //   to: (value) => Number.value,
    //   from: (value) => Number.value,
    // }
  });

  effectLevelSlider.noUiSlider.on('update', onSliderUpdate);
};

const updateSlider = ({ min, max, step }) => {
  effectLevelSlider.noUiSlider.updateOptions({
    range: { min, max },
    start: max,
    step,
  });
};

const setSlider = () => {
  if (isDefault()) {
    hideSlider();
  } else {
    updateSlider(effectToSliderOption[chosenEffect]);
    showSlider();
  }
};

const setEffect = (effectElement) => {
  chosenEffect = effectElement;
  setSlider();
  setImageStyle();
};

const reset = () => {
  setEffect(effect.DEFAULT);
};

const onEffectChange = (evt) => {
  setEffect(evt.target.value);
};

const init = () => {
  createSlider(effectToSliderOption[chosenEffect]);
  effectsList.addEventListener('click', onEffectChange);
};

export { resetSize, editSizePicture, sizeOption, init, reset };
