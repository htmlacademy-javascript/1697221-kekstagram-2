// import {createPhotoArray} from './data.js';
import {renderGallery} from './previews.js';
import {setUserFormSubmit} from './upload.js';
import {getData} from './api.js';
import { renderErrorLoadingMessage } from './alerts.js';
import {initFilterSection} from './filtration.js';
// import './filtration.js';

getData()
  .then((data) => {
    renderGallery(data);
    initFilterSection(data, renderGallery);
  })
  .catch(() => renderErrorLoadingMessage());

setUserFormSubmit();
