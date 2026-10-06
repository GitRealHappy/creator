/* Red Rock Reconvene
 *
 * Personalised links: add ?to=Full%20Name&no=4 to the address, e.g.
 *   https://www.thelivinginternet.com/redrock/?to=Craig%20Perry&no=4
 * The lock screen shows "Name: Craig", and once unlocked the page says
 * "Prepared for Craig Perry · Invitation No. IV of Ten" and the letter opens "Craig,".
 *
 * The published page is encrypted (see build.mjs). Typing the shared password
 * decrypts it in the browser. On this source copy (no vault) it simply opens.
 */

(function () {
  var ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  var STORE = 'rrr-pass';

  var params = new URLSearchParams(window.location.search);
  var NAME = (params.get('to') || '').trim().slice(0, 60);
  var FIRST = NAME ? NAME.split(/\s+/)[0] : '';
  var NO = parseInt(params.get('no'), 10);

  function personalise() {
    if (NAME) {
      document.querySelectorAll('[data-name]').forEach(function (el) { el.textContent = NAME; });
      document.querySelectorAll('[data-first]').forEach(function (el) { el.textContent = FIRST; });
      document.querySelectorAll('[data-prepared], [data-greeting]').forEach(function (el) { el.hidden = false; });
      document.title = 'For ' + NAME + ' · The Red Rock Reconvene';
    } else {
      document.title = 'The Red Rock Reconvene · Sedona, January 2027';
    }
    if (NAME && NO >= 1 && NO < ROMAN.length) {
      document.querySelectorAll('[data-no]').forEach(function (el) { el.textContent = ROMAN[NO]; });
      document.querySelectorAll('[data-no-wrap]').forEach(function (el) { el.hidden = false; });
    }
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

  function openPage(html) {
    var page = document.getElementById('page');
    var lock = document.getElementById('lock');
    page.innerHTML = html;
    page.hidden = false;
    lock.classList.add('is-leaving');
    setTimeout(function () { lock.remove(); }, 900);
    personalise();
    reveal();
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
      document.title = 'For ' + FIRST + ' · The Red Rock Reconvene';
    }

    var saved = null;
    try { saved = localStorage.getItem(STORE); } catch (e) {}
    if (saved) {
      decrypt(vault, saved).then(openPage, function () {
        try { localStorage.removeItem(STORE); } catch (e) {}
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var pass = input.value.trim().toLowerCase();
      if (!pass) return;
      btn.disabled = true;
      error.textContent = '';
      decrypt(vault, pass).then(function (html) {
        try { localStorage.setItem(STORE, pass); } catch (e) {}
        openPage(html);
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
      personalise();
      reveal();
    }
  });
})();
