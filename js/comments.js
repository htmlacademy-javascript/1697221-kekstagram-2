import {hideElement, showElement} from './util.js';

const STEP_LOADING_COMMENTS = 5;

const socialSection = document.querySelector('.social');
const totalComments = socialSection.querySelector('.social__comment-total-count');
const commentsList = socialSection.querySelector('.social__comments');
const commentLoader = socialSection.querySelector('.social__comments-loader');
const shownCommentCounter = socialSection.querySelector('.social__comment-shown-count');

const createComment = ({avatar, name, message}) => {
  const commentItem = document.createElement('li');
  commentItem.classList.add('social__comment');

  const picture = document.createElement('img');
  picture.classList.add('social__picture');
  picture.src = avatar;
  picture.alt = name;
  picture.width = 35;
  picture.height = 35;

  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = message;

  commentItem.append(picture, text);
  return commentItem;
};

const renderComments = (start, final, comments) => {
  const shownComments = comments.slice(start, final);
  shownComments.forEach((item) => {
    const comment = createComment(item);
    commentsList.append(comment);
  });
};

let currentItem;
let startValue;
let finalValue;

const onCommentLoaderClick = () => {
  startValue += STEP_LOADING_COMMENTS;
  finalValue = startValue + STEP_LOADING_COMMENTS;

  renderComments(startValue, finalValue, currentItem.comments);
  shownCommentCounter.textContent = commentsList.childElementCount;

  if (finalValue >= currentItem.comments.length) {
    hideElement (commentLoader);
    commentLoader.removeEventListener('click', onCommentLoaderClick);
  }
};

const initCommentsSection = (item) => {
  currentItem = item;
  startValue = 0;
  finalValue = startValue + STEP_LOADING_COMMENTS;
  totalComments.textContent = item.comments.length;
  commentsList.innerHTML = '';

  renderComments(startValue, finalValue, item.comments);
  shownCommentCounter.textContent = commentsList.childElementCount;

  if (finalValue >= item.comments.length) {
    hideElement (commentLoader);
    commentLoader.removeEventListener('click', onCommentLoaderClick);
  } else {
    showElement(commentLoader);
    commentLoader.addEventListener('click', onCommentLoaderClick);
  }
};

const destroyCommentSection = () => {
  commentLoader.removeEventListener('click', onCommentLoaderClick);
  currentItem = null;
  startValue = 0;
};


export {renderComments, initCommentsSection, destroyCommentSection};

