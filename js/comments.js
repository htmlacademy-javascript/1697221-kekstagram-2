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
  commentItem.innerHTML = `
    <img  class="social__picture"
          src="${avatar}"
          alt="${name}"
          width="35"
          height="35">
    <p class="social__text">${message}</p>`;
  return commentItem;
};

const renderComments = (start, final, comments) => {
  const currentArray = comments.slice(start, final);
  currentArray.forEach((item) => {
    const comment = createComment(item);
    commentsList.append(comment);
  });
};


const showComments = (item) => {
  totalComments.textContent = item.comments.length;
  commentsList.innerHTML = '';
  let startValue = 0;
  let finalValue = startValue + STEP_LOADING_COMMENTS;

  renderComments(startValue, finalValue, item.comments);
  shownCommentCounter.textContent = commentsList.childElementCount;

  if (finalValue >= item.comments.length) {
    hideElement (commentLoader);
  } else {
    showElement(commentLoader);
  }

  const onCommentLoaderClick = () => {
    startValue += + STEP_LOADING_COMMENTS;
    finalValue = startValue + STEP_LOADING_COMMENTS;

    renderComments(startValue, finalValue, item.comments);
    shownCommentCounter.textContent = commentsList.childElementCount;

    if (finalValue >= item.comments.length) {
      hideElement (commentLoader);
      commentLoader.removeEventListener('click', onCommentLoaderClick);
    }
  };

  commentLoader.removeEventListener('click', onCommentLoaderClick);
  commentLoader.addEventListener('click', onCommentLoaderClick);
};


export {renderComments, showComments};

