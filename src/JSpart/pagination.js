import fetchApi from './apiFetch';
import render from '../templates/card.hbs';
const FetchApi = new fetchApi();

const listElement = document.querySelector('.collection');
const paginationElement = document.getElementById('pagination');
const arrowLeft = document.querySelector('.arrow_left');
const arrowRight = document.querySelector('.arrow_right');
let currentPage = 1;
const pagesOnWindow = 5;
let pageCount;
let rows = 20;


function newFetchPag(page) {
  FetchApi.fetchPopularFilmsByPage(page).then(r => {
    localStorage.setItem('currentFilms', JSON.stringify(r.results))
  renderFile(r.results)
})
}

FetchApi.fetchPopularFilmsByPage().then(r => {
  renderFile(r.results)
  renderPagination(r.total_pages, r.results, displayList);
})


// функция рендера
function renderFile(results) {
  console.log('я зарендерился')
  listElement.innerHTML = render({ results })
}

function displayList(wrapper, page, searchQuery) {
    wrapper.innerHTML = '';
}


export function renderPagination(totalPages, listItems, callback) {
  paginationElement.innerHTML = '';
  currentPage = 1;

    function setupPagination(items, wrapper, rowsPerPage) {

    wrapper.innerHTML = '';

    pageCount = totalPages;
    let maxLeftPage = currentPage - Math.floor(pagesOnWindow / 2);
    let maxRightPage = currentPage + Math.floor(pagesOnWindow / 2);

    if (maxLeftPage < 1) {
      maxLeftPage = 1;
      maxRightPage = pagesOnWindow;
    }
    if (maxRightPage > totalPages) {
      maxLeftPage = totalPages - (pagesOnWindow - 1);

      if (maxLeftPage < 1) {
        maxLeftPage = 1;
      }
      maxRightPage = totalPages;
    }

    for (let i = 1; i <= totalPages; i++) {
      if (maxLeftPage !== 1 && i == 1) {
        let btn = paginationButton(i, items);
        wrapper.appendChild(btn);
      }
      if (maxRightPage !== totalPages && i == totalPages) {
        let btn = paginationButton(i, items);
        wrapper.appendChild(btn);
      }
      if (i >= maxLeftPage && i <= maxRightPage) {
        let btn = paginationButton(i, items);
        wrapper.appendChild(btn);
      }

      if (
        totalPages >= 6 &&
        i == 1 &&
        currentPage !== 1 &&
        currentPage !== 2 &&
        currentPage !== 3
      ) {
        const threeDotsEl = addThreeDotsBlock();
        wrapper.insertBefore(threeDotsEl, wrapper[wrapper.length - 2]);
      }
      if (
        pageCount >= 7 &&
        i == pageCount - 1 &&
        currentPage !== pageCount &&
        currentPage !== pageCount - 2 &&
        currentPage !== pageCount - 1
      ) {
        const threeDotsEl = addThreeDotsBlock();
        wrapper.insertBefore(threeDotsEl, wrapper[1]);
      }
    }
  }

  function addThreeDotsBlock() {
    const threeDots = document.createElement('div');
    threeDots.classList.add('threeDots');
    threeDots.innerText = '...';
    return threeDots;
  }
  function paginationButton(page, items, searchQuery) {
    let button = document.createElement('button');
    button.innerText = page;

    if (currentPage == page) button.classList.add('active');

    button.addEventListener('click', () => {
      currentPage = page;
      newFetchPag(currentPage)
    //   fetchPopularFilmsByPage(currentPage);
      callback(listElement, currentPage, searchQuery);

      let current_btn = document.querySelector('.pagenumbers button.active');
      current_btn.classList.remove('active');

      button.classList.add('active');
        setupPagination(listItems, paginationElement, rows);
        
    });
    return button;
  }

  function onArrowLeftClick() {
    if (currentPage > 1) {
      currentPage--;
      setupPagination(listItems, paginationElement, rows);
      callback(listElement, currentPage);
    }
  }

  function onArrowRightClick() {
    if (currentPage < totalPages) {
      currentPage++;
      setupPagination(listItems, paginationElement, rows);
      callback(listElement, currentPage);
    }
  }

  setupPagination(listItems, paginationElement, rows);
  arrowLeft.onclick = onArrowLeftClick;
  arrowRight.onclick = onArrowRightClick;
}
// отключение стрелок на первой и последней странице
paginationElement.addEventListener('click', disableArrowBtnAfterPageClick);

function disableArrowBtnAfterPageClick(event) {
  if (event.target.tagName != 'BUTTON') {
    return;
  } else {
    disableArrowBtn(pageCount);
  }
}
function disableArrowBtn(totalPages) {
  if (currentPage === 1) {
    arrowLeft.classList.add('disabled-arrow');
  } else {
    arrowLeft.classList.remove('disabled-arrow');
  }

  if (currentPage === totalPages) {
    arrowRight.classList.add('disabled-arrow');
  } else {
    arrowRight.classList.remove('disabled-arrow');
  }
}
