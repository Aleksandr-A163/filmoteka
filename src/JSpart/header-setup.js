import render from '../templates/card.hbs';
import refs from './variables';

export {
  libraryEl,
  watchedEl,
  queueEl,
  collectionList,
  myLibraryWatchedRender,
  myLibraryQueueRender,
  renderFile,
};
const {
  homeEl,
  collectionList,
  libraryEl,
  headerEl,
  searchEl,
  btnsEl,
  navEl,
  watchedEl,
  queueEl,
  allPagination,
  ...rest
} = refs;

libraryEl.addEventListener('click', onLibraryClick);
watchedEl.addEventListener('click', onWatchedClick);
queueEl.addEventListener('click', onQueueClick);

function onLibraryClick(e) {
  e.preventDefault();

  allPagination.innerHTML = '';
  myLibraryWatchedRender(e);
  if (headerEl.classList.contains('library-bgi')) {
    return;
  }

  homeEl.classList.remove('navigation__link--current');
  headerEl.classList.add('library-bgi');
  headerEl.classList.remove('home-bgi');
  libraryEl.classList.add('navigation__link--current');
  searchEl.classList.remove('show');
  searchEl.classList.add('hide');
  btnsEl.classList.remove('hide');
  btnsEl.classList.add('show');
  navEl.classList.remove('mar-bot-input');
}

function onWatchedClick(e) {
  myLibraryWatchedRender(e);
  watchedEl.classList.add('button--orange');
  queueEl.classList.remove('button--orange');
}

function onQueueClick(e) {
  watchedEl.classList.remove('button--orange');
  queueEl.classList.add('button--orange');
  myLibraryQueueRender(e);
}

function myLibraryWatchedRender(e) {
  e.preventDefault();
  collectionList.innerHTML = '';
  const watchedFilms = JSON.parse(localStorage.getItem('watched'));
  if (watchedFilms.length === 0) {
    collectionList.innerHTML =
      '<li class ="empty-my-library"><p class = "title-empty-my-library">You  have not watched films yet</p><img class="icon-empty-my-library" src="https://image.freepik.com/free-photo/rows-red-seats-theater_53876-64710.jpg" alt ="not films here"></img></li>';
    return;
  }
  renderFile(watchedFilms);
}

function myLibraryQueueRender(e) {
  e.preventDefault();
  collectionList.innerHTML = '';
  const queueFilms = JSON.parse(localStorage.getItem('queue'));
  if (queueFilms.length === 0) {
    collectionList.innerHTML =
      '<li class ="empty-my-library"><p class = "title-empty-my-library">You  have not watched films yet</p><img class="icon-empty-my-library" src="https://image.freepik.com/free-photo/rows-red-seats-theater_53876-64710.jpg" alt ="not films here"></img></li>';
    return;
  }
  renderFile(queueFilms);
}

// функция рендера
function renderFile(results) {
  collectionList.innerHTML = render({ results });
}
