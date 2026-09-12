/**
 * PORTAL DE ESTUDIOS BÍBLICOS - BIBLIA DE JERUSALÉN
 * Lógica Reactiva, Búsqueda, Filtrado Avanzado y Panel de Estudio Integrado (Sin Modales)
 */

import { BIBLE_BOOKS, BIBLE_STATS, CATEGORY_INFO } from './data/bibleData.js';

// Iconos por categoría
const CATEGORY_ICONS = {
  "Pentateuco": "📜",
  "Históricos": "🏛️",
  "Sapienciales": "🪶",
  "Proféticos": "🔥",
  "Evangelios": "📖",
  "Históricos del NT": "🧭",
  "Epístolas Paulinas": "✉️",
  "Epístolas Católicas": "🌐",
  "Apocalipsis": "☀️"
};

// Estado global de la aplicación
const state = {
  searchQuery: '',
  selectedTestament: 'all',
  selectedCategory: 'all',
  onlyDeuterocanonical: false,
  onlySynoptic: false,
  onlyMajorProphets: false,
  onlyMinorProphets: false,
  sortBy: 'canonical',
  currentStudyBook: null
};

// Referencias DOM
const elements = {
  booksGrid: document.getElementById('books-grid'),
  emptyState: document.getElementById('empty-state'),
  searchInput: document.getElementById('search-input'),
  searchClearBtn: document.getElementById('search-clear-btn'),
  resultsCount: document.getElementById('results-count'),
  sortSelect: document.getElementById('sort-select'),
  resetFiltersBtn: document.getElementById('reset-filters-btn'),
  categoryPills: document.getElementById('category-pills'),
  activeCategoryIndicator: document.getElementById('active-category-indicator'),
  testamentTabs: document.querySelectorAll('.testament-tabs .tab-btn'),
  themeToggleBtn: document.getElementById('theme-toggle-btn'),
  themeIconSun: document.getElementById('theme-icon-sun'),
  themeIconMoon: document.getElementById('theme-icon-moon'),

  // Banner explicativo de categoría
  categoryExplanationBanner: document.getElementById('category-explanation-banner'),
  catExpIcon: document.getElementById('cat-exp-icon'),
  catExpBadge: document.getElementById('cat-exp-badge'),
  catExpTitle: document.getElementById('cat-exp-title'),
  catExpEtymology: document.getElementById('cat-exp-etymology'),
  catExpDescription: document.getElementById('cat-exp-description'),
  catExpContext: document.getElementById('cat-exp-context'),
  catExpPointsList: document.getElementById('cat-exp-points-list'),
  catExpCloseBtn: document.getElementById('cat-exp-close-btn'),

  // Filtros especiales
  filterDeuterocanonical: document.getElementById('filter-deuterocanonical'),
  chipDeutWrapper: document.getElementById('chip-deut-wrapper'),
  filterSynoptic: document.getElementById('filter-synoptic'),
  chipSynWrapper: document.getElementById('chip-syn-wrapper'),
  filterMajorProphets: document.getElementById('filter-major-prophets'),
  chipMajorWrapper: document.getElementById('chip-major-wrapper'),
  filterMinorProphets: document.getElementById('filter-minor-prophets'),
  chipMinorWrapper: document.getElementById('chip-minor-wrapper'),

  // Panel de Estudio Integrado (Reemplaza al modal)
  bookStudyPanel: document.getElementById('book-study-panel'),
  studyCloseBtn: document.getElementById('study-panel-close-btn'),
  studyCloseBottomBtn: document.getElementById('study-close-bottom-btn'),
  studyCopyBtn: document.getElementById('study-copy-btn'),
  studyTabBtns: document.querySelectorAll('.study-tab-btn'),
  studyTabPanes: document.querySelectorAll('.study-tab-pane'),

  // Panel campos dinámicos
  studyBookAbbr: document.getElementById('study-book-abbr'),
  studyBookTitle: document.getElementById('study-book-title'),
  studyBookSubname: document.getElementById('study-book-subname'),
  studyPanelTags: document.getElementById('study-panel-tags'),
  studyTestament: document.getElementById('study-testament'),
  studyCategory: document.getElementById('study-category'),
  studySubcategory: document.getElementById('study-subcategory'),
  studyChapters: document.getElementById('study-chapters'),
  studyCanonStatus: document.getElementById('study-canon-status'),
  studyGenre: document.getElementById('study-genre'),
  studySummary: document.getElementById('study-summary'),
  studyThemesList: document.getElementById('study-themes-list'),
  studyAuthor: document.getElementById('study-author'),
  studyDate: document.getElementById('study-date'),
  studyLocation: document.getElementById('study-location'),
  studyAudience: document.getElementById('study-audience'),
  studyHistoricalNote: document.getElementById('study-historical-note'),
  studyQuoteReference: document.getElementById('study-quote-reference'),
  studyQuoteText: document.getElementById('study-quote-text'),

  // Toast
  toastMessage: document.getElementById('toast-message'),
  toastText: document.getElementById('toast-text')
};

