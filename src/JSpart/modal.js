import modal from '../templates/modal.hbs';
import { myLibrary, watched, queue, myLibraryWatchedRender, renderFile } from './render-my-library';
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
  const currentTarget = e.target.closest('.card')?.querySelector('.card__image').id;
  if (currentTarget === undefined) return;
  // if (!e.target.classList.contains('card')) {
  // return
  // }
  window.addEventListener('keydown', onKeyPress);
  backdropEl.classList.remove('is-hidden');

  //работа с хранилищем
  const currentArrayFilms = JSON.parse(localStorage.getItem('currentFilms')).results;
  const arrayWatched = JSON.parse(localStorage.getItem('watched'));
  const arrayQueue = JSON.parse(localStorage.getItem('queue'));

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
          addToStore('watched');
          buttonWatchedEl.textContent = 'Remove to watched';
          //перерисовка watched если пользователь удалил, а потом снова добавил фильм
          if (
            watched.classList.contains('button--orange') &&
            myLibrary.classList.contains('navigation__link--current')
          ) {
            collectionList.innerHTML = '';
            const watchedFilms = JSON.parse(localStorage.getItem('watched'));
            renderFile(watchedFilms);
            console.log(watchedFilms);
          }
        } else {
          removeToStore('watched');
          buttonWatchedEl.textContent = 'Add to watched';
          //перерисовка Watched при удаление фильма
          if (
            watched.classList.contains('button--orange') &&
            myLibrary.classList.contains('navigation__link--current')
          ) {
            collectionList.innerHTML = '';
            const watchedFilms = JSON.parse(localStorage.getItem('watched'));
            renderFile(watchedFilms);
            console.log(watchedFilms);
            if (watchedFilms.length === 0) {
              collectionList.innerHTML =
                '<li class ="empty-my-library"><p class = "title-empty-my-library">You  have not watched films yet</p><img class="icon-empty-my-library" src="https://image.freepik.com/free-photo/rows-red-seats-theater_53876-64710.jpg" alt ="not films here"></img></li>';
            }
          }
        }
      } else if (cardBtn.id === 'queueInModal') {
        if (!currentQueue.some(e => e.id === Number(currentTarget))) {
          addToStore('queue');
          buttonQueueEl.textContent = 'Remove to queue';
        } else {
          removeToStore('queue');
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
