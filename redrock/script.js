/* Red Rock Rendezvous
 *
 * Personalised links: add ?to=Full%20Name&no=4 to the address, e.g.
 *   https://www.thelivinginternet.com/redrock/?to=Craig%20Perry&no=4
 * The lock screen shows "Name: Craig", and once unlocked the page says
 * "This invitation is for Craig Perry" and the letter opens "Craig,". The &no= number is
 * no longer shown on the page; it only numbers the receipt/invoice (RRR-2027-NN-D/F).
 *
 * After payment: Stripe redirects to /redrock/?paid=deposit or /redrock/?paid=full,
 * which opens a ticket view. The guest's name comes from their earlier personal link
 * (remembered in this browser); otherwise the ticket reads "Seat reserved".
 *
 * Complimentary seat (Nick): his link carries a private code (see COMP_CODE in build.mjs).
 * The ticket is encrypted with that code, so it only exists for his link.
 * It shows his complimentary ticket and greys out the deposit / pay-in-full cards.
 *
 * The published page is encrypted (see build.mjs). Typing the shared password
 * decrypts it in the browser. On this source copy (no vault) it simply opens.
 */

(function () {
    var STORE = 'rrr-pass';

  var params = new URLSearchParams(window.location.search);
  var SEAT = (params.get('seat') || '').trim();
  var PAID = (params.get('paid') || '').toLowerCase();   // 'deposit' | 'full' (Stripe redirect)

  // Remember who this browser belongs to, so the post-payment ticket can show their name
  // even though Stripe's redirect URL is the same for everyone.
  function remember(key, value) { try { if (value) localStorage.setItem(key, value); } catch (e) {} }
  function recall(key) { try { return localStorage.getItem(key) || ''; } catch (e) { return ''; } }

  var NAME = (params.get('to') || '').trim().slice(0, 60);
  var NO = parseInt(params.get('no'), 10);
  function forget(key) { try { localStorage.removeItem(key); } catch (e) {} }
  if (NAME) {
    remember('rrr-name', NAME);
    if (NO) remember('rrr-no', String(NO)); else forget('rrr-no');
    if (SEAT) remember('rrr-seat', SEAT); else forget('rrr-seat');
  } else {
    NAME = recall('rrr-name');
    NO = parseInt(recall('rrr-no'), 10);
    if (!SEAT) SEAT = recall('rrr-seat');
  }
  var FIRST = NAME ? NAME.split(/\s+/)[0] : '';

  function personalise() {
    if (NAME) {
      document.querySelectorAll('[data-name]').forEach(function (el) { el.textContent = NAME; });
      document.querySelectorAll('[data-first]').forEach(function (el) { el.textContent = FIRST; });
      document.querySelectorAll('[data-prepared], [data-greeting]').forEach(function (el) { el.hidden = false; });
      document.title = 'For ' + NAME + ' · Red Rock Rendezvous';
    } else {
      document.title = 'Red Rock Rendezvous · Sedona, January 2027';
    }
  }

  function applyComp() {
    document.querySelectorAll('[data-comp]').forEach(function (el) { el.hidden = false; });
    document.querySelectorAll('[data-comp-label]').forEach(function (el) {
      el.textContent = ' · The Strategist’s Seat';
      el.hidden = false;
    });
    document.querySelectorAll('[data-team]').forEach(function (el) { el.textContent = 'you and me'; });
    document.querySelectorAll('.pay-card').forEach(function (card) {
      card.classList.add('is-disabled');
      card.setAttribute('aria-disabled', 'true');
      card.querySelectorAll('a').forEach(function (a) {
        a.removeAttribute('href');
        a.setAttribute('tabindex', '-1');
        a.setAttribute('aria-disabled', 'true');
      });
    });
  }

  function reveal() {
    var items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 90 + 'ms';
      io.observe(el);
    });
  }

  function sectionDots() {
    var nav = document.querySelector('.dots');
    if (!nav || !('IntersectionObserver' in window)) return;
    var links = {};
    nav.querySelectorAll('[data-dot]').forEach(function (a) { links[a.getAttribute('data-dot')] = a; });
    var ids = Object.keys(links);
    var visible = {};

    function update() {
      var best = null, bestRatio = 0;
      ids.forEach(function (id) {
        if ((visible[id] || 0) > bestRatio) { bestRatio = visible[id]; best = id; }
      });
      ids.forEach(function (id) { links[id].classList.toggle('is-active', id === best); });
      if (best) {
        links[best].setAttribute('aria-current', 'true');
      }
      ids.forEach(function (id) { if (id !== best) links[id].removeAttribute('aria-current'); });
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting ? e.intersectionRatio : 0; });
      update();
    }, { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1], rootMargin: '-30% 0px -30% 0px' });
    ids.forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });

    // Show the dots only once the reader is past the hero
    var hero = document.querySelector('.hero');
    if (hero) {
      new IntersectionObserver(function (entries) {
        nav.classList.toggle('is-visible', !entries[0].isIntersecting);
      }, { threshold: 0.15 }).observe(hero);
    } else {
      nav.classList.add('is-visible');
    }
  }

  var protectedOnce = false;
  function protectImages() {
    document.querySelectorAll('img').forEach(function (img) { img.setAttribute('draggable', 'false'); });
    if (protectedOnce) return;
    protectedOnce = true;
    document.querySelectorAll('img').forEach(function (img) { img.setAttribute('draggable', 'false'); });
    document.addEventListener('contextmenu', function (e) {
      if (e.target && e.target.tagName === 'IMG') e.preventDefault();
    });
    document.addEventListener('dragstart', function (e) {
      if (e.target && e.target.tagName === 'IMG') e.preventDefault();
    });
  }

  function showTicket() {
    var view = document.querySelector('[data-ticket]');
    if (!view || (PAID !== 'deposit' && PAID !== 'full')) return;

    view.querySelectorAll('[data-ticket-first]').forEach(function (el) { el.textContent = FIRST ? ', ' + FIRST : ''; });
    view.querySelectorAll('[data-ticket-name]').forEach(function (el) { el.textContent = NAME || 'Seat reserved'; });
    view.querySelectorAll('[data-ticket-status]').forEach(function (el) {
      el.textContent = PAID === 'full'
        ? 'Paid in full'
        : 'Deposit received · balance of $2,000 due December 15, 2026';
    });

    // Print-only receipt
    var now = new Date();
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    var invNo = 'RRR-2027-' + (NO >= 1 ? pad(NO) : pad(now.getMonth() + 1) + pad(now.getDate())) + '-' + (PAID === 'full' ? 'F' : 'D');
    var fill = function (sel, text) { view.querySelectorAll(sel).forEach(function (el) { el.textContent = text; }); };
    fill('[data-inv-no]', invNo);
    fill('[data-inv-date]', now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
    fill('[data-inv-name]', NAME || 'Guest');
    if (PAID === 'full') {
      fill('[data-inv-paid-label]', 'Amount paid · in full');
      fill('[data-inv-paid]', '$4,000.00');
      fill('[data-inv-due-label]', 'Balance due');
      fill('[data-inv-due]', '$0.00');
      fill('[data-inv-stamp]', 'Paid in full');
    } else {
      fill('[data-inv-paid-label]', 'Amount paid · deposit');
      fill('[data-inv-paid]', '$2,000.00');
      fill('[data-inv-due-label]', 'Balance due by December 15, 2026');
      fill('[data-inv-due]', '$2,000.00');
      fill('[data-inv-stamp]', 'Deposit paid');
    }

    view.hidden = false;
    document.documentElement.classList.add('ticket-open');
    document.title = 'Your ticket · Red Rock Rendezvous';

    view.querySelector('[data-ticket-print]').addEventListener('click', function () { window.print(); });
    view.querySelector('[data-ticket-close]').addEventListener('click', function () {
      view.classList.add('is-leaving');
      document.documentElement.classList.remove('ticket-open');
      setTimeout(function () { view.hidden = true; view.classList.remove('is-leaving'); }, 600);
      // Drop ?paid= from the address so a refresh shows the invitation
      var q = new URLSearchParams(window.location.search); q.delete('paid');
      var qs = q.toString();
      history.replaceState(null, '', window.location.pathname + (qs ? '?' + qs : '') + window.location.hash);
      personalise();
    });
  }

  function photoWall() {
    var wall = document.querySelector('[data-photos]');
    var openBtn = document.querySelector('[data-photos-open]');
    if (!wall || !openBtn) return;
    var closeBtn = wall.querySelector('[data-photos-close]');
    var loaded = false, lastFocus = null;
    function load() {
      if (loaded) return;
      loaded = true;
      wall.querySelectorAll('img[data-src]').forEach(function (img) {
        img.setAttribute('draggable', 'false');
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
      });
    }
    function show() {
      lastFocus = document.activeElement;
      load();
      wall.hidden = false;
      document.documentElement.classList.add('photos-open');
      wall.scrollTop = 0;
      closeBtn.focus();
    }
    function hide() {
      wall.hidden = true;
      document.documentElement.classList.remove('photos-open');
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    openBtn.addEventListener('click', show);
    closeBtn.addEventListener('click', hide);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !wall.hidden) hide();
    });
  }

  function initPage() {
    personalise();
    reveal();
    sectionDots();
    protectImages();
    photoWall();
    showTicket();
  }

  /* ---------- Lock ---------- */

  function b64(s) {
    var bin = atob(s), out = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }

  function decrypt(vault, password) {
    var subtle = window.crypto && window.crypto.subtle;
    if (!subtle) return Promise.reject(new Error('no-crypto'));
    return subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey'])
      .then(function (base) {
        return subtle.deriveKey(
          { name: 'PBKDF2', salt: b64(vault.salt), iterations: vault.iter, hash: 'SHA-256' },
          base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']
        );
      })
      .then(function (key) {
        return subtle.decrypt({ name: 'AES-GCM', iv: b64(vault.iv) }, key, b64(vault.data));
      })
      .then(function (buf) { return new TextDecoder().decode(buf); });
  }

  function openPage(html, vault) {
    var page = document.getElementById('page');
    var lock = document.getElementById('lock');
    page.innerHTML = html;
    page.hidden = false;
    lock.classList.add('is-leaving');
    setTimeout(function () { lock.remove(); }, 900);
    initPage();
    if (SEAT && vault && vault.comp) {
      decrypt(vault.comp, SEAT).then(function (compHtml) {
        var cards = document.querySelector('.cards');
        if (!cards) return;
        cards.insertAdjacentHTML('afterbegin', compHtml);
        cards.querySelectorAll('[data-name]').forEach(function (el) { el.textContent = NAME; });
        cards.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-in'); });
        protectImages();
        applyComp();
      }, function () { /* not the comp code: show the normal page */ });
    }
    if (window.location.hash) {
      var target = document.querySelector(window.location.hash);
      if (target) target.scrollIntoView();
    }
  }

  function setupLock(vault) {
    var form = document.getElementById('lock-form');
    var input = document.getElementById('lock-pass');
    var error = document.getElementById('lock-error');
    var btn = form.querySelector('button');

    if (FIRST) {
      document.querySelectorAll('[data-lock-first]').forEach(function (el) { el.textContent = FIRST; });
      document.querySelectorAll('[data-lock-name]').forEach(function (el) { el.hidden = false; });
      document.title = 'For ' + FIRST + ' · Red Rock Rendezvous';
    }
    protectImages();

    var saved = null;
    try { saved = localStorage.getItem(STORE); } catch (e) {}
    if (saved) {
      decrypt(vault.main, saved).then(function (html) { openPage(html, vault); }, function () {
        try { localStorage.removeItem(STORE); } catch (e) {}
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var pass = input.value.trim().toLowerCase();
      if (!pass) return;
      btn.disabled = true;
      error.textContent = '';
      decrypt(vault.main, pass).then(function (html) {
        try { localStorage.setItem(STORE, pass); } catch (e) {}
        openPage(html, vault);
      }, function (err) {
        btn.disabled = false;
        error.textContent = err && err.message === 'no-crypto'
          ? 'Please open this link in a current browser over https.'
          : 'That isn’t it. Try again.';
        form.classList.remove('shake');
        void form.offsetWidth;
        form.classList.add('shake');
        input.select();
      });
    });

    setTimeout(function () { input.focus(); }, 300);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var vaultEl = document.getElementById('vault');
    if (vaultEl) {
      setupLock(JSON.parse(vaultEl.textContent));
    } else {
      initPage();
      if (SEAT) applyComp();
    }
  });
})();
