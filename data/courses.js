/**
 * CURSOS Y GUÍAS DE ESTUDIO
 * --------------------------------------------------------------
 * Cada curso define grupos de libros (por id de BIBLE_BOOKS, en orden),
 * consejos de memoria y la lista de actividades disponibles.
 * Para agregar un curso nuevo basta con añadir un objeto a COURSES;
 * el motor (courses.js) genera la guía y los quizzes automáticamente.
 */

// ---------- Grupos del Antiguo Testamento ----------
const AT_GROUPS = [
  {
    id: 'pentateuco',
    category: 'Pentateuco',
    name: 'Pentateuco',
    testament: 'AT',
    color: 'var(--cat-pentateuco)',
    books: ['genesis', 'exodo', 'levitico', 'numeros', 'deuteronomio'],
    mnemonic: 'Una historia en 5 pasos: Origen → Salida → Culto → Desierto → Repaso de la Ley.',
    tip: 'Génesis cuenta los orígenes; Éxodo, la salida de Egipto; Levítico, las leyes del culto (de los levitas); Números, los censos en el desierto; Deuteronomio ("segunda ley") es el repaso final de Moisés.',
    chunks: [
      { label: 'La Ley de Moisés (Torá)', books: ['genesis', 'exodo', 'levitico', 'numeros', 'deuteronomio'] }
    ]
  },
  {
    id: 'historicos',
    category: 'Históricos',
    name: 'Libros Históricos',
    testament: 'AT',
    color: 'var(--cat-historicos)',
    books: ['josue', 'jueces', 'rut', '1-samuel', '2-samuel', '1-reyes', '2-reyes', '1-cronicas', '2-cronicas', 'esdras', 'nehemias', 'tobias', 'judit', 'ester', '1-macabeos', '2-macabeos'],
    mnemonic: 'Conquista → Reyes (siempre en pareja) → Regreso del exilio → Historias de fe → Macabeos.',
    tip: 'La historia continúa donde terminó el Pentateuco. Los libros "dobles" (Samuel, Reyes, Crónicas y Macabeos) siempre van juntos: primero el 1 y luego el 2.',
    chunks: [
      { label: 'Entrada en la Tierra Prometida', books: ['josue', 'jueces', 'rut'] },
      { label: 'Los reyes, siempre en pareja', books: ['1-samuel', '2-samuel', '1-reyes', '2-reyes', '1-cronicas', '2-cronicas'] },
      { label: 'Regreso del exilio', books: ['esdras', 'nehemias'] },
      { label: 'Historias de fe ejemplares', books: ['tobias', 'judit', 'ester'] },
      { label: 'La resistencia final', books: ['1-macabeos', '2-macabeos'] }
    ]
  },
  {
    id: 'sapienciales',
    category: 'Sapienciales',
    name: 'Libros Sapienciales',
    testament: 'AT',
    color: 'var(--cat-sapienciales)',
    books: ['job', 'salmos', 'proverbios', 'eclesiastes', 'cantar-de-los-cantares', 'sabiduria', 'eclesiastico'],
    mnemonic: 'Job sufre, los Salmos oran, Proverbios aconseja, Eclesiastés reflexiona, el Cantar ama, y Sabiduría y Eclesiástico enseñan.',
    tip: 'Están en el corazón de la Biblia: si abres una Biblia por la mitad, casi siempre caes en los Salmos.',
    chunks: [
      { label: 'Poesía y sabiduría de Israel', books: ['job', 'salmos', 'proverbios', 'eclesiastes', 'cantar-de-los-cantares', 'sabiduria', 'eclesiastico'] }
    ]
  },
  {
    id: 'profetas-mayores',
    category: 'Proféticos',
    name: 'Profetas Mayores',
    testament: 'AT',
    color: 'var(--cat-profeticos)',
    books: ['isaias', 'jeremias', 'lamentaciones', 'baruc', 'ezequiel', 'daniel'],
    mnemonic: 'Isaías abre; Jeremías llega acompañado (Lamentaciones y Baruc, su secretario); cierran Ezequiel y Daniel.',
    tip: 'Se llaman "mayores" por la extensión de sus escritos, no por ser más importantes.',
    chunks: [
      { label: 'Los grandes profetas', books: ['isaias', 'jeremias', 'lamentaciones', 'baruc', 'ezequiel', 'daniel'] }
    ]
  },
  {
    id: 'profetas-menores',
    category: 'Proféticos',
    name: 'Profetas Menores',
    testament: 'AT',
    color: 'var(--cat-menores)',
    books: ['oseas', 'joel', 'amos', 'abdias', 'jonas', 'miqueas', 'nahum', 'habacuc', 'sofonias', 'ageo', 'zacarias', 'malaquias'],
    mnemonic: 'Apréndelos en 3 tandas: 6 + 3 + 3. La última tanda (Ageo, Zacarías, Malaquías) habla tras el regreso del exilio.',
    tip: 'Son los últimos 12 libros del Antiguo Testamento. Malaquías es el último antes del Nuevo Testamento.',
    chunks: [
      { label: 'Primera tanda (6)', books: ['oseas', 'joel', 'amos', 'abdias', 'jonas', 'miqueas'] },
      { label: 'Segunda tanda (3)', books: ['nahum', 'habacuc', 'sofonias'] },
      { label: 'Después del exilio (3)', books: ['ageo', 'zacarias', 'malaquias'] }
    ]
  }
];

