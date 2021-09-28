import './sass/main.scss';
import FetchApi from './JSpart/apiFetch';
import render from './templates/card.hbs';

// элемент списка
const ulEl = document.getElementById('home');

// элементы поиска по ключевому слову
const inputSearchFilm = document.querySelector('.search__input');
const btnSearchEl = document.querySelector('.search__button');

// создаёт новый класс на основе базового
const newFetchApi = new FetchApi();

// запись в локалсторедж объектом
newFetchApi.fetchGenres().then(r => localStorage.setItem('genres', JSON.stringify(r.genres)));

// пример того что сохранилось в локалсторедж
// console.log(JSON.parse(localStorage.getItem('genres')));

// запись в localeStorage отдельными id и name - побаловаться)
// newFetchApi.fetchGenres().then(r => {r.genres.forEach(e => localStorage.setItem(`${e.id}`,  e.name))})

// запрос за популярными фильмами за день и рендер
newFetchApi.fetchApi().then(results => {
  renderFile(results);
});

// функция рендера
function renderFile(results) {
  ulEl.insertAdjacentHTML('beforeend', render({ results }));
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
