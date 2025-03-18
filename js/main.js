// import {createPhotoArray} from './data.js';
import {renderGallery} from './previews.js';
// import './upload.js';
import {setUserFormSubmit, closeUploadForm} from './upload.js';
import {getData} from './api.js';

getData()
  .then((data) => renderGallery(data));

setUserFormSubmit(closeUploadForm);


