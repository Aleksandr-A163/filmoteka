import './sass/main.scss';
import FetchApi from "./JSpart/apiFetch";
import render from "./templates/render.hbs"
import "./JSpart/modal_students";

// элемент списка
const ulEl = document.getElementById('root');

// создаёт новый класс на основе базового
const newFetchApi = new FetchApi();

// запись в локалсторедж объектом
newFetchApi.fetchGenres().then(r => localStorage.setItem('genres', JSON.stringify(r.genres)));

// пример того что сохранилось в локалсторедж
// console.log(JSON.parse(localStorage.getItem('genres')))

// запись в localeStorage отдельными id и name - побаловаться)
// newFetchApi.fetchGenres().then(r => {r.genres.forEach(e => localStorage.setItem(`${e.id}`,  e.name))})

// запрос за популярными фильмами за день и рендер
newFetchApi.fetchApi().then(results => {
    renderFile(results)
})

// функция рендера
function renderFile(results) {
    ulEl.insertAdjacentHTML('beforeend', render({results}))
}
