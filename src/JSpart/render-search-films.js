import render from '../templates/card.hbs';

const collectionList = document.getElementById('home');

function renderCardsSearchFilms() {
  const dataFilms = localStorage.getItem('currentFilms');
  const results = JSON.parse(dataFilms);

  collectionList.innerHTML = render({ results });
}
export default renderCardsSearchFilms;
