import '../sass/main.scss';

const homeEl = document.querySelector('.js-home');
const libraryEl = document.querySelector('.js-library');
const headerEl = document.querySelector('header');
const searchEl = document.querySelector('.search');
const btnsEl = document.querySelector('.btns');
const navEl = document.querySelector('.navigation')
const watchedEl = document.querySelector('.js-watched');
const queueEl = document.querySelector('.js-queue')

homeEl.addEventListener('click', onHomeClick);
libraryEl.addEventListener('click', onLibraryClick);
watchedEl.addEventListener('click', onWatchedClick);
queueEl.addEventListener('click', onQueueClick);



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


        onQueueClick();
        onWatchedClick();
        
     return;
    }
    homeEl.classList.remove('navigation__link--current')
    headerEl.classList.add('library-bgi')
    headerEl.classList.remove('home-bgi')
}



function onWatchedClick(e) {
                watchedEl.classList.add('button--orange')
                queueEl.classList.remove('button--orange')
    }


        function onQueueClick(e) {
            watchedEl.classList.remove('button--orange')
                queueEl.classList.add('button--orange')
        }