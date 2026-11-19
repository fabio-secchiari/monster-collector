let _loadingUI = false;

// ============================================================
//  DATABASE COMPLETO MONSTER ENERGY - TUTTE LE VARIANTI
// ============================================================

const CANS = window.MONSTER_CATALOG_DATA;
MonsterCatalog.set(CANS);

// ============================================================
//  INTERNAZIONALIZZAZIONE (i18n) — definizioni
// ============================================================
const LANG_KEY = 'monster_lang';
let currentLang = localStorage.getItem(LANG_KEY) ||
  (navigator.language && navigator.language.startsWith('it') ? 'it' : 'en');

const TRANSLATIONS = {
  it: {
    header_sub: 'La mia collezione',

    series_all: 'Tutte le serie',
    series_classic: 'Classic',
    series_ultra: 'Ultra',
    series_juice: 'Juice',
    series_java: 'Java (Caffè)',
    series_rehab: 'Rehab',
    series_reserve: 'Reserve',
    series_special: 'Special Edition',
    series_hydro: 'Hydro',
    series_muscle: 'Muscle',
    series_beast: 'Beast Unleashed',
    series_dragon: 'Dragon Tea',

    sort_default: 'Ordine predefinito',
    sort_name_asc: 'Nome A-Z',
    sort_name_desc: 'Nome Z-A',
    sort_comp_asc: 'Completamento ↑',
    sort_comp_desc: 'Completamento ↓',
    sort_rating_asc: 'Valutazione ↑',
    sort_rating_desc: 'Valutazione ↓',

    toggle_group: 'Raggruppa per serie',
    toggle_owned: 'Solo posseduti',
    toggle_limited: 'Limited Edition',

    btn_shelf: '📦 Scaffale',
    btn_locker: '📋 Locker',
    btn_menu: '⚙️ Menu',
    btn_stats: '📊 Statistiche',
    btn_effects_on: '🔊 Effetti',
    btn_effects_off: '🔇 Effetti',
    btn_list: '☰ Lista',

    search_ph: 'Cerca lattina o variante ...',

    label_series: 'Serie',
    label_variant: 'Variante visualizzata',
    label_rating: '⭐ Valutazione',
    label_notes: 'Note',
    label_desc: 'Descrizione',
    section_variants: 'Varianti',

    btn_edit: '✏️ Modifica',
    btn_save: '💾 Salva',
    btn_acquire: 'Acquisisci tutte',
    btn_clear: 'Cancella tutte',

    stat_title: '📊 Statistiche',
    stat_desc: 'La tua collezione di Monster Energy',
    stat_owned: 'Varianti possedute',
    stat_of_total: 'su {n} totali',
    stat_limited: 'Limited Edition',
    stat_complete: 'Completamento',

    menu_title: '📋 Menu',
    menu_desc: 'Gestisci la tua collezione di Monster',
    menu_backup: '💾 Backup e Ripristino',
    menu_export_json: '📤 Esporta JSON (Progressi)',
    menu_import_json: '📥 Importa JSON (Progressi)',
    menu_catalog: '📚 Gestione Catalogo',
    menu_export_cat: '📤 Esporta Catalogo (Lattine)',
    menu_import_cat: '📥 Importa Catalogo (Lattine)',
    menu_image: '🖼️ Esporta Immagine',
    menu_img_all: '🖼️ Tutta la collezione',
    menu_img_missing: '🖼️ Solo mancanti',
    menu_img_current: '🖼️ Lattina corrente',
    menu_actions: '⚠️ Azioni',
    menu_reset: '🗑️ Resetta tutto',
    menu_intro: '🎬 Rivedi Intro',

    confirm_title: 'Conferma',
    confirm_cancel: 'Annulla',
    confirm_ok: 'Conferma',
    confirm_clear: 'Cancellare tutte le varianti?',
    confirm_reset: 'Resettare TUTTA la collezione?',

    grid_none: 'Nessuna lattina trovata',
    grid_variants: 'varianti',

    sidebar_variants: 'varianti',
    footer_cans: 'Lattine',
    footer_variants: 'Varianti',
    footer_made_by: '👥 Creato da',

    toast_notes_saved: '✅ Note salvate!',
    toast_acquired_all: '✅ Tutte le varianti acquisite!',
    toast_cleared: '🗑️ Varianti cancellate',
    toast_shelf: '📦 Vista scaffale',
    toast_locker: '📋 Vista locker',
    toast_music_error: '❌ Impossibile riprodurre la musica',
    toast_reset: '🔄 Collezione resettata',
    toast_invalid_json: '❌ File JSON non valido',
    toast_json_error: '❌ Errore parsing JSON',
    toast_imported: '✅ Import completato',
    toast_catalog: '✅ Catalogo importato',
    toast_exported: '📤 JSON esportato',
    toast_img_exported: '🖼️ Immagine esportata',
    toast_img_gen: '📸 Generazione immagine...',
    toast_img_error: '❌ Errore esportazione',
    toast_all_owned: '✅ Tutte le varianti sono già possedute!',
    footer_disclaimer: 'Progetto amatoriale non ufficiale: non affiliato, approvato o sponsorizzato da Monster Energy Company. Monster e tutti i marchi correlati sono di proprietà dei rispettivi titolari.',
  },

  en: {
    header_sub: 'My collection',

    series_all: 'All series',
    series_classic: 'Classic',
    series_ultra: 'Ultra',
    series_juice: 'Juice',
    series_java: 'Java (Coffee)',
    series_rehab: 'Rehab',
    series_reserve: 'Reserve',
    series_special: 'Special Edition',
    series_hydro: 'Hydro',
    series_muscle: 'Muscle',
    series_beast: 'Beast Unleashed',
    series_dragon: 'Dragon Tea',

    sort_default: 'Default order',
    sort_name_asc: 'Name A-Z',
    sort_name_desc: 'Name Z-A',
    sort_comp_asc: 'Completion ↑',
    sort_comp_desc: 'Completion ↓',
    sort_rating_asc: 'Rating ↑',
    sort_rating_desc: 'Rating ↓',

    toggle_group: 'Group by series',
    toggle_owned: 'Owned only',
    toggle_limited: 'Limited Edition',

    btn_shelf: '📦 Shelf',
    btn_locker: '📋 Locker',
    btn_menu: '⚙️ Menu',
    btn_stats: '📊 Statistics',
    btn_effects_on: '🔊 Effects',
    btn_effects_off: '🔇 Effects',
    btn_list: '☰ List',

    search_ph: 'Search can or variant...',

    label_series: 'Series',
    label_variant: 'Displayed variant',
    label_rating: '⭐ Rating',
    label_notes: 'Notes',
    label_desc: 'Description',
    section_variants: 'Variants',

    btn_edit: '✏️ Edit',
    btn_save: '💾 Save',
    btn_acquire: 'Acquire all',
    btn_clear: 'Clear all',

    stat_title: '📊 Statistics',
    stat_desc: 'Your Monster Energy collection',
    stat_owned: 'Owned variants',
    stat_of_total: 'out of {n} total',
    stat_limited: 'Limited Edition',
    stat_complete: 'Completion',

    menu_title: '📋 Menu',
    menu_desc: 'Manage your Monster collection',
    menu_backup: '💾 Backup & Restore',
    menu_export_json: '📤 Export JSON (Progress)',
    menu_import_json: '📥 Import JSON (Progress)',
    menu_catalog: '📚 Catalog Management',
    menu_export_cat: '📤 Export Catalog (Cans)',
    menu_import_cat: '📥 Import Catalog (Cans)',
    menu_image: '🖼️ Export Image',
    menu_img_all: '🖼️ Full collection',
    menu_img_missing: '🖼️ Missing only',
    menu_img_current: '🖼️ Current can',
    menu_actions: '⚠️ Actions',
    menu_reset: '🗑️ Reset all',
    menu_intro: '🎬 Replay Intro',

    confirm_title: 'Confirm',
    confirm_cancel: 'Cancel',
    confirm_ok: 'Confirm',
    confirm_clear: 'Clear all variants?',
    confirm_reset: 'Reset the ENTIRE collection?',

    grid_none: 'No cans found',
    grid_variants: 'variants',

    sidebar_variants: 'variants',
    footer_cans: 'Cans',
    footer_variants: 'Variants',
    footer_made_by: '👥 Created by',

    toast_notes_saved: '✅ Notes saved!',
    toast_acquired_all: '✅ All variants acquired!',
    toast_cleared: '🗑️ Variants cleared',
    toast_shelf: '📦 Shelf view',
    toast_locker: '📋 Locker view',
    toast_music_error: '❌ Cannot play music',
    toast_reset: '🔄 Collection reset',
    toast_invalid_json: '❌ Invalid JSON file',
    toast_json_error: '❌ JSON parsing error',
    toast_imported: '✅ Import completed',
    toast_catalog: '✅ Catalog imported',
    toast_exported: '📤 JSON exported',
    toast_img_exported: '🖼️ Image exported',
    toast_img_gen: '📸 Generating image...',
    toast_img_error: '❌ Export error',
    toast_all_owned: '✅ All variants are already owned!',
    footer_disclaimer: 'Unofficial fan-made project: not affiliated with, endorsed by, or sponsored by Monster Energy Company. Monster and all related trademarks are property of their respective owners.',
  }
};

function t(key) {
  return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) || key;
}

// ============================================================
//  SFONDI PER CATEGORIA
// ============================================================

const CATEGORY_BG_MAP = {
  classic: 'assets/ui/bg-classic.png',
  ultra: 'assets/ui/bg-ultra.png',
  juice: 'assets/ui/bg-juice.png',
  java: 'assets/ui/bg-java.png',
  rehab: 'assets/ui/bg-rehab.png',
  reserve: 'assets/ui/bg-reserve.png',
  special: 'assets/ui/bg-special.png',
  hydro: 'assets/ui/bg-hydro.png',
  muscle: 'assets/ui/bg-muscle.png',
  beast: 'assets/ui/bg-beast.png',
  dragon: 'assets/ui/bg-dragon.png'
};

