const body = document.querySelector('body');
const templateSuccess = document.querySelector('#success').content.querySelector('.success');
const templateSuccessClose = templateSuccess.querySelector('.success__button');
const templateError = document.querySelector('#error').content.querySelector('.error');
const templateErrorClose = templateError.querySelector('.error__button');
const templateLoadError = document.querySelector('#data-error').content.querySelector('.data-error');
/**
 * Считает длину строки
 * @param {string|int} — исходная строка или целое число
 * @return {boolean} — правду или ложь
 */
const checkLengthString = (string, length) => string.length <= length;

/**
 * проверяет строку на палиндром
 * @param {string} — исходная строка
 * @return {boolean} — правду или ложь
 */
const isPalindrome = (rawString) => {
  const normalizeString = rawString.toLowerCase().replaceAll(' ', '');
  let comparisonString = '';
  for (let i = normalizeString.length - 1; i >= 0; i--) {
    comparisonString += normalizeString[i];
  }
  return normalizeString === comparisonString;
};

/**
 * Поиск чисел в строке
 * @param {string|number} string — исходная строка или целое число
 * @return {int} — найденные цифры из исходной строки
 */
const findNumbersAtString = (string) => {
  const value = string.toString();
  let result = '';
  for (let i = 0; i < value.length; i++) {
    if (!(isNaN(parseInt(value[i], 10)))) {
      result += value[i];
    }
  }
  return (result !== '') ? +result : NaN;
};

/**
 * функция для создания рандомного числа
 * @param {numbers|numbers} — минимальное значение массива и максимальное значение массива
 * @return {array} — возвращает рандомный число
 */
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

/**
 * функция для возвращение рандомного значения из массива
 * @param {array} — массив с данными
 * @return {array} — возвращает рандомный элемент из массива
 */
const getRandomElementFromArray = (elements) => elements[getRandomInteger(0, elements.length - 1)];

/**
 * функция для проверки возможности встречи
 * @param {string | number} — время начала дня, время окончание дня, время начала мероприятия, продолжительности меропрития
 * @return {boolean} — возвращает рандомный элемент из массива
 */
const calculatingTimeForMeeting = (beginningDay, endOfDay, beginningOfMeeting, durationOfMeeting) => {
  const timeConversion = (time) => {
    time.toString();
    let timeValue = '';
    for (let i = 0; i <= time.length - 1; i++) {
      if (time[i] === ':') {
        timeValue += time[i].replace(':', '.');
      } else {
        timeValue += time[i + 1];
      }
    }
    return parseFloat(timeValue);
  };
  const timeMeeting = parseFloat(durationOfMeeting / 60);
  const startDay = timeConversion(beginningDay);
  const endDay = timeConversion(endOfDay);
  const startMeeting = timeConversion(beginningOfMeeting);
  if (startDay > startMeeting || (startMeeting + timeMeeting) > endDay) {
    return false;
  }
  return true;
};

const sendFormSuccess = () => {
  body.append(templateSuccess);
  templateSuccessClose.addEventListener('click', () => {
    body.removeChild(templateSuccess);
  });
};

const sendFormError = () => {
  body.append(templateError);
  templateErrorClose.addEventListener('click', () => {
    body.removeChild(templateError);
  });
};

const renderingPictureError = () => {
  body.append(templateLoadError);
  setTimeout(() => {
    body.removeChild(templateLoadError);
  }, 3000);
};

export { getRandomInteger, getRandomElementFromArray, checkLengthString, calculatingTimeForMeeting, isPalindrome, findNumbersAtString, sendFormSuccess, sendFormError, renderingPictureError };
