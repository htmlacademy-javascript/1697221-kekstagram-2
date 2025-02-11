import {picturesSection} from './content.js';
import {openBigPicture, generateBigPicture, commentSection, commentLoader} from './bigpicture.js';
import {dataArray} from './data.js';
import {renderAllComments} from './comments.js';

const getPictureData = function (id) {
  return dataArray.find((item) => item.id === id);
};

picturesSection.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture')) {
    const id = Number(evt.target.closest('.picture').dataset.id);
    const item = getPictureData (id);
    generateBigPicture (item);
    renderAllComments(item.comments);
    openBigPicture();
    commentSection.classList.add('hidden');
    commentLoader.classList.add('hidden');
  }
});