function updateCategoryBackground(category) {
  const art = document.getElementById('main-art');
  const bgImage = CATEGORY_BG_MAP[category] || 'assets/ui/bg-classic.jpg';
  art.style.backgroundImage = `url('${bgImage}')`;
  art.style.backgroundSize = 'cover';
  art.style.backgroundPosition = 'center';
}

// ============================================================
//  LOGHI PER CATEGORIA
// ============================================================

const CATEGORY_LOGO_MAP = {
  classic: 'assets/icons/logo-extended.png',
  ultra: 'assets/icons/logo-ultra.webp',
  juice: 'assets/icons/logo-juice.webp',
  java: 'assets/icons/logo-java.webp',
  rehab: 'assets/icons/logo-rehab.webp',
  reserve: 'assets/icons/logo-reserve.png',
  special: 'assets/icons/logo-special.png',
  hydro: 'assets/icons/logo-hydro.png',
  muscle: 'assets/icons/logo-muscle.png',
  beast: 'assets/icons/logo-beast.png',
  dragon: 'assets/icons/logo-dragon.png',
};

function updateCategoryLogo(category) {
  const logo = document.getElementById('site-logo');
  // Se category è null/undefined o non è mappata → logo base
  const logoPath = (category && CATEGORY_LOGO_MAP[category])
    ? CATEGORY_LOGO_MAP[category]
    : 'assets/icons/logo-extended.png';
  logo.src = logoPath;
  logo.onerror = () => {
    logo.src = 'assets/icons/logo-extended.png';
  };
}

// ============================================================
//  STORAGE E STATO
// ============================================================

const STORAGE_KEY = 'monster_tracker_v2';
const UI_STATE_KEY = 'monster_tracker_ui';

// Modalità "vetrina": ?vetrina nell'URL mostra la collezione pubblicata
// dal proprietario, in sola lettura, senza toccare i dati locali del visitatore.
const IS_PUBLIC_VIEW = new URLSearchParams(location.search).has('vetrina');

function defaultState() {
  const s = {};
  CANS.forEach(can => {
    s[can.id] = {
      variants: can.variants.reduce((a, v) => { 
        a[v] = { owned: false, rating: 0, notes: '' }; 
        return a; 
      }, {}),
      lastAcquiredVariant: null,
      lastUpdated: null
    };
  });
  return s;
}

function normalizeState(parsed) {
    if (!parsed || typeof parsed !== 'object') return defaultState();
    const base = defaultState();
    Object.keys(base).forEach(id => {
	  if (!parsed[id]) parsed[id] = { variants: {}, lastUpdated: null };
    if (!parsed[id].variants || typeof parsed[id].variants !== 'object') parsed[id].variants = {};
    if (typeof parsed[id].lastAcquiredVariant === 'undefined') {
      parsed[id].lastAcquiredVariant = null;
    }
	  const baseVariants = base[id].variants;
	  Object.keys(baseVariants).forEach(v => {
		if (!parsed[id].variants[v] || typeof parsed[id].variants[v] !== 'object') {
		  parsed[id].variants[v] = { owned: false, rating: 0, notes: '' };
		}
        // Assicura i campi
        if (typeof parsed[id].variants[v].owned !== 'boolean') parsed[id].variants[v].owned = false;
        if (typeof parsed[id].variants[v].rating !== 'number') parsed[id].variants[v].rating = 0;
        if (typeof parsed[id].variants[v].notes !== 'string') parsed[id].variants[v].notes = '';
      });
    });
    return parsed;
}

function loadState() {
  if (IS_PUBLIC_VIEW) return defaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    return normalizeState(JSON.parse(raw));
  } catch {
    return defaultState();
  }
}

function saveState(s) {
  if (IS_PUBLIC_VIEW) return; // la vetrina non scrive mai nel localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

let state = loadState();

// ===== MIGRAZIONE DATI VECCHI =====
function migrateOldState() {
  let changed = false;
  CANS.forEach(can => {
    const st = state[can.id];
    if (!st) return;
    // Se le varianti sono booleani invece di oggetti, convertile
    can.variants.forEach(variant => {
      if (typeof st.variants[variant] === 'boolean') {
        const oldValue = st.variants[variant];
        st.variants[variant] = { owned: oldValue, rating: 0, notes: '' };
        changed = true;
      }
      // Se e un oggetto ma manca owned, aggiungilo
      else if (typeof st.variants[variant] === 'object' && st.variants[variant] !== null) {
        if (typeof st.variants[variant].owned !== 'boolean') {
          st.variants[variant].owned = false;
          changed = true;
        }
        if (typeof st.variants[variant].rating !== 'number') {
          st.variants[variant].rating = 0;
          changed = true;
        }
        if (typeof st.variants[variant].notes !== 'string') {
          st.variants[variant].notes = '';
          changed = true;
        }
      }
    });
  });
  if (changed) {
    saveState(state);
    console.log(' Migrazione completata! I dati vecchi sono stati convertiti.');
  }
  return state;
}

// Esegui la migrazione
migrateOldState();

// ============================================================
//  UI HELPERS
// ============================================================

function showToast(msg) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; }, 1800);
  setTimeout(() => t.remove(), 2200);
}

function showConfirm(message) {
  return new Promise(resolve => {
    const backdrop = document.getElementById('confirm-backdrop');
    const msg = document.getElementById('confirm-message');
    const ok = document.getElementById('confirm-ok');
    const cancel = document.getElementById('confirm-cancel');
    msg.textContent = message;
    backdrop.style.display = 'flex';
    function cleanup(result) {
      backdrop.style.display = 'none';
      ok.removeEventListener('click', onOk);
      cancel.removeEventListener('click', onCancel);
      resolve(result);
    }
    function onOk() { cleanup(true); }
    function onCancel() { cleanup(false); }
    ok.addEventListener('click', onOk);
    cancel.addEventListener('click', onCancel);
  });
}

function getVariantCount(can) {
  const st = state[can.id];
  if (!st) return { owned: 0, total: can.variants.length };
  const owned = can.variants.filter(v => st.variants[v] && st.variants[v].owned).length;
  return { owned, total: can.variants.length };
}

function getLimitedCount() {
  return CANS.filter(c => c.limited).length;
}

function getOwnedLimited() {
  return CANS.filter(c => c.limited && state[c.id] && c.variants.some(v => state[c.id].variants[v]?.owned)).length;
}

function isVariantOwned(value) {
  return value === true || (value && value.owned === true);
}

// ============================================================
//  RENDER SIDEBAR
// ============================================================

function renderSidebar() {
  const list = document.getElementById('sidebar-list');
  list.innerHTML = '';

  const groupBySeries = document.getElementById('toggle-group-series').checked;
  let filtered = getSortedAndFilteredCans();

  const seriesLabels = {
    classic: t('series_classic'),
    ultra: t('series_ultra'),
    juice: t('series_juice'),
    java: t('series_java'),
    rehab: t('series_rehab'),
    reserve: t('series_reserve'),
    special: t('series_special'),
    hydro: t('series_hydro'),
    muscle: t('series_muscle'),
    beast: t('series_beast'),
    dragon: t('series_dragon')
  };

  if (groupBySeries) {
    const groups = {};
    filtered.forEach(can => {
      const key = can.series;
      if (!groups[key]) groups[key] = [];
      groups[key].push(can);
    });
    for (const [series, cans] of Object.entries(groups)) {
      const header = document.createElement('div');
      header.className = 'series-header';
      header.textContent = seriesLabels[series] || series;
      list.appendChild(header);
      cans.forEach(can => {
        const item = createCanItem(can);
        list.appendChild(item);
      });
    }
  } else {
    filtered.forEach(can => {
      const item = createCanItem(can);
      list.appendChild(item);
    });
  }

  // Aggiorna stats footer
  let totalOwned = 0, totalVariants = 0;
  filtered.forEach(can => {
    const { owned, total } = getVariantCount(can);
    totalOwned += owned;
    totalVariants += total;
  });
  document.getElementById('sidebar-count').textContent = `${totalOwned} / ${totalVariants}`;
  const limitedOwned = CANS.filter(c => c.limited && state[c.id] && c.variants.some(v => isVariantOwned(state[c.id].variants[v]))).length;
  document.getElementById('sidebar-limited').textContent = `⭐ ${limitedOwned}`;
  document.getElementById('footer-stats').textContent = `${t('footer_cans')}: ${filtered.length} · ${t('footer_variants')}: ${totalVariants}`;
  const footerLimitedEl = document.getElementById('footer-limited');
  if (footerLimitedEl) footerLimitedEl.textContent = `⭐ Limited: ${limitedOwned}`;
}

// ============================================================
//  CREATE CAN ITEM
// ============================================================

function createCanItem(can) {
  const idx = CANS.indexOf(can);
  const { owned, total } = getVariantCount(can);
  const item = document.createElement('div');
  item.className = 'can-item';

  item.setAttribute('data-series', can.series);

  if (idx === currentIndex) item.classList.add('active');

  const thumb = document.createElement('div');
  thumb.className = 'thumb';

 // Background SEMPRE, in base alla serie della lattina
  const seriesBg = CATEGORY_BG_MAP[can.series] || 'assets/ui/bg-classic.png';
  thumb.style.backgroundImage    = `url('${seriesBg}')`;
  thumb.style.backgroundSize     = 'cover';
  thumb.style.backgroundPosition = 'center';
  thumb.style.backgroundColor    = '#0a0a0f';

  const img = document.createElement('img');
  img.src = can.image || 'assets/monster/classic.png';
  img.onerror = function() { this.src = 'assets/monster/classic.png'; };
  thumb.appendChild(img);

  const info = document.createElement('div');
  info.className = 'info';
  const name = document.createElement('div');
  name.className = 'name';
  name.textContent = can.name;
  if (can.limited) {
    const badge = document.createElement('span');
    badge.className = 'badge-limited';
    badge.textContent = '⭐';
    name.appendChild(badge);
  }
  const sub = document.createElement('div');
  sub.className = 'sub';
  sub.textContent = `${can.variants.length} ${t('sidebar_variants')} · ${can.series}`;

  const prog = document.createElement('div');
  prog.className = 'progress';
  prog.textContent = `${owned}/${total}`;

  info.appendChild(name);
  info.appendChild(sub);
  item.appendChild(thumb);
  item.appendChild(info);
  item.appendChild(prog);

  item.addEventListener('click', () => {
    selectIndex(idx);
  });

  return item;
}