// Paleta de colores para las categorías
const CATEGORY_COLORS = {
  "Pentateuco": "var(--cat-pentateuco)",
  "Históricos": "var(--cat-historicos)",
  "Sapienciales": "var(--cat-sapienciales)",
  "Proféticos": "var(--cat-profeticos)",
  "Evangelios": "var(--cat-evangelios)",
  "Históricos del NT": "var(--blue-accent)",
  "Epístolas Paulinas": "var(--cat-paulinas)",
  "Epístolas Católicas": "var(--cat-catolicas)",
  "Apocalipsis": "var(--cat-apocalipsis)"
};

/**
 * Normaliza cadenas removiendo tildes y caracteres diacríticos para búsqueda insensible
 */
function normalizeString(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Filtra y ordena los libros bíblicos según el estado actual
 */
function getFilteredBooks() {
  const query = normalizeString(state.searchQuery.trim());

  return BIBLE_BOOKS.filter(book => {
    // 1. Filtro por Testamento
    if (state.selectedTestament !== 'all' && book.testament !== state.selectedTestament) {
      return false;
    }

    // 2. Filtro por Categoría
    if (state.selectedCategory !== 'all' && book.category !== state.selectedCategory) {
      return false;
    }

    // 3. Filtros Especiales
    if (state.onlyDeuterocanonical && !book.isDeuterocanonical) {
      return false;
    }

    if (state.onlySynoptic && !book.isSynoptic) {
      return false;
    }

    if (state.onlyMajorProphets && book.subCategory !== 'Profeta Mayor') {
      return false;
    }

    if (state.onlyMinorProphets && book.subCategory !== 'Profeta Menor') {
      return false;
    }

    // 4. Búsqueda textual amplia
    if (query) {
      const searchFields = [
        book.name,
        book.abbr,
        book.hebrewGreekName,
        book.author,
        book.category,
        book.subCategory,
        book.genre,
        book.audience,
        book.summary,
        book.historicalNote,
        ...(book.keyThemes || [])
      ].map(normalizeString);

      const matches = searchFields.some(field => field.includes(query));
      if (!matches) return false;
    }

    return true;
  }).sort((a, b) => {
    // Ordenamiento
    switch (state.sortBy) {
      case 'name-asc':
        return a.name.localeCompare(b.name, 'es');
      case 'chapters-desc':
        return b.chapters - a.chapters;
      case 'chapters-asc':
        return a.chapters - b.chapters;
      case 'canonical':
      default:
        return BIBLE_BOOKS.indexOf(a) - BIBLE_BOOKS.indexOf(b);
    }
  });
}

/**
 * Renderiza la lista de libros en la cuadrícula
 */
function renderBooks() {
  const filtered = getFilteredBooks();

  // Actualizar conteo de resultados
  elements.resultsCount.innerHTML = `Mostrando <strong>${filtered.length}</strong> de ${BIBLE_BOOKS.length} libros canónicos`;

  if (filtered.length === 0) {
    elements.booksGrid.style.display = 'none';
    elements.emptyState.style.display = 'block';
    return;
  }

  elements.emptyState.style.display = 'none';
  elements.booksGrid.style.display = 'grid';

  elements.booksGrid.innerHTML = filtered.map(book => {
    const accentColor = CATEGORY_COLORS[book.category] || 'var(--gold-primary)';
    const isSelected = state.currentStudyBook && state.currentStudyBook.id === book.id;

    return `
      <article class="book-card ${isSelected ? 'active-card' : ''}" data-book-id="${book.id}" style="--accent-bar: ${accentColor};" tabindex="0" role="button" aria-label="Abrir estudio de ${book.name}">
        <div class="book-card-header">
          <span class="book-abbr-badge">${book.abbr}</span>
          <div class="book-tags">
            ${book.isDeuterocanonical ? `<span class="badge badge-deuterocanonical">⭐ Deuterocanónico</span>` : ''}
            ${book.isSynoptic ? `<span class="badge badge-synoptic">📖 Sinóptico</span>` : ''}
            <span class="badge badge-category">${book.category}</span>
          </div>
        </div>

        <h3 class="book-title sacred-title">${book.name}</h3>
        <p class="book-subname">${book.hebrewGreekName}</p>

        <p class="book-summary">${book.summary}</p>

        <div class="book-meta-grid">
          <div class="meta-entry">
            <span class="meta-entry-label">Capítulos</span>
            <span class="meta-entry-val">${book.chapters} caps.</span>
          </div>
          <div class="meta-entry">
            <span class="meta-entry-label">Época</span>
            <span class="meta-entry-val" title="${book.date}">${book.date.split('(')[0].trim()}</span>
          </div>
          <div class="meta-entry meta-entry-genre">
            <span class="meta-entry-label">Género Literario</span>
            <span class="meta-entry-val" title="${book.genre}">${book.genre}</span>
          </div>
        </div>

        <div class="book-card-footer">
          <span>${isSelected ? '✓ Estudiando Ahora' : 'Ver Estudio Completo'}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </div>
      </article>
    `;
  }).join('');

  // Asociar eventos de click y teclado en tarjetas
  elements.booksGrid.querySelectorAll('.book-card').forEach(card => {
    const bookId = card.dataset.bookId;
    const book = BIBLE_BOOKS.find(b => b.id === bookId);

    const openAction = () => openBookStudy(book);
    card.addEventListener('click', openAction);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openAction();
      }
    });
  });
}

