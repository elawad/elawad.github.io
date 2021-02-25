const DOT_COUNT = 100;

function createCanvas(canvasId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');
  const color = canvas.dataset.color;
  const dots = [];

  const angle = Math.PI * 2;
  const interval = 2e3 / 60;

  function resizeWindow() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = color;
  }

  class Dot {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = -1 + Math.random();
      this.vy = -1 + Math.random();
      this.radius = Math.random();
    }

    create() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, angle, false);
      ctx.fill();
    }

    animate() {
      var dot;
      for (var i = 0; i < DOT_COUNT; i++) {
        dot = dots[i];
        if (dot.y < 0 || dot.y > canvas.height) {
          // dot.vx = dot.vx; // TODO - needed?
          dot.vy = -dot.vy;
        }
        // else // TODO - needed?
        if (dot.x < 0 || dot.x > canvas.width) {
          dot.vx = -dot.vx;
          // dot.vy = dot.vy; // TODO - needed?
        }

        dot.x += dot.vx;
        dot.y += dot.vy;
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var dot;
    for (var i = 0; i < DOT_COUNT; i++) {
      dots.push(new Dot());
      dot = dots[i];
      dot.create();
    }

    dot.animate();
  }

  window.addEventListener('resize', resizeWindow, false);

  setInterval(draw, interval);
  resizeWindow();
}

export default createCanvas;