// ============================================================
//  SELECT INDEX
// ============================================================

let currentIndex = 0;

function selectIndex(idx, explicitVariant = null) {
  currentIndex = (idx + CANS.length) % CANS.length;
  const can = CANS[currentIndex];
  const st = state[can.id];

  let currentVariant;
  if (explicitVariant && can.variants.includes(explicitVariant)) {
    // Selezione esplicita dell'utente (dropdown / click per acquisire / ventaglio)
    currentVariant = explicitVariant;
  } else if (st.lastAcquiredVariant && st.variants[st.lastAcquiredVariant]?.owned) {
    // Variante acquisita per ultima → mostrala
    currentVariant = st.lastAcquiredVariant;
  } else {
    // Fallback: prima variante posseduta, altrimenti base
    const firstOwned = can.variants.find(v => st.variants[v]?.owned);
    currentVariant = firstOwned || can.variants[0];
  }
  window.selectedVariant = currentVariant;

  // Aggiorna sidebar
  document.querySelectorAll('.can-item').forEach(el => el.classList.remove('active'));
  const items = document.querySelectorAll('.can-item');
  if (items[currentIndex]) items[currentIndex].classList.add('active');

  // Nome
  document.getElementById('main-name').textContent = can.name;
  if (can.limited) {
    document.getElementById('main-limited').style.display = 'block';
  } else {
    document.getElementById('main-limited').style.display = 'none';
  }

  // Immagine - usa SEMPRE la variante selezionata con fallback
  const mainImg = document.getElementById('main-image');
  const variantToShow = currentVariant || can.variants[0];
  const variantImgPath = getVariantImageForCan(can, variantToShow);

  mainImg.onerror = function() {
  mainImg.onerror = null;
  if (can.image && can.image !== variantImgPath) {
      mainImg.onerror = function() {
        mainImg.src = 'assets/monster/classic.png';
      };
      mainImg.src = can.image;
   } else {
      mainImg.src = 'assets/monster/classic.png';
    }
  };
  mainImg.src = variantImgPath;
  
  // Progresso
  const { owned, total } = getVariantCount(can);
  const percent = total === 0 ? 0 : Math.round((owned / total) * 100);
  document.getElementById('main-percent').textContent = percent + '%';
  document.getElementById('main-fill').style.width = percent + '%';
  document.getElementById('main-count').textContent = `${owned} / ${total}`;

  // Serie
  const seriesLabels = {
    classic: 'Classic',
    ultra: 'Ultra',
    juice: 'Juice',
    java: 'Java (Caffe)',
    rehab: 'Rehab',
    reserve: 'Reserve',
    special: 'Special Edition',
    hydro: 'Hydro',
    muscle: 'Muscle',
    beast: 'Beast Unleashed',
    dragon: 'Dragon Tea'
  };
  document.getElementById('main-series-label').textContent = seriesLabels[can.series] || can.series;
	
  updateCategoryBackground(can.series);
  
  // Il logo segue sempre la serie della lattina corrente
  updateCategoryLogo(can.series);
  
  // Note
  const notesEl = document.getElementById('main-notes');

  // Usa la variante selezionata corrente (se non esiste, usa la prima)
  window.selectedVariant = currentVariant;
  const variantSelect = document.getElementById('selected-variant');
  variantSelect.innerHTML = can.variants.map(variant => `<option value="${variant.replace(/"/g, '&quot;')}">${variant}</option>`).join('');
  variantSelect.value = currentVariant;
  notesEl.textContent = st.variants[currentVariant]?.notes || '';
  notesEditing = false;
  notesEl.contentEditable = 'false';
  document.getElementById('edit-notes-btn').textContent = '✏️ Modifica';
  document.getElementById('edit-notes-btn').style.color = '';

   // Descrizione
   const descEl = document.getElementById('main-desc');
	descEl.textContent = can.description || '';

	// Valutazione
	updateRatingDisplay(currentVariant);
	
	// Varianti
	renderVariants(can);
  
  renderSidebar();
  saveUIState();
}

document.getElementById('filter-series').addEventListener('change', () => {
  renderSidebar();
  const filtered = getSortedAndFilteredCans();
  if (filtered.length > 0 && !filtered.some(c => c.id === CANS[currentIndex].id)) {
    selectIndex(CANS.indexOf(filtered[0]));
  }
  if (document.getElementById('grid-view').classList.contains('active')) {
    buildGridView();
  }
  // Logo
  const selectedSeries = document.getElementById('filter-series').value;
  if (selectedSeries !== 'all') {
    updateCategoryLogo(selectedSeries);
  } else {
    updateCategoryLogo(null);
  }
  saveUIState();
});

// ============================================================
//  RATING STARS
// ============================================================

function updateRatingDisplay(variant) {
  const can = CANS[currentIndex];
  const st = state[can.id];
  const rating = st.variants[variant]?.rating || 0;
  const stars = document.querySelectorAll('#rating-stars .star');
  stars.forEach((star, index) => {
    const value = index + 1;
    if (rating >= value) {
      star.textContent = '★';
      star.classList.add('active');
      star.classList.remove('half');
    } else if (rating >= value - 0.5) {
      star.textContent = '★';
      star.classList.add('half');
      star.classList.remove('active');
    } else {
      star.textContent = '☆';
      star.classList.remove('active', 'half');
    }
  });
  document.getElementById('rating-text').textContent = rating > 0 ? rating.toFixed(1) : '—';
}

function setRating(variant, value) {
  const can = CANS[currentIndex];
  const st = state[can.id];
  st.variants[variant] = st.variants[variant] || { owned: false, rating: 0, notes: '' };
  if (st.variants[variant].rating === value) {
    st.variants[variant].rating = 0;
  } else {
    st.variants[variant].rating = value;
  }
  saveState(state);
  updateRatingDisplay(variant);
  if (document.getElementById('grid-view').classList.contains('active')) buildGridView();
}

function getVariantImageForCan(can, variant) {
  // Prima controlla se ci sono immagini specifiche per le varianti nel catalogo
  if (can.variantImages && can.variantImages[variant]) {
    return can.variantImages[variant];
  }
  
  // Se la variante è "Zero Sugar" o "Nitro", usa l'immagine base (non ha immagine separata)
  const noSeparateImage = ['Zero Sugar', 'Nitro', 'Original', 'Classic'];
  if (noSeparateImage.includes(variant) && !can.hasVariantImage) {
    return can.image || 'assets/monster/classic.png';
  }
  
  // Se l'immagine base è già un percorso specifico (non classic.png), usala
  const baseImage = can.image || 'assets/monster/classic.png';
  if (baseImage !== 'assets/monster/classic.png' && !baseImage.includes('classic')) {
    return baseImage;
  }
  
  // Costruisci il percorso per la variante
  const basePath = baseImage.replace(/\.(png|webp|jpg|jpeg)$/, '');
  
  // Pulisci il nome della variante per usarlo come filename
  let suffix = variant.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^a-z0-9-]/g, '');
  
  // Mappa per varianti speciali
  const specialMap = {
    'call-of-duty': 'call-of-duty',
    'zero-sugar': 'zero-sugar',
    'ultra-white': 'ultra-white',
    'mango-loco': 'mango-loco',
    'vr46-zero-sugar': 'vr46-zero-sugar',
    'lando-norris-gold-edition': 'lando-gold',
    'original': 'classic',
    'classic': 'classic',
    'nitro': 'nitro'
  };
  suffix = specialMap[suffix] || suffix;
  
  // Estensione
  const ext = baseImage.includes('.webp') ? 'webp' : 'png';
  
  // Percorso finale
  const finalPath = `${basePath}-${suffix}.${ext}`;
  
  // Se il percorso è identico a quello base, usa direttamente l'immagine base
  if (finalPath === baseImage) {
    return baseImage;
  }
  
  return finalPath;
}

function preloadVariantImage(can, variant) {
  return new Promise((resolve) => {
    const img = new Image();
    const path = getVariantImageForCan(can, variant);
    img.onload = () => resolve(path);
    img.onerror = () => resolve(can.image || 'assets/monster/classic.png');
    img.src = path;
  });
}

document.querySelectorAll('#rating-stars .star').forEach(star => {
  star.addEventListener('click', () => {
    const val = parseFloat(star.dataset.value);
    const can = CANS[currentIndex];
    if (!can) return;
    const variant = window.selectedVariant || can.variants[0];
    setRating(variant, val);
    playClickSound();
  });

  star.addEventListener('mouseenter', () => {
    const val = parseFloat(star.dataset.value);
    const stars = document.querySelectorAll('#rating-stars .star');
    stars.forEach((s, i) => {
      if (i < val) {
        s.textContent = '★';
        s.style.color = '#ffd166';
      } else {
        s.textContent = '☆';
        s.style.color = '#444';
      }
    });
  });

  star.addEventListener('mouseleave', () => {
    const can = CANS[currentIndex];
    if (!can) return;
    const variant = window.selectedVariant || can.variants[0];
    updateRatingDisplay(variant);
  });
});

let notesEditing = false;

