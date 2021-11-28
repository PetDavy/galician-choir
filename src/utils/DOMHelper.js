function disableBodyScroll() {
  const body = document.querySelector('body');
  body.classList.add('no-scroll');
}

function enableBodyScroll() {
  const body = document.querySelector('body');
  body.classList.remove('no-scroll');
}

export {
  enableBodyScroll,
  disableBodyScroll,
};
