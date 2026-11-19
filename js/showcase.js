/*
 * Collezione pubblica ("vetrina").
 *
 * - Il proprietario, dal Menu, clicca "Pubblica la mia collezione": lo stato
 *   salvato nel suo browser viene scritto in `public-collection.json` nel
 *   repository GitHub tramite l'API (serve un token personale, salvato solo
 *   nel suo browser). Il sito si ri-pubblica da solo dopo il commit.
 * - Chiunque visiti il sito può cliccare "Collezione di Fabio" (oppure aprire
 *   `?vetrina`) e vedere quella collezione in sola lettura. I dati locali del
 *   visitatore non vengono mai toccati.
 */
(function () {
  const CONFIG = {
    displayName: 'Fabio',
    githubOwner: 'fabio-secchiari',
    githubRepo: 'monster-collector',
    branch: 'main',            // branch da cui viene pubblicato il sito
    path: 'public-collection.json'
  };
  const TOKEN_KEY = 'monster_publish_token';

  // ---------- Traduzioni ----------
  Object.assign(TRANSLATIONS.it, {
    btn_showcase: `🏆 Collezione di ${CONFIG.displayName}`,
    btn_showcase_back: '↩️ La mia collezione',
    showcase_banner: `👀 Stai guardando la collezione di ${CONFIG.displayName}`,
    showcase_updated: 'aggiornata il',
    showcase_loading: '⏳ Caricamento collezione…',
    showcase_missing: '😕 La collezione pubblica non è ancora disponibile',
    showcase_readonly: '👀 Vetrina in sola lettura',
    menu_public: '🌍 Collezione pubblica',
    menu_publish: '🌍 Pubblica la mia collezione',
    menu_forget_token: '🔑 Dimentica token',
    publish_title: '🌍 Pubblica collezione',
    publish_desc: 'Serve un token GitHub (fine-grained) con permesso "Contents: Read and write" solo sul repository del sito. Viene salvato unicamente in questo browser.',
    publish_create_token: 'Crea un token su GitHub',
    publish_placeholder: 'github_pat_…',
    publish_save: '🌍 Salva e pubblica',
    publish_cancel: 'Annulla',
    publish_working: '⏳ Pubblicazione in corso…',
    publish_ok: '✅ Pubblicata! Online tra 1-2 minuti',
    publish_auth_error: '❌ Token non valido o senza permessi: inseriscilo di nuovo',
    publish_error: '❌ Pubblicazione non riuscita',
    token_forgotten: '🔑 Token rimosso da questo browser'
  });
  Object.assign(TRANSLATIONS.en, {
    btn_showcase: `🏆 ${CONFIG.displayName}'s collection`,
    btn_showcase_back: '↩️ My collection',
    showcase_banner: `👀 You are viewing ${CONFIG.displayName}'s collection`,
    showcase_updated: 'updated on',
    showcase_loading: '⏳ Loading collection…',
    showcase_missing: '😕 The public collection is not available yet',
    showcase_readonly: '👀 Read-only showcase',
    menu_public: '🌍 Public collection',
    menu_publish: '🌍 Publish my collection',
    menu_forget_token: '🔑 Forget token',
    publish_title: '🌍 Publish collection',
    publish_desc: 'A fine-grained GitHub token with "Contents: Read and write" permission on the site repository only is required. It is stored in this browser only.',
    publish_create_token: 'Create a token on GitHub',
    publish_placeholder: 'github_pat_…',
    publish_save: '🌍 Save and publish',
    publish_cancel: 'Cancel',
    publish_working: '⏳ Publishing…',
    publish_ok: '✅ Published! Online in 1-2 minutes',
    publish_auth_error: '❌ Invalid token or missing permissions: enter it again',
    publish_error: '❌ Publishing failed',
    token_forgotten: '🔑 Token removed from this browser'
  });

  // ---------- Stili ----------
  const style = document.createElement('style');
  style.textContent = `
    #showcase-banner {
      position: sticky; top: 0; z-index: 9000;
      display: flex; flex-wrap: wrap; gap: 6px 14px; align-items: center; justify-content: center;
      padding: 10px 16px; text-align: center;
      background: rgba(0, 255, 65, 0.12); border-bottom: 1.5px solid rgba(0, 255, 65, 0.45);
      backdrop-filter: blur(10px); color: #e6e6f0; font-weight: 700; font-size: 14px;
    }
    #showcase-banner .sc-date { color: #00ff41; font-weight: 600; }
    body.public-view #acquire-all,
    body.public-view #clear-all,
    body.public-view #edit-notes-btn { display: none !important; }
    body.public-view .rating-stars .star { cursor: default; }
    #publish-overlay {
      position: fixed; inset: 0; z-index: 10000; display: flex; align-items: center; justify-content: center;
      background: rgba(0, 0, 0, 0.7); padding: 16px;
    }
    #publish-overlay .box {
      width: 100%; max-width: 440px; background: #0b1220; color: #e6e6f0;
      border: 1.5px solid rgba(0, 255, 65, 0.35); border-radius: 16px; padding: 20px;
    }
    #publish-overlay h3 { margin: 0 0 8px; color: #00ff41; }
    #publish-overlay p { font-size: 14px; line-height: 1.45; opacity: .85; margin: 0 0 10px; }
    #publish-overlay a { color: #00ff41; }
    #publish-overlay input {
      width: 100%; box-sizing: border-box; margin: 10px 0 14px; padding: 10px 12px; border-radius: 10px;
      border: 1px solid rgba(255,255,255,.2); background: rgba(255,255,255,.05); color: inherit; font-family: inherit;
    }
    #publish-overlay .actions { display: flex; gap: 8px; justify-content: flex-end; flex-wrap: wrap; }
  `;
  document.head.appendChild(style);

  // ---------- Utility ----------
  function rerender() {
    const idx = (typeof currentIndex === 'number' && CANS[currentIndex]) ? currentIndex : 0;
    selectIndex(idx, window.selectedVariant || null);
    renderSidebar();
    if (document.getElementById('grid-view').classList.contains('active')) buildGridView();
  }

  function formatDate(iso) {
    try {
      return new Date(iso).toLocaleString(currentLang === 'it' ? 'it-IT' : 'en-GB', {
        day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
      });
    } catch { return iso; }
  }

  function utf8ToBase64(str) {
    const bytes = new TextEncoder().encode(str);
    let bin = '';
    for (let i = 0; i < bytes.length; i += 0x8000) {
      bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    }
    return btoa(bin);
  }

  // ---------- Pulsante nell'header ----------
  const btn = document.getElementById('btn-showcase');
  if (btn) {
    if (IS_PUBLIC_VIEW) btn.dataset.i18n = 'btn_showcase_back';
    btn.textContent = t(btn.dataset.i18n);
    btn.addEventListener('click', () => {
      const url = new URL(location.href);
      if (IS_PUBLIC_VIEW) url.searchParams.delete('vetrina');
      else url.searchParams.set('vetrina', '');
      location.href = url.toString().replace('vetrina=', 'vetrina');
    });
  }

  // ---------- Modalità vetrina (visitatori) ----------
  let publishedAt = null;
  let bannerKey = 'showcase_loading';

  function renderBanner() {
    let banner = document.getElementById('showcase-banner');
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'showcase-banner';
      document.body.prepend(banner);
    }
    banner.textContent = '';
    const main = document.createElement('span');
    main.textContent = t(bannerKey);
    banner.appendChild(main);
    if (publishedAt && bannerKey === 'showcase_banner') {
      const date = document.createElement('span');
      date.className = 'sc-date';
      date.textContent = `${t('showcase_updated')} ${formatDate(publishedAt)}`;
      banner.appendChild(date);
    }
  }

  async function loadPublicCollection() {
    try {
      const res = await fetch(CONFIG.path, { cache: 'no-store' });
      if (!res.ok) throw new Error(res.status);
      const data = await res.json();
      state = normalizeState(data.collection || data);
      publishedAt = data.published_at || null;
      bannerKey = 'showcase_banner';
      rerender();
    } catch (err) {
      console.warn('Collezione pubblica non disponibile', err);
      bannerKey = 'showcase_missing';
    }
    renderBanner();
  }

  if (IS_PUBLIC_VIEW) {
    document.body.classList.add('public-view');
    renderBanner();

    // Blocca ogni modifica: in vetrina un click su una variante la mostra soltanto.
    const BLOCKED = [
      '#acquire-all', '#clear-all', '#edit-notes-btn', '#rating-stars .star',
      '.option[data-action="reset"]', '.option[data-action="import-json"]',
      '.option[data-action="import-catalog"]', '.option[data-action="publish"]'
    ].join(',');
    document.addEventListener('click', e => {
      const variantBtn = e.target.closest('#variants-grid .variant-btn');
      if (variantBtn) {
        e.stopImmediatePropagation();
        e.preventDefault();
        const label = variantBtn.querySelector('span:last-child');
        if (label) selectIndex(currentIndex, label.textContent);
        return;
      }
      if (e.target.closest(BLOCKED)) {
        e.stopImmediatePropagation();
        e.preventDefault();
        showToast(t('showcase_readonly'));
      }
    }, true);

    // Blocca la scorciatoia Spazio ("acquisisci tutte").
    document.addEventListener('keydown', e => {
      const tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select' || e.target.isContentEditable) return;
      if (e.key === ' ' || e.key === 'Space') {
        e.stopImmediatePropagation();
        e.preventDefault();
      }
    }, true);

    document.getElementById('btn-lang')?.addEventListener('click', () => {
      renderBanner();
      if (btn) btn.textContent = t(btn.dataset.i18n);
    });

    loadPublicCollection();
  }

  // ---------- Pubblicazione (proprietario) ----------
  function askToken() {
    return new Promise(resolve => {
      const overlay = document.createElement('div');
      overlay.id = 'publish-overlay';
      const tokenUrl = 'https://github.com/settings/personal-access-tokens/new';
      overlay.innerHTML = `
        <div class="box" role="dialog" aria-modal="true">
          <h3></h3>
          <p class="desc"></p>
          <p><a target="_blank" rel="noopener" href="${tokenUrl}"></a></p>
          <input type="password" autocomplete="off" spellcheck="false">
          <div class="actions">
            <button class="btn-adaptive ghost" data-act="cancel"></button>
            <button class="btn-adaptive" data-act="ok"></button>
          </div>
        </div>`;
      overlay.querySelector('h3').textContent = t('publish_title');
      overlay.querySelector('.desc').textContent = t('publish_desc');
      overlay.querySelector('a').textContent = t('publish_create_token');
      const input = overlay.querySelector('input');
      input.placeholder = t('publish_placeholder');
      overlay.querySelector('[data-act="cancel"]').textContent = t('publish_cancel');
      overlay.querySelector('[data-act="ok"]').textContent = t('publish_save');

      const close = value => { overlay.remove(); resolve(value); };
      overlay.addEventListener('click', e => {
        if (e.target === overlay || e.target.dataset.act === 'cancel') close(null);
        if (e.target.dataset.act === 'ok') close(input.value.trim() || null);
      });
      input.addEventListener('keydown', e => {
        e.stopPropagation();
        if (e.key === 'Enter') close(input.value.trim() || null);
        if (e.key === 'Escape') close(null);
      });
      document.body.appendChild(overlay);
      input.focus();
    });
  }

  let publishing = false;

  async function publish() {
    if (IS_PUBLIC_VIEW || publishing) return;
    let token = null;
    try { token = localStorage.getItem(TOKEN_KEY); } catch {}
    if (!token) {
      token = await askToken();
      if (!token) return;
    }

    publishing = true;
    showToast(t('publish_working'));
    const api = `https://api.github.com/repos/${CONFIG.githubOwner}/${CONFIG.githubRepo}/contents/${CONFIG.path}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    };

    try {
      // Serve lo "sha" del file esistente per poterlo sovrascrivere.
      let sha;
      const current = await fetch(`${api}?ref=${encodeURIComponent(CONFIG.branch)}`, { headers, cache: 'no-store' });
      if (current.status === 401 || current.status === 403) throw Object.assign(new Error('auth'), { auth: true });
      if (current.ok) sha = (await current.json()).sha;

      const payload = {
        version: 1,
        owner: CONFIG.displayName,
        published_at: new Date().toISOString(),
        collection: state
      };
      const res = await fetch(api, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          message: `Aggiorna collezione pubblica (${new Date().toLocaleDateString('it-IT')})`,
          content: utf8ToBase64(JSON.stringify(payload)),
          branch: CONFIG.branch,
          ...(sha ? { sha } : {})
        })
      });
      if (res.status === 401 || res.status === 403 || res.status === 404) {
        throw Object.assign(new Error('auth'), { auth: true });
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      try { localStorage.setItem(TOKEN_KEY, token); } catch {}
      showToast(t('publish_ok'));
    } catch (err) {
      console.error('Pubblicazione fallita', err);
      if (err.auth) {
        try { localStorage.removeItem(TOKEN_KEY); } catch {}
        showToast(t('publish_auth_error'));
      } else {
        showToast(t('publish_error'));
      }
    } finally {
      publishing = false;
    }
  }

  function forgetToken() {
    try { localStorage.removeItem(TOKEN_KEY); } catch {}
    showToast(t('token_forgotten'));
  }

  window.Showcase = { publish, forgetToken, config: CONFIG };
  applyTranslations();
  if (btn) btn.textContent = t(btn.dataset.i18n);
})();
