const ulEl = document.getElementById('root');
// ulEl взят из index.js
const btnModalCloseEl = document.querySelector('.button-modal--close');
const backdropEl = document.querySelector('.backdrop');
const modalImageEl = document.querySelector('.modal__image');

ulEl.addEventListener('click', onUlElClick);

function onUlElClick(e) {
    e.preventDefault();
    // if (!e.target.classList.contains('card')) {
    // return
    // }
    window.addEventListener('keydown', onKeyPress);
    backdropEl.classList.remove('is-hidden');
    console.log(e.target.src);
    modalImageEl.src = e.target.src;
  modalImageEl.alt = e.target.alt;
}

function onKeyPress(event) {
    if (event.code === 'Escape') {
        onBtnCloseModalClick();
    }
}
btnModalCloseEl.addEventListener('click', onBtnCloseModalClick);
backdropEl.addEventListener('click', onBackdropClick);

function onBackdropClick(e) {
    if (e.target === e.currentTarget) {
        onBtnCloseModalClick();
    }
}
function onBtnCloseModalClick() {
    backdropEl.classList.add('is-hidden');
    window.removeEventListener('keydown', onKeyPress);
    // modalImageEl.src = "";
}