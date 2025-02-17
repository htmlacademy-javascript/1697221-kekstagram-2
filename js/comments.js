import {hideElement, showElement} from './util.js';

const socialSection = document.querySelector('.social');
const commentsList = socialSection.querySelector('.social__comments');
const commentLoader = socialSection.querySelector('.social__comments-loader');
const shownCommentCounter = socialSection.querySelector('.social__comment-shown-count');

const STEP = 5;

const createComment = ({avatar, name, message}) => {
  const commentItem = document.createElement('li');
  commentItem.classList.add('social__comment');
  commentItem.innerHTML = `<img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
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

let onCommentLoader;

const showComments = (item) => {
  commentsList.innerHTML = '';
  let startValue = 0;
  let finalValue = startValue + STEP;
  renderComments(startValue, finalValue, item.comments);
  shownCommentCounter.textContent = commentsList.childElementCount;

  if (finalValue >= item.comments.length) {
    hideElement (commentLoader);
  } else {
    showElement(commentLoader);
  }

  onCommentLoader = () => {
    startValue = startValue + STEP;
    finalValue = startValue + STEP;
    renderComments(startValue, finalValue, item.comments);
    shownCommentCounter.textContent = commentsList.childElementCount;

    if (finalValue >= item.comments.length) {
      hideElement (commentLoader);
      commentLoader.removeEventListener('click', onCommentLoader);
    }
  };

  commentLoader.addEventListener('click', onCommentLoader);
};


export {renderComments, showComments, onCommentLoader};

