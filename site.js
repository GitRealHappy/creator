/* ============================================================
   The Living Internet Alliance · shared page script
   Loaded by every page (/, /community, /2026, /faq). Vanilla, no deps.
   - Mobile menu toggle
   - Smooth in-page scrolling (also for "/#tickets"-style links on /)
   - Modal core (lightbox)
   - Photo conveyor + grid toggle (/2026 #gallery)
   - Lightbox for any [data-lightbox] photo button on the page
   - "Read more testimonials" reveal (/2026 #wall)
   - Dot-field hero (/community)
   - Question-mark hero (/faq)
   - Cursor twinkles (/2026 #speakers)
   - Sparkler (/2026 closing section)
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

/* ---------- Dot-field hero (/community) ----------
   A grid of dots that slowly rotates as a whole. Dots near the cursor
   (or a finger on touch) drift away from it and brighten from gray to
   bone, then ease back once it moves on. Reduced motion: one static frame. */
(function () {
  const hero = document.querySelector('.page-hero--dots');
  const canvas = hero && hero.querySelector('.page-hero__dots');
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const TURN_SECONDS = 180;   // one full rotation of the grid
  const RADIUS = 210;         // cursor reach, in CSS px
  const PUSH = 42;            // max drift away from the cursor
  const SWIRL = 16;           // sideways drift, so dots curl around the cursor

  let w = 0, h = 0, dpr = 1, spacing = 30;
  let gx, gy, ox, oy, n = 0;  // grid points (relative to center) + eased offsets
  const mouse = { x: 0, y: 0, active: false, strength: 0 };
  let angle = 0, last = 0, raf = 0, visible = true;

  function build() {
    const rect = hero.getBoundingClientRect();
    w = rect.width; h = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    spacing = w < 600 ? 24 : 30;
    // Cover the hero's diagonal so the rotating grid never shows a corner
    const half = Math.ceil(Math.hypot(w, h) / 2 / spacing) + 1;
    const side = half * 2 + 1;
    n = side * side;
    gx = new Float32Array(n); gy = new Float32Array(n);
    ox = new Float32Array(n); oy = new Float32Array(n);
    let i = 0;
    for (let r = -half; r <= half; r++) {
      for (let c = -half; c <= half; c++) { gx[i] = c * spacing; gy[i] = r * spacing; i++; }
    }
  }

  function draw() {
    const cx = w / 2, cy = h / 2;
    const cos = Math.cos(angle), sin = Math.sin(angle);
    const pad = PUSH + 4;
    const s = mouse.strength;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    // Resting dots share one path; dots inside the cursor's reach are drawn one by one
    ctx.beginPath();
    const lit = [];
    for (let i = 0; i < n; i++) {
      const bx = cx + gx[i] * cos - gy[i] * sin;
      const by = cy + gx[i] * sin + gy[i] * cos;
      let tx = 0, ty = 0, f = 0;
      if (s > 0.001) {
        const dx = bx - mouse.x, dy = by - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < RADIUS && d > 0.01) {
          f = 1 - d / RADIUS; f = f * f * (3 - 2 * f) * s;
          tx = (dx / d) * PUSH * f - (dy / d) * SWIRL * f;
          ty = (dy / d) * PUSH * f + (dx / d) * SWIRL * f;
        }
      }
      ox[i] += (tx - ox[i]) * 0.12;
      oy[i] += (ty - oy[i]) * 0.12;
      const x = bx + ox[i], y = by + oy[i];
      if (x < -pad || y < -pad || x > w + pad || y > h + pad) continue;
      if (f > 0.02) { lit.push(x, y, f); continue; }
      ctx.moveTo(x + 1.6, y);
      ctx.arc(x, y, 1.6, 0, Math.PI * 2);
    }
    ctx.fillStyle = 'rgba(196, 200, 214, 0.38)';
    ctx.fill();

    for (let j = 0; j < lit.length; j += 3) {
      const f = lit[j + 2];
      ctx.beginPath();
      ctx.arc(lit[j], lit[j + 1], 1.6 + f * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(244, 241, 236, ' + (0.38 + f * 0.62).toFixed(3) + ')';
      ctx.fill();
    }
  }

  function frame(now) {
    const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
    last = now;
    angle = (angle + dt * (Math.PI * 2 / TURN_SECONDS)) % (Math.PI * 2);
    mouse.strength += ((mouse.active ? 1 : 0) - mouse.strength) * 0.08;
    draw();
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (reduceMotion || raf || !visible || document.hidden) return;
    last = 0;
    raf = requestAnimationFrame(frame);
  }
  function stop() { cancelAnimationFrame(raf); raf = 0; }

  function track(e) {
    const rect = hero.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  }
  if (!reduceMotion) {
    hero.addEventListener('pointermove', track);
    hero.addEventListener('pointerdown', track);
    hero.addEventListener('pointerleave', function () { mouse.active = false; });
    hero.addEventListener('pointerup', function (e) { if (e.pointerType !== 'mouse') mouse.active = false; });
    hero.addEventListener('pointercancel', function () { mouse.active = false; });
  }

  build();
  draw();
  if ('ResizeObserver' in window) {
    new ResizeObserver(function () { build(); draw(); }).observe(hero);
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      visible ? start() : stop();
    }).observe(hero);
  }
  document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
  start();
})();

