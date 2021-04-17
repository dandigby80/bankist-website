'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

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

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});



//Scrolling 
btnScrollTo.addEventListener('click', function(e){
  const s1coords = section1.getBoundingClientRect();
  
  // window.scrollTo(s1coords.left, s1coords.top + window.pageYOffset);

  window.scrollTo({
    left: s1coords.left, 
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  })

  // Modern way but unreliable
  // section1.scrollIntoView({
  //   behaviour: 'smooth'
  // });
});

// Page navigation

// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click', function(e){
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'});
//     console.log(id)
//   })
// })

//Page navigation using event delegation

document.querySelector('.nav__links').addEventListener('click', function(e){
  e.preventDefault();
  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }
  console.log(e.target);
})

// Tabbed Component


tabsContainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab');
  //guard clause
  if(!clicked) return;
  //active tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'))
  clicked.classList.add('operations__tab--active');
  //activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
 console.log(clicked.dataset.tab)
})

//Menu fade animation

const handleHover = function(e){
  console.log(this)
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
  
  siblings.forEach(el => {
    if(el !== link) el.style.opacity = this;
  });
  logo.style.opacity = this;
  }
}

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

//Sticky Navigation
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords)

// window.addEventListener('scroll', function(){
//   if(window.scrollY > initialCoords.top){
//     nav.classList.add('sticky');
//   }else {
//     nav.classList.remove('sticky');
//   }
// })

// Sticky navigation using Intersection Observer API
// const obsCallBack = function(entries, observer){
//   entries.forEach(entry => (console.log(entry)))
// }

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallBack, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight.height)
const stickyNav = function(entries){
  const [entry] = entries;
  console.log(entry)
  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);