/**
 * Abre y rellena el panel de estudio integrado en la página
 */
function openBookStudy(book) {
  if (!book) return;
  state.currentStudyBook = book;

  // Llenar campos principales
  elements.studyBookAbbr.textContent = book.abbr;
  elements.studyBookTitle.textContent = book.name;
  elements.studyBookSubname.textContent = book.hebrewGreekName;

  // Badges dinámicos
  elements.studyPanelTags.innerHTML = `
    <span class="badge" style="background: rgba(212, 175, 55, 0.15); color: var(--gold-light); border: 1px solid var(--border-focus);">${book.testament}</span>
    <span class="badge badge-category">${book.category}</span>
    ${book.isDeuterocanonical ? `<span class="badge badge-deuterocanonical">⭐ Deuterocanónico</span>` : ''}
    ${book.isSynoptic ? `<span class="badge badge-synoptic">📖 Evangelio Sinóptico</span>` : ''}
  `;

  // Ficha técnica
  elements.studyTestament.textContent = book.testament;
  elements.studyCategory.textContent = book.category;
  elements.studySubcategory.textContent = book.subCategory;
  elements.studyChapters.textContent = `${book.chapters} capítulos`;
  elements.studyCanonStatus.textContent = book.isDeuterocanonical ? 'Deuterocanónico (LXX / Concilio de Trento)' : 'Protocanónico';
  elements.studyGenre.textContent = book.genre;
  elements.studySummary.textContent = book.summary;

  // Lista de temas
  elements.studyThemesList.innerHTML = (book.keyThemes || []).map(theme => `
    <span class="pill-btn" style="cursor: default; pointer-events: none;"># ${theme}</span>
  `).join('');

  // Contexto histórico y autoría
  elements.studyAuthor.textContent = book.author;
  elements.studyDate.textContent = book.date;
  elements.studyLocation.textContent = book.location;
  elements.studyAudience.textContent = book.audience;

  // Teología BJ
  elements.studyHistoricalNote.textContent = book.historicalNote;

  // Pasaje representativo
  elements.studyQuoteReference.textContent = book.keyPassage.reference;
  elements.studyQuoteText.textContent = `«${book.keyPassage.text}»`;

  // Reiniciar a la primera pestaña (Ficha Técnica)
  switchStudyTab('tab-specs');

  // Mostrar el panel integrado
  elements.bookStudyPanel.style.display = 'block';

  // Actualizar tarjetas en la grilla para marcar la activa
  elements.booksGrid.querySelectorAll('.book-card').forEach(card => {
    card.classList.toggle('active-card', card.dataset.bookId === book.id);
  });

  // Desplazar suavemente hacia el visor de estudio respetando el navbar
  elements.bookStudyPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Cierra el panel de estudio integrado
 */
function closeBookStudy() {
  elements.bookStudyPanel.style.display = 'none';
  state.currentStudyBook = null;

  // Remover marca de tarjeta activa
  elements.booksGrid.querySelectorAll('.book-card').forEach(card => {
    card.classList.remove('active-card');
  });
}

/**
 * Alterna pestañas dentro del panel de estudio
 */
function switchStudyTab(targetTabId) {
  elements.studyTabBtns.forEach(btn => {
    const isActive = btn.dataset.studyTab === targetTabId;
    btn.classList.toggle('active', isActive);
  });

  elements.studyTabPanes.forEach(pane => {
    pane.classList.toggle('active', pane.id === `pane-study-${targetTabId}`);
  });
}

/**
 * Muestra notificación toast temporal
 */
function showToast(text) {
  elements.toastText.textContent = text;
  elements.toastMessage.classList.add('show');
  setTimeout(() => {
    elements.toastMessage.classList.remove('show');
  }, 3200);
}

/**
 * Copia el contenido resumido del libro actual al portapapeles
 */
async function copyCurrentBookData() {
  if (!state.currentStudyBook) return;
  const b = state.currentStudyBook;

  const clipboardText = `📖 FICHA BÍBLICA: ${b.name} (${b.abbr})
━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Testamento: ${b.testament} (${b.category} - ${b.subCategory})
• Estatus Canónico: ${b.isDeuterocanonical ? 'Deuterocanónico' : 'Protocanónico'}
• Capítulos: ${b.chapters}
• Época: ${b.date}
• Autor / Escuela: ${b.author}
• Lugar: ${b.location}
• Destinatarios: ${b.audience}
• Género Literario: ${b.genre}

📜 SÍNTESIS TEOLÓGICA (Biblia de Jerusalén):
${b.summary}

✨ PASAJE CLAVE (${b.keyPassage.reference}):
«${b.keyPassage.text}»
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Fuente: Biblia de Jerusalén (École Biblique de Jérusalem)`;

  try {
    await navigator.clipboard.writeText(clipboardText);
    showToast(`¡Ficha de ${b.name} copiada al portapapeles!`);
  } catch (err) {
    console.error('Error al copiar al portapapeles:', err);
    showToast(`Copiado: ${b.name} (${b.abbr})`);
  }
}

/**
 * Configuración del tema Oscuro / Claro
 */
function initTheme() {
  const savedTheme = localStorage.getItem('bj_bible_theme') || 'dark';
  applyTheme(savedTheme);

  elements.themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.dataset.theme;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('bj_bible_theme', newTheme);
  });
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  if (theme === 'dark') {
    elements.themeIconSun.style.display = 'block';
    elements.themeIconMoon.style.display = 'none';
  } else {
    elements.themeIconSun.style.display = 'none';
    elements.themeIconMoon.style.display = 'block';
  }
}

