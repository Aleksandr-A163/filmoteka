import studentsData from '../JSON/arr.json';
import studentsTemplate from '../templates/modal_students.hbs';

const backdropStEl = document.querySelector('.backdrop--students');
const listStudents = document.querySelector('.team-items');
const linkToDev = document.getElementById('openModalLink');
const closeModalBtn = document.getElementById('closeModalStBtn');

const studentItems = studentsData.map(studentsTemplate).join(' ');

listStudents.insertAdjacentHTML('afterbegin', studentItems);



const openLink = () => {
    backdropStEl.classList.remove('is-hidden');
};


const closeModalStud = () => {
    backdropStEl.classList.add('is-hidden');
}

linkToDev.addEventListener('click', openLink);
closeModalBtn.addEventListener('click', closeModalStud);


