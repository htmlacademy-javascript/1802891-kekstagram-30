import { sendFormSuccess, sendFormError, renderingPictureError } from './utils.js';

const URL = 'https://30.javascript.pages.academy/kekstagram/';
const MessageError = {
  ERROR_GET: 'Произошла ошибка загрузки фотографий',
  ERROR_POST: 'Произошла ошибка отправки данных',
};

const getData = (method) => {
  fetch(`${URL}data`)
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then((data) => {
      method(data);
    })
    .catch(() => {
      renderingPictureError();
      throw new Error(MessageError.ERROR_GET);
    });
};

const postData = (valid, sendData, closeModal, disabledButton, unblockButton) => {
  if (valid) {
    fetch(
      URL,
      {
        method: 'POST',
        body: sendData,
      },
    )
      .then((response) => {
        disabledButton();
        if (response.ok) {
          closeModal();
          sendFormError();
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        sendFormSuccess();
        throw new Error(MessageError.ERROR_POST);
      })
      .finally(unblockButton);
  }
};

export { getData,postData };
