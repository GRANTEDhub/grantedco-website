document.addEventListener('DOMContentLoaded', function () {

  // Mobile toggle
  var toggle = document.querySelector('.nav-toggle');
  var links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () { links.classList.toggle('open'); });
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.site-nav')) links.classList.remove('open');
    });
  }

  // Active link highlight
  var page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function(a) {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  // Scroll reveal
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    var revealIO = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          revealIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(function(el) { revealIO.observe(el); });
  } else {
    reveals.forEach(function(el) { el.classList.add('revealed'); });
  }

  // Animated counters
  function countUp(el) {
    var raw     = el.dataset.count;
    var suffix  = el.dataset.suffix  || '';
    var prefix  = el.dataset.prefix  || '';
    var target  = parseFloat(raw);
    var isInt   = raw.indexOf('.') === -1;
    var dur     = 1600;
    var start   = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / dur, 1);
      var ease     = 1 - Math.pow(1 - progress, 3);
      var value    = target * ease;
      el.textContent = prefix + (isInt ? Math.floor(value) : value.toFixed(1)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = prefix + raw + suffix;
    }
    requestAnimationFrame(step);
  }

  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    var counterIO = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          countUp(e.target);
          counterIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function(el) { counterIO.observe(el); });
  }

});
