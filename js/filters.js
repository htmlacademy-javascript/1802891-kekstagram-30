import { createElementPhotos } from './pictures.js';
import { getRandomElementFromArray } from './utils.js';

const QUANTITY_RANDOM_PICTURE = 10;


const picturesContainer = document.querySelector('.pictures');
const imgUpload = picturesContainer.querySelector('.img-upload');
const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = imgFilters.querySelector('.img-filters__form');
const imgFiltersButton = imgFiltersForm.querySelectorAll('.img-filters__button');

const cleanListPictures = () => {
  picturesContainer.innerHTML = '';
  picturesContainer.append(imgUpload);
};

const optionsRandomFilter = {
  'filter-default': (data) => data,
  'filter-random': (data) => {
    const randomIndexList = [];

    while (randomIndexList.length < QUANTITY_RANDOM_PICTURE) {
      const index = getRandomElementFromArray(data);
      if (!randomIndexList.includes(index)) {
        randomIndexList.push(index);
      }
    }

    return randomIndexList;
    // randomIndexList.length = 0;
  },
  'filter-discussed': (data) => {
    const dataSortComments = data.slice().sort((pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length);
    return dataSortComments;
  },
};

const render = (filter, data) => {
  const filteredData = optionsRandomFilter[filter](data);
  // console.log(filteredData);
  // createElementPhotos(filteredData);
  cleanListPictures();
  return filteredData;
};

const filteringPicture = (dataPictures) => {
  imgFilters.classList.remove('img-filters--inactive');
  createElementPhotos(dataPictures);

  imgFiltersForm.addEventListener('click', (evt) => {
    evt.preventDefault();

    for (let i = 0; i < imgFiltersButton.length; i++) {
      if (imgFiltersButton[i].closest('.img-filters__button--active')) {
        imgFiltersButton[i].classList.remove('img-filters__button--active');
      }
    }

    const data = render(evt.target.id, dataPictures);
    createElementPhotos(data);
    evt.target.classList.add('img-filters__button--active');

  });
};

export { filteringPicture };
