export default function(sections, goTo) {
  // Paging Observer //
  const shownIds = new Set();

  function pagingIntersect(entries) {
    entries.forEach(entry => {
      const isIn = entry.isIntersecting;
      const { id } = entry.target;
      if (isIn) shownIds.add(id);
      else shownIds.delete(id);
    });
  };

  const pagingObserver = new IntersectionObserver(pagingIntersect);
  sections.forEach(el => pagingObserver.observe(el));

  // Paging Keyboard //
  function goToNext(isDown = true) {
    const sorted = [...shownIds].sort();
    const id = isDown ? sorted.pop() : sorted.shift();
    goTo(id);
  }

  document.addEventListener('keydown', event => {
    const isUp = event.key === 'ArrowUp';
    const isDown = event.key === 'ArrowDown';
    const isRepeat = event.repeat;

    if (isUp || isDown) {
      if (isRepeat) return;

      event.preventDefault();
      goToNext(isDown);
    }
  });

  // Text Animation Observer //
  function textIntersect(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  };

  const options = { threshold: 0.7 };
  const textObserver = new IntersectionObserver(textIntersect, options);
  sections.forEach(el => textObserver.observe(el));
}