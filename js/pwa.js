(function initPwaPrompt() {
  const KEY = 'monster_pwa_prompt';
  let st = { lastShown: 0, dismissed: false };
  try { Object.assign(st, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch(e) {}
  if (st.dismissed) return;
  if (st.lastShown && (Date.now() - st.lastShown) / 86400000 < 7) return;

  const isStandalone = window.matchMedia('(display-mode: standalone)').matches
                    || window.navigator.standalone === true;
  if (isStandalone) return;

  let deferred = null;
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferred = e;
  });

  // Mostra dopo 3 minuti di uso attivo
  let activeMs = 0, lastTick = Date.now();
  const timer = setInterval(() => {
    if (document.hidden) { lastTick = Date.now(); return; }
    const now = Date.now();
    activeMs += now - lastTick;
    lastTick = now;
    if (activeMs >= 3 * 60 * 1000) {
      clearInterval(timer);
      show();
    }
  }, 1000);

  function show() {
    st.lastShown = Date.now();
    localStorage.setItem(KEY, JSON.stringify(st));

    const card = document.createElement('div');
    card.id = 'pwa-prompt';
    card.innerHTML = `
      <button class="close" aria-label="Chiudi">✕</button>
      <div class="title">📱 Installa Monster Tracker</div>
      <div class="text">Aggiungila alla home per usarla a schermo intero come un'app!</div>
      <div class="actions">
        <button class="btn" data-action="install">📱 Installa</button>
        <button class="btn btn-later" data-action="later">Più tardi</button>
      </div>
    `;
    document.body.appendChild(card);
    requestAnimationFrame(() => requestAnimationFrame(() => card.classList.add('show')));

    function dismiss(permanent) {
      if (permanent) { st.dismissed = true; localStorage.setItem(KEY, JSON.stringify(st)); }
      card.classList.remove('show');
      setTimeout(() => card.remove(), 500);
    }

    card.querySelector('.close').onclick = () => dismiss(true);
    card.querySelector('[data-action="later"]').onclick = () => dismiss(false);
    card.querySelector('[data-action="install"]').onclick = async () => {
      if (!deferred) { dismiss(true); return; }
      try {
        deferred.prompt();
        const { outcome } = await deferred.userChoice;
        deferred = null;
        if (outcome === 'accepted') st.dismissed = true;
      } catch(e) {}
      dismiss(true);
    };
  }
})();
