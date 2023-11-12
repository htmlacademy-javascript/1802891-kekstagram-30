import {createPhotos, COUNT_PICTURE} from './data.js';
import {createElementPhotos} from './pictures.js';
import './uploadPictures-modal.js';


const listDataPictures = createPhotos(COUNT_PICTURE);
createElementPhotos(listDataPictures);


