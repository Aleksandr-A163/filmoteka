import checkLanguage from './check-language';
import cleanInput from './clean-input';
import errorSearch from '../JSpart/error-search';

export default function checkQuery(query) {
  if (!query) {
    return true;
  }
  if (checkLanguage(query) != 'en') {
    // console.log('Please enter your request in English');
    errorSearch('Please enter your request in English');
    cleanInput();
    return true;
  }
}
