function Canvas(sectionId) {
  let DOT_COUNT;
  let canvas;
  let ctx;
  let color;
  let width;
  let height;
  let dots;
  let dot;
  let i;
  const particle = Object.seal({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    radius: 0,
  });

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = color;
  }

  function init() {
    canvas = document.getElementById(sectionId).querySelector('canvas');
    ctx = canvas.getContext('2d');
    color = canvas.dataset.color;
    dots = [];

    resize();
    window.addEventListener('resize', resize);
    DOT_COUNT = calcCount(width, height);

    // Setup particle detail
    for (i = 0; i < DOT_COUNT; i++) {
      dot = Object.create(particle);
      dot.x = Math.random() * width;
      dot.y = Math.random() * height;
      dot.vx = -1 + Math.random();
      dot.vy = -1 + Math.random();
      dot.radius = Math.random();
      dots[i] = dot;
    }
  }

  function step(move = true) {
    if (move) {
      // Move particles
      for (i = 0; i < DOT_COUNT; i++) {
        dot = dots[i];
        if (dot.x < 0 || dot.x > width) dot.vx = -dot.vx;
        if (dot.y < 0 || dot.y > height) dot.vy = -dot.vy;
        dot.x += dot.vx;
        dot.y += dot.vy;
      }
    } else {
      // Paint particles
      ctx.clearRect(0, 0, width, height);
      for (i = 0; i < DOT_COUNT; i++) {
        dot = dots[i];
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    requestAnimationFrame(() => step(!move));
  }

  init();
  step();
}

function calcCount(w, h) {
  const min = 100;
  const max = 300;
  const ceil = Math.min(max, (w * h) / 3000);
  const calc = Math.max(min, ceil);
  return Math.floor(calc);
}

export default Canvas;