/* ---------- Question-mark hero (/faq) ----------
   A loose scatter of faint "?" glyphs that bob gently. Near the cursor (or
   a finger) they straighten up, grow and warm to ember; the closest ones
   flip to "!", a question answered. Reduced motion: one static frame. */
(function () {
  const hero = document.querySelector('.page-hero--questions');
  const canvas = hero && hero.querySelector('.page-hero__field');
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const RADIUS = 200;   // cursor reach, in CSS px
  const ANSWERED = 0.62; // closeness at which "?" becomes "!"

  let w = 0, h = 0, dpr = 1, marks = [];
  const mouse = { x: 0, y: 0, active: false, strength: 0 };
  let t = 0, last = 0, raf = 0, visible = true;

  function build() {
    const rect = hero.getBoundingClientRect();
    w = rect.width; h = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    const spacing = w < 600 ? 50 : 62;
    marks = [];
    for (let y = spacing / 2; y < h + spacing; y += spacing) {
      for (let x = spacing / 2; x < w + spacing; x += spacing) {
        marks.push({
          x: x + (Math.random() - 0.5) * spacing * 0.7,
          y: y + (Math.random() - 0.5) * spacing * 0.7,
          size: 16 + Math.random() * 14,
          tilt: (Math.random() - 0.5) * 0.9,
          phase: Math.random() * Math.PI * 2,
          f: 0  // eased closeness to the cursor, 0..1
        });
      }
    }
  }

  function draw() {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const s = mouse.strength;
    for (let i = 0; i < marks.length; i++) {
      const m = marks[i];
      const bob = Math.sin(t * 0.6 + m.phase);
      const x = m.x, y = m.y + bob * 4;
      let target = 0;
      if (s > 0.001) {
        const d = Math.hypot(x - mouse.x, y - mouse.y);
        if (d < RADIUS) { target = 1 - d / RADIUS; target = target * target * (3 - 2 * target) * s; }
      }
      m.f += (target - m.f) * 0.1;
      const f = m.f;
      // Faint bone at rest, warming to ember as the cursor nears
      const r = Math.round(244 + (255 - 244) * f);
      const g = Math.round(241 + (106 - 241) * f);
      const b = Math.round(236 + (43 - 236) * f);
      const a = 0.13 + f * 0.82;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((m.tilt + bob * 0.06) * (1 - f));
      ctx.font = 'italic 400 ' + (m.size * (1 + f * 0.55)).toFixed(1) + 'px "EB Garamond", Georgia, serif';
      ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a.toFixed(3) + ')';
      ctx.fillText(f > ANSWERED ? '!' : '?', 0, 0);
      ctx.restore();
    }
  }

  function frame(now) {
    const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
    last = now;
    t += dt;
    mouse.strength += ((mouse.active ? 1 : 0) - mouse.strength) * 0.08;
    draw();
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (reduceMotion || raf || !visible || document.hidden) return;
    last = 0;
    raf = requestAnimationFrame(frame);
  }
  function stop() { cancelAnimationFrame(raf); raf = 0; }

  function track(e) {
    const rect = hero.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  }
  if (!reduceMotion) {
    hero.addEventListener('pointermove', track);
    hero.addEventListener('pointerdown', track);
    hero.addEventListener('pointerleave', function () { mouse.active = false; });
    hero.addEventListener('pointerup', function (e) { if (e.pointerType !== 'mouse') mouse.active = false; });
    hero.addEventListener('pointercancel', function () { mouse.active = false; });
  }

  build();
  draw();
  // Redraw once EB Garamond has loaded so the glyphs aren't stuck in the fallback serif
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);
  if ('ResizeObserver' in window) {
    new ResizeObserver(function () { build(); draw(); }).observe(hero);
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      visible ? start() : stop();
    }).observe(hero);
  }
  document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
  start();
})();

