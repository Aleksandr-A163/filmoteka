import studentsData from '../JSON/arr.json';
import studentsTemplate from '../templates/modal_students.hbs';

const backdropStEl = document.querySelector('.backdrop--students');
const listStudents = document.querySelector('.team-items');
const linkToDev = document.getElementById('openModalLink');
const closeModalBtn = document.getElementById('closeModalStBtn');

const studentItems = studentsData.map(studentsTemplate).join(' ');

listStudents.insertAdjacentHTML('afterbegin', studentItems);



const openLink = () => {
    window.addEventListener('keydown', onKeyPress);
    backdropStEl.classList.remove('is-hidden');
};


const closeModalStud = () => {
    backdropStEl.classList.add('is-hidden');
    window.removeEventListener('keydown', onKeyPress);
}

linkToDev.addEventListener('click', openLink);
closeModalBtn.addEventListener('click', closeModalStud);
backdropStEl.addEventListener('click', onBackdropClick);




function onKeyPress(event) {
  if (event.code === 'Escape') {
    closeModalStud();
  }
}

function onBackdropClick(e) {
  if (e.target === e.currentTarget) {
    closeModalStud();
  }
}


