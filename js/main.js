import {createElementPhotos} from './pictures.js';
import { getData } from './api.js';
import { checkValidateForm } from './form.js';

getData(createElementPhotos);
checkValidateForm();
