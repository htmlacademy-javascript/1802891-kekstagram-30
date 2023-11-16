import { resetZoom, editZoomPicture, ZoomOption } from './zoom-picture.js';
import { initEffect, resetEffect } from './edit-upload-pictures.js';
import './form.js';

const body = document.querySelector('body');
const imgUpload = body.querySelector('.img-upload');
const imgUploadInput = imgUpload.querySelector('.img-upload__input');
const imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUpload.querySelector('.img-upload__cancel');

const onClosedImgUploadKey = (evt) => {
  if (evt.key === 'Escape') {
    imgUploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    resetZoom();
    imgUploadInput.value = '';
  }
};

const onShowImgUploadClick = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onClosedImgUploadKey);
};

const onClosedImgUploadClick = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onClosedImgUploadKey);
  resetZoom();
  resetEffect();
  imgUploadInput.value = '';
};

imgUploadInput.addEventListener('change', onShowImgUploadClick);
imgUploadCancel.addEventListener('click', onClosedImgUploadClick);
document.addEventListener('keydown', onClosedImgUploadKey);
initEffect();
editZoomPicture(ZoomOption);

export { onClosedImgUploadClick };
