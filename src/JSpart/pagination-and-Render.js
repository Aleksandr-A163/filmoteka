import fetchApi from './api-fetch';
import render from '../templates/card.hbs';
import cleanInput from './clean-input';
import checkQuery from './check-query';
import errorSearch from './error-search';
import refs from './variables';
const { logoEl, homeEl, libraryEl, headerEl, searchEl, btnsEl, navEl, ...rest } = refs;
const NewFetchApi = new fetchApi();

const listElement = document.querySelector('.collection');
const paginationElement = document.getElementById('pagination');
const arrowLeft = document.querySelector('.arrow_left');
const arrowRight = document.querySelector('.arrow_right');
const allPagination = document.querySelector('.pagination__container_pages');
const btnSearchEl = document.querySelector('.search__button');

// let currentPage = 1;
// const pagesOnWindow = 5;
// let pageCount;
// let rows = 20;
let totalPages;

//поиск по названию фильма
btnSearchEl.addEventListener('click', foundFilmsByKeyword);
logoEl.addEventListener('click', onHomeClick);
homeEl.addEventListener('click', onHomeClick);

getFetchGenres();
fetchPopularFilms();

// Функция записи жанров в Local Storage
function getFetchGenres() {
  NewFetchApi.fetchGenres().then(r => {
    localStorage.setItem('genres', JSON.stringify(r.genres));
  });
}

// Запрос популярных фильмов
function fetchPopularFilms() {
  NewFetchApi.fetchPopularFilmsByPage().then(r => {
    NewFetchApi.replaceGenreA(JSON.parse(localStorage.getItem('genres')), r);
    NewFetchApi.saveInLocale(r);
    NewFetchApi.renderCards();
    totalPages = r.total_pages;
    // renderPagination(r.total_pages, r.results);

    renderPagination();
  });
}
// функции отрисовки при переходе на страницы навигации
function homePageRender() {
  NewFetchApi.fetchPopularFilmsByPage().then(r => {
    NewFetchApi.replaceGenreA(JSON.parse(localStorage.getItem('genres')), r);
    NewFetchApi.saveInLocale(r);
    // renderFile(r.results);
    NewFetchApi.renderCards();
  });
}
///////
// функция рендера
function renderFile(results) {
  collectionList.innerHTML = render({ results });
}
////////
function onHomeClick(e) {
  e.preventDefault();

  console.log('функция onHomeClick');
  homePageRender();
  if (headerEl.classList.contains('home-bgi')) {
    return;
  }
  libraryEl.classList.remove('navigation__link--current');
  headerEl.classList.add('home-bgi');
  headerEl.classList.remove('library-bgi');
  homeEl.classList.add('navigation__link--current');
  searchEl.classList.remove('hide');
  searchEl.classList.add('show');
  btnsEl.classList.remove('show');
  btnsEl.classList.add('hide');
  navEl.classList.add('mar-bot-input');
  // console.log(NewFetchApi.list);
  // NewFetchApi.list = 'home';
}
// Рендер кнопок


function renderPaginationBtn() {
  const before = NewFetchApi.pageNumber - 2;
  const after = NewFetchApi.pageNumber + 2;

  for (let i = before; i <= after; i += 1) {
    if (i > 0 && i <= totalPages) {
      let button = document.createElement('button');
      button.innerText = i;
      paginationElement.appendChild(button);
    }
  }


  // условия по добавлению трехточек и крайних страниц
  if (after < totalPages) {
    // условие проверяет частный случай, где текущий page = 497, нет необходимости рисовать treeDotsBlock 1..495,496,497,498,499,500
    if (after + 1 === totalPages) {
      paintLastPage();
    }
    // условие 1..494,495,496,497,498,...500
    else {
      const threeDotsEl = addThreeDotsBlock();
      paginationElement.insertBefore(threeDotsEl, paginationElement[paginationElement.length - 2]);
      paintLastPage();
    }
  }
  // условие отрисовки первой карточки и точек
  if (before > 1) {
    if (before - 1 === 1) {
      paintFirstPage();
    } else {
      const threeDotsEl = addThreeDotsBlock();
      paginationElement.prepend(threeDotsEl);
      paintFirstPage();
    }
  }

addArrow()

    arrowLeft.onclick = onArrowLeftClick;
    arrowRight.onclick = onArrowRightClick;
}
// функция отрисовки первой страницы
function paintFirstPage() {
  let button = document.createElement('button');
  button.innerText = 1;
  paginationElement.prepend(button);
}
// функция отрисовки последней страницы
function paintLastPage() {
  let button = document.createElement('button');
  button.innerText = totalPages;
  paginationElement.appendChild(button);
}
// функция отрисовки 3-х точек
function addThreeDotsBlock() {
  const threeDots = document.createElement('div');
  threeDots.classList.add('threeDots');
  threeDots.innerText = '...';
  return threeDots;
}