/**
 * Muestra el banner explicativo de la categoría canónica seleccionada
 */
function showCategoryExplanation(categoryName) {
  if (!categoryName || categoryName === 'all' || !CATEGORY_INFO[categoryName]) {
    elements.categoryExplanationBanner.style.display = 'none';
    return;
  }

  const info = CATEGORY_INFO[categoryName];
  const icon = CATEGORY_ICONS[categoryName] || '📜';

  elements.catExpIcon.textContent = icon;
  elements.catExpBadge.textContent = `${info.testament} • ${info.bookCount} Libros`;
  elements.catExpTitle.textContent = info.title;
  elements.catExpEtymology.textContent = info.etymology;
  elements.catExpDescription.textContent = info.description;
  elements.catExpContext.textContent = info.historicalContext;

  elements.catExpPointsList.innerHTML = info.keyPoints.map(point => `
    <li>${point}</li>
  `).join('');

  elements.categoryExplanationBanner.style.display = 'block';
}

/**
 * Enlaza los oyentes de eventos interactivos
 */
function setupEventListeners() {
  // 1. Campo de búsqueda instantánea
  elements.searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    elements.searchClearBtn.classList.toggle('visible', state.searchQuery.length > 0);
    renderBooks();
  });

  // Botón limpiar búsqueda
  elements.searchClearBtn.addEventListener('click', () => {
    elements.searchInput.value = '';
    state.searchQuery = '';
    elements.searchClearBtn.classList.remove('visible');
    elements.searchInput.focus();
    renderBooks();
  });

  // 2. Tabs de Testamento
  elements.testamentTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      elements.testamentTabs.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      state.selectedTestament = btn.dataset.testament;
      renderBooks();
    });
  });

  // 3. Filtros por Categoría
  elements.categoryPills.querySelectorAll('.pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      elements.categoryPills.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.category;
      state.selectedCategory = cat;
      elements.activeCategoryIndicator.textContent = cat === 'all' ? 'Todas' : cat;
      showCategoryExplanation(cat);
      renderBooks();
    });
  });

  // Cerrar banner explicativo de categoría
  elements.catExpCloseBtn.addEventListener('click', () => {
    elements.categoryExplanationBanner.style.display = 'none';
  });

  // 4. Filtros especiales
  const setupCheckbox = (input, wrapper, stateKey) => {
    input.addEventListener('change', () => {
      state[stateKey] = input.checked;
      wrapper.classList.toggle('active', input.checked);
      renderBooks();
    });
  };

  setupCheckbox(elements.filterDeuterocanonical, elements.chipDeutWrapper, 'onlyDeuterocanonical');
  setupCheckbox(elements.filterSynoptic, elements.chipSynWrapper, 'onlySynoptic');
  setupCheckbox(elements.filterMajorProphets, elements.chipMajorWrapper, 'onlyMajorProphets');
  setupCheckbox(elements.filterMinorProphets, elements.chipMinorWrapper, 'onlyMinorProphets');

  // 5. Selector de Orden
  elements.sortSelect.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    renderBooks();
  });

  // 6. Botón de restablecer filtros
  elements.resetFiltersBtn.addEventListener('click', resetAllFilters);

  // 7. Eventos del Panel de Estudio Integrado
  elements.studyCloseBtn.addEventListener('click', closeBookStudy);
  elements.studyCloseBottomBtn.addEventListener('click', closeBookStudy);
  elements.studyCopyBtn.addEventListener('click', copyCurrentBookData);

  // Pestañas del panel de estudio
  elements.studyTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switchStudyTab(btn.dataset.studyTab);
    });
  });
}

