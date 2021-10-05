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
  console.log(watchedFilms)
  if (watchedFilms.length === 0) {
    collectionList.innerHTML =
      '<li class ="empty-my-library"><p class = "title-empty-my-library">You  have not watched films yet</p><img class="icon-empty-my-library" src="https://image.freepik.com/free-photo/rows-red-seats-theater_53876-64710.jpg" alt ="not films here"></img></li>';
    return;
  }
      if (watchedFilms.length > 20) {
    renderLibPaginationBtn()

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
    if (queueFilms.length > 20) {
    renderLibPaginationBtn()
  }
  renderFile(queueFilms);
}

// функция рендера
function renderFile(results) {
  collectionList.innerHTML = render({ results });
}


/////////////////////////////////////////////////////////////////////////////////////

// Пагинация My Library

const paginationLibElement = document.getElementById('paginationLibrary');

const currentMovie = localStorage.getItem('watched');
const NextMovie = JSON.parse(currentMovie);
console.log(NextMovie)

const groupSize = 20;
const arrayPagination = NextMovie.map( function(i){ 
     return i%groupSize===0 ? NextMovie.slice(i,i+groupSize) : null; 
}).filter(function(e){ return e; });
console.log(arrayPagination)

let currentLibPage = 1
const totalLibPages = arrayPagination.length

function renderLibPaginationBtn() {
  const before = currentLibPage - 2;
  const after = currentLibPage + 2;

  for (let i = before; i <= after; i += 1) {
    if (i > 0 && i <= 2) {
      let button = document.createElement('button');
      button.innerText = i;
      paginationLibElement.appendChild(button);
    }
  }
}

function onLibBtnClick(e) {
  e.preventDefault();

  if (e.target.tagName !== 'BUTTON') {
    return;
  }

  listElement.innerHTML = '';
  paginationLibElement.innerHTML = '';

  currentLibPage = Number(e.target.textContent);

  renderLibPaginationBtn();
  const watchedFilms = JSON.parse(localStorage.getItem('watched'));
  renderFile(watchedFilms);
}

paginationLibElement.addEventListener('click', onLibBtnClick);