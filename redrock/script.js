/* Red Rock Rendezvous
 *
 * Personalised links: add ?to=Full%20Name&no=4 to the address, e.g.
 *   https://www.thelivinginternet.com/redrock/?to=Jane%20Doe&no=4
 * The lock screen shows "Name: Jane", and once unlocked the page says
 * "This invitation is for Jane Doe" and the letter opens "Jane,". The &no= number is
 * no longer shown on the page; it only numbers the receipt/invoice (RRR-2027-NN-D/F).
 *
 * After payment: Stripe redirects to /redrock/?paid=deposit or /redrock/?paid=full,
 * which opens a ticket view. The guest's name comes from their earlier personal link
 * (remembered in this browser); otherwise the ticket reads "Seat reserved".
 *
 * Complimentary seat: that guest's link carries a private code (see COMP_CODE in build.mjs).
 * The ticket is encrypted with that code, so it only exists for his link.
 * It shows his complimentary ticket and greys out the deposit / pay-in-full cards.
 *
 * Layout: the page is a book of spreads (see book() below). Turn with the side arrows,
 * the contents bar, the arrow keys, a swipe, or the scroll wheel. #reserve, #house etc.
 * open that spread directly.
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

  /* ---------- The book ----------
   * Each .spread in [data-book] is one opening. On wide screens a spread is one "leaf";
   * on phones each .page inside it is its own leaf (unless the spread has data-single).
   * Turning: side arrows, the contents bar, ← → / PageUp / PageDown / Home / End,
   * a horizontal swipe, or the scroll wheel once a page has been read to its end.
   */
  var bookReady = false;
  function book() {
    var root = document.querySelector('[data-book]');
    if (!root || bookReady) return;
    bookReady = true;

    var html = document.documentElement;
    var spreads = Array.prototype.slice.call(root.querySelectorAll('.spread'));
    var narrow = window.matchMedia('(max-width: 899px)');
    var still = window.matchMedia('(prefers-reduced-motion: reduce)');
    var bar = document.querySelector('.book-bar');
    var contents = document.querySelector('[data-contents]');
    var menuBtn = document.querySelector('[data-contents-toggle]');
    var barTitle = document.querySelector('[data-bar-title]');
    var barCount = document.querySelector('[data-bar-count]');
    var hint = document.querySelector('[data-book-hint]');
    var prevBtns = document.querySelectorAll('[data-turn="prev"]');
    var nextBtns = document.querySelectorAll('[data-turn="next"]');
    var TURN_MS = 840;

    var leaves = [];      // [{ el, spread }]
    var current = 0;
    var busy = false;

    function pagesOf(spread) {
      return Array.prototype.filter.call(spread.children, function (c) { return c.classList.contains('page'); });
    }

    function layout() {
      leaves = [];
      spreads.forEach(function (s) {
        var pages = pagesOf(s);
        if (narrow.matches && !s.hasAttribute('data-single') && pages.length > 1) {
          pages.forEach(function (p) { leaves.push({ el: p, spread: s }); });
        } else {
          leaves.push({ el: s, spread: s });
        }
      });
      leaves.forEach(function (l) { l.el.setAttribute('data-leaf', ''); l.el.setAttribute('tabindex', '-1'); });
    }

    function indexOfSpread(spread) {
      for (var i = 0; i < leaves.length; i++) if (leaves[i].spread === spread) return i;
      return 0;
    }
    function indexOfElement(el) {
      for (var i = 0; i < leaves.length; i++) if (leaves[i].el === el || leaves[i].el.contains(el)) return i;
      // A page inside a spread that is now one leaf (or the reverse)
      var spread = el.closest ? el.closest('.spread') : null;
      return spread ? indexOfSpread(spread) : 0;
    }

    // Contents bar
    var tabs = spreads.map(function (s, i) {
      var li = document.createElement('li');
      var b = document.createElement('button');
      b.type = 'button';
      var no = s.getAttribute('data-no');
      b.innerHTML = (no ? '<span class="bar-no">' + no + '</span>' : '') + s.getAttribute('data-title');
      b.addEventListener('click', function () { closeMenu(); go(indexOfSpread(s)); });
      li.appendChild(b);
      contents.appendChild(li);
      return b;
    });

    function closeMenu() {
      bar.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
    menuBtn.addEventListener('click', function () {
      var open = !bar.classList.contains('is-open');
      bar.classList.toggle('is-open', open);
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) {
      if (bar.classList.contains('is-open') && !bar.contains(e.target)) closeMenu();
    });

    function clearStates(el) {
      el.classList.remove('is-current', 'is-turning-out', 'is-turning-in', 'is-under', 'is-under-out', 'is-arriving');
    }

    function render() {
      spreads.forEach(function (s) { clearStates(s); pagesOf(s).forEach(clearStates); });
      var leaf = leaves[current];
      leaf.el.classList.add('is-current');
      var si = spreads.indexOf(leaf.spread);
      tabs.forEach(function (t, i) {
        if (i === si) t.setAttribute('aria-current', 'page'); else t.removeAttribute('aria-current');
      });
      barTitle.textContent = leaf.spread.getAttribute('data-title');
      barCount.textContent = (current + 1) + ' / ' + leaves.length;
      bar.style.setProperty('--progress', (leaves.length > 1 ? current / (leaves.length - 1) * 100 : 100) + '%');
      prevBtns.forEach(function (b) { if (b.closest('.cover-body')) return; b.disabled = current === 0; });
      nextBtns.forEach(function (b) { if (b.closest('.cover-body')) return; b.disabled = current === leaves.length - 1; });
      // Keep the address pointing at the open spread (keeps ?to= etc.)
      var id = leaf.spread.id;
      var hash = id && id !== 'top' ? '#' + id : '';
      if (window.location.hash !== hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search + hash);
      }
    }

    function resetScroll(el) {
      el.scrollTop = 0;
      el.querySelectorAll('.page').forEach(function (p) { p.scrollTop = 0; });
    }

    function go(i, opts) {
      opts = opts || {};
      if (i < 0 || i >= leaves.length || i === current || busy) return;
      var from = leaves[current].el;
      var to = leaves[i].el;
      var forward = i > current;
      hideHint();
      resetScroll(to);

      if (opts.instant) {
        current = i;
        render();
        return;
      }

      busy = true;
      if (forward) {
        from.classList.add('is-turning-out');
        to.classList.add('is-current', 'is-under');
      } else {
        to.classList.add('is-current', 'is-turning-in');
        from.classList.add('is-under-out');
      }
      to.classList.add('is-arriving');
      var done = false;
      function finish() {
        if (done) return;
        done = true;
        current = i;
        render();
        to.classList.add('is-arriving');
        setTimeout(function () { to.classList.remove('is-arriving'); }, 900);
        busy = false;
        if (opts.focus !== false) to.focus({ preventScroll: true });
      }
      setTimeout(finish, still.matches ? 320 : TURN_MS);
    }
    function next() { go(current + 1); }
    function prev() { go(current - 1); }

    prevBtns.forEach(function (b) { b.addEventListener('click', prev); });
    nextBtns.forEach(function (b) { b.addEventListener('click', next); });

    // In-page links (#reserve, #house…) open their spread
    function goToHash(hash, instant) {
      if (!hash || hash === '#') return false;
      var target = null;
      try { target = document.querySelector(hash); } catch (e) { return false; }
      if (!target || !root.contains(target)) return false;
      go(indexOfElement(target), { instant: instant });
      return true;
    }
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      if (goToHash(a.getAttribute('href'))) { e.preventDefault(); closeMenu(); }
    });

    function overlayOpen() {
      return html.classList.contains('ticket-open') || html.classList.contains('photos-open') || !!document.getElementById('lock');
    }

    // Keyboard
    document.addEventListener('keydown', function (e) {
      if (overlayOpen() || e.altKey || e.ctrlKey || e.metaKey) return;
      var t = e.target;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      if (e.key === 'Escape') { closeMenu(); return; }
      var k = e.key;
      if (k === 'ArrowRight' || k === 'PageDown') { e.preventDefault(); next(); }
      else if (k === 'ArrowLeft' || k === 'PageUp') { e.preventDefault(); prev(); }
      else if (k === 'Home') { e.preventDefault(); go(0); }
      else if (k === 'End') { e.preventDefault(); go(leaves.length - 1); }
    });

    // Swipe (touch)
    var tx = 0, ty = 0, tt = 0, tracking = false;
    root.addEventListener('touchstart', function (e) {
      if (e.touches.length !== 1) { tracking = false; return; }
      tracking = true;
      tx = e.touches[0].clientX; ty = e.touches[0].clientY; tt = Date.now();
    }, { passive: true });
    root.addEventListener('touchend', function (e) {
      if (!tracking || overlayOpen()) return;
      tracking = false;
      var dx = e.changedTouches[0].clientX - tx;
      var dy = e.changedTouches[0].clientY - ty;
      if (Date.now() - tt > 900) return;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) {
        if (dx < 0) next(); else prev();
      }
    }, { passive: true });

    // Scroll wheel / trackpad: read the page first, then a further push turns it.
    // A quiet gap is required between turns so trackpad momentum can't flip twice.
    var acc = 0, accTimer = null, lockUntil = 0;
    function scrollerFor(node, leafEl) {
      while (node && node !== leafEl.parentNode) {
        if (node.nodeType === 1 && node.scrollHeight > node.clientHeight + 2) {
          var oy = getComputedStyle(node).overflowY;
          if (oy === 'auto' || oy === 'scroll') return node;
        }
        if (node === leafEl) break;
        node = node.parentNode;
      }
      return null;
    }
    root.addEventListener('wheel', function (e) {
      if (overlayOpen()) return;
      var now = Date.now();
      if (busy || now < lockUntil) { lockUntil = Math.max(lockUntil, now + 220); return; }
      var horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      var d = horizontal ? e.deltaX : e.deltaY;
      if (!d) return;
      if (!horizontal) {
        var sc = scrollerFor(e.target, leaves[current].el);
        if (sc) {
          var atTop = sc.scrollTop <= 1;
          var atEnd = sc.scrollTop + sc.clientHeight >= sc.scrollHeight - 2;
          if ((d > 0 && !atEnd) || (d < 0 && !atTop)) { acc = 0; return; }
        }
      }
      acc += d;
      clearTimeout(accTimer);
      accTimer = setTimeout(function () { acc = 0; }, 260);
      if (Math.abs(acc) > 90) {
        var dir = acc > 0 ? 1 : -1;
        acc = 0;
        lockUntil = now + 900;
        go(current + dir);
      }
    }, { passive: true });

    // Hint on the cover for first-time readers
    var hintTimer = null;
    function hideHint() { if (hint) hint.classList.remove('is-shown'); clearTimeout(hintTimer); }
    function showHint() {
      if (!hint || current !== 0) return;
      var touch = window.matchMedia('(hover: none)').matches;
      hint.innerHTML = touch
        ? 'Swipe to turn the page'
        : 'Turn the page with <kbd>←</kbd> <kbd>→</kbd>, the arrows, or a scroll';
      setTimeout(function () { if (current === 0 && !overlayOpen()) hint.classList.add('is-shown'); }, 1600);
      hintTimer = setTimeout(hideHint, 9000);
    }

    // Switching between phone and desktop layouts keeps your place
    function relayout() {
      var el = leaves[current] ? leaves[current].el : spreads[0];
      layout();
      current = indexOfElement(el);
      render();
    }
    if (narrow.addEventListener) narrow.addEventListener('change', relayout);
    else if (narrow.addListener) narrow.addListener(relayout);

    window.addEventListener('hashchange', function () { goToHash(window.location.hash); });

    var startHash = window.location.hash;   // read before render() rewrites the address
    layout();
    render();
    goToHash(startHash, true);
    if (!document.getElementById('lock')) showHint();
    else {
      // Published page: show the hint once the lock screen has gone
      var waitLock = setInterval(function () {
        if (!document.getElementById('lock')) { clearInterval(waitLock); showHint(); }
      }, 400);
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
    book();
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
        protectImages();
        applyComp();
      }, function () { /* not the comp code: show the normal page */ });
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
    } else {
      // No personal link: tell visitors who weren't invited how to enquire.
      document.querySelectorAll('[data-lock-inquire]').forEach(function (el) { el.hidden = false; });
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
