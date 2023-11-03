const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const socialComments = bigPicture.querySelector('.social__comments');
const socialComment = bigPicture.querySelector('.social__comment');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

/**
 * функция для добавления комментариев к фотографии
 * @param {arry} — массив данных комментариев
 */
const renderComment = (comments) => {
  socialComments.innerHTML = '';
  const pictureCommentsFragment = document.createDocumentFragment();

  comments.forEach(({avatar, name, message}) => {
    const elementListComment = socialComment.cloneNode(true);
    elementListComment.querySelector('.social__picture').src = avatar;
    elementListComment.querySelector('.social__picture').alt = name;
    elementListComment.querySelector('.social__text').textContent = message;
    pictureCommentsFragment.append(elementListComment);
  });

  socialComments.append(pictureCommentsFragment);
};

const show = (picture) => {
  bigPicture.querySelector('.big-picture__img > img').src = picture.url;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__comment-shown-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__comment-total-count').textContent = picture.comments.length;
  bigPicture.classList.remove('hidden');
  body.classList.add('.modal-open');
  commentsLoader.classList.add('hidden');
  socialCommentCount.classList.add('hidden');
  renderComment(picture.comments);
};

bigPictureClose.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('.modal-open');
});

window.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    bigPicture.classList.add('hidden');
    body.classList.remove('.modal-open');
  }
});

export{show};
