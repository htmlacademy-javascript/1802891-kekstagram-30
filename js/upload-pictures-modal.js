import { resetZoom, editZoomPicture, ZoomOption } from './zoom-picture.js';
import { initEffect, resetEffect } from './edit-upload-pictures.js';
import './form.js';

const FILE_TYPES = ['jpg', 'png', 'jpeg', 'svg'];

const body = document.querySelector('body');
const imgUpload = body.querySelector('.img-upload');
const effectsPreview = imgUpload.querySelectorAll('.effects__preview');
const imgUploadPreview = imgUpload.querySelector('.img-upload__preview img');
const imgUploadInput = imgUpload.querySelector('.img-upload__input');
const imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUpload.querySelector('.img-upload__cancel');

const onClosedImgUploadKeydown = (evt) => {

  if (evt.key === 'Escape') {
    imgUploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    resetZoom();
    imgUploadInput.value = '';
  }
};

const onShowImgUploadChange = () => {

  const file = imgUploadInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgUploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
    imgUploadPreview.src = URL.createObjectURL(file);

    for (let i = 0; i < effectsPreview.length; i++) {
      effectsPreview[i].style.backgroundImage = '';
      effectsPreview[i].style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    }
  }
};

const onClosedImgUploadClick = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  resetZoom();
  resetEffect();
  imgUploadInput.value = '';
};

imgUploadInput.addEventListener('change', onShowImgUploadChange);
imgUploadCancel.addEventListener('click', onClosedImgUploadClick);
document.addEventListener('keydown', onClosedImgUploadKeydown);
initEffect();
editZoomPicture(ZoomOption);

export { onClosedImgUploadClick, onClosedImgUploadKeydown as onClosedImgUploadKey };
