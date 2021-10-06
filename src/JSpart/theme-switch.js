// переключение темы
const checkboxEl = document.querySelector('.theme-switch__toggle');
const bodyEl = document.querySelector('body');
const modalEl = document.querySelector('.modal');
const studentsModalEl = document.querySelector('.modal--students');

const modalCloseEl = document.querySelector('.close__svg');
const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};
bodyEl.classList.add(Theme.LIGHT);

if (localStorage.getItem('theme')) {
    checkboxEl.setAttribute('checked', true);
    bodyEl.classList.add(Theme.DARK);
    modalEl.classList.add(Theme.DARK);
    studentsModalEl.classList.add(Theme.DARK);
    modalCloseEl.classList.add(Theme.DARK);
}

const onChange = () => {
    bodyEl.classList.toggle(Theme.DARK);
    modalEl.classList.toggle(Theme.DARK);
    studentsModalEl.classList.toggle(Theme.DARK);
    modalCloseEl.classList.toggle(Theme.DARK);

    if (bodyEl.classList.contains(Theme.DARK)) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.removeItem('theme');
    }    
};
checkboxEl.addEventListener('change', onChange);
