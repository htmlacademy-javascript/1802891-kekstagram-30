import {createPhotos} from './data';

const listPucters = document.querySelector('.pictures');
const picterTemplate = document.querySelector('#picture').content.querySelector('.picture');


const pictursListFragment = document.createDocumentFragment();
// Создание рандомной карточки с фотографиями и добавление её в контейнер
createPhotos(25, 6).forEach(({url,description,likes,comments}) =>{
  const pictureElement = picterTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictursListFragment.appendChild(pictureElement);
});

// Добавление фотографии на страницу
listPucters.append(pictursListFragment);

