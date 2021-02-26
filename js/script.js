import createCanvas from './canvas.js';

// Canvas Particles
const sections = document.body.querySelectorAll('section');
sections.forEach(el => createCanvas(el.id));

// Arrow Paging
function goTo(sectionId) {
  const section = document.getElementById(sectionId);
  section.scrollIntoView({
    block: 'start',
    inline: 'nearest',
    behavior: 'smooth'
  });
};
window.goTo = goTo; // used in html

// Keyboard Paging
const shownIds = [];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const isIn = entry.isIntersecting;
    const { id } = entry.target;
    const idx = shownIds.indexOf(id);
    if (isIn) shownIds.push(id);
    else if (idx >= 0) shownIds.splice(idx, 1);
  });
}, { threshold: [0.01] });

sections.forEach(el => observer.observe(el));

function nextPage(isDown = true) {
  const ordered = [...shownIds.sort()];
  if (isDown) ordered.reverse();
  const id = ordered[0];
  goTo(id);
}

document.addEventListener('keyup', event => {
  const isUp = event.key === 'ArrowUp';
  const isDown = event.key === 'ArrowDown';
  if (isUp || isDown) {
    requestAnimationFrame(() => nextPage(isDown));
  }
});
