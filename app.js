/**
 * PORTAL DE ESTUDIOS BÍBLICOS - BIBLIA DE JERUSALÉN
 * Lógica Reactiva, Búsqueda, Filtrado Avanzado y Modal de Exégesis
 */

import { BIBLE_BOOKS, BIBLE_STATS } from './data/bibleData.js';

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
  currentModalBook: null
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

  // Filtros especiales
  filterDeuterocanonical: document.getElementById('filter-deuterocanonical'),
  chipDeutWrapper: document.getElementById('chip-deut-wrapper'),
  filterSynoptic: document.getElementById('filter-synoptic'),
  chipSynWrapper: document.getElementById('chip-syn-wrapper'),
  filterMajorProphets: document.getElementById('filter-major-prophets'),
  chipMajorWrapper: document.getElementById('chip-major-wrapper'),
  filterMinorProphets: document.getElementById('filter-minor-prophets'),
  chipMinorWrapper: document.getElementById('chip-minor-wrapper'),

  // Modal
  bookModal: document.getElementById('book-modal'),
  modalCloseBtn: document.getElementById('modal-close-btn'),
  modalCloseBottomBtn: document.getElementById('modal-close-bottom-btn'),
  modalCopyBtn: document.getElementById('modal-copy-btn'),
  modalTabBtns: document.querySelectorAll('.modal-tab-btn'),
  modalTabPanes: document.querySelectorAll('.modal-tab-pane'),

  // Modal campos dinámicos
  modalBookAbbr: document.getElementById('modal-book-abbr'),
  modalBookTitle: document.getElementById('modal-book-title'),
  modalBookSubname: document.getElementById('modal-book-subname'),
  modalTags: document.getElementById('modal-tags'),
  modalTestament: document.getElementById('modal-testament'),
  modalCategory: document.getElementById('modal-category'),
  modalSubcategory: document.getElementById('modal-subcategory'),
  modalChapters: document.getElementById('modal-chapters'),
  modalCanonStatus: document.getElementById('modal-canon-status'),
  modalGenre: document.getElementById('modal-genre'),
  modalSummary: document.getElementById('modal-summary'),
  modalThemesList: document.getElementById('modal-themes-list'),
  modalAuthor: document.getElementById('modal-author'),
  modalDate: document.getElementById('modal-date'),
  modalLocation: document.getElementById('modal-location'),
  modalAudience: document.getElementById('modal-audience'),
  modalHistoricalNote: document.getElementById('modal-historical-note'),
  modalQuoteReference: document.getElementById('modal-quote-reference'),
  modalQuoteText: document.getElementById('modal-quote-text'),

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

    return `
      <article class="book-card" data-book-id="${book.id}" style="--accent-bar: ${accentColor};" tabindex="0" role="button" aria-label="Abrir estudio de ${book.name}">
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
          <div class="meta-entry" style="grid-column: span 2;">
            <span class="meta-entry-label">Género</span>
            <span class="meta-entry-val" title="${book.genre}">${book.genre}</span>
          </div>
        </div>

        <div class="book-card-footer">
          <span>Ver Estudio Completo</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </div>
      </article>
    `;
  }).join('');

  // Asociar eventos de click y accesibilidad en tarjetas
  elements.booksGrid.querySelectorAll('.book-card').forEach(card => {
    const bookId = card.dataset.bookId;
    const book = BIBLE_BOOKS.find(b => b.id === bookId);

    const openAction = () => openBookModal(book);
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
 * Abre y rellena el modal con la ficha completa del libro
 */
function openBookModal(book) {
  if (!book) return;
  state.currentModalBook = book;

  // Llenar campos principales
  elements.modalBookAbbr.textContent = book.abbr;
  elements.modalBookTitle.textContent = book.name;
  elements.modalBookSubname.textContent = book.hebrewGreekName;

  // Badges dinámicos
  elements.modalTags.innerHTML = `
    <span class="badge" style="background: rgba(212, 175, 55, 0.15); color: var(--gold-light); border: 1px solid var(--border-focus);">${book.testament}</span>
    <span class="badge badge-category">${book.category}</span>
    ${book.isDeuterocanonical ? `<span class="badge badge-deuterocanonical">⭐ Deuterocanónico</span>` : ''}
    ${book.isSynoptic ? `<span class="badge badge-synoptic">📖 Evangelio Sinóptico</span>` : ''}
  `;

  // Ficha técnica
  elements.modalTestament.textContent = book.testament;
  elements.modalCategory.textContent = book.category;
  elements.modalSubcategory.textContent = book.subCategory;
  elements.modalChapters.textContent = `${book.chapters} capítulos`;
  elements.modalCanonStatus.textContent = book.isDeuterocanonical ? 'Deuterocanónico (LXX / Concilio de Trento)' : 'Protocanónico';
  elements.modalGenre.textContent = book.genre;
  elements.modalSummary.textContent = book.summary;

  // Lista de temas
  elements.modalThemesList.innerHTML = (book.keyThemes || []).map(theme => `
    <span class="pill-btn" style="cursor: default; pointer-events: none;"># ${theme}</span>
  `).join('');

  // Contexto histórico y autoría
  elements.modalAuthor.textContent = book.author;
  elements.modalDate.textContent = book.date;
  elements.modalLocation.textContent = book.location;
  elements.modalAudience.textContent = book.audience;

  // Teología BJ
  elements.modalHistoricalNote.textContent = book.historicalNote;

  // Pasaje representativo
  elements.modalQuoteReference.textContent = book.keyPassage.reference;
  elements.modalQuoteText.textContent = `«${book.keyPassage.text}»`;

  // Reiniciar a la primera pestaña (Ficha Técnica)
  switchModalTab('tab-specs');

  // Mostrar modal con transición y foco
  elements.bookModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  elements.modalCloseBtn.focus();
}

/**
 * Cierra el modal de detalle
 */
function closeBookModal() {
  elements.bookModal.classList.remove('open');
  document.body.style.overflow = '';
  state.currentModalBook = null;
}

/**
 * Alterna pestañas dentro del modal
 */
function switchModalTab(targetTabId) {
  elements.modalTabBtns.forEach(btn => {
    const isActive = btn.dataset.modalTab === targetTabId;
    btn.classList.toggle('active', isActive);
  });

  elements.modalTabPanes.forEach(pane => {
    pane.classList.toggle('active', pane.id === `pane-${targetTabId}`);
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
  if (!state.currentModalBook) return;
  const b = state.currentModalBook;

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
      renderBooks();
    });
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

  // 7. Eventos de Modal
  elements.modalCloseBtn.addEventListener('click', closeBookModal);
  elements.modalCloseBottomBtn.addEventListener('click', closeBookModal);
  elements.modalCopyBtn.addEventListener('click', copyCurrentBookData);

  // Cerrar al hacer click fuera del contenedor del modal
  elements.bookModal.addEventListener('click', (e) => {
    if (e.target === elements.bookModal) {
      closeBookModal();
    }
  });

  // Cerrar modal con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && elements.bookModal.classList.contains('open')) {
      closeBookModal();
    }
  });

  // Pestañas del modal
  elements.modalTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switchModalTab(btn.dataset.modalTab);
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
