/* The Arizona Mastermind (served at /redrock/)
 *
 * One invitation for everyone: since 2026-11-11 the page is no longer personalised
 * (the old ?to= and &no= parameters are ignored, and their saved values are cleared).
 *
 * After payment: Stripe redirects to /redrock/?paid=deposit or /redrock/?paid=full,
 * which opens a ticket view with a print-only receipt. Stripe's emailed receipt is
 * the real record; the ticket simply reads "Seat reserved".
 *
 * Complimentary seat: that guest's link carries a private code (see COMP_CODE in build.mjs).
 * The card is encrypted with that code, in the #vault JSON, so it only exists for his link.
 * It shows his complimentary card and crosses out the deposit / pay-in-full cards.
 * On this source copy (no vault) any &seat= value shows the card, for previewing.
 *
 * Layout: a photo cover, then one scrolling page. dayTabs() turns the four days into
 * tabs, stickyBar() shows the slim bar after the cover, reveal() fades sections in.
 * Earlier versions are backed up in the source folder (*-before-redesign-2026-11-11.*,
 * *-book-2026-11-09.*, index-three-houses-2026-11-09.html).
 */

(function () {

  var params = new URLSearchParams(window.location.search);
  var SEAT = (params.get('seat') || '').trim();
  var PAID = (params.get('paid') || '').toLowerCase();   // 'deposit' | 'full' (Stripe redirect)

  function remember(key, value) { try { if (value) localStorage.setItem(key, value); } catch (e) {} }
  function recall(key) { try { return localStorage.getItem(key) || ''; } catch (e) { return ''; } }

  // The private seat code is remembered, so the comp card survives a return visit to the bare link.
  if (SEAT) remember('rrr-seat', SEAT); else SEAT = recall('rrr-seat');
  // Left over from the personalised links (retired 2026-11-11)
  try { localStorage.removeItem('rrr-name'); localStorage.removeItem('rrr-no'); } catch (e) {}

  var PAGE_TITLE = document.title;

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

  /* Optional photos: an <img data-optional> that fails to load removes its <figure>,
   * and a [data-gallery] with nothing left hides itself. */
  function optionalPhotos() {
    function drop(img) {
      var fig = img.closest('figure') || img;
      var gallery = img.closest('[data-gallery]');
      fig.remove();
      if (gallery && !gallery.querySelector('img')) gallery.hidden = true;
    }
    document.querySelectorAll('img[data-optional]').forEach(function (img) {
      if (img.complete && img.naturalWidth === 0) { drop(img); return; }
      img.addEventListener('error', function () { drop(img); });
    });
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

    view.querySelectorAll('[data-ticket-status]').forEach(function (el) {
      el.textContent = PAID === 'full'
        ? 'Paid in full'
        : 'Deposit received · balance of $1,500 due January 1, 2027';
    });

    // Print-only receipt
    var now = new Date();
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    var invNo = 'AZM-2027-' + pad(now.getMonth() + 1) + pad(now.getDate()) + '-' + (PAID === 'full' ? 'F' : 'D');
    var fill = function (sel, text) { view.querySelectorAll(sel).forEach(function (el) { el.textContent = text; }); };
    fill('[data-inv-no]', invNo);
    fill('[data-inv-date]', now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
    if (PAID === 'full') {
      fill('[data-inv-paid-label]', 'Amount paid · in full');
      fill('[data-inv-paid]', '$3,000.00');
      fill('[data-inv-due-label]', 'Balance due');
      fill('[data-inv-due]', '$0.00');
      fill('[data-inv-stamp]', 'Paid in full');
    } else {
      fill('[data-inv-paid-label]', 'Amount paid · deposit');
      fill('[data-inv-paid]', '$1,500.00');
      fill('[data-inv-due-label]', 'Balance due by January 1, 2027');
      fill('[data-inv-due]', '$1,500.00');
      fill('[data-inv-stamp]', 'Deposit paid');
    }

    view.hidden = false;
    document.documentElement.classList.add('ticket-open');
    document.title = 'Your ticket · The Arizona Mastermind';

    view.querySelector('[data-ticket-print]').addEventListener('click', function () { window.print(); });
    view.querySelector('[data-ticket-close]').addEventListener('click', function () {
      view.classList.add('is-leaving');
      document.documentElement.classList.remove('ticket-open');
      setTimeout(function () { view.hidden = true; view.classList.remove('is-leaving'); }, 600);
      // Drop ?paid= from the address so a refresh shows the invitation
      var q = new URLSearchParams(window.location.search); q.delete('paid');
      var qs = q.toString();
      history.replaceState(null, '', window.location.pathname + (qs ? '?' + qs : '') + window.location.hash);
      document.title = PAGE_TITLE;
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

  /* Video invitation: the section stays hidden until data-video-src is set in index.html.
   * Accepts a YouTube or Vimeo link (unlisted is fine) or an .mp4 path. Click to load,
   * so nothing from YouTube/Vimeo loads until the guest presses play. */
  function videoInvite() {
    var box = document.querySelector('[data-video]');
    if (!box) return;
    var src = (box.getAttribute('data-video-src') || '').trim();
    if (!src) { box.hidden = true; return; }
    var embed = null, poster = (box.getAttribute('data-video-poster') || '').trim(), m;
    if ((m = src.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/))([\w-]{11})/))) {
      embed = 'https://www.youtube-nocookie.com/embed/' + m[1] + '?autoplay=1&rel=0&modestbranding=1&playsinline=1';
      if (!poster) poster = 'https://i.ytimg.com/vi/' + m[1] + '/hqdefault.jpg';
    } else if ((m = src.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/([\w]+))?/))) {
      embed = 'https://player.vimeo.com/video/' + m[1] + '?autoplay=1&dnt=1' + (m[2] ? '&h=' + m[2] : '');
    } else if (!/\.(mp4|m4v|webm|mov)(\?|#|$)/i.test(src)) {
      box.hidden = true; return;          // not a link we know how to play
    }
    if (!poster) poster = 'assets/images/web/redrock-pano.jpg';

    var frame = box.querySelector('[data-video-frame]');
    var play = box.querySelector('[data-video-play]');
    var img = box.querySelector('[data-video-poster-img]');
    var fallback = box.querySelector('[data-video-fallback]');
    var link = box.querySelector('[data-video-link]');
    if (link) link.href = src;
    function fail() { if (play) play.hidden = true; if (fallback) fallback.hidden = false; }
    img.addEventListener('error', function () {
      if (img.src.indexOf('redrock-pano') === -1) img.src = 'assets/images/web/redrock-pano.jpg';
    });
    img.src = poster;
    box.hidden = false;

    play.addEventListener('click', function () {
      var el;
      if (embed) {
        el = document.createElement('iframe');
        el.src = embed;
        el.title = 'A short video from Jesse';
        el.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
        el.setAttribute('allowfullscreen', '');
      } else {
        el = document.createElement('video');
        el.src = src;
        el.controls = true;
        el.autoplay = true;
        el.setAttribute('playsinline', '');
        el.poster = img.src;
        el.addEventListener('error', fail);
      }
      el.className = 'iv-media';
      play.replaceWith(el);
      if (el.focus) el.focus();
    }, { once: true });
  }

  /* Rooms: driven by the JSON block [data-rooms-config] in index.html.
   * Shown only when its "show" is true. */
  function roomsBlock() {
    var cfgEl = document.querySelector('[data-rooms-config]');
    var box = document.querySelector('[data-rooms]');
    var list = document.querySelector('[data-rooms-list]');
    if (!cfgEl || !box || !list) return;
    var cfg;
    try { cfg = JSON.parse(cfgEl.textContent); } catch (e) { return; }
    if (!cfg || !cfg.show || !Array.isArray(cfg.rooms)) { box.hidden = true; return; }
    list.textContent = '';
    cfg.rooms.forEach(function (r) {
      var taken = String(r.status || '').toLowerCase() === 'taken';
      var li = document.createElement('li');
      if (taken) li.className = 'is-taken';
      var name = document.createElement('span');
      name.className = 'r-name';
      name.textContent = r.name || '';
      var st = document.createElement('span');
      st.className = 'r-status';
      st.textContent = taken ? 'Taken' : 'Available';
      li.appendChild(name); li.appendChild(st);
      list.appendChild(li);
    });
    box.hidden = false;
  }

  /* The four days: tabs (Thu · Fri · Sat · Sun). Without this script all four show stacked. */
  function dayTabs() {
    var box = document.querySelector('[data-days]');
    if (!box) return;
    var tabs = Array.prototype.slice.call(box.querySelectorAll('[role="tab"]'));
    if (!tabs.length) return;
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.classList.toggle('is-active', on);
      });
      if (focus) tab.focus();
    }
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(tab, false); });
      tab.addEventListener('keydown', function (e) {
        var to = null;
        if (e.key === 'ArrowRight') to = tabs[(i + 1) % tabs.length];
        else if (e.key === 'ArrowLeft') to = tabs[(i - 1 + tabs.length) % tabs.length];
        else if (e.key === 'Home') to = tabs[0];
        else if (e.key === 'End') to = tabs[tabs.length - 1];
        if (to) { e.preventDefault(); select(to, true); }
      });
    });
    box.classList.add('is-tabs');
    select(tabs[0], false);
  }

  /* Slim bar: slides in once the cover has scrolled out of view. */
  function stickyBar() {
    var bar = document.querySelector('[data-bar]');
    var cover = document.querySelector('[data-cover]');
    if (!bar || !cover || !('IntersectionObserver' in window)) return;
    new IntersectionObserver(function (entries) {
      bar.classList.toggle('is-on', !entries[0].isIntersecting);
    }, { rootMargin: '-56px 0px 0px 0px' }).observe(cover);
  }

  /* Gentle fade-up as blocks scroll into view. The hiding style only applies once
   * .reveal-on is set here, so content can never stay invisible without this script. */
  function reveal() {
    var els = document.querySelectorAll('[data-reveal]');
    if (!els.length || !('IntersectionObserver' in window)) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    document.documentElement.classList.add('reveal-on');
    els.forEach(function (el) { io.observe(el); });
    // Safety net: never leave anything hidden (printing, odd browsers)
    window.addEventListener('beforeprint', function () { els.forEach(function (el) { el.classList.add('is-in'); }); });
  }

  function initPage() {
    dayTabs();
    stickyBar();
    reveal();
    videoInvite();
    roomsBlock();
    optionalPhotos();
    protectImages();
    photoWall();
    showTicket();
  }

  /* ---------- Complimentary card (encrypted) ---------- */

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

  function showComp(vault) {
    if (!SEAT) return;
    if (!vault) { applyComp(); return; }          // source preview: no vault
    if (!vault.comp) return;
    decrypt(vault.comp, SEAT).then(function (compHtml) {
      var cards = document.querySelector('.cards');
      if (!cards) return;
      cards.insertAdjacentHTML('afterbegin', compHtml);
      protectImages();
      applyComp();
    }, function () { /* not the comp code: show the normal page */ });
  }

  document.addEventListener('DOMContentLoaded', function () {
    try { localStorage.removeItem('rrr-pass'); } catch (e) {}   // left over from the old lock
    initPage();
    var vaultEl = document.getElementById('vault');
    var vault = null;
    if (vaultEl) { try { vault = JSON.parse(vaultEl.textContent); } catch (e) {} }
    showComp(vault);
  });
})();
