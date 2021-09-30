import './sass/main.scss';
import './JSpart/pagination'
import FetchApi from "./JSpart/apiFetch";
import render from "./templates/card.hbs";

// элемент списка
const collectionList = document.getElementById('home');

// элементы поиска по ключевому слову
const inputSearchFilm = document.querySelector('.search__input');
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

  if (!query) {
    return;
  }
  newFetchApi.query = query;
  newFetchApi.fetchSearchFilms().then(film => {
    console.log(film);
    renderFile(film);
    });
}
