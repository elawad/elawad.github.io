import createCanvas from './canvas.js';

// Canvas Particles
createCanvas('canvas-1');
createCanvas('canvas-2');
createCanvas('canvas-3');

// Paging
window.goTo = function(sectionId) {
  const section = document.getElementById(sectionId);

  section.scrollIntoView({
    block: 'start',
    inline: 'nearest',
    behavior: 'smooth'
  });
};

// const doc = document.documentElement;
// function appHeight() {
//   alert(`${window.orientation} ${window.innerWidth}x${window.innerHeight}`)
//   doc.style.setProperty('--app-height', `${window.innerHeight}px`);
// }
// // window.addEventListener('resize', appHeight);
// window.addEventListener('orientationchange', appHeight, false);
// appHeight();
