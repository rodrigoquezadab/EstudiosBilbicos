/**
 * MOTOR DE CURSOS Y GUÍAS DE ESTUDIO
 * Genera, a partir de data/courses.js, la portada de cursos, la guía de
 * estudio de cada curso (mapa + bloques + consejos) y los quizzes.
 *
 * Rutas (hash):
 *   #/cursos                          → portada de cursos
 *   #/cursos/<curso>                  → guía de estudio
 *   #/cursos/<curso>/practica         → lista de actividades
 *   #/cursos/<curso>/practica/<act>   → quiz en curso
 */

(function () {
  'use strict';

const STORAGE_KEY = 'estudios-biblicos:progreso';
const MASTERY = 80; // % para considerar dominada una actividad

const BOOK_BY_ID = new Map(BIBLE_BOOKS.map(b => [b.id, b]));

// ------------------------------------------------------------------
// Utilidades
// ------------------------------------------------------------------
const rand = n => Math.floor(Math.random() * n);

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = rand(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function esc(str) {
  return String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/** Nombre corto y reconocible para quizzes ("San Mateo" → "Mateo"). */
function shortName(book) {
  return book.name
    .replace(/^San /, '')
    .replace(/ de San Juan$/, '')
    .replace(/\s*\(.*\)$/, '')
    .replace('Hechos de los Apóstoles', 'Hechos');
}

// ------------------------------------------------------------------
// Modelo de curso: secuencia ordenada con posición y grupo de cada libro
// ------------------------------------------------------------------
function buildModel(course) {
  const seq = [];
  const groups = course.groups.map(g => ({ ...g }));
  groups.forEach(group => {
    group.start = seq.length + 1;
    group.books.forEach(id => {
      const book = BOOK_BY_ID.get(id);
      if (!book) {
        console.warn(`[cursos] Libro desconocido "${id}" en ${course.id}`);
        return;
      }
      seq.push({ book, pos: seq.length + 1, group });
    });
    group.end = seq.length;
    group.count = group.end - group.start + 1;
  });
  const byId = new Map(seq.map(e => [e.book.id, e]));
  return { ...course, groups, seq, byId, total: seq.length };
}

const MODELS = new Map(COURSES.map(c => [c.id, buildModel(c)]));

// ------------------------------------------------------------------
// Progreso (localStorage, opcional)
// ------------------------------------------------------------------
function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveBest(courseId, activityId, pct) {
  try {
    const progress = loadProgress();
    progress[courseId] = progress[courseId] || {};
    const prev = progress[courseId][activityId];
    if (prev === undefined || pct > prev) {
      progress[courseId][activityId] = pct;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      return { isRecord: true, best: pct, prev };
    }
    return { isRecord: false, best: prev, prev };
  } catch {
    return { isRecord: false, best: pct, prev: undefined };
  }
}

function courseCompletion(model) {
  const p = loadProgress()[model.id] || {};
  const mastered = model.activities.filter(a => (p[a] || 0) >= MASTERY).length;
  return { mastered, total: model.activities.length, pct: Math.round((mastered / model.activities.length) * 100), scores: p };
}

// ------------------------------------------------------------------
// Generadores de preguntas
// ------------------------------------------------------------------
function where(entry) {
  return `n.º ${entry.pos} · ${entry.group.name}`;
}

function bookLabel(entry) {
  return `<strong>${esc(shortName(entry.book))}</strong>`;
}

/** Elige una entrada evitando repetir libros dentro de la misma sesión. */
function pickEntry(model, used, filter = () => true) {
  const pool = model.seq.filter(e => filter(e));
  const fresh = pool.filter(e => !used.has(e.book.id));
  const entry = (fresh.length ? fresh : pool)[rand((fresh.length ? fresh : pool).length)];
  used.add(entry.book.id);
  return entry;
}

function choiceQuestion({ type, prompt, correct, distractors, explanation, review }) {
  const options = shuffle([correct, ...distractors]);
  return {
    kind: 'choice',
    type,
    prompt,
    options: options.map(o => o.label),
    optionSubs: options.map(o => o.sub || ''),
    correctIndex: options.indexOf(correct),
    explanation,
    review
  };
}

/** Lista de "partes" de la Biblia con su cantidad de libros, para la actividad de conteo. */
function countFacts(model) {
  const names = es => es.map(e => esc(shortName(e.book)));
  const listOf = entries => (entries.length <= 7
    ? names(entries).join(', ')
    : `de ${names(entries)[0]} a ${names(entries)[entries.length - 1]}`);

  const facts = model.groups.map(g => {
    const entries = model.seq.filter(e => e.group === g);
    return {
      key: g.id,
      label: g.name,
      phrase: `el bloque <strong>${esc(g.name)}</strong>`,
      count: entries.length,
      detail: listOf(entries)
    };
  });

  const byTestament = t => model.seq.filter(e => e.group.testament === t);
  const at = byTestament('AT');
  const nt = byTestament('NT');
  const summary = t => model.groups.filter(g => g.testament === t).map(g => `${g.count} ${esc(g.name)}`).join(' + ');

  if (at.length) facts.push({ key: 'AT', label: 'Antiguo Testamento', phrase: 'el <strong>Antiguo Testamento</strong>', count: at.length, detail: summary('AT') });
  if (nt.length) facts.push({ key: 'NT', label: 'Nuevo Testamento', phrase: 'el <strong>Nuevo Testamento</strong>', count: nt.length, detail: summary('NT') });
  if (at.length && nt.length) {
    facts.push({ key: 'all', label: 'Biblia completa', phrase: 'la <strong>Biblia completa</strong> (canon católico)', count: at.length + nt.length, detail: `${at.length} del Antiguo Testamento + ${nt.length} del Nuevo Testamento` });
  }

  const mayores = model.groups.find(g => g.id === 'profetas-mayores');
  const menores = model.groups.find(g => g.id === 'profetas-menores');
  if (mayores && menores) {
    facts.push({ key: 'profeticos', label: 'Libros Proféticos', phrase: 'los <strong>Libros Proféticos</strong> en total', count: mayores.count + menores.count, detail: `${mayores.count} Profetas Mayores + ${menores.count} Profetas Menores` });
  }
  // Los 7 libros deuterocanónicos completos (Ester y Daniel solo tienen *adiciones* deuterocanónicas)
  const DEUTERO_IDS = ['tobias', 'judit', '1-macabeos', '2-macabeos', 'sabiduria', 'eclesiastico', 'baruc'];
  const deutero = model.seq.filter(e => DEUTERO_IDS.includes(e.book.id));
  if (deutero.length === DEUTERO_IDS.length) {
    facts.push({ key: 'deutero', label: 'Deuterocanónicos', phrase: 'los libros <strong>deuterocanónicos</strong>', count: deutero.length, detail: `${names(deutero).join(', ')} (además, Ester y Daniel tienen partes deuterocanónicas)` });
  }
  return facts;
}

const GENERATORS = {
  next(model, used) {
    const before = Math.random() < 0.3;
    const ref = pickEntry(model, used, e => (before ? e.pos > 1 : e.pos < model.total));
    const ans = model.seq[before ? ref.pos - 2 : ref.pos];
    const near = model.seq.filter(e => e !== ref && e !== ans && Math.abs(e.pos - ans.pos) <= 4);
    const pool = near.length >= 3 ? near : model.seq.filter(e => e !== ref && e !== ans);
    const distractors = shuffle(pool).slice(0, 3);
    const toOpt = e => ({ label: shortName(e.book) });
    const correct = toOpt(ans);

    const [first, second] = before ? [ans, ref] : [ref, ans];
    const sameGroup = first.group === second.group;
    const explanation = sameGroup
      ? `${bookLabel(first)} (n.º ${first.pos}) va justo antes de ${bookLabel(second)} (n.º ${second.pos}), ambos en <em>${esc(first.group.name)}</em>.`
      : `${bookLabel(first)} cierra <em>${esc(first.group.name)}</em> y ${bookLabel(second)} abre <em>${esc(second.group.name)}</em>.`;

    return choiceQuestion({
      type: 'next',
      prompt: before
        ? `¿Qué libro viene <em>justo antes</em> de ${bookLabel(ref)}?`
        : `¿Qué libro viene <em>justo después</em> de ${bookLabel(ref)}?`,
      correct,
      distractors: distractors.map(toOpt),
      explanation,
      review: `${shortName(first.book)} → ${shortName(second.book)}`
    });
  },

  section(model, used) {
    const entry = pickEntry(model, used);
    let groups = model.groups;
    if (groups.length > 4) {
      groups = [entry.group, ...shuffle(groups.filter(g => g !== entry.group)).slice(0, 3)];
    }
    const opts = groups.map(g => ({ label: g.name, sub: `libros ${g.start}–${g.end}`, g }));
    const correct = opts.find(o => o.g === entry.group);
    return choiceQuestion({
      type: 'section',
      prompt: `¿En qué sección se encuentra ${bookLabel(entry)}?`,
      correct,
      distractors: opts.filter(o => o !== correct),
      explanation: `${bookLabel(entry)} es el libro n.º ${entry.pos} y pertenece a <em>${esc(entry.group.name)}</em> (libros ${entry.group.start}–${entry.group.end}). ${esc(entry.group.mnemonic)}`,
      review: `${shortName(entry.book)} → ${entry.group.name}`
    });
  },

  first(model, used) {
    const a = pickEntry(model, used);
    const maxDist = Math.max(3, Math.round(model.total / 3));
    const candidates = model.seq.filter(e => e !== a && Math.abs(e.pos - a.pos) <= maxDist);
    const b = candidates[rand(candidates.length)];
    const [earlier, later] = a.pos < b.pos ? [a, b] : [b, a];
    const opts = [a, b].map(e => ({ label: shortName(e.book), e }));
    const correct = opts.find(o => o.e === earlier);
    const groupNote = earlier.group !== later.group
      ? ` La sección <em>${esc(earlier.group.name)}</em> va antes que <em>${esc(later.group.name)}</em>.`
      : '';
    return choiceQuestion({
      type: 'first',
      prompt: '¿Cuál de estos libros aparece <em>primero</em> en la Biblia?',
      correct,
      distractors: opts.filter(o => o !== correct),
      explanation: `${bookLabel(earlier)} es el n.º ${earlier.pos} y ${bookLabel(later)} el n.º ${later.pos}.${groupNote}`,
      review: `${shortName(earlier.book)} va antes que ${shortName(later.book)}`
    });
  },

  count(model, used) {
    const facts = countFacts(model);
    const fresh = facts.filter(f => !used.has(`count:${f.key}`));
    const fact = (fresh.length ? fresh : facts)[rand((fresh.length ? fresh : facts).length)];
    used.add(`count:${fact.key}`);

    // Distractores: números cercanos y cantidades de otras partes (más engañosos)
    const n = fact.count;
    const near = [n - 2, n - 1, n + 1, n + 2, n + 3].filter(x => x > 0 && x !== n);
    const others = facts.map(f => f.count).filter(x => x !== n && !near.includes(x));
    const pool = [...shuffle(near).slice(0, 2), ...shuffle(others).slice(0, 1)];
    const extra = shuffle(near.filter(x => !pool.includes(x)));
    while (pool.length < 3 && extra.length) pool.push(extra.pop());

    const question = choiceQuestion({
      type: 'count',
      prompt: `¿Cuántos libros componen ${fact.phrase}?`,
      correct: { label: String(n) },
      distractors: [...new Set(pool)].slice(0, 3).map(x => ({ label: String(x) })),
      explanation: `${fact.phrase.charAt(0).toUpperCase() + fact.phrase.slice(1)}: <strong>${n}</strong> ${n === 1 ? 'libro' : 'libros'} — ${fact.detail}.`,
      review: `${fact.label} → ${n}`
    });
    // Opciones numéricas de menor a mayor
    question.options.sort((a, b) => Number(a) - Number(b));
    question.optionSubs = question.options.map(() => '');
    question.correctIndex = question.options.indexOf(String(n));
    return question;
  },

  testament(model, used) {
    const entry = pickEntry(model, used);
    const at = { label: 'Antiguo Testamento' };
    const nt = { label: 'Nuevo Testamento' };
    const correct = entry.group.testament === 'AT' ? at : nt;
    const choice = choiceQuestion({
      type: 'testament',
      prompt: `¿A qué Testamento pertenece ${bookLabel(entry)}?`,
      correct,
      distractors: [correct === at ? nt : at],
      explanation: `${bookLabel(entry)} está en el ${correct.label}, dentro de <em>${esc(entry.group.name)}</em>.`,
      review: `${shortName(entry.book)} → ${correct.label}`
    });
    // Orden fijo: AT a la izquierda, NT a la derecha
    choice.options = [at.label, nt.label];
    choice.optionSubs = ['', ''];
    choice.correctIndex = correct === at ? 0 : 1;
    return choice;
  },

  order(model, used) {
    const len = Math.min(model.total, 4 + rand(3));
    const anchor = pickEntry(model, used, e => e.pos <= model.total - len + 1);
    const items = model.seq.slice(anchor.pos - 1, anchor.pos - 1 + len);
    let shuffled = shuffle(items);
    let guard = 0;
    while (shuffled.every((e, i) => e === items[i]) && guard++ < 10) shuffled = shuffle(items);
    return {
      kind: 'order',
      type: 'order',
      prompt: `Toca los ${len} libros en su orden bíblico`,
      items: items.map(e => ({ id: e.book.id, label: shortName(e.book), pos: e.pos })),
      shuffled: shuffled.map(e => e.book.id),
      explanation: `Orden correcto: ${items.map(e => `<strong>${esc(shortName(e.book))}</strong>`).join(' → ')}`,
      review: items.map(e => shortName(e.book)).join(' → ')
    };
  }
};

function buildQuestions(model, activityId) {
  const def = ACTIVITIES[activityId];
  const used = new Set();
  if (activityId === 'exam') {
    const types = model.activities.filter(a => a !== 'exam');
    const plan = Array.from({ length: def.questions }, (_, i) => types[i % types.length]);
    return shuffle(plan).map(t => GENERATORS[t](model, used));
  }
  return Array.from({ length: def.questions }, () => GENERATORS[activityId](model, used));
}

// ------------------------------------------------------------------
// Estado de la sesión de quiz
// ------------------------------------------------------------------
let root = null;
let session = null;
let guideHidden = false;
let hubGroupId = null; // bloque seleccionado en el mapa de la portada

// ------------------------------------------------------------------
// Componentes de interfaz
// ------------------------------------------------------------------
function renderMap(groups, { compact = false, selectedId = null } = {}) {
  const byTestament = ['AT', 'NT']
    .map(t => ({ t, groups: groups.filter(g => g.testament === t) }))
    .filter(x => x.groups.length);

  return `
    <div class="bible-map ${compact ? 'bible-map--compact' : ''} ${selectedId ? 'has-selection' : ''}">
      ${byTestament.map(({ t, groups: gs }) => {
        const total = gs.reduce((s, g) => s + g.count, 0);
        return `
          <div class="bible-map-row">
            <div class="bible-map-row-label">
              <span>${t === 'AT' ? 'Antiguo Testamento' : 'Nuevo Testamento'}</span>
              <span class="bible-map-row-count">${total} libros</span>
            </div>
            <div class="bible-map-bar" role="list">
              ${gs.map(g => `
                <a class="bible-map-seg ${g.id === selectedId ? 'is-selected' : ''}" role="listitem" href="#group-${esc(g.id)}" data-group-link="${esc(g.id)}"
                   ${g.id === selectedId ? 'aria-current="true"' : ''}
                   style="--seg-color:${g.color}; flex-grow:${g.count};"
                   title="${esc(g.name)} · ${g.count} libro${g.count > 1 ? 's' : ''}">
                  <span class="bible-map-seg-name">${esc(g.name)}</span>
                  <span class="bible-map-seg-count">${g.count}</span>
                </a>`).join('')}
            </div>
            <div class="bible-map-scale" aria-hidden="true"><span>Inicio</span><span>Mitad</span><span>Final</span></div>
          </div>`;
      }).join('')}
    </div>`;
}

function renderHub() {
  const fullModel = MODELS.get('mapa-biblia-completa') || [...MODELS.values()][0];

  root.innerHTML = `
    <section class="courses-hero">
      <span class="hero-badge">🎓 Aprende paso a paso</span>
      <h2 class="hero-title">Cursos y <span class="highlight">guías de estudio</span></h2>
      <p class="hero-subtitle">Aprende el orden de los libros de la Biblia con guías visuales, trucos de memoria y quizzes. La meta: saber en qué parte de la Biblia está cada libro.</p>
    </section>

    <section class="courses-block">
      <div class="courses-block-head">
        <h3 class="sacred-title">Así está organizada la Biblia</h3>
        <p>Cada color es un bloque de libros y el ancho indica cuántos contiene. <strong>Toca un bloque</strong> para leer su introducción y ver solo sus libros.</p>
      </div>
      <a class="count-quiz-cta" href="#/cursos/mapa-biblia-completa/practica/count">
        <span class="count-quiz-cta-icon" aria-hidden="true">🧮</span>
        <span class="count-quiz-cta-text">
          <strong>Quiz: ¿cuántos libros tiene cada parte?</strong>
          <span>Pentateuco, Históricos, Profetas, Evangelios, Cartas, cada Testamento y la Biblia completa.</span>
        </span>
        <span class="count-quiz-cta-go" aria-hidden="true">Empezar →</span>
      </a>
      <div class="course-surface" id="hub-map">${renderMap(fullModel.groups, { compact: true, selectedId: hubGroupId })}</div>
      <div id="hub-group-panel"></div>
    </section>

    <section class="courses-block">
      <div class="courses-block-head">
        <h3 class="sacred-title">Cursos disponibles</h3>
        <p>Te recomendamos seguirlos en orden.</p>
      </div>
      <div class="course-grid">
        ${[...MODELS.values()].map((m, i) => {
          const c = courseCompletion(m);
          return `
            <a class="course-card" href="#/cursos/${m.id}" style="--course-color:${m.color}">
              <div class="course-card-top">
                <span class="course-card-icon" aria-hidden="true">${m.icon}</span>
                <span class="course-card-step">Curso ${i + 1}</span>
              </div>
              <h4 class="course-card-title">${esc(m.title)}</h4>
              <p class="course-card-desc">${esc(m.description)}</p>
              <div class="course-card-meta">
                <span>📖 ${m.total} libros</span>
                <span>🧩 ${m.activities.length} actividades</span>
                <span>📈 ${esc(m.level)}</span>
              </div>
              <div class="course-progress" aria-label="Progreso del curso">
                <div class="course-progress-bar"><span style="width:${c.pct}%"></span></div>
                <span class="course-progress-text">${c.mastered}/${c.total} dominadas</span>
              </div>
              <span class="course-card-cta">${c.mastered ? 'Continuar' : 'Empezar'} →</span>
            </a>`;
        }).join('')}
      </div>
    </section>

    <section class="courses-block">
      <div class="courses-block-head">
        <h3 class="sacred-title">Próximamente</h3>
        <p>Nuevos cursos y guías en preparación.</p>
      </div>
      <div class="course-grid">
        ${UPCOMING_COURSES.map(u => `
          <div class="course-card course-card--upcoming" aria-disabled="true">
            <div class="course-card-top">
              <span class="course-card-icon" aria-hidden="true">${u.icon}</span>
              <span class="course-card-step">Próximamente</span>
            </div>
            <h4 class="course-card-title">${esc(u.title)}</h4>
            <p class="course-card-desc">${esc(u.description)}</p>
          </div>`).join('')}
      </div>
    </section>`;

  bindHubMap(fullModel);
  renderHubGroupPanel(fullModel, false);
}

/** El mapa de la portada abre la introducción del bloque en lugar de saltar a la guía. */
function bindHubMap(fullModel) {
  root.querySelectorAll('#hub-map [data-group-link]').forEach(seg => {
    seg.addEventListener('click', e => {
      e.preventDefault();
      const id = seg.dataset.groupLink;
      hubGroupId = hubGroupId === id ? null : id;
      root.querySelector('#hub-map').innerHTML = renderMap(fullModel.groups, { compact: true, selectedId: hubGroupId });
      bindHubMap(fullModel);
      renderHubGroupPanel(fullModel, true);
    });
  });
}

/** Curso (AT / NT) que estudia el bloque en detalle. */
function courseForGroup(groupId) {
  return [...MODELS.values()].find(m => m.id !== 'mapa-biblia-completa' && m.groups.some(g => g.id === groupId));
}

function bookCard(book, color) {
  return `
    <a class="book-card" href="#/libro/${book.id}" style="--accent-bar:${color};" aria-label="Abrir estudio de ${esc(book.name)}">
      <div class="book-card-header">
        <span class="book-abbr-badge">${esc(book.abbr)}</span>
        <div class="book-tags">
          ${book.isDeuterocanonical ? '<span class="badge badge-deuterocanonical">⭐ Deuterocanónico</span>' : ''}
          ${book.isSynoptic ? '<span class="badge badge-synoptic">📖 Sinóptico</span>' : ''}
          <span class="badge badge-category">${esc(book.category)}</span>
        </div>
      </div>
      <h3 class="book-title sacred-title">${esc(book.name)}</h3>
      <p class="book-subname">${esc(book.hebrewGreekName)}</p>
      <p class="book-summary">${esc(book.summary)}</p>
      <div class="book-meta-grid">
        <div class="meta-entry">
          <span class="meta-entry-label">Capítulos</span>
          <span class="meta-entry-val">${book.chapters} caps.</span>
        </div>
        <div class="meta-entry">
          <span class="meta-entry-label">Época</span>
          <span class="meta-entry-val" title="${esc(book.date)}">${esc(book.date.split('(')[0].trim())}</span>
        </div>
        <div class="meta-entry meta-entry-genre">
          <span class="meta-entry-label">Género Literario</span>
          <span class="meta-entry-val" title="${esc(book.genre)}">${esc(book.genre)}</span>
        </div>
      </div>
      <div class="book-card-footer">
        <span>Ver Estudio Completo</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </div>
    </a>`;
}

function renderHubGroupPanel(fullModel, scroll) {
  const panel = root.querySelector('#hub-group-panel');
  const group = hubGroupId && fullModel.groups.find(g => g.id === hubGroupId);
  if (!group) {
    panel.innerHTML = '';
    return;
  }

  const info = CATEGORY_INFO[group.category];
  const entries = fullModel.seq.filter(e => e.group.id === group.id);
  const course = courseForGroup(group.id);
  const testament = group.testament === 'AT' ? 'Antiguo Testamento' : 'Nuevo Testamento';
  // Para los profetas, la introducción cubre ambos grupos: se aclara cuál es este
  const sharedNote = (group.id === 'profetas-mayores' || group.id === 'profetas-menores')
    ? `<p class="block-intro-subnote">Estás viendo los <strong>${esc(group.name)}</strong>: ${esc(group.tip)}</p>`
    : '';

  panel.innerHTML = `
    <article class="block-intro" style="--group-color:${group.color}" aria-live="polite">
      <header class="block-intro-head">
        <div>
          <span class="block-intro-kicker">${testament} · ${group.count > 1 ? `libros ${group.start}–${group.end}` : `libro ${group.start}`} de ${fullModel.total}</span>
          <h3 class="sacred-title">${esc(info?.title || group.name)}</h3>
        </div>
        <button type="button" class="study-panel-close-btn" id="block-intro-close" aria-label="Cerrar explicación del bloque">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          <span>Cerrar</span>
        </button>
      </header>

      ${info ? `
        <div class="cat-exp-etymology-box"><strong>Etimología y significado:</strong> ${esc(info.etymology)}</div>
        <p class="cat-exp-description">${esc(info.description)}</p>
        ${sharedNote}
        <div class="cat-exp-context-box">
          <strong>Contexto exegético:</strong>
          <p>${esc(info.historicalContext)}</p>
        </div>
        <div class="cat-exp-points-wrapper">
          <span class="cat-exp-points-title">Ejes teológicos:</span>
          <ul class="cat-exp-points-list">${info.keyPoints.map(p => `<li>${esc(p)}</li>`).join('')}</ul>
        </div>` : sharedNote}

      <div class="guide-mnemonic block-intro-mnemonic"><span aria-hidden="true">💡</span><p><strong>Para recordarlo:</strong> ${esc(group.mnemonic)}</p></div>

      <div class="block-intro-books-head">
        <h4 class="sacred-title">${group.count === 1 ? 'El libro de este bloque' : `Los ${group.count} libros de este bloque`}</h4>
        ${course ? `<a class="btn-secondary" href="#/cursos/${course.id}">📘 Estudiar su orden en «${esc(course.shortTitle)}»</a>` : ''}
      </div>
      <div class="books-grid block-intro-books">
        ${entries.map(e => bookCard(e.book, group.color)).join('')}
      </div>
    </article>`;

  panel.querySelector('#block-intro-close').addEventListener('click', () => {
    hubGroupId = null;
    root.querySelector('#hub-map').innerHTML = renderMap(fullModel.groups, { compact: true });
    bindHubMap(fullModel);
    panel.innerHTML = '';
    root.querySelector('#hub-map').scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  if (scroll) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderCourseHeader(model, tab) {
  const c = courseCompletion(model);
  return `
    <a class="back-link" href="#/cursos">← Todos los cursos</a>
    <header class="course-header" style="--course-color:${model.color}">
      <span class="course-header-icon" aria-hidden="true">${model.icon}</span>
      <div class="course-header-text">
        <span class="course-header-level">${esc(model.level)} · ${model.total} libros</span>
        <h2 class="sacred-title">${esc(model.title)}</h2>
        <p>${esc(model.description)}</p>
      </div>
      <div class="course-header-progress">
        <span class="course-header-progress-num">${c.mastered}/${c.total}</span>
        <span class="course-header-progress-label">actividades dominadas</span>
      </div>
    </header>
    <nav class="course-tabs" aria-label="Secciones del curso">
      <a href="#/cursos/${model.id}" class="course-tab ${tab === 'guide' ? 'active' : ''}">📘 Guía de estudio</a>
      <a href="#/cursos/${model.id}/practica" class="course-tab ${tab === 'practice' ? 'active' : ''}">🧩 Practicar</a>
    </nav>`;
}

function renderGuide(model) {
  root.innerHTML = `
    ${renderCourseHeader(model, 'guide')}

    <div class="guide-intro course-surface">
      <p>${esc(model.intro)}</p>
      ${model.note ? `<p class="guide-note">ℹ️ ${esc(model.note)}</p>` : ''}
    </div>

    <section class="courses-block">
      <div class="courses-block-head">
        <h3 class="sacred-title">Mapa del recorrido</h3>
        <p>Toca un bloque para saltar a su explicación.</p>
      </div>
      <div class="course-surface">${renderMap(model.groups)}</div>
    </section>

    <section class="courses-block">
      <div class="guide-toolbar">
        <div class="courses-block-head">
          <h3 class="sacred-title">Los libros, bloque por bloque</h3>
          <p>Toca un libro para ver su ficha de estudio.</p>
        </div>
        <label class="chip-checkbox ${guideHidden ? 'active' : ''}" id="guide-hide-toggle-wrap" title="Oculta los nombres para ponerte a prueba">
          <input type="checkbox" id="guide-hide-toggle" ${guideHidden ? 'checked' : ''}>
          <span class="chip-indicator"></span>
          <span>🙈 Modo memoria (ocultar nombres)</span>
        </label>
      </div>

      <div class="guide-groups ${guideHidden ? 'guide-hidden' : ''}" id="guide-groups">
        ${model.groups.map(g => `
          <article class="guide-group" id="group-${esc(g.id)}" style="--group-color:${g.color}">
            <header class="guide-group-head">
              <span class="guide-group-dot" aria-hidden="true"></span>
              <h4>${esc(g.name)}</h4>
              <span class="guide-group-range">${g.count > 1 ? `Libros ${g.start}–${g.end}` : `Libro ${g.start}`} · ${g.count} libro${g.count > 1 ? 's' : ''}</span>
            </header>
            <div class="guide-mnemonic"><span aria-hidden="true">💡</span><p>${esc(g.mnemonic)}</p></div>
            <p class="guide-tip">${esc(g.tip)}</p>
            ${g.chunks.map(chunk => `
              <div class="guide-chunk">
                ${g.chunks.length > 1 || chunk.label ? `<span class="guide-chunk-label">${esc(chunk.label)}</span>` : ''}
                <ol class="book-chips">
                  ${chunk.books.map(id => model.byId.get(id)).filter(Boolean).map(e => `
                    <li>
                      <a class="book-chip" href="#/libro/${e.book.id}" data-book-chip>
                        <span class="book-chip-num">${e.pos}</span>
                        <span class="book-chip-name">${esc(shortName(e.book))}</span>
                        <span class="book-chip-abbr">${esc(e.book.abbr)}</span>
                      </a>
                    </li>`).join('')}
                </ol>
              </div>`).join('')}
          </article>`).join('')}
      </div>
    </section>

    <div class="guide-cta course-surface">
      <div>
        <h3 class="sacred-title">¿Listo para ponerte a prueba?</h3>
        <p>Practica con ${model.activities.length} actividades distintas y alcanza ${MASTERY}% en cada una para dominarlas.</p>
      </div>
      <a class="btn-primary" href="#/cursos/${model.id}/practica">Ir a practicar →</a>
    </div>`;

  // Modo memoria
  const toggle = root.querySelector('#guide-hide-toggle');
  toggle.addEventListener('change', () => {
    guideHidden = toggle.checked;
    root.querySelector('#guide-groups').classList.toggle('guide-hidden', guideHidden);
    root.querySelector('#guide-hide-toggle-wrap').classList.toggle('active', guideHidden);
    root.querySelectorAll('.book-chip.revealed').forEach(c => c.classList.remove('revealed'));
  });

  // En modo memoria, el primer toque revela el nombre en lugar de navegar
  root.querySelectorAll('[data-book-chip]').forEach(chip => {
    chip.addEventListener('click', e => {
      if (guideHidden && !chip.classList.contains('revealed')) {
        e.preventDefault();
        chip.classList.add('revealed');
      }
    });
  });

  // Saltos del mapa a cada bloque sin alterar la ruta
  root.querySelectorAll('[data-group-link]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.getElementById(`group-${link.dataset.groupLink}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function renderPractice(model) {
  const c = courseCompletion(model);
  root.innerHTML = `
    ${renderCourseHeader(model, 'practice')}
    <section class="courses-block">
      <div class="courses-block-head">
        <h3 class="sacred-title">Actividades</h3>
        <p>Cada actividad genera preguntas nuevas en cada intento. Alcanza ${MASTERY}% para marcarla como dominada.</p>
      </div>
      <div class="activity-grid">
        ${model.activities.map(id => {
          const a = ACTIVITIES[id];
          const best = c.scores[id];
          const mastered = (best || 0) >= MASTERY;
          return `
            <a class="activity-card ${mastered ? 'is-mastered' : ''}" href="#/cursos/${model.id}/practica/${id}">
              <span class="activity-icon" aria-hidden="true">${a.icon}</span>
              <div class="activity-body">
                <h4>${esc(a.title)}</h4>
                <p>${esc(a.description)}</p>
                <span class="activity-meta">${a.questions} ${id === 'order' ? 'rondas' : 'preguntas'}${best !== undefined ? ` · Mejor: <strong>${best}%</strong>` : ''}</span>
              </div>
              <span class="activity-status">${mastered ? '✅' : '▶'}</span>
            </a>`;
        }).join('')}
      </div>
    </section>`;
}

// ------------------------------------------------------------------
// Quiz
// ------------------------------------------------------------------
function startSession(model, activityId) {
  session = {
    model,
    activityId,
    questions: buildQuestions(model, activityId),
    index: 0,
    score: 0,
    answered: false,
    picked: [],
    mistakes: []
  };
  renderQuestion();
}

function renderQuestion() {
  const { model, activityId, questions, index, score } = session;
  const def = ACTIVITIES[activityId];
  const q = questions[index];
  const pct = Math.round((index / questions.length) * 100);
  session.answered = false;
  session.picked = [];

  root.innerHTML = `
    <div class="quiz-shell" style="--course-color:${model.color}">
      <div class="quiz-top">
        <a class="back-link" href="#/cursos/${model.id}/practica">← Salir</a>
        <span class="quiz-title">${def.icon} ${esc(def.title)}</span>
        <span class="quiz-score" title="Respuestas correctas">⭐ ${score}</span>
      </div>
      <div class="quiz-progress" role="progressbar" aria-valuemin="0" aria-valuemax="${questions.length}" aria-valuenow="${index}">
        <span style="width:${pct}%"></span>
      </div>
      <p class="quiz-count">${q.kind === 'order' && activityId === 'order' ? 'Ronda' : 'Pregunta'} ${index + 1} de ${questions.length}</p>

      <div class="quiz-card">
        <h3 class="quiz-prompt">${q.prompt}</h3>
        ${q.kind === 'choice' ? renderChoice(q) : renderOrder(q)}
        <div class="quiz-feedback" id="quiz-feedback" hidden></div>
        <div class="quiz-actions" id="quiz-actions"></div>
      </div>
      ${q.kind === 'choice' && q.options.length > 1 ? '<p class="quiz-hint">Atajo: usa las teclas 1–4 para responder y Enter para continuar.</p>' : ''}
    </div>`;

  if (q.kind === 'choice') bindChoice(q);
  else bindOrder(q);
}

function renderChoice(q) {
  return `
    <div class="quiz-options ${q.options.length === 2 ? 'quiz-options--two' : ''}">
      ${q.options.map((label, i) => `
        <button type="button" class="quiz-option" data-index="${i}">
          <span class="quiz-option-key">${i + 1}</span>
          <span class="quiz-option-label">${esc(label)}${q.optionSubs[i] ? `<small>${esc(q.optionSubs[i])}</small>` : ''}</span>
        </button>`).join('')}
    </div>`;
}

function bindChoice(q) {
  root.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => answerChoice(q, Number(btn.dataset.index)));
  });
}

function answerChoice(q, i) {
  if (session.answered) return;
  session.answered = true;
  const ok = i === q.correctIndex;
  const buttons = root.querySelectorAll('.quiz-option');
  buttons.forEach((b, idx) => {
    b.disabled = true;
    if (idx === q.correctIndex) b.classList.add('is-correct');
    else if (idx === i) b.classList.add('is-wrong');
  });
  // En "¿Qué sección?" las opciones muestran el rango solo después de responder
  root.querySelectorAll('.quiz-option small').forEach(s => s.classList.add('visible'));
  finishAnswer(q, ok);
}

function renderOrder(q) {
  return `
    <div class="order-answer" id="order-answer" aria-label="Tu orden">
      ${q.items.map((_, i) => `<span class="order-slot" data-slot="${i}"><span class="order-slot-num">${i + 1}</span></span>`).join('')}
    </div>
    <div class="order-pool" id="order-pool">
      ${q.shuffled.map(id => {
        const item = q.items.find(it => it.id === id);
        return `<button type="button" class="order-chip" data-id="${id}">${esc(item.label)}</button>`;
      }).join('')}
    </div>`;
}

function bindOrder(q) {
  const pool = root.querySelector('#order-pool');
  const answer = root.querySelector('#order-answer');
  const actions = root.querySelector('#quiz-actions');

  const refresh = () => {
    const slots = answer.querySelectorAll('.order-slot');
    slots.forEach((slot, i) => {
      const id = session.picked[i];
      const item = id && q.items.find(it => it.id === id);
      slot.innerHTML = item
        ? `<button type="button" class="order-chip order-chip--placed" data-placed="${id}" title="Quitar">${esc(item.label)}</button>`
        : `<span class="order-slot-num">${i + 1}</span>`;
      slot.classList.toggle('filled', !!item);
    });
    pool.querySelectorAll('.order-chip').forEach(chip => {
      chip.hidden = session.picked.includes(chip.dataset.id);
    });
    const complete = session.picked.length === q.items.length;
    actions.innerHTML = complete
      ? '<button type="button" class="btn-primary" id="order-check">Comprobar</button>'
      : '<span class="quiz-actions-hint">Toca un libro colocado para devolverlo.</span>';
    if (complete) {
      const check = actions.querySelector('#order-check');
      check.addEventListener('click', () => checkOrder(q));
      check.focus();
    }
  };

  pool.addEventListener('click', e => {
    const chip = e.target.closest('.order-chip');
    if (!chip || session.answered) return;
    session.picked.push(chip.dataset.id);
    refresh();
  });

  answer.addEventListener('click', e => {
    const placed = e.target.closest('[data-placed]');
    if (!placed || session.answered) return;
    session.picked = session.picked.filter(id => id !== placed.dataset.placed);
    refresh();
  });

  refresh();
}

function checkOrder(q) {
  if (session.answered) return;
  session.answered = true;
  let ok = true;
  root.querySelectorAll('.order-slot').forEach((slot, i) => {
    const right = session.picked[i] === q.items[i].id;
    if (!right) ok = false;
    slot.classList.add(right ? 'is-correct' : 'is-wrong');
    slot.querySelector('button')?.setAttribute('disabled', '');
  });
  finishAnswer(q, ok);
}

function finishAnswer(q, ok) {
  if (ok) session.score++;
  else session.mistakes.push(q.review);

  const feedback = root.querySelector('#quiz-feedback');
  feedback.hidden = false;
  feedback.className = `quiz-feedback ${ok ? 'is-correct' : 'is-wrong'}`;
  feedback.innerHTML = `
    <strong class="quiz-feedback-title">${ok ? '¡Correcto!' : 'No exactamente'}</strong>
    <p>${q.explanation}</p>`;

  root.querySelector('.quiz-score').textContent = `⭐ ${session.score}`;

  const last = session.index === session.questions.length - 1;
  const actions = root.querySelector('#quiz-actions');
  actions.innerHTML = `<button type="button" class="btn-primary" id="quiz-next">${last ? 'Ver resultados' : 'Siguiente →'}</button>`;
  const next = actions.querySelector('#quiz-next');
  next.addEventListener('click', goNext);
  next.focus({ preventScroll: true });
}

function goNext() {
  if (!session || !session.answered) return;
  if (session.index < session.questions.length - 1) {
    session.index++;
    renderQuestion();
  } else {
    renderResults();
  }
}

function renderResults() {
  const { model, activityId, questions, score, mistakes } = session;
  const def = ACTIVITIES[activityId];
  const pct = Math.round((score / questions.length) * 100);
  const record = saveBest(model.id, activityId, pct);
  const mastered = pct >= MASTERY;
  const message = pct === 100
    ? '¡Perfecto! Dominas este tramo de la Biblia.'
    : mastered
      ? '¡Muy bien! Actividad dominada.'
      : pct >= 50
        ? 'Vas por buen camino. Repasa la guía y vuelve a intentarlo.'
        : 'Repasa la guía de estudio con calma y vuelve a intentarlo.';

  root.innerHTML = `
    <div class="quiz-shell" style="--course-color:${model.color}">
      <div class="quiz-top">
        <a class="back-link" href="#/cursos/${model.id}/practica">← Actividades</a>
        <span class="quiz-title">${def.icon} ${esc(def.title)}</span>
        <span></span>
      </div>
      <div class="quiz-card quiz-results">
        <div class="quiz-results-ring ${mastered ? 'is-mastered' : ''}" style="--pct:${pct}">
          <span>${pct}%</span>
        </div>
        <h3 class="sacred-title">${score} de ${questions.length} correctas</h3>
        <p class="quiz-results-msg">${message}</p>
        ${record.isRecord && record.prev !== undefined ? '<p class="quiz-results-badge">🏅 ¡Nuevo récord personal!</p>' : ''}
        ${!record.isRecord && record.best !== undefined ? `<p class="quiz-results-best">Tu mejor resultado: ${record.best}%</p>` : ''}

        ${mistakes.length ? `
          <div class="quiz-review">
            <h4>Para repasar</h4>
            <ul>${mistakes.map(m => `<li>${esc(m)}</li>`).join('')}</ul>
          </div>` : ''}

        <div class="quiz-results-actions">
          <button type="button" class="btn-primary" id="quiz-retry">↻ Intentar de nuevo</button>
          <a class="btn-secondary" href="#/cursos/${model.id}">📘 Repasar la guía</a>
          <a class="btn-secondary" href="#/cursos/${model.id}/practica">🧩 Otras actividades</a>
        </div>
      </div>
    </div>`;

  session.answered = false;
  root.querySelector('#quiz-retry').addEventListener('click', () => startSession(model, activityId));
}

function handleKeydown(e) {
  if (!session || !root || root.hidden || !root.querySelector('.quiz-shell')) return;
  if (e.target.matches('input, textarea, select')) return;
  const q = session.questions[session.index];
  if (!session.answered && q?.kind === 'choice' && /^[1-9]$/.test(e.key)) {
    const i = Number(e.key) - 1;
    if (i < q.options.length) {
      e.preventDefault();
      answerChoice(q, i);
    }
  } else if (e.key === 'Enter' && session.answered && document.activeElement?.id !== 'quiz-next') {
    e.preventDefault();
    goNext();
  }
}

// ------------------------------------------------------------------
// API pública
// ------------------------------------------------------------------
function initCourses(container) {
  root = container;
  document.addEventListener('keydown', handleKeydown);
}

/**
 * Renderiza la vista según las partes de la ruta, p. ej.
 * ['cursos'] | ['cursos', id] | ['cursos', id, 'practica'] | ['cursos', id, 'practica', act]
 */
function renderCoursesRoute(parts) {
  const [, courseId, section, activityId] = parts;
  const model = courseId && MODELS.get(courseId);

  if (!model) {
    session = null;
    renderHub();
    return;
  }
  if (section === 'practica' && activityId && ACTIVITIES[activityId] && model.activities.includes(activityId)) {
    startSession(model, activityId);
    return;
  }
  session = null;
  if (section === 'practica') renderPractice(model);
  else renderGuide(model);
}

  window.EBCourses = { initCourses, renderCoursesRoute, shortName };
})();
