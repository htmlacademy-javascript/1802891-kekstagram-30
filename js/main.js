import {createPhotos, COUNT_PICTURE} from './data.js';
import {createElementPhotos} from './pictures.js';
import './form.js';
import './slider-form.js';
const listDataPictures = createPhotos(COUNT_PICTURE);
createElementPhotos(listDataPictures);


