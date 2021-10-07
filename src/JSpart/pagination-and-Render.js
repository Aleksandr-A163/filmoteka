import fetchApi from './api-fetch';
import cleanInput from './clean-input';
import checkQuery from './check-query';
import errorSearch from './error-search';
import replacesDefaultImage from './stopper';
import refs from './variables';
const {
  logoEl,
  homeEl,
  libraryEl,
  headerEl,
  searchEl,
  btnsEl,
  navEl,
  homePagination,
  libraryPagination,
  collectionList,
  paginationElement,
  arrowLeft,
  arrowRight,
  btnSearchEl,
  ...rest
} = refs;
const NewFetchApi = new fetchApi();

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
    const newFilm = replacesDefaultImage(r.results);
    r.results = newFilm;
    NewFetchApi.saveInLocale(r);
    NewFetchApi.renderCards();
    totalPages = r.total_pages;
    libraryPagination.classList.add('visually-hidden');
    renderPagination();
  });
}

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
        errorSearch('Search result not successful. Enter the correct movie name.');
        return;
      }
      NewFetchApi.replaceGenreA(JSON.parse(localStorage.getItem('genres')), film);
      const newFilm = replacesDefaultImage(film.results);
      film.results = newFilm;
      NewFetchApi.saveInLocale(film);
      NewFetchApi.renderCards();
    })
    .catch(er => {
      errorSearch('Something went wrong, please try again later');
    });

  cleanInput();
}

// Функция обработки события при нажатии на Home
function onHomeClick(e) {
  e.preventDefault();
  NewFetchApi.query = '';
  NewFetchApi.pageNumber = 1;
  paginationElement.innerHTML = '';

  homePagination.classList.remove('visually-hidden');
  libraryPagination.classList.add('visually-hidden');

  fetchPopularFilms();

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
      paintLastPage();
      if (document.body.clientWidth < 768) return;
      const threeDotsEl = addThreeDotsBlock();
      paginationElement.insertBefore(threeDotsEl, paginationElement[paginationElement.length - 2]);
    }
  }
  // условие отрисовки первой карточки и точек
  if (before > 1) {
    if (before - 1 === 1) {
      paintFirstPage();
    } else {
      paintFirstPage();
      if (document.body.clientWidth < 768) return;
      const threeDotsEl = addThreeDotsBlock();
      paginationElement.prepend(threeDotsEl);
    }
  }

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
  button.classList.add('paintLastPage')
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

// Функция выделяющая кнопку акттивной страницы
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

// Функция нажатия перехода на нужную страницу при нажатии на кнопку
function onBtnClick(e) {
  e.preventDefault();

  if (e.target.tagName !== 'BUTTON') {
    return;
  }

  collectionList.innerHTML = '';
  paginationElement.innerHTML = '';
  NewFetchApi.pageNumber = Number(e.target.textContent);
  renderPagination();

  if (NewFetchApi.query) {
    NewFetchApi.getPaginationPage('fetchSearchFilms');
  } else {
    NewFetchApi.getPaginationPage('fetchPopularFilmsByPage');
  }
}

paginationElement.addEventListener('click', onBtnClick);

// Делает неактивными стрелки на 1 и последней странице
function disableArrowBtn() {
  if (NewFetchApi.pageNumber === 1) {
    arrowLeft.classList.add('disabled-arrow');
  } else {
    arrowLeft.classList.remove('disabled-arrow');
  }

  if (NewFetchApi.pageNumber === totalPages) {
    arrowRight.classList.add('disabled-arrow');
  } else {
    arrowRight.classList.remove('disabled-arrow');
  }
}

// Функция рендера пагинации
function renderPagination() {
  renderPaginationBtn();
  makeActiveBtn();
  disableArrowBtn();
}