/* ---------- Cursor twinkles (/2026 #speakers) ----------
   As the cursor moves through the section, small four-point stars pop in
   near it, flicker and fade within about a second. Spawned by distance
   travelled, so a still cursor makes none. Off under reduced motion and
   on touch (there's no cursor to follow). */
(function () {
  const section = document.querySelector('.section--twinkle');
  const canvas = section && section.querySelector('.twinkle-canvas');
  if (!canvas || !canvas.getContext) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = canvas.getContext('2d');

  const STEP = 22;        // px of cursor travel per new star
  const LIFE = 1100;       // ms each star lives
  const MAX = 70;         // cap on stars alive at once
  const COLORS = ['244,241,236', '244,241,236', '255,179,71']; // mostly bone, some amber

  let w = 0, h = 0, dpr = 1, stars = [], raf = 0;
  let lastX = null, lastY = null, travel = 0;

  function size() {
    const rect = section.getBoundingClientRect();
    w = rect.width; h = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
  }

  function spawn(x, y) {
    if (stars.length >= MAX) stars.shift();
    const a = Math.random() * Math.PI * 2, r = 10 + Math.random() * 34;
    stars.push({
      x: x + Math.cos(a) * r,
      y: y + Math.sin(a) * r,
      size: 4 + Math.random() * 8,
      spin: (Math.random() - 0.5) * 1.2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      born: performance.now()
    });
    if (!raf) raf = requestAnimationFrame(frame);
  }

  // A thin four-point star, like a glint
  function star(x, y, s, rot) {
    const inner = s * 0.22;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const rad = i % 2 ? inner : s;
      const ang = (i * Math.PI) / 4;
      ctx.lineTo(Math.cos(ang) * rad, Math.sin(ang) * rad);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function frame(now) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    stars = stars.filter(function (s) { return now - s.born < LIFE; });
    ctx.shadowBlur = 10;
    stars.forEach(function (s) {
      const p = (now - s.born) / LIFE;          // 0..1 through its life
      const pop = Math.sin(p * Math.PI);        // grows in, then shrinks out
      const flicker = 0.75 + 0.25 * Math.sin(p * 28);
      ctx.fillStyle = 'rgba(' + s.color + ',' + (pop * flicker).toFixed(3) + ')';
      ctx.shadowColor = 'rgba(' + s.color + ',' + (0.8 * pop).toFixed(3) + ')';
      star(s.x, s.y - p * 10, s.size * pop, s.spin * p);
    });
    raf = stars.length ? requestAnimationFrame(frame) : 0;
    if (!raf) ctx.clearRect(0, 0, w, h);
  }

  section.addEventListener('pointermove', function (e) {
    if (e.pointerType !== 'mouse') return;
    const rect = section.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    if (lastX !== null) travel += Math.hypot(x - lastX, y - lastY);
    lastX = x; lastY = y;
    if (travel >= STEP) { travel = 0; spawn(x, y); }
  });
  section.addEventListener('pointerleave', function () { lastX = lastY = null; travel = 0; });

  size();
  if ('ResizeObserver' in window) new ResizeObserver(size).observe(section);
})();

/* ---------- Sparkler (/2026 closing section) ----------
   While the mouse is in the section, its tip throws a steady stream of
   sparks. Each launches upward in a spread, slows, and falls back in a
   steep arc, cooling from white-gold to ember as it burns out. Drawn
   behind the content. Mouse only; off under reduced motion. */
