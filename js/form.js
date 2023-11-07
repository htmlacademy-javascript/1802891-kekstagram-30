import {findNumbersAtString} from './utils';

const body = document.querySelector('body');
const imgUpload = body.querySelector('.img-upload');
const imgUploadInput = imgUpload.querySelector('.img-upload__input');
const imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUpload.querySelector('.img-upload__cancel');
const scaleControlSmaller = imgUpload.querySelector('.scale__control--smaller');
const scaleControlValue = imgUpload.querySelector('.scale__control--value');
const scaleControlBigger = imgUpload.querySelector('.scale__control--bigger');
const imgUploadPreview = imgUpload.querySelector('.img-upload__preview');

let valueInputScale = parseFloat(scaleControlValue.value);
let valueSize = '';
const onClosedImgUploadClick = () =>{
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
};

const onClosedImgUploadKey = (evt) => {
  if (evt.key === 'Escape'){
    imgUploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
  }
};

imgUploadInput.addEventListener('change', (evt) => {
  if (evt.target.files[0]) {
    imgUploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
  }
});

scaleControlSmaller.addEventListener('click', () => {
  if (valueInputScale > 25) {
    valueInputScale -= 25;
    scaleControlValue.value = `${valueInputScale}%`;
    imgUploadPreview.childNodes[1].style.transform = `scale(${valueInputScale / 100 })`;
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
  if (valueInputScale < 100) {
    valueInputScale = +valueInputScale + 25;
    scaleControlValue.value = `${valueInputScale}%`;
    imgUploadPreview.childNodes[1].style.transform = `scale(${valueInputScale / 100 })`;
  }
});


scaleControlValue.addEventListener('blur', () => {
  valueSize = '';
  imgUploadPreview.childNodes[1].style.transform = `scale(${valueInputScale / 100 })`;
});

imgUploadCancel.addEventListener('click', onClosedImgUploadClick);
window.addEventListener('keydown', onClosedImgUploadKey);

export {imgUploadPreview};
