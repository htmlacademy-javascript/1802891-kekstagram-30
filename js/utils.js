const timeClosePopupError = 3000;

const body = document.querySelector('body');
const templateSuccess = document.querySelector('#success').content.querySelector('.success');
const templateSuccessClose = templateSuccess.querySelector('.success__button');
const templateError = document.querySelector('#error').content.querySelector('.error');
const templateErrorClose = templateError.querySelector('.error__button');
const templateLoadError = document.querySelector('#data-error').content.querySelector('.data-error');
const cloneTemplateSuccess = templateSuccess;
const cloneTemplateError = templateError;
const cloneTemplateErrorRender = templateLoadError;

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
  const hour = 60;
  const timeMeeting = parseFloat(durationOfMeeting / hour);
  const startDay = timeConversion(beginningDay);
  const endDay = timeConversion(endOfDay);
  const startMeeting = timeConversion(beginningOfMeeting);
  if (startDay > startMeeting || (startMeeting + timeMeeting) > endDay) {
    return false;
  }
  return true;
};

/**
 * Функция для показа окна с успешной отправкой данных
 */
const sendFormSuccess = () => {
  body.append(cloneTemplateSuccess);
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      cloneTemplateSuccess.remove();
    }
  });
  templateSuccessClose.addEventListener('click', () => {
    cloneTemplateSuccess.remove();
  });
  document.addEventListener('click', () => {
    cloneTemplateSuccess.remove();
  });
};

/**
 * Функция для показа окна с неуспешной отправкой данных
 */
const sendFormError = () => {
  body.append(cloneTemplateError);
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      cloneTemplateError.remove();
      evt.stopPropagation();
    }
  });
  templateErrorClose.addEventListener('click', () => {
    cloneTemplateError.remove();
  });
  document.addEventListener('click', () => {
    cloneTemplateError.remove();
  });
};

/**
 * Функция для показа ошибки загрузки фотографий
 */
const renderingPictureError = () => {
  body.append(cloneTemplateErrorRender);
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      cloneTemplateErrorRender.remove();
    }
  });
  document.addEventListener('click', () => {
    cloneTemplateErrorRender.remove();
  });
  setTimeout(() => {
    cloneTemplateErrorRender.remove();
  }, timeClosePopupError);
};


/**
 * Функция для устранения "дребезга"
* @param {function} — 1 параметр принимает функцию "коллбэк"
* @param {int} — 2 параметр принимает время через которое будет вызываться функция
 * @return {void} — возвращает функцию вызову через определенное время
 */
function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
/**
 * Функция для пропуска кадров:
 * @param { function } —  функция для пропуска кадров
 * @param { int } —  время пропуска
 * @return { function } — возвращает вункцию с задержкой
 */

export { getRandomInteger, getRandomElementFromArray, checkLengthString, calculatingTimeForMeeting, isPalindrome, findNumbersAtString, sendFormSuccess, sendFormError, renderingPictureError, debounce };
