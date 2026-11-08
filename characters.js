/**
 * PERSONAJES BÍBLICOS: línea de tiempo, diccionario A–Z y ficha con árbol de vínculos.
 *
 * Rutas (hash):
 *   #/personajes               → línea de tiempo por épocas
 *   #/personajes/diccionario   → diccionario alfabético
 *   #/personajes/<id>          → ficha del personaje (árbol familiar + vínculos)
 */

import { BIBLE_BOOKS } from './data/bibleData.js';
import { CHARACTERS, RELATIONS, ERAS } from './data/characters.js';

const BOOK_BY_ID = new Map(BIBLE_BOOKS.map(b => [b.id, b]));
const ERA_BY_ID = new Map(ERAS.map(e => [e.id, e]));
const PEOPLE = new Map(CHARACTERS.map(c => [c.id, c]));

// Valida los datos en desarrollo: avisa de ids inexistentes
RELATIONS.forEach(rel => {
  [rel.a, rel.b].forEach(id => {
    if (!PEOPLE.has(id)) console.warn(`[personajes] Vínculo con id desconocido: "${id}"`);
  });
});

// ------------------------------------------------------------------
// Utilidades
// ------------------------------------------------------------------
function esc(str) {
  return String(str ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function norm(str) {
  return String(str || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

const g = (person, male, female) => (person.gender === 'f' ? female : male);

/** Letra índice para el diccionario, ignorando artículos ("El hijo pródigo" → H). */
function sortKey(person) {
  return norm(person.name).replace(/^(el|la|los|las)\s+/, '');
}

// ------------------------------------------------------------------
// Cálculo de vínculos
// ------------------------------------------------------------------
function parentsOf(id) {
  return RELATIONS.filter(r => r.type === 'parent' && r.b === id).map(r => ({ id: r.a, note: r.note }));
}

function childrenOf(id) {
  return RELATIONS.filter(r => r.type === 'parent' && r.a === id).map(r => ({ id: r.b, note: r.note }));
}

function uniqueById(list) {
  const seen = new Set();
  return list.filter(x => PEOPLE.has(x.id) && !seen.has(x.id) && seen.add(x.id));
}

function computeLinks(id) {
  const parents = uniqueById(parentsOf(id));
  const children = uniqueById(childrenOf(id));
  const spouses = uniqueById(RELATIONS
    .filter(r => r.type === 'spouse' && (r.a === id || r.b === id))
    .map(r => ({ id: r.a === id ? r.b : r.a, note: r.note })));

  // Hermanos: explícitos + quienes comparten algún progenitor
  const myParents = new Set(parents.map(p => p.id));
  const siblings = uniqueById([
    ...RELATIONS.filter(r => r.type === 'sibling' && (r.a === id || r.b === id))
      .map(r => ({ id: r.a === id ? r.b : r.a, note: r.note })),
    ...parents.flatMap(p => childrenOf(p.id)).filter(c => c.id !== id).map(c => {
      const theirParents = new Set(parentsOf(c.id).map(p => p.id));
      const shared = [...myParents].filter(p => theirParents.has(p)).length;
      const half = myParents.size > 1 && theirParents.size > 1 && shared < Math.max(myParents.size, theirParents.size);
      return { id: c.id, half };
    })
  ].filter(s => s.id !== id));

  const grandparents = uniqueById(parents.flatMap(p => parentsOf(p.id)));
  const grandchildren = uniqueById(children.flatMap(c => childrenOf(c.id)));

  const ancestors = uniqueById(RELATIONS.filter(r => r.type === 'ancestor' && r.b === id).map(r => ({ id: r.a, note: r.note })));
  const descendants = uniqueById(RELATIONS.filter(r => r.type === 'ancestor' && r.a === id).map(r => ({ id: r.b, note: r.note })));

  // Vínculos no familiares (con etiquetas según la dirección)
  const other = { mentors: [], disciples: [], friends: [], relatives: [], others: [] };
  RELATIONS.forEach(r => {
    if (r.a !== id && r.b !== id) return;
    const fromA = r.a === id;
    const otherId = fromA ? r.b : r.a;
    const person = PEOPLE.get(otherId);
    if (!person) return;
    const label = fromA ? r.aLabel : r.bLabel;
    switch (r.type) {
      case 'mentor':
        if (fromA) other.disciples.push({ id: otherId, label: label || g(person, 'Discípulo', 'Discípula'), note: r.note });
        else other.mentors.push({ id: otherId, label: label || g(person, 'Maestro', 'Maestra'), note: r.note });
        break;
      case 'friend':
        other.friends.push({ id: otherId, label: g(person, 'Amigo y compañero', 'Amiga y compañera'), note: r.note });
        break;
      case 'relative':
        other.relatives.push({ id: otherId, label: label || 'Pariente', note: r.note });
        break;
      case 'other':
        other.others.push({ id: otherId, label: label || 'Vínculo', note: r.note });
        break;
      default:
        break;
    }
  });

  return { parents, children, spouses, siblings, grandparents, grandchildren, ancestors, descendants, ...other };
}

/** Cadena de ascendencia: sube por el padre (o madre / antepasado) hasta donde haya datos. */
function lineage(id) {
  const chain = [{ id, gap: false }];
  const visited = new Set([id]);
  let current = id;
  for (let i = 0; i < 40; i++) {
    const parents = parentsOf(current).filter(p => PEOPLE.has(p.id));
    const father = parents.find(p => PEOPLE.get(p.id).gender === 'm');
    const next = father || parents[0];
    let step = next ? { id: next.id, gap: false } : null;
    if (!step) {
      const anc = RELATIONS.find(r => r.type === 'ancestor' && r.b === current && PEOPLE.has(r.a));
      if (anc) step = { id: anc.a, gap: true };
    }
    if (!step || visited.has(step.id)) break;
    visited.add(step.id);
    chain.push(step);
    current = step.id;
  }
  return chain.reverse(); // del más antiguo al personaje
}

function contemporaries(person) {
  if (person.year === null || person.year === undefined) return [];
  const window = person.year > -200 ? 20 : 45;
  return CHARACTERS
    .filter(c => c.id !== person.id && c.year !== null && c.year !== undefined && Math.abs(c.year - person.year) <= window && !c.parable)
    .sort((a, b) => Math.abs(a.year - person.year) - Math.abs(b.year - person.year))
    .slice(0, 10);
}

// ------------------------------------------------------------------
// Componentes
// ------------------------------------------------------------------
let root = null;
let query = '';

function personTag(person) {
  if (person.parable) return '<span class="person-tag person-tag--parable">Parábola</span>';
  if (person.tradition) return '<span class="person-tag person-tag--tradition">Tradición</span>';
  return '';
}

function personCard(person) {
  const era = ERA_BY_ID.get(person.era);
  return `
    <a class="person-card" href="#/personajes/${person.id}" style="--era-color:${eraColor(person.era)}">
      <span class="person-avatar" aria-hidden="true">${esc(initials(person))}</span>
      <span class="person-card-body">
        <span class="person-card-name">${esc(person.name)} ${personTag(person)}</span>
        <span class="person-card-role">${esc(person.role)}</span>
        <span class="person-card-meta">🕰️ ${esc(person.dates)}${person.places.length ? ` · 📍 ${esc(person.places[0])}` : ''}</span>
      </span>
      <span class="person-card-era" title="${esc(era?.name || '')}">${era?.icon || ''}</span>
    </a>`;
}

function initials(person) {
  const clean = person.name.replace(/^(El|La)\s+/, '').replace(/\(.*\)/, '').trim();
  const parts = clean.split(/\s+/).filter(w => /^[A-ZÁÉÍÓÚÑ]/.test(w));
  return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase() || clean[0];
}

const ERA_COLORS = {
  origenes: 'var(--cat-pentateuco)',
  patriarcas: 'var(--amber-accent)',
  exodo: 'var(--cat-profeticos)',
  jueces: 'var(--cat-historicos)',
  reyes: 'var(--gold-primary)',
  profetas: 'var(--cat-menores)',
  exilio: 'var(--cat-sapienciales)',
  macabeos: 'var(--rose-accent)',
  evangelios: 'var(--cat-evangelios)',
  iglesia: 'var(--cat-paulinas)',
  relatos: 'var(--cat-catolicas)',
  parabolas: 'var(--emerald-accent)'
};
const eraColor = id => ERA_COLORS[id] || 'var(--gold-primary)';

function matches(person) {
  if (!query) return true;
  const q = norm(query);
  return [person.name, person.role, person.summary, person.refs, ...(person.places || [])].some(f => norm(f).includes(q));
}

function renderShell(tab) {
  root.innerHTML = `
    <section class="courses-hero">
      <span class="hero-badge">👥 Quién es quién en la Biblia</span>
      <h2 class="hero-title">Personajes <span class="highlight">bíblicos</span></h2>
      <p class="hero-subtitle">Descubre quién fue padre, hijo, esposo, hermano, discípulo o amigo de quién; en qué época vivió y en qué ciudades. Toca un personaje para ver su árbol de vínculos.</p>
    </section>

    <div class="people-toolbar">
      <div class="search-box-wrapper people-search">
        <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input type="search" id="people-search" class="search-input" placeholder="Buscar personaje, ciudad o rol (ej. Jonás, Belén, profeta)…" autocomplete="off" spellcheck="false" value="${esc(query)}">
      </div>
      <nav class="course-tabs people-tabs" aria-label="Vistas de personajes">
        <a href="#/personajes" class="course-tab ${tab === 'timeline' ? 'active' : ''}">🕰️ Línea de tiempo</a>
        <a href="#/personajes/diccionario" class="course-tab ${tab === 'dictionary' ? 'active' : ''}">📖 Diccionario A–Z</a>
      </nav>
    </div>

    <div id="people-content"></div>
    <p class="people-disclaimer">ℹ️ Las fechas son aproximadas. Las de los patriarcas y relatos antiguos siguen la cronología tradicional y no son datos históricos precisos.</p>`;

  const input = root.querySelector('#people-search');
  input.addEventListener('input', () => {
    query = input.value;
    renderList(tab);
  });
  renderList(tab);
}

function renderList(tab) {
  const content = root.querySelector('#people-content');
  const list = CHARACTERS.filter(matches);

  if (!list.length) {
    content.innerHTML = `<div class="empty-state" style="display:block"><div class="empty-icon">🔎</div><h3 class="sacred-title">Sin resultados</h3><p>No hay personajes que coincidan con «${esc(query)}».</p></div>`;
    return;
  }

  if (tab === 'dictionary') {
    const sorted = list.slice().sort((a, b) => sortKey(a).localeCompare(sortKey(b), 'es'));
    const groups = new Map();
    sorted.forEach(p => {
      const letter = sortKey(p)[0].toUpperCase();
      if (!groups.has(letter)) groups.set(letter, []);
      groups.get(letter).push(p);
    });
    content.innerHTML = `
      <nav class="dict-letters" aria-label="Índice alfabético">
        ${[...groups.keys()].map(l => `<a href="#dict-${l}" data-letter="${l}">${l}</a>`).join('')}
      </nav>
      <p class="people-count">${sorted.length} personaje${sorted.length > 1 ? 's' : ''}</p>
      ${[...groups.entries()].map(([letter, people]) => `
        <section class="dict-section" id="dict-${letter}">
          <h3 class="dict-letter sacred-title">${letter}</h3>
          <dl class="dict-list">
            ${people.map(p => `
              <div class="dict-entry">
                <dt><a href="#/personajes/${p.id}">${esc(p.name)}</a> ${personTag(p)}</dt>
                <dd>
                  <span class="dict-meta">${esc(p.role)} · ${esc(p.dates)} · <span class="dict-ref">${esc(p.refs)}</span></span>
                  <span class="dict-summary">${esc(p.summary)}</span>
                </dd>
              </div>`).join('')}
          </dl>
        </section>`).join('')}`;

    content.querySelectorAll('[data-letter]').forEach(a => a.addEventListener('click', e => {
      e.preventDefault();
      document.getElementById(`dict-${a.dataset.letter}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }));
    return;
  }

  // Línea de tiempo por épocas
  content.innerHTML = `
    <div class="era-timeline">
      ${ERAS.map(era => {
        const people = list.filter(p => p.era === era.id);
        if (!people.length) return '';
        return `
          <section class="era-block" style="--era-color:${eraColor(era.id)}">
            <header class="era-head">
              <span class="era-icon" aria-hidden="true">${era.icon}</span>
              <div>
                <h3 class="sacred-title">${esc(era.name)}</h3>
                <span class="era-range">${esc(era.range)}</span>
              </div>
              <span class="era-count">${people.length}</span>
            </header>
            <div class="person-grid">${people.map(personCard).join('')}</div>
          </section>`;
      }).join('')}
    </div>`;
}

// ---------- Ficha del personaje ----------
function node(id, label, note, extraClass = '') {
  const p = PEOPLE.get(id);
  if (!p) return '';
  return `
    <a class="tree-node ${extraClass}" href="#/personajes/${p.id}" style="--era-color:${eraColor(p.era)}" ${note ? `title="${esc(note)}"` : ''}>
      <span class="tree-node-label">${esc(label)}</span>
      <span class="tree-node-name">${esc(p.name)}</span>
      ${note ? `<span class="tree-node-note">${esc(note)}</span>` : ''}
    </a>`;
}

function tier(title, items) {
  if (!items.length) return '';
  return `
    <div class="tree-tier">
      <span class="tree-tier-title">${esc(title)}</span>
      <div class="tree-tier-nodes">${items.join('')}</div>
    </div>`;
}

function linkList(title, icon, items) {
  if (!items.length) return '';
  return `
    <div class="bond-group">
      <h4><span aria-hidden="true">${icon}</span> ${esc(title)}</h4>
      <div class="bond-list">${items.map(x => node(x.id, x.label, x.note, 'tree-node--bond')).join('')}</div>
    </div>`;
}

function renderPerson(id) {
  const person = PEOPLE.get(id);
  if (!person) {
    renderShell('timeline');
    return;
  }
  const era = ERA_BY_ID.get(person.era);
  const L = computeLinks(id);
  const chain = lineage(id);
  const contemps = contemporaries(person);
  const hasFamily = L.grandparents.length || L.parents.length || L.spouses.length || L.siblings.length || L.children.length || L.grandchildren.length;

  const P = id2 => PEOPLE.get(id2);
  const familyTree = `
    <div class="family-tree">
      ${tier('Abuelos', L.grandparents.map(x => node(x.id, g(P(x.id), 'Abuelo', 'Abuela'))))}
      ${tier('Padres', L.parents.map(x => node(x.id, g(P(x.id), 'Padre', 'Madre'), x.note)))}
      <div class="tree-tier tree-tier--center">
        <span class="tree-tier-title">Personaje</span>
        <div class="tree-tier-nodes">
          <span class="tree-node tree-node--self" style="--era-color:${eraColor(person.era)}">
            <span class="tree-node-label">${esc(person.role)}</span>
            <span class="tree-node-name">${esc(person.name)}</span>
          </span>
          ${L.spouses.map(x => `<span class="tree-spouse-link" aria-hidden="true">⚭</span>${node(x.id, g(P(x.id), 'Esposo', 'Esposa'), x.note)}`).join('')}
        </div>
        ${L.siblings.length ? `
          <div class="tree-siblings">
            <span class="tree-tier-title">Hermanos</span>
            <div class="tree-tier-nodes">${L.siblings.map(x => node(x.id, x.half ? g(P(x.id), 'Medio hermano', 'Media hermana') : g(P(x.id), 'Hermano', 'Hermana'), x.note)).join('')}</div>
          </div>` : ''}
      </div>
      ${tier('Hijos', L.children.map(x => node(x.id, g(P(x.id), 'Hijo', 'Hija'), x.note)))}
      ${tier('Nietos', L.grandchildren.map(x => node(x.id, g(P(x.id), 'Nieto', 'Nieta'))))}
    </div>`;

  const bonds = [
    linkList('Maestros y guías', '🎓', L.mentors),
    linkList('Discípulos y seguidores', '🙋', L.disciples),
    linkList('Amigos y compañeros', '🤝', L.friends),
    linkList('Otros parientes', '🧬', L.relatives),
    linkList('Antepasados lejanos', '⬆️', L.ancestors.map(x => ({ ...x, label: 'Antepasado' }))),
    linkList('Descendientes destacados', '⬇️', L.descendants.map(x => ({ ...x, label: 'Descendiente' }))),
    linkList('Otros vínculos', '🔗', L.others)
  ].join('');

  root.innerHTML = `
    <a class="back-link" href="#/personajes">← Todos los personajes</a>

    <header class="person-header" style="--era-color:${eraColor(person.era)}">
      <span class="person-avatar person-avatar--lg" aria-hidden="true">${esc(initials(person))}</span>
      <div class="person-header-text">
        <span class="person-header-era">${era?.icon || ''} ${esc(era?.name || '')} ${personTag(person)}</span>
        <h2 class="sacred-title">${esc(person.name)}</h2>
        <p class="person-header-role">${esc(person.role)}</p>
        <p class="person-header-summary">${esc(person.summary)}</p>
      </div>
    </header>

    <div class="person-facts">
      <div class="spec-item"><span class="spec-label">🕰️ Época / años estimados</span><span class="spec-value">${esc(person.dates)}</span></div>
      <div class="spec-item"><span class="spec-label">📍 Lugares y ciudades</span><span class="spec-value">${person.places.length ? person.places.map(esc).join(' · ') : '—'}</span></div>
      <div class="spec-item"><span class="spec-label">📜 Citas principales</span><span class="spec-value">${esc(person.refs)}</span></div>
      <div class="spec-item"><span class="spec-label">📚 Aparece en</span><span class="spec-value">${person.books.length
        ? person.books.map(b => BOOK_BY_ID.get(b)).filter(Boolean).map(b => `<a class="person-book-link" href="#/libro/${b.id}">${esc(b.name)}</a>`).join(' ')
        : 'Fuera del texto bíblico (tradición)'}</span></div>
    </div>

    ${person.year !== null && person.year !== undefined ? renderEraScale(person) : ''}

    <section class="courses-block">
      <div class="courses-block-head">
        <h3 class="sacred-title">Árbol familiar</h3>
        <p>Toca cualquier nombre para navegar a su propia ficha.</p>
      </div>
      <div class="course-surface">
        ${hasFamily ? familyTree : '<p class="people-empty-note">La Biblia no registra familiares directos de este personaje en nuestra base de datos.</p>'}
      </div>
    </section>

    ${chain.length > 2 ? `
      <section class="courses-block">
        <div class="courses-block-head">
          <h3 class="sacred-title">Línea de ascendencia</h3>
          <p>De su antepasado más lejano registrado hasta ${esc(person.name)}. «⋯» indica varias generaciones intermedias.</p>
        </div>
        <ol class="lineage-chain course-surface">
          ${chain.map((step, i) => {
            const p = PEOPLE.get(step.id);
            const isSelf = i === chain.length - 1;
            // step.gap = se llegó a este antepasado saltando generaciones desde el siguiente de la cadena
            const connector = i < chain.length - 1 ? `<span class="lineage-arrow" aria-hidden="true">${step.gap ? '⋯ →' : '→'}</span>` : '';
            return `<li>${isSelf
              ? `<span class="lineage-step lineage-step--self">${esc(p.name)}</span>`
              : `<a class="lineage-step" href="#/personajes/${p.id}" style="--era-color:${eraColor(p.era)}">${esc(p.name)}</a>`}${connector}</li>`;
          }).join('')}
        </ol>
      </section>` : ''}

    ${bonds ? `
      <section class="courses-block">
        <div class="courses-block-head">
          <h3 class="sacred-title">Otros vínculos</h3>
          <p>Discipulado, amistad, parentesco y otras relaciones.</p>
        </div>
        <div class="bond-groups">${bonds}</div>
      </section>` : ''}

    ${contemps.length ? `
      <section class="courses-block">
        <div class="courses-block-head">
          <h3 class="sacred-title">Contemporáneos aproximados</h3>
          <p>Personajes que vivieron en una época cercana.</p>
        </div>
        <div class="person-grid">${contemps.map(personCard).join('')}</div>
      </section>` : ''}

    <p class="people-disclaimer">ℹ️ Fechas aproximadas. ${person.tradition ? 'Los datos de este personaje provienen de la tradición, no del texto bíblico.' : ''}${person.parable ? 'Este es un personaje de una parábola: un relato con enseñanza, no una persona histórica.' : ''}</p>`;
}

/** Barra de épocas con la posición aproximada del personaje (2000 a.C. → 100 d.C.). */
function renderEraScale(person) {
  const MIN = -2000;
  const MAX = 100;
  const pct = Math.min(100, Math.max(0, ((person.year - MIN) / (MAX - MIN)) * 100));
  const ticks = [-2000, -1500, -1000, -500, 0];
  const label = y => (y < 0 ? `${-y} a.C.` : y === 0 ? 'año 0' : `${y} d.C.`);
  return `
    <section class="courses-block">
      <div class="courses-block-head">
        <h3 class="sacred-title">Ubicación en el tiempo</h3>
        <p>Posición aproximada en la historia bíblica.</p>
      </div>
      <div class="course-surface">
        <div class="era-scale">
          <div class="era-scale-track">
            <span class="era-scale-marker" style="left:${pct}%; --era-color:${eraColor(person.era)}">
              <span class="era-scale-marker-label">${esc(person.name.split(' (')[0])}</span>
            </span>
          </div>
          <div class="era-scale-ticks">
            ${ticks.map(t => `<span style="left:${((t - MIN) / (MAX - MIN)) * 100}%">${label(t)}</span>`).join('')}
          </div>
        </div>
      </div>
    </section>`;
}

// ------------------------------------------------------------------
// API pública
// ------------------------------------------------------------------
export function initCharacters(container) {
  root = container;
}

export function renderCharactersRoute(parts) {
  const [, sub] = parts;
  if (!sub) renderShell('timeline');
  else if (sub === 'diccionario') renderShell('dictionary');
  else renderPerson(sub);
}
