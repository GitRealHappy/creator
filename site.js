/* ============================================================
   The Living Internet Alliance · shared page script
   Loaded by every page (/, /community, /2026, /faq). Vanilla, no deps.
   - Mobile menu toggle
   - Smooth in-page scrolling (also for "/#tickets"-style links on /)
   - Modal core (lightbox)
   - Photo conveyor + grid toggle (/2026 #gallery)
   - Lightbox for any [data-lightbox] photo button on the page
   - "Read more testimonials" reveal (/2026 #wall)
   The early-bird / full-price switch is an inline script in each
   page's <head> so prices never flash the wrong value.
   ============================================================ */

/* ---------- Mobile menu ---------- */
(function () {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  if (!nav || !toggle) return;

  function setOpen(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  toggle.addEventListener('click', function () {
    setOpen(!nav.classList.contains('is-open'));
  });
  nav.querySelectorAll('.nav__links a').forEach(function (a) {
    a.addEventListener('click', function () { setOpen(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 980) setOpen(false);
  });
})();

/* ---------- Smooth in-page scrolling ---------- */
(function () {
  const header = document.querySelector('.nav');
  function offset() { return (header ? header.offsetHeight : 0) + 4; }

  function scrollToHash(hash) {
    if (hash === '#top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return true; }
    let target = null;
    try { target = document.querySelector(hash); } catch (e) { return false; }
    if (!target) return false;
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset();
    window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
    return true;
  }

  document.querySelectorAll('a[href*="#"]').forEach(function (link) {
    const url = new URL(link.getAttribute('href'), window.location.href);
    const samePage = url.origin === window.location.origin &&
      url.pathname.replace(/index\.html$/, '') === window.location.pathname.replace(/index\.html$/, '');
    if (!samePage || !url.hash || url.hash.length < 2) return;
    link.addEventListener('click', function (e) {
      if (scrollToHash(url.hash)) {
        e.preventDefault();
        if (history.pushState) history.pushState(null, '', url.hash);
      }
    });
  });
})();

/* ---------- Modal core ---------- */
(function () {
  let lastFocused = null;
  function onKey(e) {
    if (e.key === 'Escape') {
      const open = document.querySelector('.modal:not([hidden])');
      if (open) closeModal(open);
    }
  }
  function openModal(modal) {
    if (!modal) return;
    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    const close = modal.querySelector('.modal__close');
    if (close) close.focus();
    document.addEventListener('keydown', onKey);
  }
  function closeModal(modal) {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKey);
    if (lastFocused) lastFocused.focus();
  }
  document.querySelectorAll('[data-modal-close]').forEach(function (el) {
    el.addEventListener('click', function () { closeModal(el.closest('.modal')); });
  });
  window.liaOpenModal = openModal;
  window.liaCloseModal = closeModal;
})();

/* ---------- Photo conveyor + grid toggle (only where .gallery exists) ---------- */
(function () {
  const gallery = document.querySelector('.gallery');
  if (!gallery) return;
  const items = Array.prototype.slice.call(gallery.querySelectorAll('.gallery__item'));
  if (!items.length) return;

  const dotsWrap = document.getElementById('galleryDots');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const step = 2;
  const pageCount = Math.ceil(items.length / step);
  let activePage = 0;
  let autoplayTimer = null;

  function setActiveDot(page) {
    activePage = page;
    if (!dotsWrap) return;
    dotsWrap.querySelectorAll('.gallery__dot').forEach(function (dot, i) {
      dot.classList.toggle('is-active', i === page);
      dot.setAttribute('aria-selected', i === page ? 'true' : 'false');
    });
  }
  function scrollToItem(index, smooth) {
    const item = items[Math.min(index, items.length - 1)];
    if (!item) return;
    const delta = item.getBoundingClientRect().left - gallery.getBoundingClientRect().left;
    gallery.scrollTo({ left: gallery.scrollLeft + delta, behavior: smooth === false ? 'auto' : 'smooth' });
  }
  function goToPage(page, smooth) {
    const wrapped = (page + pageCount) % pageCount;
    scrollToItem(wrapped * step, smooth);
    setActiveDot(wrapped);
  }
  function startAutoplay() {
    if (reduceMotion || autoplayTimer || gallery.classList.contains('gallery--grid')) return;
    autoplayTimer = setInterval(function () { goToPage(activePage + 1); }, 4500);
  }
  function stopAutoplay() { clearInterval(autoplayTimer); autoplayTimer = null; }

  if (dotsWrap) {
    for (let p = 0; p < pageCount; p++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'gallery__dot';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', 'Show photos ' + (p * step + 1) + (items[p * step + 1] ? '-' + (p * step + 2) : ''));
      dot.addEventListener('click', function () { stopAutoplay(); goToPage(p); startAutoplay(); });
      dotsWrap.appendChild(dot);
    }
    setActiveDot(0);
  }

  let scrollSyncTimer = null;
  gallery.addEventListener('scroll', function () {
    clearTimeout(scrollSyncTimer);
    scrollSyncTimer = setTimeout(function () {
      const left = gallery.getBoundingClientRect().left;
      let closest = 0, minDist = Infinity;
      items.forEach(function (item, i) {
        const d = Math.abs(item.getBoundingClientRect().left - left);
        if (d < minDist) { minDist = d; closest = i; }
      });
      setActiveDot(Math.round(closest / step) % pageCount);
    }, 120);
  }, { passive: true });

  gallery.addEventListener('mouseenter', stopAutoplay);
  gallery.addEventListener('mouseleave', startAutoplay);
  gallery.addEventListener('touchstart', stopAutoplay, { passive: true });
  gallery.addEventListener('focusin', stopAutoplay);
  gallery.addEventListener('focusout', startAutoplay);

  const navPrev = document.getElementById('galleryPrev');
  const navNext = document.getElementById('galleryNext');
  if (navPrev) navPrev.addEventListener('click', function () { stopAutoplay(); goToPage(activePage - 1); startAutoplay(); });
  if (navNext) navNext.addEventListener('click', function () { stopAutoplay(); goToPage(activePage + 1); startAutoplay(); });

  const viewToggle = document.getElementById('galleryViewToggle');
  const galleryWrap = document.querySelector('.gallery-wrap');
  const galleryControls = document.querySelector('.gallery-controls');
  if (viewToggle && galleryWrap) {
    viewToggle.addEventListener('click', function () {
      const isGrid = gallery.classList.toggle('gallery--grid');
      galleryWrap.classList.toggle('is-grid', isGrid);
      if (galleryControls) galleryControls.classList.toggle('is-grid', isGrid);
      viewToggle.setAttribute('aria-pressed', isGrid ? 'true' : 'false');
      viewToggle.textContent = isGrid ? 'Collapse grid' : 'View all photos';
      if (isGrid) {
        stopAutoplay();
      } else {
        scrollToItem(activePage * step, false);
        startAutoplay();
        const section = gallery.closest('section');
        if (section) {
          const navEl = document.querySelector('.nav');
          const top = section.getBoundingClientRect().top + window.pageYOffset - (navEl ? navEl.offsetHeight : 0) - 4;
          window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
        }
      }
    });
  }
  startAutoplay();
})();

/* ---------- Lightbox for every [data-lightbox] photo button ---------- */
(function () {
  const items = Array.prototype.slice.call(document.querySelectorAll('[data-lightbox]'));
  const modal = document.getElementById('modal-gallery');
  if (!items.length || !modal) return;

  const imgEl = document.getElementById('lightboxImg');
  const captionEl = document.getElementById('lightboxCaption');
  const figureEl = document.getElementById('lightboxFigure');
  const btnPrev = document.getElementById('lightboxPrev');
  const btnNext = document.getElementById('lightboxNext');
  let current = 0;

  function show(index) {
    current = (index + items.length) % items.length;
    const source = items[current].querySelector('img');
    imgEl.src = source.getAttribute('data-full') || source.currentSrc || source.src;
    imgEl.alt = source.alt;
    captionEl.textContent = source.alt;
  }
  items.forEach(function (item, index) {
    item.addEventListener('click', function () { show(index); window.liaOpenModal(modal); });
  });
  btnPrev.addEventListener('click', function () { show(current - 1); });
  btnNext.addEventListener('click', function () { show(current + 1); });
  document.addEventListener('keydown', function (e) {
    if (modal.hidden) return;
    if (e.key === 'ArrowRight') show(current + 1);
    else if (e.key === 'ArrowLeft') show(current - 1);
  });

  let sx = null, sy = null;
  figureEl.addEventListener('touchstart', function (e) {
    sx = e.touches[0].clientX; sy = e.touches[0].clientY;
  }, { passive: true });
  figureEl.addEventListener('touchend', function (e) {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx;
    const dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(current + (dx < 0 ? 1 : -1));
    sx = sy = null;
  }, { passive: true });
})();

/* ---------- Testimonial wall: show a few, reveal 5 more per click ---------- */
(function () {
  const wall = document.querySelector('.quote-wall');
  if (!wall) return;
  const notes = Array.prototype.slice.call(wall.querySelectorAll('.quote'));
  const initial = 5, step = 5;
  if (notes.length <= initial) return;

  let shown = initial;
  notes.forEach(function (note, i) { if (i >= shown) note.hidden = true; });

  const wrap = document.createElement('div');
  wrap.className = 'quote-more';
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn btn--ghost';
  btn.innerHTML = 'Read more testimonials <span class="quote-more__count"></span>' +
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
  const count = btn.querySelector('.quote-more__count');
  function updateCount() { count.textContent = '(' + (notes.length - shown) + ' more)'; }
  updateCount();
  wrap.appendChild(btn);
  wall.after(wrap);

  btn.addEventListener('click', function () {
    const next = notes.slice(shown, shown + step);
    next.forEach(function (note) { note.hidden = false; note.classList.add('is-new'); });
    shown += next.length;
    // Move focus to the first new note so keyboard and screen-reader users land on it
    next[0].tabIndex = -1;
    next[0].focus({ preventScroll: true });
    if (shown >= notes.length) wrap.remove();
    else updateCount();
  });
})();
