import Canvas from './canvas.js';
import Observer from './observer.js';

// Canvas Particles
const sections = document.body.querySelectorAll('section');
sections.forEach(el => Canvas(el.id));

// Arrow Paging
function goTo(sectionId) {
  document.getElementById(sectionId)
    .scrollIntoView({ behavior: 'smooth' });
    // inline: 'nearest', behavior: 'smooth'
};

window.goTo = goTo; // used in html

// Keyboard Paging
Observer(sections, goTo);