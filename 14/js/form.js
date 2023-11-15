import {checkLengthString} from './utils.js';


const MAX_LENGTH_HASHTAGS = 5;
const VALID_HASHTAGS = /^#[а-яёa-z0-9]{1,19}$/i;
const messageError = {
  Hashtags: 'введён невалидный хэш-тег',
  LengthHashtags: `Максимум ${MAX_LENGTH_HASHTAGS} хэш-тегов`,
  HashtagsRepeats: 'хэш-теги повторяются',
};

const body = document.querySelector('body');
const form = body.querySelector('.img-upload__form');
const inputHashtags = form.querySelector('.text__hashtags');


const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

/**
 * Нормализует полученную строку из поля ввода и превращает её в массив
 * @param {string} — Строка из поля ввода
 * @return {Array} — Массив хэш-тегов
 */
const normalizeTags = (tagString) => tagString
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));

/**
 * Проверяет хэш-тег на соответсвтие параметрам регулярного выражения
 * @param {string} — Получает строку из поля ввода
 * @return {boolean} — Возвращает соответсвие хэш-тега требованиям
 */
const checkValidHashtag = (value) => normalizeTags(value).every((tag) => VALID_HASHTAGS.test(tag));

/**
 * Проверяет кол-во хэш-тегов
 * @param {string} — Получает строку из поля ввода
 * @return {boolean} — Возвращает соответсвие хэш-тегов требованиям
 */
const checkLengthValidHashtag = (value) => checkLengthString(normalizeTags(value), MAX_LENGTH_HASHTAGS);

/**
 * Проверяет хэш-тег на оригинальность
 * @param {string} — Получает строку из поля ввода
 * @return {boolean} — Возвращает соответсвие хэш-тегов требованиям
 */
const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set (lowerCaseTags).size;
};


inputHashtags.addEventListener('keydown', (evt) => {
  checkValidHashtag(inputHashtags.value);
  checkLengthValidHashtag(inputHashtags.value);
  hasUniqueTags(inputHashtags.value);
  evt.stopPropagation();
});

pristine.addValidator(
  inputHashtags,
  hasUniqueTags,
  messageError.HashtagsRepeats,
  3,
  true
);
pristine.addValidator(
  inputHashtags,
  checkLengthValidHashtag,
  messageError.LengthHashtags,
  2,
  true
);
pristine.addValidator(
  inputHashtags,
  checkValidHashtag,
  messageError.Hashtags,
  1,
  true
);