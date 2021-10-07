import refs from './variables';
const {
  mask,
  ...rest
} = refs;

window.addEventListener('load', onLoad);

function onLoad() {
    mask.classList.add('hide-load');
    setTimeout(() => {
        mask.remove();
    }, 600);
}