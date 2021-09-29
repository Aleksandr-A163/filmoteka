import modal from '../templates/modal.hbs';
import render from '../templates/card.hbs';
import { renderFile } from '../JSpart/render-my-library';

const collectionList = document.getElementById('page');
const myLibrary = document.querySelector('.js-library');
const watched = document.querySelector('.js-watched');
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
  console.log(e.target);
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
  const arrayWatched = JSON.parse(localStorage.getItem('watched'));
  const arrayQueue = JSON.parse(localStorage.getItem('queue'));
  const currentTarget = e.target.id;
  curFilm = currentArrayFilms.find(elem => elem.id === Number(currentTarget));
  renderModal(curFilm);
  // const currentQueue = JSON.parse(localStorage.getItem('queue'));
  // const currentWatched = JSON.parse(localStorage.getItem('watched'));
  // console.log(currentQueue)

  //! Новый код//
  const buttonWatchedEl = document.getElementById('watchedInModal');
  const buttonQueueEl = document.getElementById('queueInModal');
  const containerBtnsRef = document.querySelector('.list-buttons');

  //**Текст кнопок после проверки на наличие в localStorage */
  //Watched
  if (arrayWatched.some(e => e.id === Number(currentTarget))) {
    buttonWatchedEl.textContent = 'Remove to watched';
  } else {
    buttonWatchedEl.textContent = 'Add to watched';
  }

  //Queue
  if (arrayQueue.some(e => e.id === Number(currentTarget))) {
    buttonQueueEl.textContent = 'Remove to queue';
  } else {
    buttonQueueEl.textContent = 'Add to queue';
  }

  containerBtnsRef.addEventListener('click', toLocalStorage);

  function toLocalStorage(event) {
    event.preventDefault();
    const cardBtn = event.target;
    const currentQueue = JSON.parse(localStorage.getItem('queue'));
    const currentWatched = JSON.parse(localStorage.getItem('watched'));
    if (cardBtn.nodeName === 'BUTTON') {
      if (cardBtn.id === 'watchedInModal') {
        //cardBtn.toggle('');
        if (!currentWatched.some(e => e.id === Number(currentTarget))) {
          addToWatched();
          buttonWatchedEl.textContent = 'Remove to watched';
        } else {
          removeToWatched();
          buttonWatchedEl.textContent = 'Add to watched';
        }
      } else if (cardBtn.id === 'queueInModal') {
        if (!currentQueue.some(e => e.id === Number(currentTarget))) {
          addToQueue();
          buttonQueueEl.textContent = 'Remove to queue';
        } else {
          removeToQueue();
          buttonQueueEl.textContent = 'Add to queue';
        }
      }
    }
  }

  //условие проверки нахождения фильма в хранилище watched
  // if (!currentQueue.some(e => e.id === Number(currentTarget))) {
  //   buttonWatchedEl.addEventListener('click', addToWatched);
  // }

  //условие проверки нахождения фильма в хранилище queue

  //   if (!currentQueue.some(e => e.id === Number(currentTarget))) {
  //     buttonQueueEl.addEventListener('click', addToQueue);
  //   }
}

// Функция добавления фильма в localeStorage Watched
function addToWatched() {
  const currentWatched = localStorage.getItem('watched');
  const NextWatched = JSON.parse(currentWatched);
  NextWatched.push(curFilm);
  localStorage.setItem('watched', JSON.stringify(NextWatched));
  //   console.log(NextQueue);
  if (watched.classList.contains("button--orange") && myLibrary.classList.contains("navigation__link--current")) {
    collectionList.innerHTML = '';
    const watchedFilms = JSON.parse(localStorage.getItem('watched'));
    renderFile(watchedFilms);
    console.log(watchedFilms);
  }
}

function removeToWatched() {
  const currentWatched = localStorage.getItem('watched');
  const NextWatched = JSON.parse(currentWatched);
  const UpdateWatched = NextWatched.filter(e => {
    e.id !== curFilm.id;
  });
  localStorage.setItem('watched', JSON.stringify(UpdateWatched));

  //перерисовка Watched при удаление фильма 
  if (watched.classList.contains("button--orange") && myLibrary.classList.contains("navigation__link--current")) {
     
    collectionList.innerHTML = '';
    const watchedFilms = JSON.parse(localStorage.getItem('watched'));
    renderFile(watchedFilms);
    console.log(watchedFilms);
     if (watchedFilms.length === 0){
    collectionList.innerHTML = '<div class ="empty-my-library"><p class = "title-empty-my-library">You  have not watched films yet</p><img class="icon-empty-my-library" src="https://image.freepik.com/free-photo/rows-red-seats-theater_53876-64710.jpg" alt ="not films here"></img></div>';
    }
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

function removeToQueue() {
  const currentQueue = localStorage.getItem('queue');
  const NextQueue = JSON.parse(currentQueue);
  const UpdateQueue = NextQueue.filter(e => {
    e.id !== curFilm.id;
  });
  localStorage.setItem('queue', JSON.stringify(UpdateQueue));
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

