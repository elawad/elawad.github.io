export default function(sections, goTo) {
  const ALL_IDS = [...sections].map(el => el.id).sort();
  const MAX_IDX = ALL_IDS.length - 1;
  const shownIds = [];

  function onIntersect(entries) {
    entries.forEach(entry => {
      const isIn = entry.isIntersecting;
      const { id } = entry.target;
      const idx = shownIds.indexOf(id);
      if (isIn) shownIds.push(id);
      else if (idx >= 0) shownIds.splice(idx, 1);
    });
  };

  const observer = new IntersectionObserver(onIntersect);
  sections.forEach(el => observer.observe(el));

  function goToNext(isDown = true) {
    const ordered = [...shownIds.sort()];
    if (isDown) ordered.reverse();
    const id = ordered[0];
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
}