import modal from '../templates/modal.hbs'

const collectionList = document.getElementById('home');
// collectionList взят из index.js
const modalContent = document.querySelector('.modal__content');

const btnModalCloseEl = document.querySelector('.button-modal--close');
const backdropEl = document.querySelector('.backdrop');
const modalImageEl = document.querySelector('.modal__image');

collectionList.addEventListener('click', onUlElClick);
// переменная для фильма, который открыт в модальном окне
let curFilm;

function onUlElClick(e) {
    e.preventDefault();
    console.log(e.target)
    // if (!e.target.classList.contains('card')) {
    // return
    // }
    window.addEventListener('keydown', onKeyPress);
    backdropEl.classList.remove('is-hidden');
//     console.log(e.target.src);
//     modalImageEl.src = e.target.src;
//   modalImageEl.alt = e.target.alt;
    
    //работа с хранилищем
  const currentArrayFilms = JSON.parse(localStorage.getItem('currentFilms'));
  const currentTarget = e.target.id;
  curFilm = currentArrayFilms.find(elem => elem.id === Number(currentTarget));
    renderModal(curFilm);
    const currentQueue = JSON.parse(localStorage.getItem('queue'));
    // console.log(currentQueue)
    //условие проверки нахождения фильма в хранилище
    const buttonQueueEl = document.getElementById('queueInModal');
    if (!currentQueue.some(e => e.id === Number(currentTarget))) {
        buttonQueueEl.addEventListener('click', addToQueue);
    }  
}

// Функция добавления фильма в localeStorage Oueue
function addToQueue() {
  const currentQueue = localStorage.getItem('queue');
  const NextQueue = JSON.parse(currentQueue);
  NextQueue.push(curFilm);
  localStorage.setItem('queue', JSON.stringify(NextQueue));
//   console.log(NextQueue);
}
// функция динамического рендера разметки модалки с данными
function renderModal(curFilm) {
  modalContent.innerHTML = modal({ curFilm });
}

function onKeyPress(event) {
    if (event.code === 'Escape') {
        onBtnCloseModalClick();
    }
}
btnModalCloseEl.addEventListener('click', onBtnCloseModalClick);
backdropEl.addEventListener('click', onBackdropClick);

function onBackdropClick(e) {
    if (e.target === e.currentTarget) {
        onBtnCloseModalClick();
    }
}
function onBtnCloseModalClick() {
    backdropEl.classList.add('is-hidden');
    window.removeEventListener('keydown', onKeyPress);
    // modalImageEl.src = "";
}