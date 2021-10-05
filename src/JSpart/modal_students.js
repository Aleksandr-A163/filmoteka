import studentsData from '../JSON/arr.json';
import studentsTemplate from '../templates/modal_students.hbs';

const backdropEl = document.querySelector('.backdrop');
const modalEl = document.querySelector('.modal');
const modalStudents = document.querySelector('.modal__content');

const menuItems = studentsData.map(studentsTemplate).join(' ');

const renderStudentsModal = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    const title = document.createElement('h2');
    title.classList.add('modal__title');
    title.textContent = 'Студенты GoIT, работавшие над проектом';
    const collection = document.createElement('ul');
    collection.classList.add('collection');
    container.append(title);
    container.append(collection);


    collection.insertAdjacentHTML('afterbegin', menuItems);

    modalStudents.append(container);

}




const linkToDev = document.getElementById('openModalLink');


const openLink = () => {
    modalStudents.innerHTML = '';
    modalEl.classList.add('modal--students');
    backdropEl.classList.remove('is-hidden');
    
    renderStudentsModal();
};

linkToDev.addEventListener('click', openLink);


