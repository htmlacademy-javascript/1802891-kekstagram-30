import { createElementPhotos } from './pictures.js';
import { getRandomElementFromArray } from './utils.js';

const picturesContainer = document.querySelector('.pictures');
const imgUpload = picturesContainer.querySelector('.img-upload');
const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = imgFilters.querySelector('.img-filters__form');
const imgFiltersButton = imgFiltersForm.querySelectorAll('.img-filters__button');

const QUANTITY_RANDOM_PICTURE = 10;

const cleanListPictures = () => {
  picturesContainer.innerHTML = '';
  picturesContainer.append(imgUpload);
};

const filteringByComments = (data) => {
  const dataSortComments = data.slice().sort((pictureA, pictureB) => {
    const a = pictureA.comments.length;
    const b = pictureB.comments.length;

    return b - a;
  });

  cleanListPictures();
  createElementPhotos(dataSortComments);
};

const filteringRandomPictures = (data) => {
  const dataRandom = [];

  for (let i = 0; i < QUANTITY_RANDOM_PICTURE; i++) {
    //const ttest = getRandomElementFromArray(data);
    // const test = dataRandom.some((dataElement) => {
    //   dataElement !== ttest;
    //   console.log(dataElement);
    // });
    // if (test || i === 10) {
    dataRandom.push(getRandomElementFromArray(data));
    // console.log(test);
    console.log(dataRandom);
    // console.log(ttest);
    // console.log('выполнил');
    //}
  }

  cleanListPictures();
  createElementPhotos(dataRandom);
};

const filteringDefault = (data) => {
  cleanListPictures();
  createElementPhotos(data);
};

const filteringPicture = (dataPictures) => {
  imgFilters.classList.remove('img-filters--inactive');
  createElementPhotos(dataPictures);
  imgFiltersForm.addEventListener('click', (evt) => {
    evt.preventDefault();

    imgFiltersButton[0].classList.remove('img-filters__button--active');

    if (evt.target.id === 'filter-default') {
      filteringDefault(dataPictures);
      imgFiltersButton[1,2].classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
    }
    if (evt.target.id === 'filter-random') {
      imgFiltersButton[0,2].classList.remove('img-filters__button--active');
      filteringRandomPictures(dataPictures);
      evt.target.classList.add('img-filters__button--active');
    }
    if (evt.target.id === 'filter-discussed') {
      filteringByComments(dataPictures);
      imgFiltersButton[0,1].classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
    }


  });

};

export { filteringPicture };
