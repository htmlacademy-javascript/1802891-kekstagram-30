const cheakLengthString = (string, length) => string.length <= length;

const isPalindrome = (rawString) => {
  const normalizeString = rawString.toLowerCase().replaceAll(' ', '');
  let comparisonString = '';
  for (let i = normalizeString.length - 1; i >= 0; i--) {
    comparisonString += normalizeString[i];
  }
  return normalizeString === comparisonString;
};

const findNumbersAtString = (string) => {
  const value = string.toString();
  let result = '';
  for (let i = 0; i < value.length; i++){
    if (!(isNaN(parseInt(value[i], 10)))){
      result += value[i];
    }
  }
  return (result !== '') ? +result : NaN;
};

/*
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

/*
 * функция для возвращение рандомного значения из массива
 * @param {array} — массив с данными
 * @return {array} — возвращает рандомный элемент из массива
*/
const getRandomElementFromArray = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export {getRandomElementFromArray, getRandomInteger};