// ---------- Grupos del Nuevo Testamento ----------
const NT_GROUPS = [
  {
    id: 'evangelios',
    category: 'Evangelios',
    name: 'Evangelios',
    testament: 'NT',
    color: 'var(--cat-evangelios)',
    books: ['mateo', 'marcos', 'lucas', 'juan'],
    mnemonic: 'Mateo, Marcos, Lucas y Juan: los tres primeros son los "sinópticos" (se parecen mucho); Juan va aparte.',
    tip: 'El Nuevo Testamento abre con la vida, muerte y resurrección de Jesús contada cuatro veces.',
    chunks: [
      { label: 'Sinópticos', books: ['mateo', 'marcos', 'lucas'] },
      { label: 'El cuarto Evangelio', books: ['juan'] }
    ]
  },
  {
    id: 'hechos',
    category: 'Históricos del NT',
    name: 'Hechos',
    testament: 'NT',
    color: 'var(--blue-accent)',
    books: ['hechos-de-los-apostoles'],
    mnemonic: 'Lucas escribió dos tomos: su Evangelio y luego los Hechos de los Apóstoles.',
    tip: 'Es el puente entre los Evangelios y las Cartas: cuenta cómo nace y se expande la Iglesia.',
    chunks: [
      { label: 'La Iglesia naciente', books: ['hechos-de-los-apostoles'] }
    ]
  },
  {
    id: 'paulinas',
    category: 'Epístolas Paulinas',
    name: 'Cartas de San Pablo',
    testament: 'NT',
    color: 'var(--cat-paulinas)',
    books: ['romanos', '1-corintios', '2-corintios', 'galatas', 'efesios', 'filipenses', 'colosenses', '1-tesalonicenses', '2-tesalonicenses', '1-timoteo', '2-timoteo', 'tito', 'filemon', 'hebreos'],
    mnemonic: 'Primero las cartas a comunidades, luego a personas, y al final Hebreos. Para Gálatas–Efesios–Filipenses–Colosenses: «Gran Esfuerzo, Fe y Constancia» (G-E-F-C).',
    tip: 'Dentro de cada bloque están ordenadas, a grandes rasgos, de la más larga a la más corta: por eso Romanos va primero y Filemón (una sola página) casi al final.',
    chunks: [
      { label: 'A comunidades (9)', books: ['romanos', '1-corintios', '2-corintios', 'galatas', 'efesios', 'filipenses', 'colosenses', '1-tesalonicenses', '2-tesalonicenses'] },
      { label: 'A personas (4)', books: ['1-timoteo', '2-timoteo', 'tito', 'filemon'] },
      { label: 'Cierre', books: ['hebreos'] }
    ]
  },
  {
    id: 'catolicas',
    category: 'Epístolas Católicas',
    name: 'Cartas Católicas',
    testament: 'NT',
    color: 'var(--cat-catolicas)',
    books: ['santiago', '1-pedro', '2-pedro', '1-juan', '2-juan', '3-juan', 'judas'],
    mnemonic: 'Santiago, Pedro, Juan y Judas: 1 + 2 + 3 + 1 cartas.',
    tip: 'Se llaman "católicas" (universales) porque no están dirigidas a una sola comunidad.',
    chunks: [
      { label: 'Santiago · Pedro · Juan · Judas', books: ['santiago', '1-pedro', '2-pedro', '1-juan', '2-juan', '3-juan', 'judas'] }
    ]
  },
  {
    id: 'apocalipsis',
    category: 'Apocalipsis',
    name: 'Apocalipsis',
    testament: 'NT',
    color: 'var(--cat-apocalipsis)',
    books: ['apocalipsis'],
    mnemonic: 'La Biblia empieza con la creación (Génesis) y termina con la "nueva creación" (Apocalipsis).',
    tip: 'Es el último libro de toda la Biblia.',
    chunks: [
      { label: 'Profecía final', books: ['apocalipsis'] }
    ]
  }
];

