import fetchApi from './api-fetch';
import render from '../templates/card.hbs';
import cleanInput from './clean-input';
import checkQuery from './check-query';
import errorSearch from './error-search';
const FetchApi = new fetchApi();

const listElement = document.querySelector('.collection');
const paginationElement = document.getElementById('pagination');
const arrowLeft = document.querySelector('.arrow_left');
const arrowRight = document.querySelector('.arrow_right');
const btnSearchEl = document.querySelector('.search__button');
let currentPage = 1;
const pagesOnWindow = 5;
let pageCount;
let rows = 20;
let totalPages = 10;

FetchApi.fetchGenres().then(r => {
  localStorage.setItem('genres', JSON.stringify(r.genres));
});
FetchApi.fetchPopularFilmsByPage().then(r => {
  FetchApi.replaceGenreA(JSON.parse(localStorage.getItem('genres')), r);
  FetchApi.saveInLocale(r);
  FetchApi.renderCards();
  // renderPagination(r.total_pages, r.results);
  totalPages = r.total_pages;
  renderPagination();
});

// function renderPagination(totalPages, listItems) {
//   paginationElement.innerHTML = '';
//   currentPage = 1;

//   function setupPagination(items, wrapper) {
//     wrapper.innerHTML = '';

//     pageCount = totalPages;
//     let maxLeftPage = currentPage - Math.floor(pagesOnWindow / 2);
//     let maxRightPage = currentPage + Math.floor(pagesOnWindow / 2);

//     if (maxLeftPage < 1) {
//       maxLeftPage = 1;
//       maxRightPage = pagesOnWindow;
//     }
//     if (maxRightPage > totalPages) {
//       maxLeftPage = totalPages - (pagesOnWindow - 1);

//       if (maxLeftPage < 1) {
//         maxLeftPage = 1;
//       }
//       maxRightPage = totalPages;
//     }

//     for (let i = 1; i <= totalPages; i++) {
//       if (maxLeftPage !== 1 && i == 1) {
//         let btn = paginationButton(i);
//         wrapper.appendChild(btn);
//       }
//       if (maxRightPage !== totalPages && i == totalPages) {
//         let btn = paginationButton(i);
//         wrapper.appendChild(btn);
//       }
//       if (i >= maxLeftPage && i <= maxRightPage) {
//         let btn = paginationButton(i);
//         wrapper.appendChild(btn);
//       }

//       if (
//         totalPages >= 6 &&
//         i == 1 &&
//         currentPage !== 1 &&
//         currentPage !== 2 &&
//         currentPage !== 3
//       ) {
//         const threeDotsEl = addThreeDotsBlock();
//         wrapper.insertBefore(threeDotsEl, wrapper[wrapper.length - 2]);
//       }
//       if (
//         pageCount >= 7 &&
//         i == pageCount - 1 &&
//         currentPage !== pageCount &&
//         currentPage !== pageCount - 2 &&
//         currentPage !== pageCount - 1
//       ) {
//         const threeDotsEl = addThreeDotsBlock();
//         wrapper.insertBefore(threeDotsEl, wrapper[1]);
//       }
//     }
//   }

//   function addThreeDotsBlock() {
//     const threeDots = document.createElement('div');
//     threeDots.classList.add('threeDots');
//     threeDots.innerText = '...';
//     return threeDots;
//   }
//   function paginationButton(page) {
//     console.log(page);
//     let button = document.createElement('button');
//     button.innerText = page;

//     if (currentPage == page) button.classList.add('active');

//     button.addEventListener('click', () => {
//       currentPage = page;
//       FetchApi.getPaginationPage('fetchPopularFilmsByPage', currentPage);

//       let current_btn = document.querySelector('.pagenumbers button.active');
//       current_btn.classList.remove('active');

//       button.classList.add('active');
//       setupPagination(listItems, paginationElement, rows);
//     });
//     return button;
//   }

