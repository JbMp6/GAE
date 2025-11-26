// Smooth scroll
function scrollToAnchor(anchor) {
  let el = null;

  if (typeof anchor === 'string') {
    el = document.getElementById(anchor.replace(/^#/, ''));
  } else {
    el = anchor;
  }

  if (!el) return;

  const header = document.querySelector('header');
  const offset = header ? header.offsetHeight : 0;

  window.scrollTo({
    top: el.offsetTop - offset,
    behavior: 'smooth'
  });
}

// Clic sur flèche du hero + tous les liens internes
document.addEventListener('click', function (e) {
  // flèche
  if (e.target.closest('.background_image .fa-angles-down')) {
    e.preventDefault();
    scrollToAnchor('section_1');
    return;
  }

  // liens <a href="#...">
  const link = e.target.closest('a[href^="#"]');
  if (link) {
    const targetId = link.getAttribute('href').substring(1);
    if (targetId) {
      e.preventDefault();
      scrollToAnchor(targetId);
    }
  }
});
