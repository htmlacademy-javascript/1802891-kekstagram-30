import {show} from './picturs-popup.js';
const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const picturesListFragment = document.createDocumentFragment();
// Создание рандомной карточки с фотографиями и добавление её в контейнер

/**
 * функция для добавления фотграфий на страницу
 * @param {void} — функция с данными фотографий
 */
const createElementPhotos = (dataPictures) => {
  dataPictures.forEach((dataPicture) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = dataPicture.url;
    pictureElement.querySelector('.picture__img').alt = dataPicture.description;
    pictureElement.querySelector('.picture__likes').textContent = dataPicture.likes;
    pictureElement.querySelector('.picture__comments').textContent = dataPicture.comments.length;
    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      show(dataPicture);
    });
    picturesListFragment.append(pictureElement);
  });
  picturesContainer.append(picturesListFragment);
};

export {createElementPhotos};
//{url,description,likes,comments}
