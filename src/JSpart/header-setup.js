import '../sass/main.scss';
import FetchApi from './api-fetch';
import render from '../templates/card.hbs';
export { logoEl, homeEl, libraryEl, watchedEl, queueEl, collectionList, myLibraryWatchedRender, homePageRender, myLibraryQueueRender,  renderFile};


const collectionList = document.getElementById('home');
const logoEl = document.querySelector('.js-logo');
const homeEl = document.querySelector('.js-home');
const libraryEl = document.querySelector('.js-library');
const headerEl = document.querySelector('header');
const searchEl = document.querySelector('.search');
const btnsEl = document.querySelector('.btns');
const navEl = document.querySelector('.navigation')
const watchedEl = document.querySelector('.js-watched');
const queueEl = document.querySelector('.js-queue')

homeEl.addEventListener('click', onHomeClick);
logoEl.addEventListener('click', onHomeClick);
libraryEl.addEventListener('click', onLibraryClick);
watchedEl.addEventListener('click', onWatchedClick);
queueEl.addEventListener('click', onQueueClick);



function onHomeClick(e) {
    homePageRender ();
    if (headerEl.classList.contains('home-bgi')) {
        homeEl.classList.add('navigation__link--current');
        libraryEl.classList.remove('navigation__link--current');
        searchEl.classList.remove('hide');
        searchEl.classList.add('show');
        btnsEl.classList.remove('show');
        btnsEl.classList.add('hide');
        navEl.classList.add('mar-bot-input');
     return;
    }
    libraryEl.classList.remove('navigation__link--current')
     headerEl.classList.add('home-bgi')
    headerEl.classList.remove('library-bgi')
    
}


function onLibraryClick(e) {       
      e.preventDefault();
      myLibraryWatchedRender(e)
    
    if (headerEl.classList.contains('library-bgi')) {
        libraryEl.classList.add('navigation__link--current');
        homeEl.classList.remove('navigation__link--current');
        searchEl.classList.remove('show');
        searchEl.classList.add('hide');
        btnsEl.classList.remove('hide');
        btnsEl.classList.add('show');
        navEl.classList.remove('mar-bot-input');

        
     return;
    }
    homeEl.classList.remove('navigation__link--current')
    headerEl.classList.add('library-bgi')
    headerEl.classList.remove('home-bgi')
}



function onWatchedClick(e) {
    myLibraryWatchedRender(e)
    watchedEl.classList.add('button--orange')
    queueEl.classList.remove('button--orange')
    }


 function onQueueClick(e) {
   watchedEl.classList.remove('button--orange')
   queueEl.classList.add('button--orange')
   myLibraryQueueRender(e)
}

//функции отрисовки при переходе на страницы навигации
function homePageRender(e) {
e.preventDefault();
 
  newFetchApi.fetchPopularFilmsByPage()
    .then(r => {
     newFetchApi.replaceGenreA(JSON.parse(localStorage.getItem('genres')), r);
      newFetchApi.saveInLocale(r);
      renderFile(r.results);
    })
//     .then(results => {

//   renderFile(results);
// });
}

function myLibraryWatchedRender(e) {
  e.preventDefault();
  collectionList.innerHTML = '';
  const watchedFilms = JSON.parse(localStorage.getItem('watched'));
  if (watchedFilms.length === 0){
    collectionList.innerHTML = '<li class ="empty-my-library"><p class = "title-empty-my-library">You  have not watched films yet</p><img class="icon-empty-my-library" src="https://image.freepik.com/free-photo/rows-red-seats-theater_53876-64710.jpg" alt ="not films here"></img></li>';
  return;
  }
  renderFile(watchedFilms);
  
};


 function myLibraryQueueRender(e){
  e.preventDefault();
  collectionList.innerHTML = '';
 const queueFilms = JSON.parse(localStorage.getItem('queue'));
  if (queueFilms.length === 0){
    collectionList.innerHTML = '<li class ="empty-my-library"><p class = "title-empty-my-library">You  have not watched films yet</p><img class="icon-empty-my-library" src="https://image.freepik.com/free-photo/rows-red-seats-theater_53876-64710.jpg" alt ="not films here"></img></li>';
  return;
  }
  renderFile(queueFilms);
}


  // функция рендера
 function renderFile(results) {
  collectionList.innerHTML = render({ results });
}
