import render from '../templates/card.hbs';
import replacesDefaultImage from './stopper';

class FetchApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.list = 'home';
    this.baseUrl = 'https://api.themoviedb.org/3/';
    this.language = 'en-US';
    this.key = 'a92e1c28ff5839246667e5b68c28f141';
  }
  set pageNumber(el) {
    this.page = el;
  }
  get pageNumber() {
    return this.page;
  }

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
  fetchPopularFilmsByPage() {
    const url = `${this.baseUrl}movie/popular?api_key=${this.key}&language=${this.language}&page=${this.page}`;
    return fetch(url)
      .then(response => response.json())
      .then(results => {
        return results;
      });
  }
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

  replaceGenreA(arrayGenre, film) {
    // console.log(film);
    film.results.forEach(r => {
      for (let i = 0; i < arrayGenre.length; i += 1) {
        for (let j = 0; j < r.genre_ids.length; j += 1) {
          arrayGenre[i].id === r.genre_ids[j]
            ? (r.genre_ids[j] = arrayGenre[i].name)
            : r.genre_ids[j];
        }
      }
      // отрисовка OTHER
      if (r.genre_ids.length > 3) {
        const other = 'Other';
        r.genre_ids[2] = other;
        r.genre_ids.length = 3;
      };
    });
  }

  renderCards() {
    const collectionList = document.getElementById('home');
    const dataFilms = localStorage.getItem('currentFilms');
    const results = JSON.parse(dataFilms).results;

    collectionList.innerHTML = render({ results });
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
  getPaginationPage(fetchQuery) {
    this[fetchQuery]().then(r => {
      this.replaceGenreA(JSON.parse(localStorage.getItem('genres')), r);
        const newFilm = replacesDefaultImage(r.results);
      r.results = newFilm;
      this.saveInLocale(r);
      this.renderCards();
    });
  }
}
export default FetchApi;
