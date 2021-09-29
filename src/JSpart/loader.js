
let mask = document.querySelector('.mask');

window.addEventListener('load', onLoad);

function onLoad() {
    mask.classList.add('hide-load');
    setTimeout(() => {
        mask.remove();
    }, 600)
}