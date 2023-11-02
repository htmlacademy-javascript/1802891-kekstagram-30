import {show} from './pictursPopup.js';
const picturesContainer = document.querySelector('.pictures');
const picturTemplate = document.querySelector('#picture').content.querySelector('.picture');

const COUNT_PICTURE = 25;

const pictursListFragment = document.createDocumentFragment();
// Создание рандомной карточки с фотографиями и добавление её в контейнер

/**
 * функция для добавления фотграфий на страницу
 * @param {void} — функция с данными фотографий
 */
const createElementPhotos = (dataPicters) => {
  dataPicters(COUNT_PICTURE).forEach((dataPicture) => {
    const pictureElement = picturTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = dataPicture.url;
    pictureElement.alt = dataPicture.description;
    pictureElement.querySelector('.picture__likes').textContent = dataPicture.likes;
    pictureElement.querySelector('.picture__comments').textContent = dataPicture.comments.length;
    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      show(dataPicture, dataPicture.comments);
    });
    //console.log(show(dataPicters));
    pictursListFragment.append(pictureElement);
  });
  picturesContainer.append(pictursListFragment);
};

export {createElementPhotos};
//{url,description,likes,comments}
