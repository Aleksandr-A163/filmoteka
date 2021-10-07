// Назначаю константы для отслеживания
const target = document.querySelector("footer");
const scrollToTopBtn = document.querySelector(".scrollToTopBtn");
const rootElement = document.documentElement;


function callback(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      scrollToTopBtn.classList.add("showBtn");
    } else {

      scrollToTopBtn.classList.remove("showBtn");
    }
  });
}

// Функция скрола наверх страницы
function scrollToTop() {
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
scrollToTopBtn.addEventListener("click", scrollToTop);

// Next we instantiate the observer with the function we created above. This takes an optional configuration
// object that we will use in the other examples.
const observer = new IntersectionObserver(callback);
// Finally start observing the target element
observer.observe(target);