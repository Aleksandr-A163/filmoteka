import render from '../templates/card.hbs';

class FetchApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.baseUrl = 'https://api.themoviedb.org/3/';
    this.language = 'en-US';
    this.key = 'a92e1c28ff5839246667e5b68c28f141';
    ///////////////////////
    /////пагинация/////////
    // this.listElement = document.querySelector('.collection');
    // this.paginationElement = document.getElementById('pagination');
    // this.arrowLeft = document.querySelector('.arrow_left');
    // this.arrowRight = document.querySelector('.arrow_right');
    // this.pagesOnWindow = 5;
    // this.rows = 20;
    ///////////////////////
  }

  //запрос жанров
  async fetchGenres() {
    const url = `${this.baseUrl}genre/movie/list?api_key=${this.key}&language=${this.language}`;
    try {
      const response = await fetch(url);
      const results = await response.json();
      return results;
    } catch (error) {
      error;
    }
  }

  //запрос фильмов по поиску
  async fetchSearchFilms() {
    try {
      const response = await fetch(
        `${this.baseUrl}search/movie?api_key=${this.key}&language=${this.language}&page=${this.page}&include_adult=false&query=${this.searchQuery}`,
      );
      const data = await response.json();
      const results = await data;
      return results;
    } catch (error) {
      error;
    }
  }

  // запрос популярных фильмов
  fetchPopularFilmsByPage(page) {
    const url = `${this.baseUrl}movie/popular?api_key=${this.key}&language=${this.language}&page=${page}`;
    return fetch(url)
      .then(response => response.json())
      .then(results => {
        return results;
      });
  }

  //подмена жанров в цифрах на жанры-слова
  replaceGenreA(arrayGenre, film) {
    console.log(film);
    film.results.forEach(r => {
      for (let i = 0; i < arrayGenre.length; i += 1) {
        for (let j = 0; j < r.genre_ids.length; j += 1) {
          arrayGenre[i].id === r.genre_ids[j]
            ? (r.genre_ids[j] = arrayGenre[i].name)
            : r.genre_ids[j];
        }
      }
    });
  }

  //рендер карточек фильмов
  renderCards() {
    const collectionList = document.getElementById('home');
    // const dataFilms = localStorage.getItem('currentFilms');
    // const results = JSON.parse(dataFilms).results;
    const results = this.getLSItems().results;

    collectionList.innerHTML = render({ results });
  }

  //сохранение в локалсторидж
  saveInLocale(films) {
    localStorage.setItem('currentFilms', JSON.stringify(films));
  }
  // получение из локалсторидж
  getLSItems() {
    return JSON.parse(localStorage.getItem('currentFilms'));
  }
  //пагинация страниц

  getPaginationPage(fetchQuery, page) {
    this[fetchQuery](page).then(r => {
      this.replaceGenreA(JSON.parse(localStorage.getItem('genres')), r);
      this.saveInLocale(r);
      this.renderCards();
    });
  }

  //работа со страницей
  incrementPage() {
    this.page += 1;
  }
  decrementPage() {
    this.page -= 1;
  }
  resetPage() {
    return (this.page = 1);
  }
  // запросы по поиску get и set
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

class Pagination extends FetchApi {
  constructor() {
    super();
    this.paginationElement = document.getElementById('pagination');
    this.arrowLeft = document.querySelector('.arrow_left');
    this.arrowRight = document.querySelector('.arrow_right');
    this.fetchQuery = '';
  }