// ---------- Catálogo de actividades ----------
const ACTIVITIES = {
  next: {
    title: '¿Qué libro sigue?',
    description: 'Elige el libro que viene justo después (o justo antes) de otro.',
    icon: '➡️',
    questions: 10
  },
  section: {
    title: '¿En qué sección está?',
    description: 'Ubica cada libro en su bloque: así sabrás en qué parte de la Biblia buscarlo.',
    icon: '🗂️',
    questions: 10
  },
  first: {
    title: '¿Cuál va primero?',
    description: 'Dos libros, una pregunta: ¿cuál aparece antes en la Biblia?',
    icon: '⚖️',
    questions: 10
  },
  testament: {
    title: '¿Antiguo o Nuevo?',
    description: 'Decide rápidamente a qué Testamento pertenece cada libro.',
    icon: '📚',
    questions: 10
  },
  order: {
    title: 'Ordena la secuencia',
    description: 'Toca los libros en el orden correcto para reconstruir un tramo de la Biblia.',
    icon: '🔢',
    questions: 5
  },
  count: {
    title: '¿Cuántos libros tiene?',
    description: 'Aprende cuántos libros componen cada parte de la Biblia: bloques, Testamentos y la Biblia completa.',
    icon: '🧮',
    questions: 10
  },
  exam: {
    title: 'Examen mixto',
    description: 'Mezcla de todas las actividades. Ideal para comprobar lo aprendido.',
    icon: '🏆',
    questions: 12
  }
};

// ---------- Cursos ----------
const COURSES = [
  {
    id: 'orden-antiguo-testamento',
    icon: '📜',
    title: 'Orden del Antiguo Testamento',
    shortTitle: 'Antiguo Testamento',
    level: 'Básico',
    color: 'var(--cat-pentateuco)',
    description: 'Aprende los 46 libros del Antiguo Testamento, desde Génesis hasta Malaquías, agrupados en 5 bloques fáciles de recordar.',
    intro: 'El Antiguo Testamento católico tiene 46 libros. En lugar de memorizarlos uno por uno, apréndelos por bloques: Ley, Historia, Sabiduría y Profetas. Si sabes en qué bloque está un libro, sabrás más o menos en qué parte de la Biblia buscarlo.',
    note: 'Las Biblias protestantes tienen 39 libros en el AT: no incluyen Tobías, Judit, 1-2 Macabeos, Sabiduría, Eclesiástico ni Baruc (los deuterocanónicos).',
    groups: AT_GROUPS,
    activities: ['next', 'section', 'first', 'order', 'count', 'exam']
  },
  {
    id: 'orden-nuevo-testamento',
    icon: '✝️',
    title: 'Evangelios y Nuevo Testamento',
    shortTitle: 'Nuevo Testamento',
    level: 'Básico',
    color: 'var(--cat-evangelios)',
    description: 'Domina el orden de los 27 libros del Nuevo Testamento: los 4 Evangelios, Hechos, las Cartas y el Apocalipsis.',
    intro: 'El Nuevo Testamento tiene 27 libros y su orden es muy lógico: primero la vida de Jesús (Evangelios), luego la Iglesia naciente (Hechos), después las Cartas que guiaron a las comunidades y, al final, el Apocalipsis.',
    note: 'El orden del Nuevo Testamento es el mismo en las Biblias católicas, protestantes y ortodoxas.',
    groups: NT_GROUPS,
    activities: ['next', 'section', 'first', 'order', 'count', 'exam']
  },
  {
    id: 'mapa-biblia-completa',
    icon: '🗺️',
    title: 'Mapa de toda la Biblia',
    shortTitle: 'Biblia completa',
    level: 'Intermedio',
    color: 'var(--blue-accent)',
    description: 'Une ambos Testamentos: ubica cualquiera de los 73 libros en su sección y en su lugar aproximado.',
    intro: 'Cuando ya conozcas cada Testamento por separado, practica con la Biblia completa: 73 libros en 10 bloques. El objetivo es que, al escuchar el nombre de un libro, sepas al instante si está al principio, al medio o al final.',
    note: 'Recomendado después de completar los cursos del Antiguo y del Nuevo Testamento.',
    groups: [...AT_GROUPS, ...NT_GROUPS],
    activities: ['count', 'testament', 'section', 'first', 'next', 'exam']
  }
];

// ---------- Próximamente ----------
const UPCOMING_COURSES = [
  { icon: '👥', title: 'Quiz de personajes', description: '¿Quién fue hijo, discípulo o amigo de quién? Pon a prueba lo aprendido en la sección Personajes.' },
  { icon: '🧭', title: 'Geografía bíblica', description: 'Lugares clave de la historia de la salvación y los viajes de San Pablo.' },
  { icon: '🌾', title: 'Las parábolas de Jesús', description: 'Encuentra cada parábola en su Evangelio y descubre su enseñanza.' }
];