(function () {
  const section = document.querySelector('.final--sparkler');
  const canvas = section && section.querySelector('.sparkler-canvas');
  if (!canvas || !canvas.getContext) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = canvas.getContext('2d');

  const RATE = 110;      // sparks per second while the cursor is in
  const GRAVITY = 1100;  // px/s², pulls sparks back down
  const MAX = 260;

  let w = 0, h = 0, dpr = 1, sparks = [], raf = 0, last = 0, owed = 0;
  const tip = { x: 0, y: 0, vx: 0, vy: 0, on: false };

  function size() {
    const rect = section.getBoundingClientRect();
    w = rect.width; h = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
  }

  function emit() {
    if (sparks.length >= MAX) sparks.shift();
    const ang = -Math.PI / 2 + (Math.random() - 0.5) * 1.3;  // mostly upward
    const speed = 220 + Math.random() * 300;
    sparks.push({
      x: tip.x, y: tip.y, px: tip.x, py: tip.y,
      vx: Math.cos(ang) * speed + tip.vx * 0.15,
      vy: Math.sin(ang) * speed + tip.vy * 0.15,
      age: 0,
      life: 0.45 + Math.random() * 0.6
    });
  }

  // Hot white-gold, through amber, to ember as a spark ages (p: 0..1)
  function color(p, a) {
    const g = p < 0.5 ? 240 - (240 - 179) * (p / 0.5) : 179 - (179 - 106) * ((p - 0.5) / 0.5);
    const b = p < 0.5 ? 200 - (200 - 71) * (p / 0.5) : 71 - (71 - 43) * ((p - 0.5) / 0.5);
    return 'rgba(255,' + Math.round(g) + ',' + Math.round(b) + ',' + a.toFixed(3) + ')';
  }

  function frame(now) {
    const dt = last ? Math.min((now - last) / 1000, 0.05) : 0.016;
    last = now;
    if (tip.on) {
      owed += RATE * dt;
      while (owed >= 1) { emit(); owed -= 1; }
    }
    tip.vx *= 0.85; tip.vy *= 0.85;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineCap = 'round';
    sparks = sparks.filter(function (s) {
      s.age += dt;
      if (s.age >= s.life) return false;
      s.px = s.x; s.py = s.y;
      s.vx *= 1 - 1.4 * dt;           // air drag
      s.vy += GRAVITY * dt;
      s.x += s.vx * dt; s.y += s.vy * dt;
      const p = s.age / s.life;
      ctx.strokeStyle = color(p, 1 - p * p);
      ctx.lineWidth = 1.8 * (1 - p) + 0.4;
      ctx.beginPath();
      // Streak from a little behind the last position, so fast sparks read as trails
      ctx.moveTo(s.px - (s.x - s.px) * 1.5, s.py - (s.y - s.py) * 1.5);
      ctx.lineTo(s.x, s.y);
      ctx.stroke();
      return true;
    });
    // The burning tip itself: a small flickering glow
    if (tip.on) {
      const r = 10 + Math.random() * 6;
      const glow = ctx.createRadialGradient(tip.x, tip.y, 0, tip.x, tip.y, r);
      glow.addColorStop(0, 'rgba(255,245,220,0.95)');
      glow.addColorStop(0.4, 'rgba(255,179,71,0.5)');
      glow.addColorStop(1, 'rgba(255,106,43,0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(tip.x, tip.y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over';

    if (tip.on || sparks.length) raf = requestAnimationFrame(frame);
    else { raf = 0; last = 0; ctx.clearRect(0, 0, w, h); }
  }

  section.addEventListener('pointermove', function (e) {
    if (e.pointerType !== 'mouse') return;
    const rect = section.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    if (tip.on) { tip.vx = (x - tip.x) * 30; tip.vy = (y - tip.y) * 30; }
    tip.x = x; tip.y = y; tip.on = true;
    if (!raf) raf = requestAnimationFrame(frame);
  });
  section.addEventListener('pointerleave', function () { tip.on = false; });

  size();
  if ('ResizeObserver' in window) new ResizeObserver(size).observe(section);
})();
