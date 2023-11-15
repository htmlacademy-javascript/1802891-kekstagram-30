const body = document.querySelector('body');


const MessageError = {
  ERROR_GET: 'Произошла ошибка загрузки фотографий',
  ERROR_POST: 'Произошла ошибка отправки данных',
};

const successSendForm = () => {
  const templateSuccess = document.querySelector('#success').content.querySelector('.success');
  const templateClose = templateSuccess.querySelector('.success__button');
  body.append(templateSuccess);
  templateClose.addEventListener('click', () => {
    body.removeChild(templateSuccess);
  });
};

const errorSendForm = () => {
  const templateError = document.querySelector('#error').content.querySelector('.error');
  const templateClose = templateError.querySelector('.error__button');
  body.append(templateError);
  templateClose.addEventListener('click', () => {
    body.removeChild(templateError);
  });
};

const errorRenderingPicture = () => {
  const templateLoadError = document.querySelector('#data-error').content.querySelector('.data-error');
  body.append(templateLoadError);
  setTimeout(() => {
    body.removeChild(templateLoadError);
  }, 3000);
};

const getData = (method) => {
  fetch('https://30.javascript.pages.academy/kekstagram/data')
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
      errorRenderingPicture();
      throw new Error(MessageError.ERROR_GET);
    });
};

const postData = (valid, sendData, closeModal, disabledButton, unblockButton) => {
  if (valid) {
    fetch(
      'https://30.javascript.pages.academy/kekstagram/',
      {
        method: 'POST',
        body: sendData,
      },
    )
      .then((response) => {
        if (response.ok) {
          closeModal();
          setTimeout(successSendForm, 1000);
          disabledButton();
        }
      })
      .catch(() => {
        setTimeout(errorSendForm, 1000);
        throw new Error(MessageError.ERROR_POST);
      })
      .finally(unblockButton);
  }
};

export { getData,postData };
