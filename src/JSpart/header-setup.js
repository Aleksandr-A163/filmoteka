import '../sass/main.scss';

const homeEl = document.querySelector('.home-link');
const libraryEl = document.querySelector('.library-link');
const headerEl = document.querySelector('header');
const searchEl = document.querySelector('.search');
const btnsEl = document.querySelector('.btns');
const navEl = document.querySelector('.navigation')


homeEl.addEventListener('click', onHomeClick);
libraryEl.addEventListener('click', onLibraryClick);


function onHomeClick(e) {
    
    if (headerEl.classList.contains('home-bgi')) {
        homeEl.classList.add('navigation__link--current');
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
    
    if (headerEl.classList.contains('library-bgi')) {
        libraryEl.classList.add('navigation__link--current');
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