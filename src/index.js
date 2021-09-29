import './sass/main.scss';
import FetchApi from './JSpart/apiFetch';
import render from './templates/render.hbs';
import cleanInput from './JSpart/clean-input';
import checkQuery from './JSpart/check-query';
import renderCardsSearchFilms from './JSpart/render-search-films';
import errorSearch from './JSpart/error-search';

// элемент списка
const collectionList = document.getElementById('home');

// элементы поиска по ключевому слову
const btnSearchEl = document.querySelector('.search__button');

// создаёт новый класс на основе базового
const newFetchApi = new FetchApi();

// запись в локалсторедж всех жанров
newFetchApi.fetchGenres().then(r => localStorage.setItem('genres', JSON.stringify(r.genres)));
// запись в локалсторедж зарендеренных фильмов
newFetchApi.fetchApi().then(r => localStorage.setItem('currentFilms', JSON.stringify(r)));

//функция проверки наличия в "очереди" фильмов и создания массива если нету
function isGetQueue() {
  if (localStorage.getItem('queue')) return;
  localStorage.setItem('queue', '[]');
}
isGetQueue();

//функция проверки наличия в "просмотренных" фильмов и создания массива если нету
function isGetWatched() {
  if (localStorage.getItem('watched')) return;
  localStorage.setItem('watched', '[]');
}
isGetWatched();

// запрос за популярными фильмами за день и рендер
newFetchApi.fetchApi().then(results => {
  renderFile(results);
});

// функция рендера
function renderFile(results) {
  collectionList.insertAdjacentHTML('beforeend', render({ results }));
}

//поиск по названию фильма
btnSearchEl.addEventListener('click', foundFilmsByKeyword);

//функция поиска по названию фильма
function foundFilmsByKeyword(e) {
  e.preventDefault();
  const inputSearchEl = e.target.closest('.search').querySelector('.search__input');
  const query = inputSearchEl.value.trim();

  if (checkQuery(query)) return;

  newFetchApi.query = query;
  newFetchApi
    .fetchSearchFilms()
    .then(film => {
      if (film.length === 0) {
        // console.log('Search result not successful. Enter the correct movie name.');
        errorSearch('Search result not successful. Enter the correct movie name.');
        return;
      }
      //обновляем текущие фильмы в localStorage
      localStorage.setItem('currentFilms', JSON.stringify(film));
      renderCardsSearchFilms();
    })
    .catch(er => {
      // console.log('Something went wrong, please try again later');
      errorSearch('Something went wrong, please try again later');
    });

  cleanInput();
}
