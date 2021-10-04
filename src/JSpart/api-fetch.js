import render from '../templates/card.hbs';

class FetchApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.list = 'home';
  }
  set pageNumber(el) {
    this.page = el;
  }
  get pageNumber() {
    return this.page;
  }

  async fetchGenres() {
    const LANG = 'en-US';
    const MY_KEY = 'f67f4d14d6b529f941fa4f285225b954';
    // урла для жанров
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${MY_KEY}&language=${LANG}`;
    try {
      const response = await fetch(url);
      const results = await response.json();
      return results;
    } catch (error) {
      error;
    }
  }

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
  renderCards() {
    const collectionList = document.getElementById('home');
    const dataFilms = localStorage.getItem('currentFilms');
    const results = JSON.parse(dataFilms).results;

    collectionList.innerHTML = render({ results });
  }

  fetchPopularFilmsByPage() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=f67f4d14d6b529f941fa4f285225b954&language=en-US&page=${this.page}`;
    return fetch(url)
      .then(response => response.json())
      .then(results => {
        return results;
      });
  }
  saveInLocale(films) {
    localStorage.setItem('currentFilms', JSON.stringify(films));
  }
  getLSItems() {
    return JSON.parse(localStorage.getItem('currentFilms'));
  }

  incrementPage() {
    this.page += 1;
  }
  decrementPage() {
    this.page -= 1;
  }
  resetPage() {
    return (this.page = 1);
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  async fetchSearchFilms() {
    const LANG = 'en-US';
    const BASE_URL = 'https://api.themoviedb.org/3/';
    const KEY = 'a92e1c28ff5839246667e5b68c28f141';

    try {
      const response = await fetch(
        `${BASE_URL}search/movie?api_key=${KEY}&language=${LANG}&page=${this.page}&include_adult=false&query=${this.searchQuery}`,
      );
      const data = await response.json();
      const results = await data;
      return results;
    } catch (error) {
      error;
    }
  }

  getPaginationPage(fetchQuery) {
    this[fetchQuery]().then(r => {
      this.replaceGenreA(JSON.parse(localStorage.getItem('genres')), r);
      this.saveInLocale(r);
      this.renderCards();
    });
  }
}
export default FetchApi;
