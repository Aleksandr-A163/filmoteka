import './sass/main.scss';
import render from './templates/card.hbs';
import './JSpart/modal_students';
import './JSpart/pagination-and-Render';
import './JSpart/loader';
import './JSpart/header-setup';
import './JSpart/theme-switch';
import refs from './JSpart/variables';
import './JSpart/top-button';

const {
  collectionList,
  ...rest
} = refs;



isGetQueue();
isGetWatched();

//функция проверки наличия в "просмотренных" фильмов и создания массива если нету
function isGetWatched() {
  if (localStorage.getItem('watched')) return;
  localStorage.setItem('watched', '[]');
}
// функция рендера
export function renderFile(results) {
  collectionList.innerHTML = render({ results });
}

//функция проверки наличия в "очереди" фильмов и создания массива если нету
function isGetQueue() {
  if (localStorage.getItem('queue')) return;
  localStorage.setItem('queue', '[]');

}
