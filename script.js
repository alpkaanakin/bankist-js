'use strict';

///////////////////////////////////////
// Modal window

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  window.scrollTo({
    left: 0,
    top: s1coords.height + window.scrollY,
    behavior: 'smooth',
  });
});

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

// Page Navigation

const navLinks = document.querySelector('.nav__links');

navLinks.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link'));
  const id = e.target.getAttribute('href');
  document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
});

// Buttons Scroll

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Sticky Nav

const navBar = document.querySelector('.nav');
const header = document.querySelector('.header');

const obsCallback = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    navBar.classList.add('sticky');
    setTimeout(() => navBar.classList.add('nav--smooth'), 10);
  } else {
    navBar.classList.remove('sticky', 'nav--smooth');
  }
};
const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: '-90px',
};
const navObserver = new IntersectionObserver(obsCallback, obsOptions);
navObserver.observe(header);

// Reveal on Scroll

const allSections = document.querySelectorAll('.section');

const handleSectionsReveal = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  sectionObserver.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(handleSectionsReveal, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

// Tabbed Conmponent

const tabCon = document.querySelector('.operations__tab-container');
const tabBtns = document.querySelectorAll('.operations__tab');

tabCon.addEventListener('click', e => {
  const clickedTab = e.target.closest('.operations__tab');
  if (!clickedTab) return;
  tabBtns.forEach(t => t.classList.remove('operations__tab--active'));
  clickedTab.classList.add('operations__tab--active');

  const targetContent = document.querySelector(
    `.operations__content--${clickedTab.dataset.tab}`
  );
  targetContent.classList.add('operations__content--active');
});

// Lazy Loading

const lazyImages = document.querySelectorAll('img[data-src]');
const imgObserver = new IntersectionObserver(handleLazyLoad, {
  root: null,
  threshold: 0,
});
lazyImages.forEach(img => imgObserver.observe(img));

function handleLazyLoad(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.classList.remove('lazy-img');
  entry.target.addEventListener('load', () => console.log('yanak'));
  imgObserver.unobserve(entry.target);
}

//Slider

const allSlides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnSliderNext = document.querySelector('.slider__btn--right');
const btnSliderPrev = document.querySelector('.slider__btn--left');

const maxSlide = allSlides.length;
const minSlide = 0;
let currentSlide = 0;

goToSlide(currentSlide);

btnSliderNext.addEventListener('click', nextSlide);
btnSliderPrev.addEventListener('click', prevSlide);
function nextSlide() {
  currentSlide++;
  if (currentSlide == 3) currentSlide = 0;
  goToSlide(currentSlide);
}

function prevSlide() {
  currentSlide--;
  if (currentSlide < minSlide) currentSlide = maxSlide - 1;
  goToSlide(currentSlide);
}

function goToSlide(slideNum) {
  allSlides.forEach(
    (slide, i) =>
      (slide.style.transform = `translateX(${(i - slideNum) * 100}%)`)
  );
}

const sliderObserver = new IntersectionObserver(startSlideShow, {
  root: null,
  treshold: 0,
});

let sliderIntervalId;

function startSlideShow(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    () => clearInterval(sliderIntervalId);
  } else {
    startSlider(5000);
  }
}

function startSlider(c) {
  if (!sliderIntervalId) sliderIntervalId = setInterval(() => nextSlide(), c);
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') nextSlide();
    e.key === 'ArrowRight';
  });
}

sliderObserver.observe(slider);
