(function () {
  var pages = Array.prototype.slice.call(document.querySelectorAll('[data-page]'));
  var total = pages.length;
  var current = 0;
  var animating = false;
  var DURATION = 550;

  var btnPrev = document.getElementById('btnPrev');
  var btnNext = document.getElementById('btnNext');
  var tapPrev = document.getElementById('tapPrev');
  var tapNext = document.getElementById('tapNext');
  var pagerLabel = document.getElementById('pagerLabel');
  var pagerTrack = document.getElementById('pagerTrack');

  // Build dot indicator
  for (var i = 0; i < total; i++) {
    var dot = document.createElement('span');
    dot.className = 'pager__dot';
    pagerTrack.appendChild(dot);
  }
  var dots = pagerTrack.children;

  function showInitial() {
    pages[0].classList.add('is-showing', 'is-active');
    updateChrome();
  }

  function updateChrome() {
    pagerLabel.textContent = 'Page ' + (current + 1) + ' of ' + total;
    for (var i = 0; i < dots.length; i++) {
      dots[i].classList.toggle('is-current', i === current);
    }
    btnPrev.disabled = current === 0;
    btnNext.disabled = current === total - 1;
  }

  function goTo(index) {
    if (animating || index < 0 || index >= total || index === current) return;
    animating = true;

    var direction = index > current ? 'next' : 'prev';
    var outgoing = pages[current];
    var incoming = pages[index];

    incoming.classList.add('is-showing');
    incoming.classList.add(direction === 'next' ? 'enter-from-right' : 'enter-from-left');

    // force reflow so the enter class registers before we animate to active
    void incoming.offsetWidth;

    requestAnimationFrame(function () {
      outgoing.classList.remove('is-active');
      outgoing.classList.add(direction === 'next' ? 'exit-to-left' : 'exit-to-right');

      incoming.classList.remove('enter-from-right', 'enter-from-left');
      incoming.classList.add('is-active');
    });

    window.setTimeout(function () {
      outgoing.classList.remove('is-showing', 'exit-to-left', 'exit-to-right');
      current = index;
      updateChrome();
      animating = false;
    }, DURATION);
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  btnPrev.addEventListener('click', prev);
  btnNext.addEventListener('click', next);
  tapPrev.addEventListener('click', prev);
  tapNext.addEventListener('click', next);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === ' ') { next(); }
    else if (e.key === 'ArrowLeft') { prev(); }
  });

  // Touch swipe
  var touchStartX = null;
  var touchStartY = null;
  var stage = document.getElementById('stage');
  stage.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  stage.addEventListener('touchend', function (e) {
    if (touchStartX === null) return;
    var dx = e.changedTouches[0].clientX - touchStartX;
    var dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) { next(); } else { prev(); }
    }
    touchStartX = null;
    touchStartY = null;
  }, { passive: true });

  showInitial();
})();
