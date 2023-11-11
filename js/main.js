import {createPhotos, COUNT_PICTURE} from './data.js';
import {createElementPhotos} from './pictures.js';
import { ZoomOption, editZoomPicture } from './edit-upload-pictures.js';
import './form.js';

const listDataPictures = createPhotos(COUNT_PICTURE);
createElementPhotos(listDataPictures);

editZoomPicture(ZoomOption);
