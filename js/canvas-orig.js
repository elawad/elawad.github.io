const DOT_COUNT = 150;

export default function (canvasId) {
  var resizeWindow = function() {
    console.log(canvasId, 'resize', window.innerWidth);

    e.width = window.innerWidth - 17;
    o();
  };

  function s() {
    var R = function() {
      this.x = Math.random() * e.width;
      this.y = Math.random() * e.height;
      this.vx = -1 + Math.random();
      this.vy = -1 + Math.random();
      this.radius = Math.random();
    };

    var s2 = function() {
      t.clearRect(0, 0, e.width, e.height);
      var dot;
      for (var i = 0; i < n.howManyDots; i++) {
        n.array.push(new R());
        dot = n.array[i];
        dot.create();
      }
      dot.animate();
    };
    R.prototype = {
      create: function() {
        t.beginPath();
        t.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        t.fill();
      },
      animate: function() {
        for (var i = 0; i < n.howManyDots; i++) {
          var t = n.array[i];
          if (t.y < 0 || t.y > e.height) {
            t.vx = t.vx;
            t.vy = -t.vy;
          } else if (t.x < 0 || t.x > e.width) {
            t.vx = -t.vx;
            t.vy = t.vy;
          }
          t.x += t.vx;
          t.y += t.vy;
        }
      }
    };
    setInterval(s2, 2e3 / 60);
  }

  function o() {
    function r() {
      this.x = Math.random() * e.width;
      this.y = Math.random() * e.height;
      this.vx = -1 + Math.random();
      this.vy = -1 + Math.random();
      this.radius = Math.random();
    }

    t.fillStyle = c;
    r.prototype = {
      create: function() {
        t.beginPath();
        t.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        t.fill();
      },
      animate: function() {
        for (var i = 0; i < n.howManyDots; i++) {
          var t = n.array[i];
          if (t.y < 0 || t.y > e.height) {
            t.vx = t.vx;
            t.vy = -t.vy;
          } else if (t.x < 0 || t.x > e.width) {
            t.vx = -t.vx;
            t.vy = t.vy;
          }
          t.x += t.vx;
          t.y += t.vy;
        }
      }
    };
  }
  var e = document.getElementById(canvasId);
  var c = e.dataset.color;
  var t = e.getContext('2d');

  e.style.display = 'block';
  e.height = window.innerHeight;
  e.width = window.innerWidth - 17;
  var n = {
    howManyDots: DOT_COUNT,
    array: []
  };

  window.addEventListener('resize', resizeWindow);

  s();
  resizeWindow();
}
