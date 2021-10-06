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
  homePagination,
  libraryPagination,
  ...rest
} = refs;

libraryEl.addEventListener('click', onLibraryClick);
watchedEl.addEventListener('click', onWatchedClick);
queueEl.addEventListener('click', onQueueClick);

function onLibraryClick(e) {
  e.preventDefault();
  homePagination.classList.add('visually-hidden');
  libraryPagination.classList.remove('visually-hidden');

  // renderLibPag(watchedFilmsPage)

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
  paginationLibElement.innerHTML = '';
  myLibraryWatchedRender(e);
  watchedEl.classList.add('button--orange');
  queueEl.classList.remove('button--orange');
}

function onQueueClick(e) {
  paginationLibElement.innerHTML = '';
  watchedEl.classList.remove('button--orange');
  queueEl.classList.add('button--orange');
  myLibraryQueueRender(e);
}

function myLibraryWatchedRender(e) {
  e.preventDefault();
  collectionList.innerHTML = '';
  const watchedFilms = JSON.parse(localStorage.getItem('watched'));
  const watchedFilmsPage = sliceLibraryOnPage(watchedFilms);
  if (watchedFilms.length === 0) {
    collectionList.innerHTML =
      '<li class ="empty-my-library"><p class = "title-empty-my-library">You  have not watched films yet</p><img class="icon-empty-my-library" src="https://image.freepik.com/free-photo/rows-red-seats-theater_53876-64710.jpg" alt ="not films here"></img></li>';
    return;
  }
  renderFile(watchedFilmsPage[0]);

  if (watchedFilms.length > 20) {
    paginationLibElement.innerHTML = '';
    currentLibPage = 1;
    renderLibPag(watchedFilmsPage);
  }
}

function myLibraryQueueRender(e) {
  e.preventDefault();
  collectionList.innerHTML = '';
  const queueFilms = JSON.parse(localStorage.getItem('queue'));
  const queueFilmsPage = sliceLibraryOnPage(queueFilms);
  if (queueFilms.length === 0) {
    collectionList.innerHTML =
      '<li class ="empty-my-library"><p class = "title-empty-my-library">You  have not watched films yet</p><img class="icon-empty-my-library" src="https://image.freepik.com/free-photo/rows-red-seats-theater_53876-64710.jpg" alt ="not films here"></img></li>';
    return;
  }
  renderFile(queueFilmsPage[0]);
  if (queueFilms.length > 20) {
    paginationLibElement.innerHTML = '';
    currentLibPage = 1;
    renderLibPag(queueFilmsPage);
  }
}

// функция рендера
function renderFile(results) {
  collectionList.innerHTML = render({ results });
}

/////////////////////////////////////////////////////////////////////////////////////

// Пагинация My Library

const paginationLibElement = document.getElementById('paginationLibrary');

const watchedFilms = JSON.parse(localStorage.getItem('watched'));
const queueFilms = JSON.parse(localStorage.getItem('queue'));

const watchedFilmsPage = sliceLibraryOnPage(watchedFilms);
const queueFilmsPage = sliceLibraryOnPage(queueFilms);

function sliceLibraryOnPage(value) {
  if (value === null) {
    return;
  }
  // const NextMovie = JSON.parse(value);
  // console.log(value)
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

// console.log(watchedFilmsPage)
// console.log(queueFilmsPage)
let currentLibPage = 1;

function renderLibPag(value) {
  const totalLibPages = value.length;
  // console.log(totalLibPages)
  renderLibPaginationBtn(value, totalLibPages);
  makeActiveLibBtn();
}
function renderLibPaginationBtn(arrayPagination, totalLibPages) {
  const before = currentLibPage - 2;
  const after = currentLibPage + 2;

  if (totalLibPages > 4) {
    for (let i = before; i <= after; i += 1) {
      if (i > 0 && i <= 2) {
        let button = document.createElement('button');
        button.innerText = i;
        paginationLibElement.appendChild(button);
      }
    }
  }
  if (totalLibPages < 4) {
    arrayPagination.forEach((e, i) => {
      let button = document.createElement('button');
      button.innerText = i + 1;
      paginationLibElement.appendChild(button);
    });
  }
}

function onLibBtnClick(e) {
  e.preventDefault();

  if (e.target.tagName !== 'BUTTON') {
    return;
  }

  collectionList.innerHTML = '';
  paginationLibElement.innerHTML = '';

  currentLibPage = Number(e.target.textContent);
  // console.log(currentLibPage)

  if (watchedEl.classList.contains('button--orange')) {
    const watchedFilms = JSON.parse(localStorage.getItem('watched'));
    const watchedFilmsPage = sliceLibraryOnPage(watchedFilms);
    renderFile(watchedFilmsPage[currentLibPage - 1]);
    renderLibPag(watchedFilmsPage);
  }
  if (queueEl.classList.contains('button--orange')) {
    const queueFilms = JSON.parse(localStorage.getItem('queue'));
    const queueFilmsPage = sliceLibraryOnPage(queueFilms);
    renderFile(queueFilmsPage[currentLibPage - 1]);
    renderLibPag(queueFilmsPage);
  }
}

// console.log(currentLibPage)

function makeActiveLibBtn() {
  let pages = paginationLibElement.querySelectorAll('button');

  for (let i = 0; i < pages.length; i += 1) {
    if (pages[i].classList.contains('active')) {
      pages[i].classList.remove('active');
    }
    if (Number(pages[i].textContent) === currentLibPage) {
      pages[i].classList.add('active');
    }
  }
}

paginationLibElement.addEventListener('click', onLibBtnClick);
