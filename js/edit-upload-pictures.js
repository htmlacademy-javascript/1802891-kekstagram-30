import {findNumbersAtString} from './utils.js';

const EffectOptions = {
  none: {
    min: 0,
    max: 100,
    step: 1,
  },
  chrome: {
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
  },
  sepia: {
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
  },
  marvin: {
    style: 'invert',
    unit: '%',
    min: 0,
    max: 100,
    step: 1,
  },
  phobos: {
    style: 'blur',
    unit: 'px',
    min: 0,
    max: 3,
    step: 0.1,
  },
  heat: {
    style: 'brightness',
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
const ZoomOption = {
  STEP_BACK: 25,
  STEP_FORWARD: 25,
  MIN_SIZE: 25,
  MAX_SIZE: 100,
  DEFAULT_SIZE: 100,
};

let valueInputScale = ZoomOption.DEFAULT_SIZE;

const stepZoom = (stepDirection) => {
  if (stepDirection.closest('.scale__control--smaller')) {
    if (valueInputScale > ZoomOption.MIN_SIZE) {
      valueInputScale -= ZoomOption.STEP_BACK;
    } else {
      valueInputScale = ZoomOption.MIN_SIZE;
    }
  }

  if (stepDirection.closest('.scale__control--bigger')) {
    if (valueInputScale < ZoomOption.MAX_SIZE) {
      valueInputScale += ZoomOption.STEP_FORWARD;
    } else {
      valueInputScale = ZoomOption.MAX_SIZE;
    }
  }

  imgUploadPreview.style.transform = `scale(${valueInputScale / 100 })`;
  scaleControlValue.value = `${valueInputScale}%`;

  // return valueInputScale;
};

/**
 * Функция для увиличения или ументшения фотографии
 * @param {object} — Настройки контроллера
 */
const editZoomPicture = (option) => {
  let valueSize = '';

  scaleControlSmaller.addEventListener('click', () => {
    stepZoom(scaleControlSmaller);
  });
  scaleControlValue.addEventListener('keydown', (evt) => {
    scaleControlValue.value = '';
    if(!(Number.isNaN(findNumbersAtString(evt.key))) & +valueSize <= 100){
      valueSize += evt.key;
      valueInputScale = valueSize;
      scaleControlValue.value += `${valueSize}%`;
    }
    evt.stopPropagation();
  });
  scaleControlBigger.addEventListener('click', () => {
    stepZoom(scaleControlBigger);
  });

  scaleControlValue.addEventListener('blur', () => {
    valueSize = '';

    if (valueInputScale > option.MAX_SIZE) {
      valueInputScale = option.MAX_SIZE;
      scaleControlValue.value = `${valueInputScale}%`;
    } else if (valueInputScale < option.MIN_SIZE) {
      valueInputScale = option.MIN_SIZE;
      scaleControlValue.value = `${valueInputScale}%`;
    }

    imgUploadPreview.style.transform = `scale(${valueInputScale / 100 })`;
  });
};

const resetZoom = () => {
  valueInputScale = ZoomOption.DEFAULT_SIZE;
  imgUploadPreview.style.transform = `scale(${ZoomOption.DEFAULT_SIZE / 100 })`;
};


// Реализация слайдера с добавлением эффектов для изображения

let chosenEffect = Object.keys(EffectOptions)[0];

const hideSlider = () => {
  imgUploadEffectLevel.classList.add('hidden');
};
const showSlider = () => {
  imgUploadEffectLevel.classList.remove('hidden');
};

/**
 * Функция устанавливает стиль для открытого изображения
 */
const setImageStyle = () => {
  if (chosenEffect === 'none') {
    imgUploadPreview.style.filter = null;
    hideSlider();
    return;
  }

  const { value } = effectLevelValue;
  const { style, unit } = EffectOptions[chosenEffect];

  if (unit === undefined) {
    imgUploadPreview.style.filter = `${style}(${value})`;
  } else {
    imgUploadPreview.style.filter = `${style}(${value}${unit})`;
  }
};

/**
 * Функция обновляет значения стиля изображения
 */
const onSliderUpdate = () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  setImageStyle();
};

/**
 * Функция создает слайдер
 * @param {object} — получает объект с настройками слайдера
 */
const createSlider = ({ min, max, step }) => {
  noUiSlider.create(effectLevelSlider, {
    range: { min, max },
    start: max,
    step,
    connect: 'lower',
  });

  effectLevelSlider.noUiSlider.on('update', onSliderUpdate);
};

/**
 * Функция обновлеяет параметры слайдера
 * @param {Object} — Параметры функции
 */
const updateSlider = ({ min, max, step }) => {
  effectLevelSlider.noUiSlider.updateOptions({
    range: { min, max },
    start: max,
    step,
  });
};

/**
 * Функция показывает слайдер, обновялет данные слайдера и добавляет эффект
 */
const setSlider = () => {
  updateSlider(EffectOptions[chosenEffect]);
  showSlider();
  setImageStyle();
};

const onEffectChange = (evt) => {
  chosenEffect = evt.target.value;
  setSlider();
};

/**
 * Функция создает слайдер и добавляет события выбора эффекта
 */
const initEffect = () => {
  createSlider(EffectOptions[chosenEffect]);
  effectsList.addEventListener('click', onEffectChange);
};

/**
 * Функция сбрасывает все параметры слайдера
 * @param {} —
 * @return {} —
 */
const resetEffect = () => {
  chosenEffect = Object.keys(EffectOptions)[0];
  setSlider();
  setImageStyle();
};

export { resetZoom, editZoomPicture, ZoomOption, initEffect, resetEffect };
