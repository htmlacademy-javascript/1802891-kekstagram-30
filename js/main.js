const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const MIN_LIKES = 15;
const MAX_LIKES = 200;
const COUNT_PHOTOS = 25;

const NAMES = [
  'Иван','Хуан Себастьян','Мария','Кристоф','Виктор','Юлия','Люпита','Вашингтон',
];

const DESCRIPTION_PHOTO = [
  'Без фильтров',
  'Зацените фотку',
  'Сделал новую фотографию',
];

const MESSAGE = [
  'Всё отлично!',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
];

const getRandomArryElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createUsers = () => {
  const photos = [];
  for(let i = 1; i <= COUNT_PHOTOS; i++){
    photos.push({
      id: i,
      url: 'photos/' + i +'.jpg',
      description:  getRandomArryElement(DESCRIPTION_PHOTO),
      likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
      comments: {
        id: i,
        avatar: 'img/avatar-' + getRandomInteger(1,25) + '.svg',
        message: getRandomArryElement(MESSAGE),
        name: getRandomArryElement(NAMES),
      },
    });
  }
  return photos;
};


