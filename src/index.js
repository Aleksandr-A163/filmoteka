import './sass/main.scss';
import FetchApi from './JSpart/api-fetch';
import render from './templates/card.hbs';
import cleanInput from './JSpart/clean-input';
import checkQuery from './JSpart/check-query';
import renderCardsSearchFilms from './JSpart/render-search-films';
import errorSearch from './JSpart/error-search';
import './JSpart/modal_students';
import './JSpart/pagination';
import './JSpart/header-setup';
import { logo, homePage, myLibrary, watched, queue, myLibraryWatchedRender , homePageRender } from './JSpart/render-my-library';
// элемент списка
const collectionList = document.getElementById('home');

// элементы поиска по ключевому слову
const btnSearchEl = document.querySelector('.search__button');

// создаёт новый класс на основе базового
const newFetchApi = new FetchApi();

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
// функция рендера
function renderFile(results) {
  collectionList.innerHTML = render({ results });
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
      if (film.results.length === 0) {
        // console.log('Search result not successful. Enter the correct movie name.');
        errorSearch('Search result not successful. Enter the correct movie name.');
        return;
      }
      // film.results.forEach(r => {
      //   newFetchApi.replaceGenre(JSON.parse(localStorage.getItem('genres')), r.genre_ids )
      // })
      // console.log(film);
      newFetchApi.replaceGenreA(JSON.parse(localStorage.getItem('genres')), film);
      //обновляем текущие фильмы в localStorage
      
      newFetchApi.saveInLocale(film);
      newFetchApi.renderCards()
      // renderCardsSearchFilms();
    })
    .catch(er => {
      // console.log('Something went wrong, please try again later');
      errorSearch('Something went wrong, please try again later');
    });

  cleanInput();
}

//слушатели событий для header-link-btn
logo.addEventListener('click', homePageRender );
homePage.addEventListener('click',homePageRender);
myLibrary.addEventListener('click',myLibraryWatchedRender);
watched.addEventListener('click',myLibraryWatchedRender);
