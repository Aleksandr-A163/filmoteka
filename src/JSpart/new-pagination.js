// import FetchApi from './JSpart/api-fetch';

// class FetchApi extends Pagination {
//   constructor() {
//     this.paginationElement = document.getElementById('pagination');
//     this.arrowLeft = document.querySelector('.arrow_left');
//     this.arrowRight = document.querySelector('.arrow_right');
//     this.fetchQuery = '';
//   }

//   getPaginationPage() {
//     this[this.fetchQuery]().then(r => {
//       this.replaceGenreA(JSON.parse(localStorage.getItem('genres')), r);
//       this.saveInLocale(r);
//       this.renderCards();
//     });
//   }
//   ///////////////////////
//   /////отрисовка страниц/
//   firstDrawingPageNumbers() {
//     this.paginationElement.innerHTML = '';
//     const btnPages = [];
//     const totalPages = JSON.parse(localStorage.getItem('currentFilms')).total_pages;

//     if (totalPages < 5) {
//       for (let i = 1; i <= totalPages; i += 1) {
//         const btn = document.createElement('button');
//         if (i === 1) {
//           btn.classList.add('active');
//         }
//         btn.textContent = i;
//         btn.setAttribute('data-page', i);
//         btnPages.push(btn);
//       }
//       this.paginationElement.append(...btnPages);
//     } else {
//       for (let i = 1; i <= 5; i += 1) {
//         const btn = document.createElement('button');
//         if (i === 1) {
//           btn.classList.add('active');
//         }
//         btn.textContent = i;
//         btn.setAttribute('data-page', i);
//         btnPages.push(btn);
//       }
//     }
//     btnPages.push(this.addThreeDotsBlock());
//     btnPages.push(this.addTOtalPageBlock(totalPages));

//     this.paginationElement.append(...btnPages);
//   }
//   drawingPageNumbers() {
//     this.paginationElement.innerHTML = '';
//     const btnPages = [];
//     const totalPages = JSON.parse(localStorage.getItem('currentFilms')).total_pages;

//     if (totalPages < 5) {
//       for (let i = 1; i <= totalPages; i += 1) {
//         const btn = document.createElement('button');
//         if (i === this.page) {
//           btn.classList.add('active');
//         }
//         btn.textContent = i;
//         btn.setAttribute('data-page', i);
//         btnPages.push(btn);
//       }
//       this.paginationElement.append(...btnPages);
//     }
//   }
//   addThreeDotsBlock() {
//     const threeDots = document.createElement('div');
//     threeDots.classList.add('threeDots');
//     threeDots.innerText = '...';
//     return threeDots;
//   }
//   addTOtalPageBlock(totalPages) {
//     const btn = document.createElement('button');
//     btn.textContent = totalPages;
//     btn.setAttribute('data-page', totalPages);
//     return btn;
//   }
//   targetPage(e) {
//     e.preventDefault();

//     const target = e.target;
//     if (target.hasAttribute('data-page')) {
//       this.page = target.getAttribute('data-page');

//       getPaginationPage();
//       drawingPageNumbers();
//     }
//   }
//   /////пагинация/////////
//   df() {
//     console.log(df);
//   }
//   ///////////////////////
// }

// export default FetchApi;
