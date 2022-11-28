import Canvas from './canvas.js';
import Observer from './observer.js';

// Create Particles
const sections = document.body.querySelectorAll('section');
sections.forEach((el) => Canvas(el.id));

// Paging
function goTo(sectionId) {
  document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

window.goTo = goTo; // used in html

// Paging & Animation Observers
Observer(sections);

export { goTo };
