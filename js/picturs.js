const picturesContainer = document.querySelector('.pictures');
const picturTemplate = document.querySelector('#picture').content.querySelector('.picture');

const COUNT_PICTURE = 25;

const pictursListFragment = document.createDocumentFragment();
// Создание рандомной карточки с фотографиями и добавление её в контейнер

/**
 * функция для добавления фотграфий на страницу
 * @param {void} — функция с данными фотографий
 */
const createElementPhotos = (dataPicters) =>{
  dataPicters(COUNT_PICTURE).forEach(({url,description,likes,comments}) =>{
    const pictureElement = picturTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictursListFragment.appendChild(pictureElement);
  });
  picturesContainer.append(pictursListFragment);
};

export {createElementPhotos};
