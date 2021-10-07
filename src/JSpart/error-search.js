import refs from './variables';
const {
  errorEl,
  ...rest
} = refs;

export default function errorSearch(text) {
  errorEl.textContent = text;
  errorEl.classList.remove('visually-hidden');
  setTimeout(() => {
    errorEl.classList.add('visually-hidden');
  }, 2000);
}
