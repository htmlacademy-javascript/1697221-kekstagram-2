import {setUserFormSubmit} from './upload.js';
import {getData} from './api.js';
import { renderErrorLoadingMessage } from './alerts.js';
import {initGallery} from './gallery.js';


getData()
  .then((data) => {
    initGallery(data);
  })
  .catch(() => renderErrorLoadingMessage());

setUserFormSubmit();
