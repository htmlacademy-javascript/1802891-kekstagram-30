import { getData } from './api.js';
import { checkValidateForm } from './form.js';
import { filteringPicture } from './filters.js';
import { debounce } from './utils.js';

getData(debounce(filteringPicture, 500));
checkValidateForm();
