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
const imgUploadPreview = imgUpload.querySelector('.img-upload__preview img');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = imgUploadEffectLevel.querySelector('.effect-level__slider');
const effectLevelValue = imgUploadEffectLevel.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');

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

export { initEffect, resetEffect };
