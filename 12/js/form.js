import { resetSize as defaultSize, editSizePicture, sizeOption, init as innitEffect, reset as resetEffect } from './edit-form.js';

editSizePicture(sizeOption);
const body = document.querySelector('body');
const imgUpload = body.querySelector('.img-upload');
const imgUploadInput = imgUpload.querySelector('.img-upload__input');
const imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUpload.querySelector('.img-upload__cancel');

const onClosedImgUploadKey = (evt) => {
  if (evt.key === 'Escape') {
    imgUploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    defaultSize();
  }
};

const showModal = (evt) => {
  if (evt.target.files[0]) {
    imgUploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
    window.addEventListener('keydown', onClosedImgUploadKey);
  }
};
const onClosedImgUploadClick = () =>{
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  window.removeEventListener('keydown', onClosedImgUploadKey);
  defaultSize();
  resetEffect();
};

imgUploadInput.addEventListener('change', showModal);
imgUploadCancel.addEventListener('click', onClosedImgUploadClick);
innitEffect();