document.getElementById('edit-notes-btn').addEventListener('click', () => {
  const notes = document.getElementById('main-notes');
  notesEditing = !notesEditing;
  if (notesEditing) {
    notes.contentEditable = 'true';
    notes.focus();
    document.getElementById('edit-notes-btn').textContent = '💾 Salva';
    document.getElementById('edit-notes-btn').style.color = '#00ff41';
  } else {
    notes.contentEditable = 'false';
    const can = CANS[currentIndex];
    const variant = window.selectedVariant || can?.variants[0];
    if (can && variant) {
      state[can.id].variants[variant].notes = notes.textContent;
      saveState(state);
    }
    document.getElementById('edit-notes-btn').textContent = '✏️ Modifica';
    document.getElementById('edit-notes-btn').style.color = '';
    showToast(t('toast_notes_saved'));
  }
});

document.getElementById('main-notes').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && notesEditing) {
    e.preventDefault();
    document.getElementById('edit-notes-btn').click();
  }
});

document.getElementById('selected-variant').addEventListener('change', (e) => {
  selectIndex(currentIndex, e.target.value);
});

// ============================================================
//  RENDER VARIANTS (con HOVER per cambiare immagine)
// ============================================================

function renderVariants(can) {
  const grid = document.getElementById('variants-grid');
  grid.innerHTML = '';
  const st = state[can.id];
  const mainImg = document.getElementById('main-image');

  can.variants.forEach(variant => {
    // ORA VARIANTI SONO OGGETTI
    const variantData = st.variants[variant] || { owned: false, rating: 0, notes: '' };
    const owned = variantData.owned;

    const btn = document.createElement('button');
    btn.className = `variant-btn${owned ? ' owned' : ''}`;
    if (variant === window.selectedVariant) btn.classList.add('selected');
    if (can.limited && owned) btn.classList.add('limited');

    const dot = document.createElement('span');
    dot.className = 'dot';

    const label = document.createElement('span');
    label.textContent = variant;

    btn.appendChild(dot);
    btn.appendChild(label);

    // CLICK sul pulsante INTERO - toggle owned
    btn.addEventListener('click', (e) => {
      
      e.stopPropagation();
      e.preventDefault();

      const wasOwned = !!st.variants[variant]?.owned;
      const willBeOwned = !wasOwned;

      // 1) Aggiorna stato
      st.variants[variant] = {
        ...(st.variants[variant] || {}),
        owned: willBeOwned,
        rating: st.variants[variant]?.rating || 0,
        notes: st.variants[variant]?.notes || ''
      };

      // 2) Aggiorna lastAcquiredVariant
      if (willBeOwned) {
        st.lastAcquiredVariant = variant;
      } else if (st.lastAcquiredVariant === variant) {
        st.lastAcquiredVariant = null;
      }
      saveState(state);

      // 3) Feedback visivo immediato
      btn.classList.toggle('owned', willBeOwned);
      const dotEl = btn.querySelector('.dot');
      if (dotEl) dotEl.style.background = willBeOwned ? '#00ff41' : '';

      // 4) Barra progresso
      const vc = getVariantCount(can);
      const pct = vc.total === 0 ? 0 : Math.round((vc.owned / vc.total) * 100);
      document.getElementById('main-percent').textContent = pct + '%';
      document.getElementById('main-fill').style.width = pct + '%';
      document.getElementById('main-count').textContent = `${vc.owned} / ${vc.total}`;

      // 5) Suoni speciali
      if (musicPlaying && willBeOwned && can.id === 'monster_ultra_white') playSpecialSound('special-sound');
      if (musicPlaying && willBeOwned && can.id === 'monster_lo_carb') playSpecialSound('special-sound2');

      // 6) Render: se sto acquisendo mostra quella variante, altrimenti auto
      selectIndex(currentIndex, willBeOwned ? variant : null);
      renderSidebar();

      playClickSound();
    });

    // HOVER - cambia l'immagine al passaggio del mouse
	btn.addEventListener('mouseenter', () => {
      const variantImg = getVariantImageForCan(can, variant);
      mainImg.onerror = function() {
        mainImg.onerror = null;
        mainImg.src = can.image || 'assets/monster/classic.png';
      };
      mainImg.src = variantImg;
    });

    btn.addEventListener('mouseleave', () => {
      const currentVariant = window.selectedVariant || can.variants[0];
      const currentImg = getVariantImageForCan(can, currentVariant);
      mainImg.onerror = function() {
        mainImg.onerror = null;
        mainImg.src = can.image || 'assets/monster/classic.png';
      };
      mainImg.src = currentImg;
    });

    grid.appendChild(btn);
  });
}

// ============================================================
//  NAVIGATION
// ============================================================

document.getElementById('prev').addEventListener('click', () => {
  const filtered = getSortedAndFilteredCans();
  if (filtered.length === 0) return;
  const currentCan = CANS[currentIndex];
  const idx = filtered.findIndex(c => c.id === currentCan.id);
  if (idx > 0) {
    selectIndex(CANS.indexOf(filtered[idx - 1]));
  } else {
    selectIndex(CANS.indexOf(filtered[filtered.length - 1]));
  }
});

document.getElementById('next').addEventListener('click', () => {
  const filtered = getSortedAndFilteredCans();
  if (filtered.length === 0) return;
  const currentCan = CANS[currentIndex];
  const idx = filtered.findIndex(c => c.id === currentCan.id);
  if (idx < filtered.length - 1) {
    selectIndex(CANS.indexOf(filtered[idx + 1]));
  } else {
    selectIndex(CANS.indexOf(filtered[0]));
  }
});

function getSortedAndFilteredCans() {
  const search = document.getElementById('search-input').value.toLowerCase();
  const series = document.getElementById('filter-series').value;
  const onlyOwned = document.getElementById('toggle-owned').checked;
  const onlyLimited = document.getElementById('toggle-limited').checked;
  const sortOrder = document.getElementById('sort-order').value;

  let filtered = CANS.filter(can => {
  if (search) {
    const searchLower = search.toLowerCase();
    const nameMatch = can.name.toLowerCase().includes(searchLower);
    const idMatch = can.id.toLowerCase().includes(searchLower);
    const variantMatch = can.variants.some(v => v.toLowerCase().includes(searchLower));
    if (!nameMatch && !idMatch && !variantMatch) return false;
  }
  if (series !== 'all' && can.series !== series) return false;
  if (onlyOwned) {
    const st = state[can.id];
    if (!st || !can.variants.some(v => st.variants[v]?.owned)) return false;
  }
  if (onlyLimited && !can.limited) return false;
  return true;
  });

  // Ordinamento
  const sortFunctions = {
    'default': (a,b) => CANS.indexOf(a) - CANS.indexOf(b),
    'name-asc': (a,b) => a.name.localeCompare(b.name),
    'name-desc': (a,b) => b.name.localeCompare(a.name),
    'completion-asc': (a,b) => {
      const p1 = getVariantCount(a).owned / getVariantCount(a).total || 0;
      const p2 = getVariantCount(b).owned / getVariantCount(b).total || 0;
      return p1 - p2;
    },
    'completion-desc': (a,b) => {
      const p1 = getVariantCount(a).owned / getVariantCount(a).total || 0;
      const p2 = getVariantCount(b).owned / getVariantCount(b).total || 0;
      return p2 - p1;
    },
	  'rating-asc': (a,b) => {
	    const r1 = state[a.id]?.variants?.[a.variants[0]]?.rating || 0;
	    const r2 = state[b.id]?.variants?.[b.variants[0]]?.rating || 0;
	    return r1 - r2;
	  },
	  'rating-desc': (a,b) => {
	    const r1 = state[a.id]?.variants?.[a.variants[0]]?.rating || 0;
	    const r2 = state[b.id]?.variants?.[b.variants[0]]?.rating || 0;
	    return r2 - r1;
	  }
  };
  const sortFn = sortFunctions[sortOrder] || sortFunctions['default'];
  filtered.sort(sortFn);

  return filtered;
}

// ============================================================
//  FILTERS
// ============================================================

document.getElementById('search-input').addEventListener('input', () => {
  saveUIState();
  renderSidebar();
  const filtered = getSortedAndFilteredCans();
  if (filtered.length > 0) {
    const currentInFilter = filtered.some(c => c.id === CANS[currentIndex].id);
    if (!currentInFilter) {
      selectIndex(CANS.indexOf(filtered[0]));
    }
  }
  if (document.getElementById('grid-view').classList.contains('active')) {
    buildGridView();
  }
});

document.getElementById('filter-series').addEventListener('change', () => {
  renderSidebar();
  const filtered = getSortedAndFilteredCans();
  if (filtered.length > 0 && !filtered.some(c => c.id === CANS[currentIndex].id)) {
    selectIndex(CANS.indexOf(filtered[0]));
  }
  if (document.getElementById('grid-view').classList.contains('active')) {
    buildGridView();
  }
  saveUIState();
});

document.getElementById('toggle-owned').addEventListener('change', () => {
  renderSidebar();
  const filtered = getSortedAndFilteredCans();
  if (filtered.length > 0 && !filtered.some(c => c.id === CANS[currentIndex].id)) {
    selectIndex(CANS.indexOf(filtered[0]));
  }
  if (document.getElementById('grid-view').classList.contains('active')) {
    buildGridView();
  }
  saveUIState();
});

document.getElementById('toggle-limited').addEventListener('change', () => {
  renderSidebar();
  const filtered = getSortedAndFilteredCans();
  if (filtered.length > 0 && !filtered.some(c => c.id === CANS[currentIndex].id)) {
    selectIndex(CANS.indexOf(filtered[0]));
  }
  if (document.getElementById('grid-view').classList.contains('active')) {
    buildGridView();
  }
  saveUIState();
});

document.getElementById('sort-order').addEventListener('change', () => {
  renderSidebar();
  if (document.getElementById('grid-view').classList.contains('active')) {
    buildGridView();
  }
  saveUIState();
});
document.getElementById('toggle-group-series').addEventListener('change', () => {
  renderSidebar();
  if (document.getElementById('grid-view').classList.contains('active')) {
    buildGridView();
  }
  saveUIState();
});

// ============================================================
//  ACTIONS
// ============================================================

