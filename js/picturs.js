import {createPhotos} from './data';

const listPucters = document.querySelector('.pictures');
const picterTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Создает рандомную карточку с фотографиями и добавил в контейнер
const pictursListFragment = document.createDocumentFragment();
createPhotos(25, 6).forEach(({url,description,likes,comments}) =>{
  const pictureElement = picterTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictursListFragment.appendChild(pictureElement);
});

// Добавил фотографии на страницу
listPucters.append(pictursListFragment);
