'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

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
  console.log(s1coords)
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


