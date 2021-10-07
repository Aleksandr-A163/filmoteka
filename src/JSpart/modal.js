import modal from '../templates/modal.hbs';
import render from '../templates/card.hbs';
import fetchApi from './api-fetch';
import refs from './variables';
const { libraryEl, watchedEl, queueEl, homeEl, logoEl, collectionList,modalContent, btnModalCloseEl, backdropEl,  ...rest } = refs;

collectionList.addEventListener('click', onUlElClick);
// переменная для фильма, который открыт в модальном окне
let curFilm;
const NewFetchApi = new fetchApi();
libraryEl.addEventListener('click', () => {
  NewFetchApi.list = 'watch';
});
watchedEl.addEventListener('click', () => {
  NewFetchApi.list = 'watch';
});
queueEl.addEventListener('click', () => {
  NewFetchApi.list = 'queue';
});
homeEl.addEventListener('click', () => {
  NewFetchApi.list = 'home';
});
logoEl.addEventListener('click', () => {
  NewFetchApi.list = 'home';
});

// функция рендера
function renderFile(results) {
  collectionList.innerHTML = render({ results });
}

function sliceLibraryOnPage(value) {
  if (value === null) {
    return;
  }
  const groupSize = 20;
  const sliceArr = value
    .map(function (e, i) {
      return i % groupSize === 0 ? value.slice(i, i + groupSize) : null;
    })
    .filter(function (e) {
      return e;
    });
  return sliceArr;
}

function onUlElClick(e) {
  e.preventDefault();
  const currentTarget = e.target.closest('.card')?.querySelector('.card__image').id;
  if (currentTarget === undefined) return;
  window.addEventListener('keydown', onKeyPress);
  backdropEl.classList.remove('is-hidden');

  //работа с хранилищем
  const currentArrayFilms = JSON.parse(localStorage.getItem('currentFilms')).results;
  const arrayWatched = JSON.parse(localStorage.getItem('watched'));
  const arrayQueue = JSON.parse(localStorage.getItem('queue'));
  if (NewFetchApi.list === 'home') {
    curFilm = currentArrayFilms.find(elem => elem.id === Number(currentTarget));
  }
  if (NewFetchApi.list === 'watch') {
    curFilm = arrayWatched.find(elem => elem.id === Number(currentTarget));
  }
  if (NewFetchApi.list === 'queue') {
    curFilm = arrayQueue.find(elem => elem.id === Number(currentTarget));
  }

  renderModal(curFilm);

  //! Новый код//
  const buttonWatchedEl = document.getElementById('watchedInModal')
  const buttonQueueEl = document.getElementById('queueInModal')
  const containerBtnsRef= document.querySelector('.list-buttons')
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
            watchedEl.classList.contains('button--orange') &&
            libraryEl.classList.contains('navigation__link--current')
          ) {
            collectionList.innerHTML = '';
            const watchedFilms = JSON.parse(localStorage.getItem('watched'));
            const watchedFilmsPage = sliceLibraryOnPage(watchedFilms);
            renderFile(watchedFilmsPage[0]);
          }
        } else {
          removeToStore('watched');
          buttonWatchedEl.textContent = 'Add to watched';

          //перерисовка Watched при удаление фильма
          if (
            watchedEl.classList.contains('button--orange') &&
            libraryEl.classList.contains('navigation__link--current')
          ) {
            collectionList.innerHTML = '';
            const watchedFilms = JSON.parse(localStorage.getItem('watched'));
            const watchedFilmsPage = sliceLibraryOnPage(watchedFilms);
            renderFile(watchedFilmsPage[0]);
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

          //перерисовка Queue если пользователь удалил, а потом снова добавил фильм
          if (queueEl.classList.contains('button--orange')) {
            collectionList.innerHTML = '';
            const queueFilms = JSON.parse(localStorage.getItem('queue'));
            const queueFilmsPage = sliceLibraryOnPage(queueFilms);
            renderFile(queueFilmsPage[0]);
          }
        } else {
          removeToStore('queue');
          buttonQueueEl.textContent = 'Add to queue';

          //перерисовка Queue при удаление фильма
          if (queueEl.classList.contains('button--orange')) {
            collectionList.innerHTML = '';
            const queueFilms = JSON.parse(localStorage.getItem('queue'));
            const queueFilmsPage = sliceLibraryOnPage(queueFilms);
            renderFile(queueFilmsPage[0]);
            if (queueFilms.length === 0) {
              collectionList.innerHTML =
                '<li class ="empty-my-library"><p class = "title-empty-my-library">You  have not watched films yet</p><img class="icon-empty-my-library" src="https://image.freepik.com/free-photo/rows-red-seats-theater_53876-64710.jpg" alt ="not films here"></img></li>';
            }
          }
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

// Функция закрытия модалки по эскейпу
function onKeyPress(event) {
  if (event.code === 'Escape') {
    onBtnCloseModalClick();
  }
}
btnModalCloseEl.addEventListener('click', onBtnCloseModalClick);
backdropEl.addEventListener('click', onBackdropClick);

// Функция закрытия модалки по клику на бекдроп
function onBackdropClick(e) {
  if (e.target === e.currentTarget) {
    onBtnCloseModalClick();
  }
}

// Функция закрытия модалки
function onBtnCloseModalClick() {
  backdropEl.classList.add('is-hidden');
  window.removeEventListener('keydown', onKeyPress);
}
