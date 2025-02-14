const modal = document.querySelector('.big-picture');
const commentsList = modal.querySelector('.social__comments');

const createComment = ({avatar, name, message}) => {
  const commentItem = document.createElement('li');
  commentItem.classList.add('social__comment');
  const image = document.createElement('img');
  image.classList.add('social__picture');
  image.src = avatar;
  image.alt = name;
  image.width = 35;
  image.height = 35;
  const commentText = document.createElement('p');
  commentText.textContent = message;
  commentItem.append(image, commentText);
  return commentItem;
};

const renderComments = (start, final, comments) => {
  const currentArray = comments.slice(start, final);
  currentArray.forEach((item) => {
    const comment = createComment(item);
    commentsList.append(comment);
  });
};

export {renderComments};