//   function onArrowLeftClick() {
//     if (currentPage > 1) {
//       currentPage--;
//       FetchApi.getPaginationPage('fetchPopularFilmsByPage', currentPage);
//       setupPagination(listItems, paginationElement, rows);
//     }
//   }

//   function onArrowRightClick() {
//     if (currentPage < totalPages) {
//       currentPage++;
//       FetchApi.getPaginationPage('fetchPopularFilmsByPage', currentPage);
//       setupPagination(listItems, paginationElement, rows);
//     }
//   }

//   setupPagination(listItems, paginationElement, rows);
//   arrowLeft.onclick = onArrowLeftClick;
//   arrowRight.onclick = onArrowRightClick;
// }

// // отключение стрелок на первой и последней странице
// paginationElement.addEventListener('click', disableArrowBtnAfterPageClick);

// function disableArrowBtnAfterPageClick(event) {
//   if (event.target.tagName != 'BUTTON') {
//     return;
//   } else {
//     disableArrowBtn(pageCount);
//   }
// }
// function disableArrowBtn(totalPages) {
//   if (currentPage === 1) {
//     arrowLeft.classList.add('disabled-arrow');
//   } else {
//     arrowLeft.classList.remove('disabled-arrow');
//   }

//   if (currentPage === totalPages) {
//     arrowRight.classList.add('disabled-arrow');
//   } else {
//     arrowRight.classList.remove('disabled-arrow');
//   }
// }

// Рендер кнопок

function renderPaginationBtn() {
  const before = currentPage - 2;
  const after = currentPage + 2;

  for (let i = before; i <= after; i += 1) {
    if (i > 0 && i <= totalPages) {
      let button = document.createElement('button');
      button.innerText = i;
      paginationElement.appendChild(button);
    }
  }
}
function makeActiveBtn() {
  let pages = paginationElement.querySelectorAll('button');
  for (let i = 0; i < pages.length; i += 1) {
    if (Number(pages[i].textContent) === currentPage) {
      pages[i].classList.add('active');
    }
  }
}

export function onBtnClick(e) {
  e.preventDefault();

  if (e.target.tagName !== 'BUTTON') {
    return;
  }

  listElement.innerHTML = '';
  paginationElement.innerHTML = '';

  currentPage = Number(e.target.textContent);
  FetchApi.pagination(currentPage);
  renderPagination();
  console.log('FetchApi.query', FetchApi.query);
  if (FetchApi.query) {
    FetchApi.getPaginationPage('fetchSearchFilms', currentPage);
  } else {
    FetchApi.getPaginationPage('fetchPopularFilmsByPage', currentPage);
  }
}

paginationElement.addEventListener('click', onBtnClick);

function renderPagination() {
  renderPaginationBtn();
  makeActiveBtn();
}

//поиск по названию фильма
btnSearchEl.addEventListener('click', foundFilmsByKeyword);

//функция поиска по названию фильма
function foundFilmsByKeyword(e) {
  // FetchApi.resetPage();
  e.preventDefault();
  const inputSearchEl = e.target.closest('.search').querySelector('.search__input');
  const query = inputSearchEl.value.trim();

  if (checkQuery(query)) return;

  FetchApi.query = query;
  FetchApi.fetchSearchFilms()
    .then(film => {
      if (film.results.length === 0) {
        // console.log('Search result not successful. Enter the correct movie name.');
        errorSearch('Search result not successful. Enter the correct movie name.');
        return;
      }
      // film.results.forEach(r => {
      //   newFetchApi.replaceGenre(JSON.parse(localStorage.getItem('genres')), r.genre_ids )
      // })
      // console.log(film);
      FetchApi.replaceGenreA(JSON.parse(localStorage.getItem('genres')), film);
      //обновляем текущие фильмы в localStorage

      FetchApi.saveInLocale(film);
      FetchApi.renderCards();
      // renderCardsSearchFilms();
    })
    .catch(er => {
      // console.log('Something went wrong, please try again later');
      errorSearch('Something went wrong, please try again later');
    });

  cleanInput();
}