/**
 * Restablece todos los filtros al estado inicial
 */
function resetAllFilters() {
  state.searchQuery = '';
  state.selectedTestament = 'all';
  state.selectedCategory = 'all';
  state.onlyDeuterocanonical = false;
  state.onlySynoptic = false;
  state.onlyMajorProphets = false;
  state.onlyMinorProphets = false;
  state.sortBy = 'canonical';

  // Sincronizar inputs
  elements.searchInput.value = '';
  elements.searchClearBtn.classList.remove('visible');
  elements.sortSelect.value = 'canonical';

  elements.testamentTabs.forEach(b => {
    const isAll = b.dataset.testament === 'all';
    b.classList.toggle('active', isAll);
    b.setAttribute('aria-selected', isAll ? 'true' : 'false');
  });

  elements.categoryPills.querySelectorAll('.pill-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.category === 'all');
  });
  elements.activeCategoryIndicator.textContent = 'Todas';
  elements.categoryExplanationBanner.style.display = 'none';

  elements.filterDeuterocanonical.checked = false;
  elements.chipDeutWrapper.classList.remove('active');

  elements.filterSynoptic.checked = false;
  elements.chipSynWrapper.classList.remove('active');

  elements.filterMajorProphets.checked = false;
  elements.chipMajorWrapper.classList.remove('active');

  elements.filterMinorProphets.checked = false;
  elements.chipMinorWrapper.classList.remove('active');

  renderBooks();
  showToast('Filtros restablecidos');
}

/**
 * Inicialización de la aplicación
 */
function init() {
  initTheme();
  setupEventListeners();
  renderBooks();
  console.log(`Biblia de Jerusalén: ${BIBLE_STATS.totalBooks} libros cargados exitosamente.`);
}

document.addEventListener('DOMContentLoaded', init);
