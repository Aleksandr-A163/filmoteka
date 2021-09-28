import checkLanguage from './checkLanguage';
import cleanInput from './cleanInput';

export default function checkQuery(query) {
  if (!query) {
    return true;
  }
  if (checkLanguage(query) != 'en') {
    console.log('Please enter your request in English');
    cleanInput();
    return true;
  }
}
