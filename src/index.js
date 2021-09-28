import './sass/main.scss';
import FetchApi from './JSpart/apiFetch';
import render from './templates/card.hbs';

// элемент списка
const collectionList = document.getElementById('home');

// элементы поиска по ключевому слову
const inputSearchFilm = document.querySelector('.search__input');
const btnSearchEl = document.querySelector('.search__button');

//элементы и кнопки навигации хэдера
const logo = document.querySelector('.js-logo');
const homePage = document.querySelector('.js-home');
const myLibrary = document.querySelector('.js-library');
const watched = document.querySelector('.js-watched');
const queue = document.querySelector('.js-queue');


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


//слушатели событий
logo.addEventListener('click', homePageRender );
homePage.addEventListener('click',homePageRender);
myLibrary.addEventListener('click',myLibraryWatched);

//функции отрисовки при переходе на страницы навигации
function homePageRender() {
e.preventDefault();
newFetchApi.fetchApi().then(results => {
  renderFile(results);
});
}

export function myLibraryWatched(e) {
  e.preventDefault();
  collectionList.innerHTML = '';
  myLibrary.classList.add("navigation__link--current");
  homePage.classList.remove("navigation__link--current");
  const watchedFilms =  JSON.parse(localStorage.getItem('watched'));
  if (watchedFilms.length === 0){
    console.log(watchedFilms);
    collectionList.innerHTML = '<h1>You  nothing watched </h1>';
  }
  renderFile(watchedFilms);
}