document.getElementById('acquire-all').addEventListener('click', () => {
  const can = CANS[currentIndex];
  const st = state[can.id];
  can.variants.forEach(v => {
    st.variants[v] = { ...(st.variants[v] || {}), owned: true, rating: st.variants[v]?.rating || 0, notes: st.variants[v]?.notes || '' };
  });
  st.lastAcquiredVariant = null;
  saveState(state);
  playClickSound();
  selectIndex(currentIndex);
  renderSidebar();
  if (document.getElementById('grid-view').classList.contains('active')) {
    buildGridView();
  }
  showToast(`${t('toast_acquired_all')} — ${can.name}`);
});

document.getElementById('clear-all').addEventListener('click', async () => {
  const can = CANS[currentIndex];
  const ok = await showConfirm(t('confirm_clear') + ' ' + can.name);
  if (!ok) return;
  const st = state[can.id];
  can.variants.forEach(v => {
    st.variants[v] = { ...(st.variants[v] || {}), owned: false, rating: st.variants[v]?.rating || 0, notes: st.variants[v]?.notes || '' };
  });
  st.lastAcquiredVariant = null;
  saveState(state);
  selectIndex(currentIndex);
  renderSidebar();
  if (document.getElementById('grid-view').classList.contains('active')) {
    buildGridView();
  }
  showToast(`${t('toast_cleared')} — ${can.name}`);
});

// ============================================================
//  SOUND & MUSIC
// ============================================================

