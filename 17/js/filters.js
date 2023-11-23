import { createElementPhotos } from './pictures.js';
import { getRandomElementFromArray } from './utils.js';
import { debounce } from './utils.js';

const TIME_CALL = 500;
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
  cleanListPictures();
  const filteredData = optionsRandomFilter[filter](data);
  createElementPhotos(filteredData);
};

const onSwitchingFilterClick = (evt, data) => {
  evt.preventDefault();
  for (let i = 0; i < imgFiltersButton.length; i++) {
    if (imgFiltersButton[i].closest('.img-filters__button--active')) {
      imgFiltersButton[i].classList.remove('img-filters__button--active');
    }
  }

  render(evt.target.id, data);
  evt.target.classList.add('img-filters__button--active');
};

const filteringPicture = (dataPictures) => {
  imgFilters.classList.remove('img-filters--inactive');
  createElementPhotos(dataPictures);

  imgFiltersForm.addEventListener('click', debounce((evt) => {
    evt.preventDefault();
    for (let i = 0; i < imgFiltersButton.length; i++) {
      if (imgFiltersButton[i].closest('.img-filters__button--active')) {
        imgFiltersButton[i].classList.remove('img-filters__button--active');
      }
    }

    render(evt.target.id, dataPictures);
    evt.target.classList.add('img-filters__button--active');
  }), TIME_CALL);
};

export { filteringPicture };
