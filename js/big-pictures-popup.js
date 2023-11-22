const COMMENTS_COUNT_SHOW = 5;

const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const socialComments = bigPicture.querySelector('.social__comments');
const socialComment = bigPicture.querySelector('.social__comment');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const commentsLoader = bigPicture.querySelector('.comments-loader');

let containerComments = [];
let commentsCountShown = 0;

/**
 * функция для создания комментария к фотографии
 * @param {object} - объект содержащий информацию комментария
 * @return {LI} - тег li в котором хранится информация комментария
 */
const createComment = ({avatar,name, message}) => {
  const elementListComment = socialComment.cloneNode(true);
  elementListComment.querySelector('.social__picture').src = avatar;
  elementListComment.querySelector('.social__picture').alt = name;
  elementListComment.querySelector('.social__text').textContent = message;
  return elementListComment;
};

/**
 * функция для добавления комментариев к фотографии
 */
const renderComments = () => {
  commentsCountShown += COMMENTS_COUNT_SHOW;
  let countComments = 0;
  if (commentsCountShown >= containerComments.length) {
    commentsLoader.classList.add('hidden');
    commentsCountShown = containerComments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }
  const pictureCommentsFragment = document.createDocumentFragment();
  socialComments.innerHTML = '';

  for (let i = 0; i < commentsCountShown; i++) {
    const comment = createComment(containerComments[i]);
    pictureCommentsFragment.append(comment);
    countComments++;
  }
  bigPicture.querySelector('.social__comment-shown-count').textContent = countComments;
  socialComments.append(pictureCommentsFragment);
};

const showBigPicture = ({url, description, likes, comments}) => {
  bigPicture.querySelector('.big-picture__img > img').src = url;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__comment-total-count').textContent = comments.length;
  containerComments = comments;
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  renderComments((comments));
};

bigPictureClose.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  commentsCountShown = 0;
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    commentsCountShown = 0;
  }
});

const onCommentsLoaderClick = () => renderComments();

commentsLoader.addEventListener('click', onCommentsLoaderClick);


export{showBigPicture};
