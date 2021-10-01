import FetchApi from './api-fetch';
import render from '../templates/card.hbs';
export { logo, homePage, myLibrary, watched, queue, collectionList, myLibraryWatchedRender, homePageRender,  renderFile};

// создаёт новый класс на основе базового
const newFetchApi = new FetchApi();

//элементы и кнопки навигации хэдера
const logo = document.querySelector('.js-logo');
const homePage = document.querySelector('.js-home');
const myLibrary = document.querySelector('.js-library');
const watched = document.querySelector('.js-watched');
const queue = document.querySelector('.js-queue');
const collectionList = document.getElementById('home');

//слушатели событий для header-link-btn
logo.addEventListener('click', homePageRender );
homePage.addEventListener('click',homePageRender);
myLibrary.addEventListener('click',myLibraryWatchedRender);

//функции отрисовки при переходе на страницы навигации
function homePageRender() {
e.preventDefault();
newFetchApi.fetchApi().then(results => {
  renderFile(results);
});
}

function myLibraryWatchedRender(e) {
  e.preventDefault();
  collectionList.innerHTML = '';
  myLibrary.classList.add("navigation__link--current");
  homePage.classList.remove("navigation__link--current");
  const watchedFilms = JSON.parse(localStorage.getItem('watched'));
  if (watchedFilms.length === 0){
    collectionList.innerHTML = '<li class ="empty-my-library"><p class = "title-empty-my-library">You  have not watched films yet</p><img class="icon-empty-my-library" src="https://image.freepik.com/free-photo/rows-red-seats-theater_53876-64710.jpg" alt ="not films here"></img></li>';
  }
  renderFile(watchedFilms);
  
};

  // функция рендера
 function renderFile(results) {
  collectionList.insertAdjacentHTML('beforeend', render({ results }));
}
