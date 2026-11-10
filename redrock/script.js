/* The Arizona Mastermind (served at /redrock/)
 *
 * Personalised links: add ?to=Full%20Name&no=4 to the address, e.g.
 *   https://www.thelivinginternet.com/redrock/?to=Jane%20Doe&no=4
 * The lock screen shows "Name: Jane", and once unlocked the page says
 * "This invitation is for Jane Doe" and the letter opens "Jane,". The &no= number is
 * no longer shown on the page; it only numbers the receipt/invoice (AZM-2027-NN-D/F).
 *
 * After payment: Stripe redirects to /redrock/?paid=deposit or /redrock/?paid=full,
 * which opens a ticket view. The guest's name comes from their earlier personal link
 * (remembered in this browser); otherwise the ticket reads "Seat reserved".
 *
 * Complimentary seat: that guest's link carries a private code (see COMP_CODE in build.mjs).
 * The ticket is encrypted with that code, so it only exists for his link.
 * It shows his complimentary ticket and greys out the deposit / pay-in-full cards.
 *
 * Layout: one scrolling page about the chosen house (The Vista).
 * Earlier versions are backed up in the source folder: *-book-2026-11-09.* (book of spreads)
 * and index-three-houses-2026-11-09.html (three-house toggle; its script lived in this file).
 *
 * The page is open (no password since 2026-11-10). Only the complimentary card is
 * encrypted, in the #vault JSON, and decrypts with the &seat= code from that guest's link.
 * On this source copy (no vault) any &seat= value shows the card, for previewing.
 */

(function () {

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
      document.title = 'For ' + NAME + ' · The Arizona Mastermind';
    } else {
      document.title = 'The Arizona Mastermind · Sedona, January 2027';
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

    view.querySelectorAll('[data-ticket-first]').forEach(function (el) { el.textContent = FIRST ? ', ' + FIRST : ''; });
    view.querySelectorAll('[data-ticket-name]').forEach(function (el) { el.textContent = NAME || 'Seat reserved'; });
    view.querySelectorAll('[data-ticket-status]').forEach(function (el) {
      el.textContent = PAID === 'full'
        ? 'Paid in full'
        : 'Deposit received · balance of $2,000 due January 1, 2027';
    });

    // Print-only receipt
    var now = new Date();
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    var invNo = 'AZM-2027-' + (NO >= 1 ? pad(NO) : pad(now.getMonth() + 1) + pad(now.getDate())) + '-' + (PAID === 'full' ? 'F' : 'D');
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
      fill('[data-inv-due-label]', 'Balance due by January 1, 2027');
      fill('[data-inv-due]', '$2,000.00');
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

  function initPage() {
    personalise();
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
      cards.querySelectorAll('[data-name]').forEach(function (el) { el.textContent = NAME; });
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
