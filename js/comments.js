import {bigPicture} from './bigpicture.js';

const commentsList = bigPicture.querySelector('.social__comments');

const renderComment = ({avatar, name, message}) => {
  const commentItem = document.createElement('li');
  commentItem.classList.add('social__comment');
  const image = document.createElement('img');
  image.classList.add('social__picture');
  image.src = avatar;
  image.alt = name;
  const commentText = document.createElement('p');
  commentText.textContent = message;
  commentItem.append(image, commentText);
  return commentItem;
};

const renderAllComments = (comments) => {
  commentsList.innerHTML = '';
  const fragment = document.createDocumentFragment();

  comments.forEach((item) => {
    const comment = renderComment(item);
    fragment.append(comment);
  });

  commentsList.append(fragment);
};

export {renderAllComments};
