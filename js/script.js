'use strict';
var createCanvas = function (canvasId) {
    var resizeWindow = function() {
        e.width = window.innerWidth - 17;
        console.log('win InWid', window.innerWidth);
        console.log('e width', e.width);

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
    var e = document.getElementById(canvasId),
        c = e.dataset.color,
        t = e.getContext('2d');

    e.style.display = 'block';
    e.height = window.innerHeight;
    var n = {
        howManyDots: 100,
        distance: 100,
        array: []
    };
    
    window.addEventListener('resize', resizeWindow, false);

    s();
    resizeWindow();
};

(function() {
    window.setTimeout = window.setTimeout;
})();

var smoothScr = {
    iterr: 30,
    tm: null,
    stopShow: function() {
        clearTimeout(this.tm);
        this.iterr = 30;
    },
    getRealTop: function(e) {
        var t = e;
        var n = 0;
        do {
            n += t.offsetTop;
            t = t.offsetParent;
        } while (t);
        return n;
    },
    getPageScroll: function() {
        var e = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
        return e;
    },
    anim: function(e) {
        this.stopShow();
        var t, n, r, i, s, o, u;
        t = document.getElementById(e).offsetTop;
        r = this.getRealTop(document.getElementById(e).parentNode);
        n = this.getPageScroll();
        if (n === null || isNaN(n) || n === 'undefined') n = 0;
        i = t - n;
        if (i > r) {
            s = t - r - n;
            o = 1;
        }
        if (i < r) {
            s = n + r - t;
            o = -1;
        }
        if (i !== r) {
            u = ~~(s / 4 + 1) * o;
            if (this.iterr > 1) this.iterr -= 1;
            else this.itter = 0;
            window.scrollBy(0, u);
            this.tm = window.setTimeout(function() {
                smoothScr.anim(e);
            }, this.iterr);
        }
        if (i === r) {
            this.stopShow();
            return;
        }
    }
};

createCanvas('canvas-intro');
createCanvas('canvas-about');
//createCanvas('canvas-post');
createCanvas('canvas-footer');