  getPaginationPage() {
    this[this.fetchQuery]().then(r => {
      this.replaceGenreA(JSON.parse(localStorage.getItem('genres')), r);
      this.saveInLocale(r);
      this.renderCards();
    });
    // console.log('dfgd');
  }
  ///////////////////////
  /////отрисовка страниц/
  firstDrawingPageNumbers() {
    this.paginationElement.innerHTML = '';
    const btnPages = [];
    const totalPages = JSON.parse(localStorage.getItem('currentFilms')).total_pages;

    if (totalPages < 5) {
      for (let i = 1; i <= totalPages; i += 1) {
        const btn = document.createElement('button');
        if (i === 1) {
          btn.classList.add('active');
        }
        btn.textContent = i;
        btn.setAttribute('data-page', i);
        btnPages.push(btn);
      }
      this.paginationElement.append(...btnPages);
    } else {
      for (let i = 1; i <= 5; i += 1) {
        const btn = document.createElement('button');
        if (i === 1) {
          btn.classList.add('active');
        }
        btn.textContent = i;
        btn.setAttribute('data-page', i);
        btnPages.push(btn);
      }
    }
    btnPages.push(this.addThreeDotsBlock());
    btnPages.push(this.addTOtalPageBlock(totalPages));

    this.paginationElement.append(...btnPages);
  }
  drawingPageNumbers() {
    this.paginationElement.innerHTML = '';
    const btnPages = [];
    const totalPages = JSON.parse(localStorage.getItem('currentFilms')).total_pages;
    const currentPage = JSON.parse(localStorage.getItem('currentFilms')).page;
    const pagesOnWindow = 5;
    let maxLeftPage = currentPage - Math.floor(pagesOnWindow / 2);
    let maxRightPage = currentPage + Math.floor(pagesOnWindow / 2);

    if (totalPages < 5) {
      for (let i = 1; i <= totalPages; i += 1) {
        const btn = document.createElement('button');
        if (i === this.page) {
          btn.classList.add('active');
        }
        btn.textContent = i;
        btn.setAttribute('data-page', i);
        btnPages.push(btn);
      }
      this.paginationElement.append(...btnPages);
    } else {
      const arr = this.paginationButton();

      this.paginationElement.append(...arr);
      // if (maxLeftPage < 1) {
      //   maxLeftPage = 1;
      //   maxRightPage = pagesOnWindow;
      // }
      // if (maxRightPage > totalPages) {
      //   maxLeftPage = totalPages - (pagesOnWindow - 1);
      //   if (maxLeftPage < 1) {
      //     maxLeftPage = 1;
      //   }
      //   maxRightPage = totalPages;
      // }
    }
    // console.log('drawingPageNumbers');
  }
  addThreeDotsBlock() {
    const threeDots = document.createElement('div');
    threeDots.classList.add('threeDots');
    threeDots.innerText = '...';
    return threeDots;
  }
  addTOtalPageBlock(totalPages) {
    const btn = document.createElement('button');
    btn.textContent = totalPages;
    btn.setAttribute('data-page', totalPages);
    return btn;
  }
  // targetPage(e) {
  //   const target = e.target;
  //   if (target.hasAttribute('data-page')) {
  //     this.page = target.getAttribute('data-page');
  //     console.log(this.page);
  //   }
  // }
  paginationButton() {
    const arrEl = [];
    const firstBtn = document.createElement('button');
    firstBtn.textContent = 1;
    firstBtn.setAttribute('data-page', 1);
    arrEl.push(firstBtn);
    arrEl.push(this.addThreeDotsBlock());
    for (let i = 2; i > 0; i -= 1) {
      const btn = document.createElement('button');

      btn.textContent = this.page - i;
      btn.setAttribute('data-page', this.page - i);
      arrEl.push(btn);
    }
    const currentPage = document.createElement('button');
    currentPage.textContent = this.page;
    currentPage.setAttribute('data-page', this.page);
    currentPage.classList.add('active');
    arrEl.push(currentPage);
    for (let i = 1; i <= 2; i += 1) {
      const btn = document.createElement('button');

      btn.textContent = Number(this.page) + i;
      btn.setAttribute('data-page', Number(this.page) + i);
      arrEl.push(btn);
    }
    arrEl.push(this.addThreeDotsBlock());
    const lastBtn = document.createElement('button');
    lastBtn.textContent = this.getLSItems().total_pages;
    lastBtn.setAttribute('data-page', this.getLSItems().total_pages);
    arrEl.push(lastBtn);

    console.log(arrEl);
    return arrEl;
  }
}

export default Pagination;
