import {findNumbersAtString} from './utils.js';

const ZoomOption = {
  STEP_BACK: 25,
  STEP_FORWARD: 25,
  MIN_SIZE: 25,
  MAX_SIZE: 100,
  DEFAULT_SIZE: 100,
};

const body = document.querySelector('body');
const imgUpload = body.querySelector('.img-upload');
const scaleControlSmaller = imgUpload.querySelector('.scale__control--smaller');
const scaleControlValue = imgUpload.querySelector('.scale__control--value');
const scaleControlBigger = imgUpload.querySelector('.scale__control--bigger');
const imgUploadPreview = imgUpload.querySelector('.img-upload__preview img');

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

export { resetZoom, editZoomPicture, ZoomOption };
