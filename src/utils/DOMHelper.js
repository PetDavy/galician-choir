function disableBodyScroll() {
  const body = document.querySelector('body');
  body.classList.add('no-scroll');
  console.log(body);
}

function enableBodyScroll() {
  const body = document.querySelector('body');
  body.classList.remove('no-scroll');
}

export {
  enableBodyScroll,
  disableBodyScroll,
};