function playClickSound() {
  if (!musicPlaying) return;
  const audio = document.getElementById('click-sound');
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

// Gestione musica
const musicAudio = document.getElementById('bg-music');
let musicPlaying = false;
const musicBtn = document.getElementById('btn-music');

musicBtn.addEventListener('click', () => {
  const gif = document.getElementById('music-gif');
  if (musicPlaying) {
    musicAudio.pause();
    musicPlaying = false;
    musicBtn.textContent = t('btn_effects_off');
    gif.style.opacity = '0';
    gif.style.display = 'none';
    document.getElementById('music-flame').pause();
  } else {
    musicAudio.play().then(() => {
      musicPlaying = true;
      musicBtn.textContent = t('btn_effects_on');
      gif.style.display = 'block';
      document.getElementById('music-flame').play().catch(() => {});
      // Forza il reflow per far partire la transizione
      gif.offsetHeight; // trigger reflow
      gif.style.opacity = '0.3';
    }).catch(() => {
      showToast(t('toast_music_error'));
    });
  }
});

// Tasto E per musica
document.addEventListener('keydown', (e) => {
  if (e.key === 'e' || e.key === 'E') {
    if (!isTypingInField()) {
      musicBtn.click();
      e.preventDefault();
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const searchClear = document.getElementById('search-clear');

  if (searchInput && searchClear) {
    searchInput.addEventListener('input', function() {
      if (searchInput.value.length > 0) {
        searchClear.classList.add('visible');
        searchClear.style.display = 'inline'; // forzato
      } else {
        searchClear.classList.remove('visible');
        searchClear.style.display = 'none';   // forzato
      }
    });

    searchClear.addEventListener('click', function() {
      searchInput.value = '';
      searchInput.dispatchEvent(new Event('input'));
      searchInput.focus();
      renderSidebar();
      if (document.getElementById('grid-view').classList.contains('active')) {
        buildGridView();
      }
      searchClear.classList.remove('visible');
      searchClear.style.display = 'none';
    });
  }
});

// ===== CHIUDI MODALE CLICCANDO FUORI =====
document.getElementById('modal-backdrop').addEventListener('click', function(e) {
  if (e.target === this) {
    this.style.display = 'none';
  }
});

document.getElementById('confirm-backdrop').addEventListener('click', function(e) {
  if (e.target === this) {
    this.style.display = 'none';
  }
});

// ============================================================
//  GRID VIEW / SCAFFALE
// ============================================================

let gridMode = false;

function syncGridSidebarHeight() {
  const grid = document.getElementById('grid-view');
  const sidebar = document.getElementById('sidebar');
  requestAnimationFrame(() => {
    sidebar.style.maxHeight = `${grid.offsetHeight}px`;
  });
}

// Applica lo stato alla UI (puro, non tocca la history)
function applyHistoryState(s) {
  if (!s) return;
  const wantGrid = s.view === 'grid';
  if (wantGrid !== gridMode) {
    gridMode = wantGrid;
    document.getElementById('locker-view').classList.toggle('is-hidden', gridMode);
    document.getElementById('grid-view').classList.toggle('active', gridMode);
    document.body.classList.toggle('grid-mode', gridMode);
    document.getElementById('btn-grid-toggle').textContent = gridMode ? t('btn_locker') : t('btn_shelf');
    if (gridMode) buildGridView();
    saveUIState();
  }
  if (wantGrid) {
    if (typeof s.scrollY === 'number') {
      requestAnimationFrame(() => window.scrollTo(0, s.scrollY));
    }
  } else {
    const idx = typeof s.currentIndex === 'number' ? s.currentIndex : currentIndex;
    const variant = s.selectedVariant || null;
    selectIndex(idx, variant);
  }
}

function pushNavState(view, extra = {}) {
  const s = {
    view: view,
    currentIndex: currentIndex,
    selectedVariant: window.selectedVariant || null,
    scrollY: view === 'grid' ? window.scrollY : 0,
    ...extra
  };
  history.pushState(s, '', '');
  applyHistoryState(s);
}

// UNICO click handler per il toggle
document.getElementById('btn-grid-toggle').addEventListener('click', () => {
  const newGrid = !gridMode;
  pushNavState(newGrid ? 'grid' : 'locker');
  showToast(newGrid ? t('toast_shelf') : t('toast_locker'));
});

// UNICO popstate handler
window.addEventListener('popstate', (e) => {
  if (e.state) applyHistoryState(e.state);
});

// Memorizza lo scroll in grid view
let _scrollSaveTimer = null;
window.addEventListener('scroll', () => {
  if (!gridMode) return;
  clearTimeout(_scrollSaveTimer);
  _scrollSaveTimer = setTimeout(() => {
    saveUIState();
  }, 200);
}, { passive: true });

function buildGridView() {
  const grid = document.getElementById('grid-view');
  grid.innerHTML = '';
  const filtered = getSortedAndFilteredCans();
  const groupBySeries = document.getElementById('toggle-group-series').checked;

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--muted);">${t('grid_none')}</div>`;
    grid.classList.add('active');
    syncGridSidebarHeight();
    return;
  }

  const seriesBgMap = {
    classic:'assets/ui/bg-classic.png', ultra:'assets/ui/bg-ultra.png',
    juice:'assets/ui/bg-juice.png', java:'assets/ui/bg-java.png',
    rehab:'assets/ui/bg-rehab.png', reserve:'assets/ui/bg-reserve.png',
    special:'assets/ui/bg-special.png', hydro:'assets/ui/bg-hydro.png',
    muscle:'assets/ui/bg-muscle.png', beast:'assets/ui/bg-beast.png',
    dragon:'assets/ui/bg-dragon.png'
  };
  const seriesLabels = {
    classic: t('series_classic'), ultra: t('series_ultra'),
    juice: t('series_juice'), java: t('series_java'),
    rehab: t('series_rehab'), reserve: t('series_reserve'),
    special: t('series_special'), hydro: t('series_hydro'),
    muscle: t('series_muscle'), beast: t('series_beast'),
    dragon: t('series_dragon')
  };

  function loadImg(imgEl, primary, fallback) {
    imgEl.loading = 'lazy';
    imgEl.decoding = 'async';
    imgEl.onerror = function() {
      imgEl.onerror = null;
      if (fallback && fallback !== primary) {
        imgEl.onerror = function() { imgEl.src = 'assets/monster/classic.png'; };
        imgEl.src = fallback;
      } else {
        imgEl.src = 'assets/monster/classic.png';
      }
    };
    imgEl.src = primary;
  }

  function renderCard(can) {
    const st = state[can.id] || { variants: {} };
    const { owned: ownedCount, total } = getVariantCount(can);
    const percent = total === 0 ? 0 : Math.round((ownedCount / total) * 100);

    const card = document.createElement('div');
    card.className = 'grid-card base';
    card.setAttribute('data-series', can.series);

    const imgDiv = document.createElement('div');
    imgDiv.className = 'grid-image';
    imgDiv.style.backgroundImage = `url('${seriesBgMap[can.series] || 'assets/ui/bg-classic.jpg'}')`;
    imgDiv.style.backgroundSize = 'cover';
    imgDiv.style.backgroundPosition = 'center';

    // Ventaglio (solo se >= 2 varianti)
    const baseVariant = can.variants[0];
    const fanVariants = can.variants.slice(1);

    const MAX_FAN = 4;
    const hasExtra = fanVariants.length > MAX_FAN;
    const visibleFan = hasExtra ? fanVariants.slice(0, MAX_FAN) : fanVariants;

    if (visibleFan.length >= 1) {
      const fan = document.createElement('div');
      fan.className = 'variants-fan';

      function fanOffset(i) {
        const sign = i % 2 === 0 ? 1 : -1;
        const mag = Math.floor(i / 2) + 1;
        return sign * mag;
      }

      visibleFan.forEach((variant, i) => {
        const item = document.createElement('div');
        item.className = 'fan-item';
        item.style.setProperty('--i', i);
        item.style.setProperty('--offset', fanOffset(i));

        const img = document.createElement('img');
        loadImg(img, getVariantImageForCan(can, variant), can.image || 'assets/monster/classic.png');
        item.appendChild(img);

        item.addEventListener('click', (e) => {
          e.stopPropagation();
          pushNavState('locker', {
            currentIndex: CANS.indexOf(can),
            selectedVariant: variant
          });
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        item.addEventListener('mouseenter', () => setCardInfo(variant, false));
        item.addEventListener('mouseleave', () => setCardInfo(can.variants[0], true));

        fan.appendChild(item);
      });
      imgDiv.appendChild(fan);

      // Badge "+N" se ci sono varianti nascoste
      if (hasExtra) {
        const badge = document.createElement('div');
        badge.className = 'fan-more-badge';
        badge.textContent = `+${fanVariants.length - MAX_FAN}`;
        badge.title = `${fanVariants.length} varianti totali`;
        imgDiv.appendChild(badge);
      }
    }

    // Lattina base (SOPRA il ventaglio)
    const baseImg = document.createElement('img');
    baseImg.className = 'base-can';
    loadImg(baseImg, can.image || 'assets/monster/classic.png', 'assets/monster/classic.png');
    imgDiv.appendChild(baseImg);

    // Testi
    const name = document.createElement('div');
    name.className = 'grid-name';
    name.textContent = can.name + (can.limited ? ' ⭐' : '');

    const sub = document.createElement('div');
    sub.className = 'grid-series';
    sub.textContent = `${can.variants.length} ${t('grid_variants')} · ${seriesLabels[can.series] || can.series}`;

    const prog = document.createElement('div');
    prog.className = 'grid-progress';
    const fill = document.createElement('div');
    fill.className = 'fill';
    fill.style.width = percent + '%';
    prog.appendChild(fill);

    const progText = document.createElement('div');
    progText.style.cssText = 'font-size:10px;color:var(--muted);margin-top:2px;';
    progText.textContent = `${ownedCount}/${total} · ${percent}%`;

    // Riga rating dinamica (stelline + pallino)
    const ratingRow = document.createElement('div');
    ratingRow.className = 'grid-rating-row';
    const starsSpan = document.createElement('span');
    starsSpan.className = 'grid-stars empty';
    const dotSpan = document.createElement('span');
    dotSpan.className = 'grid-owned-dot';
    ratingRow.appendChild(starsSpan);
    ratingRow.appendChild(dotSpan);

    // Funzione che aggiorna l'info della card
    function setCardInfo(variant, isBase) {
      const vData = (st.variants && st.variants[variant]) || { owned: false, rating: 0 };
      // Titolo
      if (isBase) name.textContent = can.name + (can.limited ? ' ⭐' : '');
      else name.textContent = variant;
      // Stelline
      const rating = vData.rating || 0;
      let s = '';
      for (let i = 1; i <= 5; i++) s += (i <= rating) ? '★' : '☆';
      starsSpan.textContent = s;
      starsSpan.classList.toggle('empty', rating === 0);
      // Pallino
      dotSpan.classList.toggle('owned', !!vData.owned);
    }

    // Stato iniziale: variante base
    setCardInfo(can.variants[0], true);

    // Aggiorna name (già creata prima) con la variante base
    name.textContent = can.name + (can.limited ? ' ⭐' : '');

    card.append(imgDiv, name, sub, prog, progText, ratingRow);

    const isTouch = window.matchMedia('(hover: none)').matches;

    card.addEventListener('click', (e) => {
      const isTouch = window.matchMedia('(hover: none)').matches;
      if (isTouch && can.variants.length >= 2 && !card.classList.contains('fan-open')) {
        e.stopPropagation();
        document.querySelectorAll('.grid-card.base.fan-open').forEach(c => c.classList.remove('fan-open'));
        card.classList.add('fan-open');
        return;
      }
      pushNavState('locker', {
        currentIndex: CANS.indexOf(can),
        selectedVariant: can.variants[0]
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    return card;
  }

  if (groupBySeries) {
    const groups = {};
    filtered.forEach(can => {
      (groups[can.series] = groups[can.series] || []).push(can);
    });
    for (const [series, cans] of Object.entries(groups)) {
      const h = document.createElement('div');
      h.className = 'series-header';
      h.style.cssText = 'grid-column:1/-1;font-size:14px;font-weight:800;color:#00ff41;text-transform:uppercase;letter-spacing:1px;padding:12px 0 6px 0;border-bottom:2px solid rgba(0,255,65,0.1);margin-top:12px;';
      h.textContent = seriesLabels[series] || series;
      grid.appendChild(h);
      cans.forEach(can => grid.appendChild(renderCard(can)));
    }
  } else {
    filtered.forEach(can => grid.appendChild(renderCard(can)));
  }

  grid.classList.add('active');
  syncGridSidebarHeight();
}

// ============================================================
//  STATS
// ============================================================

document.getElementById('btn-stats').addEventListener('click', () => {
  const modal = document.getElementById('modal-backdrop');
  const title = document.getElementById('modal-title');
  const desc = document.getElementById('modal-description');
  const content = document.getElementById('modal-content');

  title.textContent = t('stat_title');
  desc.textContent = t('stat_desc');

  let totalVariants = 0;
  let ownedVariants = 0;
  let limitedTotal = 0;
  let ownedLimited = 0;

  CANS.forEach(can => {
    const st = state[can.id];
    can.variants.forEach(v => {
      totalVariants++;
      if (st && isVariantOwned(st.variants[v])) ownedVariants++;
    });
    if (can.limited) {
      limitedTotal++;
      if (can.variants.some(v => st && isVariantOwned(st.variants[v]))) ownedLimited++;
    }
  });

  const percent = totalVariants === 0 ? 0 : Math.round((ownedVariants / totalVariants) * 100);

  content.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1.2fr 1fr;gap:16px;margin-top:12px;">
      <div class="stats-box stats-box-green" style="background:rgba(0,255,65,0.05);border-radius:12px;padding:16px;text-align:center;border:1px solid rgba(0,255,65,0.08);">
        <div style="font-size:32px;font-weight:900;color:#00ff41;">${ownedVariants}</div>
        <div style="color:var(--muted);font-size:13px;margin-top:4px;">${t('stat_owned')}</div>
        <div style="color:var(--muted);font-size:11px;">${t('stat_of_total').replace('{n}', totalVariants)}</div>
      </div>
      <div class="stats-box stats-box-gold" style="background:rgba(255,215,0,0.05);border-radius:12px;padding:16px;text-align:center;border:1px solid rgba(255,215,0,0.08);">
        <div style="font-size:26px;font-weight:900;color:var(--gold);white-space:nowrap;">${ownedLimited} / ${limitedTotal}</div>
        <div style="color:var(--muted);font-size:13px;margin-top:4px;">${t('stat_limited')}</div>
      </div>
      <div class="stats-box stats-box-green" style="background:rgba(0,255,65,0.05);border-radius:12px;padding:16px;text-align:center;border:1px solid rgba(0,255,65,0.08);">
        <div style="font-size:32px;font-weight:900;color:#00ff41;">${percent}%</div>
        <div style="color:var(--muted);font-size:13px;margin-top:4px;">${t('stat_complete')}</div>
      </div>
    </div>
  `;

  modal.style.display = 'flex';
  document.getElementById('modal-close').textContent = t('confirm_cancel');
  document.getElementById('modal-close').onclick = () => { modal.style.display = 'none'; };
});

// ============================================================
//  MENU / EXPORT
// ============================================================

document.getElementById('btn-menu').addEventListener('click', () => {
  const modal = document.getElementById('modal-backdrop');
  document.getElementById('modal-title').textContent = t('menu_title');
  document.getElementById('modal-description').textContent = t('menu_desc');
  document.getElementById('modal-content').innerHTML = `
	  <div style="margin-top:12px;font-weight:800;" data-i18n="menu_backup">💾 Backup e Ripristino</div>
	  <div class="row">
		<div class="option option-backup" data-action="export-json" data-i18n="menu_export_json">📤 Esporta JSON (Progressi)</div>
		<div class="option option-backup" data-action="import-json" data-i18n="menu_import_json">📥 Importa JSON (Progressi)</div>
	  </div>
	  <div style="margin-top:12px;font-weight:800;" data-i18n="menu_public">🌍 Collezione pubblica</div>
	  <div class="row">
		<div class="option option-backup" data-action="publish" data-i18n="menu_publish">🌍 Pubblica la mia collezione</div>
		<div class="option option-catalog" data-action="forget-token" data-i18n="menu_forget_token">🔑 Dimentica token</div>
	  </div>
	  <div style="margin-top:12px;font-weight:800;" data-i18n="menu_catalog">📚 Gestione Catalogo</div>
	  <div class="row">
		<div class="option option-catalog" data-action="export-catalog" data-i18n="menu_export_cat">📤 Esporta Catalogo (Lattine)</div>
		<div class="option option-catalog" data-action="import-catalog" data-i18n="menu_import_cat">📥 Importa Catalogo (Lattine)</div>
	  </div>
	  <div style="margin-top:12px;font-weight:800;" data-i18n="menu_image">🖼️ Esporta Immagine</div>
	  <div class="row">
		<div class="option option-image" data-action="all" data-i18n="menu_img_all">🖼️ Tutta la collezione</div>
		<div class="option option-image" data-action="missing" data-i18n="menu_img_missing">🖼️ Solo mancanti</div>
		<div class="option option-image" data-action="current" data-i18n="menu_img_current">🖼️ Lattina corrente</div>
	  </div>
	  <div style="margin-top:12px;font-weight:800;" data-i18n="menu_actions">⚠️ Azioni</div>
	  <div class="row">
		<div class="option option-danger" data-action="reset" data-i18n="menu_reset">🗑️ Resetta tutto</div>
		<div class="option option-catalog" data-action="replay-intro" data-i18n="menu_intro">🎬 Rivedi Intro</div>
	  </div>
  `;
  applyTranslations();
  modal.style.display = 'flex';

  document.querySelectorAll('.option').forEach(opt => {
    opt.onclick = async () => {
      const action = opt.dataset.action;
      if (action === 'export-json') exportJSON();
      else if (action === 'publish') { modal.style.display = 'none'; Showcase.publish(); }
      else if (action === 'forget-token') Showcase.forgetToken();
      else if (action === 'import-json') document.getElementById('file-import').click();
      else if (action === 'export-catalog') MonsterCatalog.download();
      else if (action === 'import-catalog') document.getElementById('catalog-file-import').click();
      else if (action === 'reset') {
        const ok = await showConfirm(t('confirm_reset'));
        if (ok) {
          state = defaultState();
          saveState(state);
          selectIndex(0);
          renderSidebar();
          if (document.getElementById('grid-view').classList.contains('active')) {
            buildGridView();
          }
          showToast(t('toast_reset'));
          modal.style.display = 'none';
        }
      } else if (action === 'all') exportCollectionImage();
	  else if (action === 'missing') exportCollectionImage(true);
      else if (action === 'current') exportCurrentImage();
    };
  });

  document.getElementById('modal-close').textContent = t('confirm_cancel');
  document.getElementById('modal-close').onclick = () => { modal.style.display = 'none'; };
});

function exportJSON() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'monster_collection.json';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
  showToast(t('toast_exported'));
}

document.getElementById('file-import').addEventListener('change', e => {
  const f = e.target.files[0];
  if (!f) return;
  const r = new FileReader();
  r.onload = ev => {
    try {
      const parsed = JSON.parse(ev.target.result);
      const base = defaultState();
      const keys = Object.keys(base);
      const parsedKeys = Object.keys(parsed);
      if (!parsedKeys.some(k => keys.includes(k))) {
        showToast(t('toast_invalid_json'));
        return;
      }
      saveState(parsed);
      state = loadState();
      selectIndex(0);
      renderSidebar();
      if (document.getElementById('grid-view').classList.contains('active')) {
        buildGridView();
      }
      showToast(t('toast_imported'));
    } catch {
      showToast(t('toast_json_error'));
    }
  };
  r.readAsText(f);
  e.target.value = '';
});

document.getElementById('catalog-file-import').addEventListener('change', async e => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const items = await MonsterCatalog.importFile(file);
    CANS.splice(0, CANS.length, ...items);
    MonsterCatalog.set(CANS);
    state = loadState();
    selectIndex(0);
    renderSidebar();
    showToast(t('toast_catalog'));
  } catch (error) {
    showToast(`❌ ${error.message}`);
  }
  e.target.value = '';
});

// ============================================================
//  EXPORT IMAGE
// ============================================================

async function exportCollectionImage(onlyMissing = false) {
  showToast(t('toast_img_gen'));
  const container = document.createElement('div');
  container.style.cssText = `
    padding: 24px;
    background: #0a0a0f;
    color: #e6e6f0;
    font-family: 'Inter', sans-serif;
    max-width: 1200px;
    margin: 0 auto;
  `;

  const title = document.createElement('div');
  title.style.cssText = 'font-size:28px;font-weight:900;color:#00ff41;text-align:center;margin-bottom:20px;';
  title.textContent = onlyMissing ? '🥤 Monster — Missing' : '🥤 Monster Collection';

  const grid = document.createElement('div');
  grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px;';

  const cansToExport = onlyMissing 
    ? CANS.filter(can => getVariantCount(can).owned < getVariantCount(can).total)
    : CANS;

  cansToExport.forEach(can => {
    const st = state[can.id];
    const owned = can.variants.filter(v => st && isVariantOwned(st.variants[v])).length;
    const total = can.variants.length;
    const percent = total === 0 ? 0 : Math.round((owned / total) * 100);
    const rating = st?.rating || 0;

    const card = document.createElement('div');
    card.style.cssText = `
      background: rgba(255,255,255,0.02);
      border-radius: 12px;
      padding: 16px;
      text-align: center;
      border: 1px solid rgba(255,255,255,0.04);
    `;

    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) starsHtml += '★';
      else if (i - 0.5 <= rating) starsHtml += '★';
      else starsHtml += '☆';
    }

    card.innerHTML = `
      <div style="height:80px;display:flex;align-items:center;justify-content:center;margin-bottom:4px;">
        <img src="${can.image || 'assets/monster/classic.png'}" style="max-height:100%;max-width:100%;object-fit:contain;" onerror="this.src='assets/monster/classic.png'">
      </div>
      <div style="font-weight:700;font-size:13px;">${can.name}${can.limited ? ' ⭐' : ''}</div>
      <div style="color:var(--muted);font-size:10px;">${can.series}</div>
      <div style="margin-top:6px;height:4px;background:rgba(255,255,255,0.04);border-radius:999px;overflow:hidden;">
        <div style="height:100%;width:${percent}%;background:#00ff41;border-radius:999px;"></div>
      </div>
      <div style="font-size:11px;color:var(--muted);margin-top:2px;">${owned}/${total}</div>
      <div style="font-size:12px;color:#ffd166;margin-top:2px;">${starsHtml}</div>
    `;
    grid.appendChild(card);
  });

  container.appendChild(title);
  container.appendChild(grid);
  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      backgroundColor: '#0a0a0f',
      useCORS: true
    });
    const link = document.createElement('a');
    link.download = onlyMissing ? 'monster_mancanti.png' : 'monster_collection.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast(t('toast_img_exported'));
  } catch (e) {
    showToast(t('toast_img_error'));
    console.error(e);
  }
  container.remove();
}

// ============================================================
//  SIDEBAR TOGGLE (mobile)
// ============================================================

document.getElementById('sidebar-toggle').addEventListener('click', () => {
  const sidebar = document.getElementById('sidebar');
  const isOpen = sidebar.classList.toggle('open');
  document.body.classList.toggle('sidebar-open', isOpen);
  document.getElementById('sidebar-toggle').textContent = isOpen ? '✕' : t('btn_list');
});

// Chiudi la sidebar quando si clicca una lattina (mobile)
document.getElementById('sidebar-list').addEventListener('click', () => {
  if (window.innerWidth <= 900) {
    document.getElementById('sidebar').classList.remove('open');
    document.body.classList.remove('sidebar-open');
    document.getElementById('sidebar-toggle').textContent = t('btn_list');
  }
});

// ============================================================
//  KEYBOARD SHORTCUTS
// ============================================================

// True se l'utente sta scrivendo (input, textarea, select o note contentEditable):
// in quel caso nessuna scorciatoia deve scattare.
function isTypingInField() {
  const el = document.activeElement;
  if (!el) return false;
  return ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName) || el.isContentEditable;
}

document.addEventListener('keydown', (e) => {
  if (isTypingInField()) {
    if (e.key === 'Escape') document.activeElement.blur();
    return;
  }

  if (e.key === 'ArrowLeft') {
    document.getElementById('prev').click();
    e.preventDefault();
  }
  if (e.key === 'ArrowRight') {
    document.getElementById('next').click();
    e.preventDefault();
  }
  
  if (e.key === 'ArrowUp') {
	  e.preventDefault();
	  const variantSelect = document.getElementById('selected-variant');
	  const options = variantSelect.options;
	  let idx = variantSelect.selectedIndex;
	  idx = (idx + 1) % options.length;
	  variantSelect.selectedIndex = idx;
	  variantSelect.dispatchEvent(new Event('change'));
  }
  
  if (e.key === 'ArrowDown') {
	  e.preventDefault();
	  const variantSelect = document.getElementById('selected-variant');
	  const options = variantSelect.options;
	  let idx = variantSelect.selectedIndex;
	  idx = (idx - 1 + options.length) % options.length;
	  variantSelect.selectedIndex = idx;
	  variantSelect.dispatchEvent(new Event('change'));
  }
	
  if (e.key === ' ' || e.key === 'Space') {
    e.preventDefault();
    const can = CANS[currentIndex];
    const st = state[can.id];
    const hasUnowned = can.variants.some(v => !isVariantOwned(st.variants[v]));
    if (hasUnowned) {
      can.variants.forEach(variant => {
        st.variants[variant] = {
          ...(st.variants[variant] || {}),
          owned: true,
          rating: st.variants[variant]?.rating || 0,
          notes: st.variants[variant]?.notes || ''
        };
      });
      saveState(state);
      playClickSound();
      selectIndex(currentIndex);
      renderSidebar();
      if (document.getElementById('grid-view').classList.contains('active')) {
        buildGridView();
      }
      showToast(`${t('toast_acquired_all')} — ${can.name}`);
    } else {
      showToast(t('toast_all_owned'));
    }
  }
  if (e.key === 'g' || e.key === 'G') {
    document.getElementById('btn-grid-toggle').click();
    e.preventDefault();
  }
  if (e.key === 's' || e.key === 'S') {
  if (!isTypingInField()) {
    document.getElementById('btn-stats').click();
    e.preventDefault();
   }
  }
  if (e.key === 'm' || e.key === 'M') {
	  if (!isTypingInField()) {
		document.getElementById('btn-menu').click();
		e.preventDefault();
	  }
  }
  if (e.key === 'c' || e.key == 'C') {
    if (!isTypingInField()) {
      e.preventDefault();
      const sidebar = document.getElementById('sidebar');
      // Su mobile apri la sidebar se chiusa
      if (window.innerWidth <= 900 && !sidebar.classList.contains('open')) {
        sidebar.classList.add('open');
        document.getElementById('sidebar-toggle').textContent = '';
      }
      const si = document.getElementById('search-input');
      si.focus();
      si.select();
    }
  }
  if (e.key === 'Escape') {
    const modal = document.getElementById('modal-backdrop');
    if (modal.style.display === 'flex') {
      modal.style.display = 'none';
      e.preventDefault();
      return;
    }
    // Se hai altri modali (es. conferma), chiudi anche quelli
    const confirmModal = document.getElementById('confirm-backdrop');
    if (confirmModal && confirmModal.style.display === 'flex') {
      confirmModal.style.display = 'none';
      e.preventDefault();
      return;
    }
  }
});

// ============================================================
//  INIT
// ============================================================

loadUIState();

// Se loadUIState() non ha impostato currentIndex (nessun dato salvato), seleziona il primo
if (typeof currentIndex === 'undefined' || currentIndex === 0 && !localStorage.getItem(UI_STATE_KEY)) {
  selectIndex(0);
}
renderSidebar();

setInterval(() => {
  renderSidebar();
}, 5000);

console.log(' Monster Energy Tracker loaded!');
console.log(` ${CANS.length} lattine totali`);

// ============================================================
//  FUNZIONI
// ============================================================

function getReleasedVariants(sp) {
  // Restituisce tutte le varianti (per ora tutte)
  return sp.variants;
}

function saveSelectedVariant(spriteId, variant) {
  localStorage.setItem('selected_variant_' + spriteId, variant);
}

function loadSelectedVariant(spriteId) {
  return localStorage.getItem('selected_variant_' + spriteId) || null;
}

function updateLevelControl(spriteId, variant) {
  // Se serve, puoi implementare la logica per il livello
  // Per ora, non fa nulla
}

// ===== SUONO SPECIALE CON PAUSA MUSICA =====
function playSpecialSound(audioId) {
  if (!musicPlaying) return;
  const specialAudio = document.getElementById(audioId);
  if (!specialAudio) return;

  // Metti in pausa l'ALTRO suono speciale se sta suonando
  document.querySelectorAll('audio[id^="special-sound"]').forEach(a => {
    if (a !== specialAudio && !a.paused) {
      a.pause();
      a.currentTime = 0;
    }
  });

  // Metti in pausa la musica di sottofondo
  if (musicPlaying) {
    musicAudio.pause();
    specialAudio.onended = function() {
      if (musicPlaying) musicAudio.play().catch(() => {});
      specialAudio.onended = null;
    };
  }

  specialAudio.currentTime = 0;
  specialAudio.play().catch(() => {});
}

function saveUIState() {
  if (_loadingUI || IS_PUBLIC_VIEW) return;
  const state = {
    series: document.getElementById('filter-series').value,
    sortOrder: document.getElementById('sort-order').value,
    owned: document.getElementById('toggle-owned').checked,
    limited: document.getElementById('toggle-limited').checked,
    groupSeries: document.getElementById('toggle-group-series').checked,
    gridMode: gridMode,
    currentIndex: currentIndex,
    selectedVariant: window.selectedVariant || null,
    scrollY: gridMode ? window.scrollY : 0,
    search: document.getElementById('search-input').value
  };
  localStorage.setItem(UI_STATE_KEY, JSON.stringify(state));
}

function loadUIState() {
  _loadingUI = true;
  const raw = localStorage.getItem(UI_STATE_KEY);
  if (raw) {
    try {
      const state = JSON.parse(raw);
      document.getElementById('filter-series').value = state.series || 'all';
      document.getElementById('sort-order').value = state.sortOrder || 'default';
      document.getElementById('toggle-owned').checked = state.owned || false;
      document.getElementById('toggle-limited').checked = state.limited || false;
      document.getElementById('toggle-group-series').checked = state.groupSeries || false;

      // 🔍 Ripristina la ricerca PRIMA di renderSidebar
      const searchInput = document.getElementById('search-input');
      const searchClear = document.getElementById('search-clear');
      if (searchInput) {
        searchInput.value = state.search || '';
        if (searchClear) {
          if (state.search) {
            searchClear.classList.add('visible');
            searchClear.style.display = 'inline';
          } else {
            searchClear.classList.remove('visible');
            searchClear.style.display = 'none';
          }
        }
      }

      gridMode = !!state.gridMode;
      document.getElementById('locker-view').classList.toggle('is-hidden', gridMode);
      document.getElementById('grid-view').classList.toggle('active', gridMode);
      document.body.classList.toggle('grid-mode', gridMode);
      document.getElementById('btn-grid-toggle').textContent = gridMode ? t('btn_locker') : t('btn_shelf');
      if (gridMode) buildGridView();

      if (gridMode && state.scrollY) {
        const targetY = state.scrollY;
        const restore = () => window.scrollTo(0, targetY);
        requestAnimationFrame(restore);
        setTimeout(restore, 250);
        setTimeout(restore, 800);
        setTimeout(restore, 1800);
      }

      if (state.currentIndex !== undefined && state.currentIndex < CANS.length) {
        currentIndex = state.currentIndex;
      }
      selectIndex(currentIndex);
    } catch (e) {
      console.warn('Errore caricamento UI state:', e);
      selectIndex(0);
    }
  } else {
    selectIndex(0, false);
  }

  history.replaceState({
    view: gridMode ? 'grid' : 'locker',
    currentIndex: currentIndex,
    selectedVariant: null,
    scrollY: 0
  }, '', '');

  _loadingUI = false;
}

// Su mobile: tocca fuori da una card per chiudere il ventaglio
document.addEventListener('click', (e) => {
  if (!e.target.closest('.grid-card.base')) {
    document.querySelectorAll('.grid-card.base.fan-open').forEach(c => c.classList.remove('fan-open'));
  }
});

// ============================================================
//  INTRO + EASTER EGG VIDEO
// ============================================================

const EASTER_EGG_KEY = 'monster_intro_seen';
const INTRO_VIDEO   = 'assets/videos/intro.mp4';
const EASTER_VIDEO  = 'assets/videos/edit.mp4';

// --- Player video ---
function playVideo(src) {
  const overlay = document.getElementById('easter-egg');
  const video   = document.getElementById('egg-video');
  if (!overlay || !video) return;
  overlay.style.display = 'flex';
  video.src = src;
  video.currentTime = 0;
  video.onended = () => closeVideo();
  video.play().catch(() => {});
}

function closeVideo() {
  const overlay = document.getElementById('easter-egg');
  const video   = document.getElementById('egg-video');
  if (!overlay || !video) return;
  video.pause();
  video.removeAttribute('src');
  video.load();
  overlay.style.display = 'none';
  localStorage.setItem(EASTER_EGG_KEY, '1');
}

document.getElementById('egg-close').addEventListener('click', closeVideo);

// ============================================================
//  EASTER EGG NASCOSTO
// ============================================================

// >>> OPZIONE A: scrivi "monster" sulla tastiera <<<
let typedBuffer = '';
document.addEventListener('keydown', (e) => {
  if (isTypingInField()) return;
  if (e.key.length !== 1) return;          // solo lettere singole
  typedBuffer = (typedBuffer + e.key.toLowerCase()).slice(-7);
  if (typedBuffer === 'monster') {
    typedBuffer = '';
    playVideo(INTRO_VIDEO);
  }
});

// >>> OPZIONE B: Konami Code (↑↑↓↓←→←→BA) <<<
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIdx = 0;
document.addEventListener('keydown', (e) => {
  if (isTypingInField()) return;
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  if (key === KONAMI[konamiIdx]) {
    konamiIdx++;
    if (konamiIdx === KONAMI.length) {
      konamiIdx = 0;
      playVideo(EASTER_VIDEO);
    }
  } else {
    // ricomincia (ma controlla se la key è l'inizio della sequenza)
    konamiIdx = (key === KONAMI[0]) ? 1 : 0;
  }
});

// >>> OPZIONE C: 5 click sul logo (portato da 3 a 5) <<<
let eggClicks = 0, eggTimer = null;
document.getElementById('site-logo').addEventListener('click', () => {
  eggClicks++;
  clearTimeout(eggTimer);
  eggTimer = setTimeout(() => eggClicks = 0, 1200);   // 1.2s invece di 0.8
  if (eggClicks >= 5) { eggClicks = 0; playVideo(EASTER_VIDEO); }
});

// --- Listener "Rivedi Intro" (resta, ma solo per l'intro) ---
document.addEventListener('click', (e) => {
  if (e.target.dataset && e.target.dataset.action === 'replay-intro') {
    document.getElementById('modal-backdrop').style.display = 'none';
    playVideo(INTRO_VIDEO);
  }
});

// Chiudi la sidebar mobile cliccando fuori (backdrop)
document.addEventListener('click', (e) => {
  if (window.innerWidth > 900) return;
  const sidebar = document.getElementById('sidebar');
  if (!sidebar.classList.contains('open')) return;
  if (e.target.closest('#sidebar-toggle')) return;
  if (sidebar.contains(e.target)) return;
  sidebar.classList.remove('open');
  document.body.classList.remove('sidebar-open');
  document.getElementById('sidebar-toggle').textContent = t('btn_list');
});

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });

  // Elementi dinamici (cambiano a seconda dello stato)
  const gridBtn = document.getElementById('btn-grid-toggle');
  if (gridBtn) gridBtn.textContent = gridMode ? t('btn_locker') : t('btn_shelf');

  const musicBtn = document.getElementById('btn-music');
  if (musicBtn) musicBtn.textContent = musicPlaying ? t('btn_effects_on') : t('btn_effects_off');

  const editBtn = document.getElementById('edit-notes-btn');
  if (editBtn && !notesEditing) editBtn.textContent = t('btn_edit');

  const langBtn = document.getElementById('btn-lang');
  if (langBtn) langBtn.textContent = currentLang === 'it' ? '🌐 EN' : '🌐 IT';

  // Footer "Creato da"
  const creatorsEl = document.getElementById('footer-creators');
  if (creatorsEl) {
    // preserva i link, cambia solo il testo iniziale
    const link1 = creatorsEl.querySelector('a[href*="fabio-secchiari"]');
    const link2 = creatorsEl.querySelector('a[href*="mrpaulgaming"]');
    if (link1 && link2) {
      creatorsEl.innerHTML = `${t('footer_made_by')} <strong>${link1.outerHTML}</strong> &amp; <strong>${link2.outerHTML}</strong>`;
    }
  }
  
  document.documentElement.lang = currentLang;
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);
  applyTranslations();
  // Ricostruisci le parti generate da JS
  renderSidebar();
  if (typeof currentIndex === 'number' && CANS[currentIndex]) {
    renderVariants(CANS[currentIndex]);
  }
  if (document.getElementById('grid-view').classList.contains('active')) {
    buildGridView();
  }
}

document.getElementById('btn-lang').addEventListener('click', () => {
  setLang(currentLang === 'it' ? 'en' : 'it');
});

// Applica all'avvio (dopo che tutto è pronto)
applyTranslations();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').catch(() => {});
}
