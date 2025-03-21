// import {createPhotoArray} from './data.js';
import {renderGallery} from './previews.js';
import {setUserFormSubmit} from './upload.js';
import {getData} from './api.js';
import { renderErrorLoadingMessage } from './alerts.js';
import {showFilterSection} from './filtration.js';
// import './filtration.js';

getData()
  .then((data) => {
    renderGallery(data);
    showFilterSection();
  })
  .catch(() => renderErrorLoadingMessage());

setUserFormSubmit();
