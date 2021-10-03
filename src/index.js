import './sass/main.scss';
// import FetchApi from './JSpart/api-fetch';
import render from './templates/card.hbs';
import cleanInput from './JSpart/clean-input';
import checkQuery from './JSpart/check-query';
import errorSearch from './JSpart/error-search';
import './JSpart/modal_students';
import './JSpart/pagination-and-Render';
import './JSpart/header-setup';
import './JSpart/theme-switch';

// элемент списка
const collectionList = document.getElementById('home');

// создаёт новый класс на основе базового
// const NewFetchApi = new FetchApi();

//слушатели событий для header-link-btn
logo.addEventListener('click', homePageRender);
homePage.addEventListener('click', homePageRender);
myLibrary.addEventListener('click', myLibraryWatchedRender);
watched.addEventListener('click', myLibraryWatchedRender);

isGetQueue();
isGetWatched();

//функция проверки наличия в "просмотренных" фильмов и создания массива если нету
function isGetWatched() {
  if (localStorage.getItem('watched')) return;
  localStorage.setItem('watched', '[]');
}
// функция рендера
function renderFile(results) {
  collectionList.innerHTML = render({ results });
}
//функция проверки наличия в "очереди" фильмов и создания массива если нету
function isGetQueue() {
  if (localStorage.getItem('queue')) return;
  localStorage.setItem('queue', '[]');
}