function addArrow() {
    const leftArr = document.createElement('button');
    leftArr.classList.add('pag-arrow', 'arrow_left');
    leftArr.setAttribute('data-action', 'prev-page')
    paginationElement.prepend(leftArr);

    const rightArr = document.createElement('button');
    rightArr.classList.add('pag-arrow', 'arrow_right');
    rightArr.setAttribute('data-action', 'next-page')
    paginationElement.append(rightArr);  
}




// функция листания страниц влево
function onArrowLeftClick() {
  if (NewFetchApi.pageNumber > 1) {
    NewFetchApi.pageNumber = NewFetchApi.pageNumber - 1;
    drawPageWhenClickOnArrow();
  }
}
// функция листания страниц вправо
function onArrowRightClick() {
  if (NewFetchApi.pageNumber < totalPages) {
    NewFetchApi.pageNumber = NewFetchApi.pageNumber + 1;
    drawPageWhenClickOnArrow();
  }
}
// функция отрисовки при нажатии на стрелочки
function drawPageWhenClickOnArrow() {
  if (NewFetchApi.query) {
    NewFetchApi.getPaginationPage('fetchSearchFilms');
  } else {
    NewFetchApi.getPaginationPage('fetchPopularFilmsByPage');
  }
  paginationElement.innerHTML = '';
  renderPagination();
}

function makeActiveBtn() {
  let pages = paginationElement.querySelectorAll('button');

  for (let i = 0; i < pages.length; i += 1) {
    if (pages[i].classList.contains('active')) {
      pages[i].classList.remove('active');
    }
    if (Number(pages[i].textContent) === NewFetchApi.pageNumber) {
      pages[i].classList.add('active');
    }
  }
}

function onBtnClick(e) {
  e.preventDefault();

  if (e.target.tagName !== 'BUTTON') {
    return;
  }

  listElement.innerHTML = '';
  paginationElement.innerHTML = '';

  NewFetchApi.pageNumber = Number(e.target.textContent);

  renderPagination();
  console.log('NewFetchApi.query', NewFetchApi.query);
  if (NewFetchApi.query) {
    NewFetchApi.getPaginationPage('fetchSearchFilms');
  } else {
    NewFetchApi.getPaginationPage('fetchPopularFilmsByPage');
  }
}

paginationElement.addEventListener('click', onBtnClick);

function renderPagination() {
  renderPaginationBtn();
  makeActiveBtn();
}

// //поиск по названию фильма
// btnSearchEl.addEventListener('click', foundFilmsByKeyword);

//функция поиска по названию фильма
function foundFilmsByKeyword(e) {
  paginationElement.innerHTML = '';
  NewFetchApi.resetPage();
  e.preventDefault();
  const inputSearchEl = e.target.closest('.search').querySelector('.search__input');
  const query = inputSearchEl.value.trim();

  if (checkQuery(query)) return;

  NewFetchApi.query = query;
  NewFetchApi.fetchSearchFilms()
    .then(film => {
      totalPages = film.total_pages;
      renderPagination();
      if (film.results.length === 0) {
        // console.log('Search result not successful. Enter the correct movie name.');
        errorSearch('Search result not successful. Enter the correct movie name.');
        return;
      }
      // film.results.forEach(r => {
      //   newFetchApi.replaceGenre(JSON.parse(localStorage.getItem('genres')), r.genre_ids )
      // })
      // console.log(film);
      NewFetchApi.replaceGenreA(JSON.parse(localStorage.getItem('genres')), film);
      //обновляем текущие фильмы в localStorage

      NewFetchApi.saveInLocale(film);
      NewFetchApi.renderCards();
      // renderCardsSearchFilms();
      // makeActiveBtn();
    })
    .catch(er => {
      // console.log('Something went wrong, please try again later');
      errorSearch('Something went wrong, please try again later');
    });

  cleanInput();
}
// export { homePageRender };
////////////////////////////////// ниже логика пагинации в запасе)

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
