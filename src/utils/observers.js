const callbacks = {
  'grand-title': (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('Grand-title--hidden');
        observer.unobserve(entry.target);
      }
    });
  },
};

const options = {
  'grand-title': {
    rootMargin: '-180px',
  },
};

function observeElement(element) {
  const type = element.dataset.observer;

  const observer = new IntersectionObserver(callbacks[type], options[type]);
  observer.observe(element);
}

function setObservers() {
  const observedElements = document.querySelectorAll('[data-observer]');

  observedElements.forEach((element) => {
    observeElement(element);
  });
}

export default {
  setObservers,
};
