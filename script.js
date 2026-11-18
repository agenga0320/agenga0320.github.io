// Entrance motion: each part of a section rises in once as it enters the screen.
// The page is fully readable without this file; the .js class is only set when scripts run.
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const parts = document.querySelectorAll('main > p, .highlights li, h2, .yr, .ev, h4, .tags, .card');
  const seen = new Map();
  parts.forEach(el => {
    const n = seen.get(el.parentElement) || 0;
    seen.set(el.parentElement, n + 1);
    el.style.setProperty('--i', Math.min(n, 6));
    el.classList.add('rv');
  });
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -6% 0px' });
  parts.forEach(el => io.observe(el));
})();
