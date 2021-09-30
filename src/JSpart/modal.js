import modal from '../templates/modal.hbs';

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
  // if (!e.target.classList.contains('card')) {
  // return
  // }
  window.addEventListener('keydown', onKeyPress);
  backdropEl.classList.remove('is-hidden');


  //работа с хранилищем
  const currentArrayFilms = JSON.parse(localStorage.getItem('currentFilms')).results;
  const arrayWatched = JSON.parse(localStorage.getItem('watched'));
  const arrayQueue = JSON.parse(localStorage.getItem('queue'));
  const currentTarget = e.target.closest('.card').querySelector('.card__image').id;
  curFilm = currentArrayFilms.find(elem => elem.id === Number(currentTarget));
  renderModal(curFilm);

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
          addToStore("watched");
          buttonWatchedEl.textContent = 'Remove to watched';
        } else {
          removeToStore("watched");
          buttonWatchedEl.textContent = 'Add to watched';
        }
      } else if (cardBtn.id === 'queueInModal') {
        if (!currentQueue.some(e => e.id === Number(currentTarget))) {
          addToStore("queue");
          buttonQueueEl.textContent = 'Remove to queue';
        } else {
          removeToStore("queue");
          buttonQueueEl.textContent = 'Add to queue';
        }
      }
    }
  }
}
// Функция добавления фильма в хранилище
function addToStore(store) {
  const currentMovie = localStorage.getItem(store);
  const NextMovie = JSON.parse(currentMovie);
  NextMovie.push(curFilm);
  localStorage.setItem(store, JSON.stringify(NextMovie));
  //   console.log(NextQueue);
}
// Функция удаления фильма из хранилища
function removeToStore(store) {
  const currentMovie = localStorage.getItem(store);
  const NextMovie = JSON.parse(currentMovie);
  const UpdateMovie = NextMovie.filter(e => e.id !== curFilm.id);
  localStorage.setItem(store, JSON.stringify(UpdateMovie));
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
