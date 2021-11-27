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

function getMobileRootMargin() {
  if (window.innerWidth > 700) {
    return false;
  }

  return {
    'grand-title': {
      rootMargin: '-180px',
    },
  };
}

function observeElement(element) {
  const type = element.dataset.observer;
  const mobOptions = getMobileRootMargin();

  const observer = new IntersectionObserver(callbacks[type], mobOptions ? mobOptions[type] : options[type]);
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
