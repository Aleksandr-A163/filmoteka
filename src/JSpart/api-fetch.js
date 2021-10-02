import render from '../templates/card.hbs';

class FetchApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.baseUrl = 'https://api.themoviedb.org/3/';
    this.language = 'en-US';
    this.key = 'a92e1c28ff5839246667e5b68c28f141';
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
export default FetchApi;
