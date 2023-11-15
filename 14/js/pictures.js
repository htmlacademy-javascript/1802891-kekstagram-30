import {showBigPicture} from './bigPictures-popup.js';
const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const picturesListFragment = document.createDocumentFragment();

/**
 * функция для добавления фотграфий на страницу
 * @param {void} — функция с данными фотографий
 */
const createElementPhotos = (dataPictures) => {
  dataPictures.forEach(({url,description,likes,comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      showBigPicture(({url,description,likes,comments}));
    });
    picturesListFragment.append(pictureElement);
  });
  picturesContainer.append(picturesListFragment);
};

export {createElementPhotos};

