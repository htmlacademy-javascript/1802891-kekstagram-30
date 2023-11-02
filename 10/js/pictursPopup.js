const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const socialСomments = bigPicture.querySelector('.social__comments');
const socialComment = bigPicture.querySelector('.social__comment');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

/**
 * функция для добавления комментариев к фотографии
 * @param {arry} — массив данных комментариев
 */
const renderComment = (comment) => {
  const elementListComment = socialComment.cloneNode(true);

  //comments.forEach((comment) => {
  elementListComment.querySelector('.social__picture').src = comment.avatar;
  elementListComment.querySelector('.social__picture').alt = comment.name;
  elementListComment.querySelector('.social__text').textContent = comment.message;
  socialСomments.append(elementListComment);
  //socialСomments.children.remove();
  //});
};

/**
 * функция для перебора коментариев
 * @param {arry} — массив данных комментариев
 */
const renderComments = (comments) => {

  comments.forEach((comment) => {
    renderComment(comment);
  });

};


const show = (picture, comments) => {
  // socialComment.remove('nth-child(1)');
  // socialComment.remove('nth-child(2)');
  bigPicture.querySelector('.big-picture__img > img').src = picture.url;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__comment-shown-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__comment-total-count').textContent = picture.comments.length;
  bigPicture.classList.remove('hidden');
  body.classList.add('.modal-open');
  commentsLoader.classList.add('hidden');
  socialCommentCount.classList.add('hidden');
  renderComments(comments);
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
