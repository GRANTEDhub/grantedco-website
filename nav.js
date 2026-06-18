document.addEventListener('DOMContentLoaded', function () {
  // Mobile toggle
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () { links.classList.toggle('open'); });
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.site-nav')) links.classList.remove('open');
    });
  }
  // Active link
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function(a) {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
});
