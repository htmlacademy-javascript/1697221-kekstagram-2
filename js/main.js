// import {createPhotoArray} from './data.js';
import {renderGallery} from './previews.js';
import {setUserFormSubmit} from './upload.js';
import {getData} from './api.js';
import { renderErrorLoadingMessage } from './alerts.js';

getData()
  .then((data) => renderGallery(data))
  .catch(() => renderErrorLoadingMessage());

setUserFormSubmit();
