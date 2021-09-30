class FetchApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
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

  async fetchApi() {
    const MY_KEY = 'f67f4d14d6b529f941fa4f285225b954';
    // ниже это урла для популярных фильмов за день
    const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/day';
    try {
      const response = await fetch(`${BASE_URL}?api_key=${MY_KEY}`);
      const data = await response.json();
      const results = await data.results;
      return results;
    } catch {
      error;
    }
  }
  fetchPopularFilmsByPage(page) {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=f67f4d14d6b529f941fa4f285225b954&language=en-US&page=${page}`;
  return fetch(url)
    .then(response => response.json())
    .then(results => {
       return (results)
    });
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
      const results = await data.results;
      return results;
    } catch (error) {
      error;
    }
  }
}
export default FetchApi;
