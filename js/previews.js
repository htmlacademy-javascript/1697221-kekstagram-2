import {openBigPicture} from './modal.js';

const picturesSection = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');


const createPreview = ({url, description, likes, comments, id}) => {
  const element = pictureTemplate.cloneNode(true);
  const img = element.querySelector('.picture__img');
  img.src = url;
  img.alt = description;
  element.querySelector('.picture__likes').textContent = likes;
  element.querySelector('.picture__comments').textContent = comments.length;
  element.dataset.id = id;

  return element;
};

const renderPreviews = (items) => {
  const fragment = document.createDocumentFragment();
  items.forEach((item) => {
    const post = createPreview(item);
    fragment.append(post);
  });
  picturesSection.append(fragment);
};

const getPictureData = (items, id) => items.find((dataItem) => dataItem.id === id);

const renderGallery = (items) => {
  renderPreviews(items);

  picturesSection.addEventListener('click', (evt) => {
    if (evt.target.closest('.picture')) {
      evt.preventDefault();
      const id = Number(evt.target.closest('.picture').dataset.id);
      const item = getPictureData (items, id);
      openBigPicture(item);
    }
  });
};

export {renderGallery};
