/**
 * PERSONAJES BÍBLICOS Y SUS VÍNCULOS
 * --------------------------------------------------------------
 * - year: año aproximado de actividad (negativo = a.C.). null si no es datable.
 * - dates: texto mostrado al usuario (siempre aproximado).
 * - books: ids de BIBLE_BOOKS donde aparece principalmente.
 * - tradition: true si el dato proviene de la tradición y no del texto bíblico.
 *
 * Los vínculos se declaran una sola vez en RELATIONS; el motor (characters.js)
 * calcula automáticamente los vínculos inversos (padre ↔ hijo, maestro ↔ discípulo…)
 * y los hermanos a partir de padres compartidos.
 */

const ERAS = [
  { id: 'origenes', name: 'Orígenes', range: 'Relatos de los orígenes (sin datación histórica)', icon: '🌍' },
  { id: 'patriarcas', name: 'Patriarcas', range: 'c. 1850 – 1650 a.C. (fechas tradicionales)', icon: '⛺' },
  { id: 'exodo', name: 'Éxodo y conquista', range: 'c. 1300 – 1200 a.C.', icon: '🔥' },
  { id: 'jueces', name: 'Jueces', range: 'c. 1200 – 1030 a.C.', icon: '⚖️' },
  { id: 'reyes', name: 'Monarquía', range: 'c. 1030 – 930 a.C.', icon: '👑' },
  { id: 'profetas', name: 'Profetas', range: 'c. 870 – 570 a.C.', icon: '📯' },
  { id: 'exilio', name: 'Exilio y retorno', range: 'c. 500 – 400 a.C.', icon: '🏺' },
  { id: 'macabeos', name: 'Macabeos', range: 'c. 170 – 160 a.C.', icon: '🛡️' },
  { id: 'evangelios', name: 'Tiempo de Jesús', range: 'c. 6 a.C. – 30 d.C.', icon: '✝️' },
  { id: 'iglesia', name: 'Iglesia naciente', range: 'c. 30 – 100 d.C.', icon: '⛪' },
  { id: 'relatos', name: 'Relatos edificantes', range: 'Libros didácticos y sapienciales (época no fija)', icon: '📖' },
  { id: 'parabolas', name: 'Personajes de parábolas', range: 'Figuras de relatos de Jesús (no históricas)', icon: '🌾' }
];

const CHARACTERS = [
  // ---------------- ORÍGENES ----------------
  { id: 'adan', name: 'Adán', gender: 'm', era: 'origenes', role: 'Primer hombre', year: null, dates: 'Relato de los orígenes', places: ['Edén'], books: ['genesis'], refs: 'Gn 2–5', summary: 'Creado por Dios del polvo de la tierra. Con Eva, representa a toda la humanidad y su ruptura con Dios por el pecado.' },
  { id: 'eva', name: 'Eva', gender: 'f', era: 'origenes', role: 'Primera mujer', year: null, dates: 'Relato de los orígenes', places: ['Edén'], books: ['genesis'], refs: 'Gn 2–4', summary: '"Madre de todos los vivientes" (Gn 3,20). Esposa de Adán y madre de Caín, Abel y Set.' },
  { id: 'cain', name: 'Caín', gender: 'm', era: 'origenes', role: 'Agricultor', year: null, dates: 'Relato de los orígenes', places: ['Tierra de Nod'], books: ['genesis'], refs: 'Gn 4', summary: 'Primogénito de Adán y Eva. Por envidia mató a su hermano Abel: el primer fratricidio de la Biblia.' },
  { id: 'abel', name: 'Abel', gender: 'm', era: 'origenes', role: 'Pastor', year: null, dates: 'Relato de los orígenes', places: [], books: ['genesis', 'hebreos'], refs: 'Gn 4; Hb 11,4', summary: 'Pastor cuya ofrenda agradó a Dios. Asesinado por Caín, es figura del justo inocente.' },
  { id: 'set', name: 'Set', gender: 'm', era: 'origenes', role: 'Hijo de Adán', year: null, dates: 'Relato de los orígenes', places: [], books: ['genesis', 'lucas'], refs: 'Gn 4,25–5,8', summary: 'Hijo dado a Adán y Eva tras la muerte de Abel. De su línea desciende Noé.' },
  { id: 'noe', name: 'Noé', gender: 'm', era: 'origenes', role: 'Justo del diluvio', year: null, dates: 'Relato de los orígenes', places: ['Monte Ararat'], books: ['genesis'], refs: 'Gn 6–9', summary: 'Hombre justo que construyó el arca. Con él Dios establece una alianza con toda la creación, sellada con el arco iris.' },
  { id: 'sem', name: 'Sem', gender: 'm', era: 'origenes', role: 'Hijo de Noé', year: null, dates: 'Relato de los orígenes', places: [], books: ['genesis'], refs: 'Gn 9–11', summary: 'Hijo de Noé, antepasado de los pueblos "semitas" y, a través de varias generaciones, de Abraham.' },

  // ---------------- PATRIARCAS ----------------
  { id: 'tare', name: 'Taré', gender: 'm', era: 'patriarcas', role: 'Padre de Abraham', year: -1900, dates: 'c. s. XIX a.C. (tradicional)', places: ['Ur de los caldeos', 'Harán'], books: ['genesis'], refs: 'Gn 11,24-32', summary: 'Descendiente de Sem. Salió de Ur con su familia rumbo a Canaán, pero se estableció y murió en Harán.' },
  { id: 'abraham', name: 'Abraham', gender: 'm', era: 'patriarcas', role: 'Padre de la fe', year: -1850, dates: 'c. 1850 a.C. (tradicional)', places: ['Ur de los caldeos', 'Harán', 'Hebrón (Canaán)'], books: ['genesis', 'romanos', 'hebreos'], refs: 'Gn 11,26–25,11', summary: 'Llamado por Dios a dejar su tierra, recibió la promesa de una descendencia numerosa y de la tierra de Canaán. Padre en la fe de judíos, cristianos y musulmanes.' },
  { id: 'sara', name: 'Sara', gender: 'f', era: 'patriarcas', role: 'Matriarca', year: -1850, dates: 'c. 1850 a.C. (tradicional)', places: ['Ur de los caldeos', 'Hebrón'], books: ['genesis', 'hebreos'], refs: 'Gn 11–23', summary: 'Esposa de Abraham. Estéril durante años, concibió en su vejez a Isaac, el hijo de la promesa.' },
  { id: 'agar', name: 'Agar', gender: 'f', era: 'patriarcas', role: 'Sierva egipcia', year: -1840, dates: 'c. 1840 a.C. (tradicional)', places: ['Egipto', 'Desierto de Berseba'], books: ['genesis', 'galatas'], refs: 'Gn 16; 21', summary: 'Esclava de Sara, que la dio a Abraham como mujer. Madre de Ismael; Dios la escuchó en el desierto.' },
  { id: 'lot', name: 'Lot', gender: 'm', era: 'patriarcas', role: 'Sobrino de Abraham', year: -1840, dates: 'c. 1840 a.C. (tradicional)', places: ['Harán', 'Sodoma', 'Soar'], books: ['genesis'], refs: 'Gn 11–19', summary: 'Acompañó a Abraham desde Harán. Se estableció en Sodoma y fue salvado de su destrucción.' },
  { id: 'ismael', name: 'Ismael', gender: 'm', era: 'patriarcas', role: 'Primogénito de Abraham', year: -1800, dates: 'c. 1800 a.C. (tradicional)', places: ['Desierto de Parán'], books: ['genesis'], refs: 'Gn 16; 21; 25', summary: 'Hijo de Abraham y Agar. Dios prometió hacer de él una gran nación.' },
  { id: 'isaac', name: 'Isaac', gender: 'm', era: 'patriarcas', role: 'Hijo de la promesa', year: -1780, dates: 'c. 1780 a.C. (tradicional)', places: ['Berseba', 'Guerar', 'Hebrón'], books: ['genesis'], refs: 'Gn 21–35', summary: 'Hijo de Abraham y Sara. Su "sacrificio" en el monte Moria es figura de la entrega del Hijo.' },
  { id: 'rebeca', name: 'Rebeca', gender: 'f', era: 'patriarcas', role: 'Matriarca', year: -1770, dates: 'c. 1770 a.C. (tradicional)', places: ['Harán (Aram)', 'Berseba'], books: ['genesis'], refs: 'Gn 24–27', summary: 'Esposa de Isaac, traída desde Harán. Madre de los mellizos Esaú y Jacob.' },
  { id: 'esau', name: 'Esaú', gender: 'm', era: 'patriarcas', role: 'Padre de Edom', year: -1720, dates: 'c. 1720 a.C. (tradicional)', places: ['Seír (Edom)'], books: ['genesis'], refs: 'Gn 25–36', summary: 'Mellizo mayor de Jacob. Vendió su primogenitura por un plato de lentejas; antepasado de los edomitas.' },
  { id: 'jacob', name: 'Jacob (Israel)', gender: 'm', era: 'patriarcas', role: 'Padre de las 12 tribus', year: -1720, dates: 'c. 1720 a.C. (tradicional)', places: ['Berseba', 'Harán', 'Betel', 'Egipto'], books: ['genesis'], refs: 'Gn 25–50', summary: 'Hijo de Isaac. Tras luchar con Dios recibió el nombre de Israel. Sus doce hijos dan nombre a las tribus.' },
  { id: 'lia', name: 'Lía', gender: 'f', era: 'patriarcas', role: 'Matriarca', year: -1700, dates: 'c. 1700 a.C. (tradicional)', places: ['Harán', 'Canaán'], books: ['genesis', 'rut'], refs: 'Gn 29–31', summary: 'Primera esposa de Jacob, hermana de Raquel. Madre de seis tribus, entre ellas Leví y Judá.' },
  { id: 'raquel', name: 'Raquel', gender: 'f', era: 'patriarcas', role: 'Matriarca', year: -1700, dates: 'c. 1700 a.C. (tradicional)', places: ['Harán', 'Belén (tumba)'], books: ['genesis', 'jeremias', 'mateo'], refs: 'Gn 29–35', summary: 'Esposa amada de Jacob. Madre de José y Benjamín; murió al dar a luz cerca de Belén.' },
  { id: 'levi', name: 'Leví', gender: 'm', era: 'patriarcas', role: 'Padre de la tribu sacerdotal', year: -1680, dates: 'c. 1680 a.C. (tradicional)', places: ['Canaán', 'Egipto'], books: ['genesis', 'exodo'], refs: 'Gn 29,34; Ex 6,16-20', summary: 'Tercer hijo de Jacob y Lía. De su tribu nacen Moisés, Aarón y el sacerdocio levítico.' },
  { id: 'juda', name: 'Judá', gender: 'm', era: 'patriarcas', role: 'Padre de la tribu real', year: -1680, dates: 'c. 1680 a.C. (tradicional)', places: ['Canaán', 'Egipto'], books: ['genesis', 'mateo'], refs: 'Gn 29,35; 38; 49,8-12', summary: 'Cuarto hijo de Jacob y Lía. De su tribu vienen el rey David y, según los Evangelios, Jesús.' },
  { id: 'jose-patriarca', name: 'José (hijo de Jacob)', gender: 'm', era: 'patriarcas', role: 'Virrey de Egipto', year: -1670, dates: 'c. 1670 a.C. (tradicional)', places: ['Canaán', 'Egipto'], books: ['genesis'], refs: 'Gn 37–50', summary: 'Vendido por sus hermanos, llegó a ser gobernador de Egipto y salvó a su familia del hambre.' },
  { id: 'benjamin', name: 'Benjamín', gender: 'm', era: 'patriarcas', role: 'Hijo menor de Jacob', year: -1660, dates: 'c. 1660 a.C. (tradicional)', places: ['Belén', 'Egipto'], books: ['genesis'], refs: 'Gn 35,18; 42–45', summary: 'Último hijo de Jacob y Raquel. De su tribu saldrán el rey Saúl, Mardoqueo y San Pablo.' },

  // ---------------- ÉXODO ----------------
  { id: 'moises', name: 'Moisés', gender: 'm', era: 'exodo', role: 'Libertador y legislador', year: -1250, dates: 'c. s. XIII a.C.', places: ['Egipto', 'Madián', 'Monte Sinaí', 'Monte Nebo (muerte)'], books: ['exodo', 'levitico', 'numeros', 'deuteronomio'], refs: 'Ex 2 – Dt 34', summary: 'Sacó a Israel de la esclavitud de Egipto y recibió la Ley en el Sinaí. Murió a la vista de la Tierra Prometida.' },
  { id: 'aaron', name: 'Aarón', gender: 'm', era: 'exodo', role: 'Primer sumo sacerdote', year: -1250, dates: 'c. s. XIII a.C.', places: ['Egipto', 'Sinaí', 'Monte Hor (muerte)'], books: ['exodo', 'levitico', 'numeros'], refs: 'Ex 4 – Nm 20', summary: 'Hermano mayor de Moisés y su portavoz ante el faraón. Primer sumo sacerdote de Israel.' },
  { id: 'miriam', name: 'Miriam', gender: 'f', era: 'exodo', role: 'Profetisa', year: -1250, dates: 'c. s. XIII a.C.', places: ['Egipto', 'Cades'], books: ['exodo', 'numeros'], refs: 'Ex 2; 15,20-21; Nm 12', summary: 'Hermana de Moisés y Aarón. Cantó y danzó tras el paso del mar Rojo.' },
  { id: 'sefora', name: 'Séfora', gender: 'f', era: 'exodo', role: 'Esposa de Moisés', year: -1240, dates: 'c. s. XIII a.C.', places: ['Madián'], books: ['exodo'], refs: 'Ex 2,21; 4,24-26; 18', summary: 'Hija de Jetró, sacerdote de Madián. Esposa de Moisés.' },
  { id: 'josue', name: 'Josué', gender: 'm', era: 'exodo', role: 'Sucesor de Moisés', year: -1200, dates: 'c. 1200 a.C.', places: ['Egipto', 'Jericó', 'Siquén'], books: ['exodo', 'numeros', 'josue'], refs: 'Ex 17; Jos 1–24', summary: 'Ayudante de Moisés y su sucesor. Condujo a Israel a la Tierra Prometida.' },

  // ---------------- JUECES ----------------
  { id: 'debora', name: 'Débora', gender: 'f', era: 'jueces', role: 'Jueza y profetisa', year: -1125, dates: 'c. 1125 a.C.', places: ['Entre Ramá y Betel', 'Monte Tabor'], books: ['jueces'], refs: 'Jc 4–5', summary: 'Única mujer juez de Israel. Animó a Barac a vencer a Sísara; su cántico es uno de los textos más antiguos de la Biblia.' },
  { id: 'gedeon', name: 'Gedeón', gender: 'm', era: 'jueces', role: 'Juez', year: -1100, dates: 'c. 1100 a.C.', places: ['Ofrá (Manasés)'], books: ['jueces'], refs: 'Jc 6–8', summary: 'Con solo 300 hombres derrotó a los madianitas, mostrando que la victoria viene de Dios.' },
  { id: 'sanson', name: 'Sansón', gender: 'm', era: 'jueces', role: 'Juez nazireo', year: -1075, dates: 'c. 1075 a.C.', places: ['Sorá', 'Gaza'], books: ['jueces'], refs: 'Jc 13–16', summary: 'Consagrado a Dios desde su nacimiento, su fuerza estaba ligada a su voto. Luchó contra los filisteos.' },
  { id: 'noemi', name: 'Noemí', gender: 'f', era: 'jueces', role: 'Suegra de Rut', year: -1100, dates: 'c. 1100 a.C.', places: ['Belén', 'Moab'], books: ['rut'], refs: 'Rt 1–4', summary: 'Viuda de Belén que emigró a Moab. Volvió acompañada de su nuera Rut.' },
  { id: 'rut', name: 'Rut', gender: 'f', era: 'jueces', role: 'Moabita fiel', year: -1100, dates: 'c. 1100 a.C.', places: ['Moab', 'Belén'], books: ['rut', 'mateo'], refs: 'Rt 1–4; Mt 1,5', summary: 'Extranjera que eligió al Dios de Israel: "tu pueblo será mi pueblo". Bisabuela del rey David.' },
  { id: 'booz', name: 'Booz', gender: 'm', era: 'jueces', role: 'Pariente redentor', year: -1100, dates: 'c. 1100 a.C.', places: ['Belén'], books: ['rut', 'mateo'], refs: 'Rt 2–4', summary: 'Rico propietario de Belén que rescató la herencia de Noemí y se casó con Rut.' },
  { id: 'obed', name: 'Obed', gender: 'm', era: 'jueces', role: 'Abuelo de David', year: -1070, dates: 'c. 1070 a.C.', places: ['Belén'], books: ['rut', 'mateo'], refs: 'Rt 4,17', summary: 'Hijo de Booz y Rut, padre de Jesé.' },
  { id: 'jese', name: 'Jesé', gender: 'm', era: 'jueces', role: 'Padre de David', year: -1040, dates: 'c. 1040 a.C.', places: ['Belén'], books: ['1-samuel', 'isaias'], refs: '1 S 16; Is 11,1', summary: 'Belemita padre de ocho hijos, el menor de ellos David. Isaías anuncia un "retoño del tronco de Jesé".' },
  { id: 'eli', name: 'Elí', gender: 'm', era: 'jueces', role: 'Sacerdote de Siló', year: -1080, dates: 'c. 1080 a.C.', places: ['Siló'], books: ['1-samuel'], refs: '1 S 1–4', summary: 'Sacerdote del santuario de Siló que crió y formó al joven Samuel.' },
  { id: 'ana-madre-samuel', name: 'Ana (madre de Samuel)', gender: 'f', era: 'jueces', role: 'Madre orante', year: -1080, dates: 'c. 1080 a.C.', places: ['Ramá', 'Siló'], books: ['1-samuel'], refs: '1 S 1–2', summary: 'Estéril, pidió un hijo en oración y lo consagró a Dios. Su cántico inspira el Magníficat.' },
  { id: 'samuel', name: 'Samuel', gender: 'm', era: 'jueces', role: 'Último juez y profeta', year: -1050, dates: 'c. 1070 – 1010 a.C.', places: ['Ramá', 'Siló'], books: ['1-samuel'], refs: '1 S 1–25', summary: 'Profeta y último de los jueces. Ungió a Saúl y luego a David como reyes de Israel.' },

  // ---------------- MONARQUÍA ----------------
  { id: 'saul', name: 'Saúl', gender: 'm', era: 'reyes', role: 'Primer rey de Israel', year: -1020, dates: 'reinó c. 1030 – 1010 a.C.', places: ['Guibeá', 'Monte Gelboé (muerte)'], books: ['1-samuel'], refs: '1 S 9–31', summary: 'Benjaminita ungido por Samuel. Su desobediencia lo llevó a ser rechazado; murió en batalla contra los filisteos.' },
  { id: 'jonatan', name: 'Jonatán', gender: 'm', era: 'reyes', role: 'Príncipe', year: -1015, dates: 'c. 1015 a.C.', places: ['Guibeá', 'Monte Gelboé'], books: ['1-samuel', '2-samuel'], refs: '1 S 13–31; 2 S 1', summary: 'Hijo de Saúl y gran amigo de David, con quien hizo una alianza de amistad.' },
  { id: 'mical', name: 'Mical', gender: 'f', era: 'reyes', role: 'Princesa', year: -1000, dates: 'c. 1000 a.C.', places: ['Guibeá', 'Jerusalén'], books: ['1-samuel', '2-samuel'], refs: '1 S 18–19; 2 S 6', summary: 'Hija de Saúl y primera esposa de David; lo salvó de la persecución de su padre.' },
  { id: 'david', name: 'David', gender: 'm', era: 'reyes', role: 'Rey de Israel', year: -990, dates: 'reinó c. 1010 – 970 a.C.', places: ['Belén', 'Hebrón', 'Jerusalén'], books: ['1-samuel', '2-samuel', '1-reyes', '1-cronicas', 'salmos'], refs: '1 S 16 – 1 R 2', summary: 'Pastor de Belén ungido rey. Hizo de Jerusalén la capital; Dios le prometió una dinastía eterna, cumplida en el Mesías, "hijo de David".' },
  { id: 'betsabe', name: 'Betsabé', gender: 'f', era: 'reyes', role: 'Reina madre', year: -980, dates: 'c. 980 a.C.', places: ['Jerusalén'], books: ['2-samuel', '1-reyes', 'mateo'], refs: '2 S 11–12; 1 R 1–2', summary: 'Esposa de Urías y luego de David. Madre del rey Salomón.' },
  { id: 'natan', name: 'Natán', gender: 'm', era: 'reyes', role: 'Profeta de la corte', year: -980, dates: 'c. 980 a.C.', places: ['Jerusalén'], books: ['2-samuel', '1-reyes'], refs: '2 S 7; 12; 1 R 1', summary: 'Profeta que anunció a David la promesa dinástica y le reprochó su pecado con Betsabé.' },
  { id: 'salomon', name: 'Salomón', gender: 'm', era: 'reyes', role: 'Rey sabio', year: -950, dates: 'reinó c. 970 – 931 a.C.', places: ['Jerusalén'], books: ['1-reyes', '2-cronicas', 'proverbios', 'cantar-de-los-cantares'], refs: '1 R 1–11', summary: 'Hijo de David y Betsabé. Famoso por su sabiduría, construyó el Templo de Jerusalén.' },
  { id: 'roboam', name: 'Roboam', gender: 'm', era: 'reyes', role: 'Rey de Judá', year: -920, dates: 'reinó c. 931 – 913 a.C.', places: ['Jerusalén', 'Siquén'], books: ['1-reyes', '2-cronicas', 'mateo'], refs: '1 R 12–14', summary: 'Hijo de Salomón. Bajo su reinado el reino se dividió en Israel (norte) y Judá (sur).' },

  // ---------------- PROFETAS ----------------
  { id: 'elias', name: 'Elías', gender: 'm', era: 'profetas', role: 'Profeta', year: -860, dates: 'c. 870 – 850 a.C.', places: ['Tisbé (Galaad)', 'Monte Carmelo', 'Monte Horeb'], books: ['1-reyes', '2-reyes', 'malaquias'], refs: '1 R 17 – 2 R 2', summary: 'Defensor del Dios único frente al culto a Baal en tiempos del rey Ajab. Arrebatado al cielo en un carro de fuego.' },
  { id: 'eliseo', name: 'Eliseo', gender: 'm', era: 'profetas', role: 'Profeta', year: -840, dates: 'c. 850 – 800 a.C.', places: ['Abel-Mejolá', 'Samaria', 'Jericó'], books: ['2-reyes'], refs: '1 R 19,19-21; 2 R 2–13', summary: 'Discípulo y sucesor de Elías, de quien recibió "una doble porción de su espíritu".' },
  { id: 'isaias', name: 'Isaías', gender: 'm', era: 'profetas', role: 'Profeta mayor', year: -720, dates: 'activo c. 740 – 700 a.C.', places: ['Jerusalén'], books: ['isaias', '2-reyes'], refs: 'Is 1–39', summary: 'Profeta de la santidad de Dios. Anunció al Emmanuel y al Siervo sufriente.' },
  { id: 'jeremias', name: 'Jeremías', gender: 'm', era: 'profetas', role: 'Profeta mayor', year: -600, dates: 'activo c. 627 – 586 a.C.', places: ['Anatot', 'Jerusalén', 'Egipto'], books: ['jeremias', 'lamentaciones'], refs: 'Jr 1–52', summary: 'Anunció la caída de Jerusalén y una Nueva Alianza escrita en el corazón.' },
  { id: 'baruc', name: 'Baruc', gender: 'm', era: 'profetas', role: 'Secretario de Jeremías', year: -595, dates: 'c. 600 a.C.', places: ['Jerusalén', 'Egipto', 'Babilonia (trad.)'], books: ['jeremias', 'baruc'], refs: 'Jr 36; 45', summary: 'Escriba que puso por escrito los oráculos de Jeremías.' },
  { id: 'ezequiel', name: 'Ezequiel', gender: 'm', era: 'profetas', role: 'Profeta del exilio', year: -580, dates: 'activo c. 593 – 571 a.C.', places: ['Jerusalén', 'Babilonia (río Kebar)'], books: ['ezequiel'], refs: 'Ez 1–48', summary: 'Sacerdote deportado a Babilonia. Su visión de los huesos secos anuncia la resurrección del pueblo.' },
  { id: 'daniel', name: 'Daniel', gender: 'm', era: 'profetas', role: 'Profeta en Babilonia', year: -570, dates: 'relato ambientado en el s. VI a.C.', places: ['Jerusalén', 'Babilonia'], books: ['daniel'], refs: 'Dn 1–14', summary: 'Joven judío fiel en la corte de Babilonia. Salvado del foso de los leones; visión del "Hijo del hombre".' },

  // ---------------- EXILIO Y RETORNO ----------------
  { id: 'mardoqueo', name: 'Mardoqueo', gender: 'm', era: 'exilio', role: 'Judío en la corte persa', year: -475, dates: 'ambientado c. 480 – 465 a.C.', places: ['Susa (Persia)'], books: ['ester'], refs: 'Est 2–10', summary: 'Benjaminita que crió a su prima Ester y desbarató el complot de Amán contra los judíos.' },
  { id: 'ester', name: 'Ester', gender: 'f', era: 'exilio', role: 'Reina de Persia', year: -475, dates: 'ambientado c. 480 – 465 a.C.', places: ['Susa (Persia)'], books: ['ester'], refs: 'Est 1–10', summary: 'Judía que llegó a ser reina y arriesgó su vida para salvar a su pueblo.' },
  { id: 'esdras', name: 'Esdras', gender: 'm', era: 'exilio', role: 'Sacerdote y escriba', year: -458, dates: 'c. 458 a.C.', places: ['Babilonia', 'Jerusalén'], books: ['esdras', 'nehemias'], refs: 'Esd 7–10; Ne 8', summary: 'Escriba experto en la Ley de Moisés. Reorganizó la vida religiosa de los repatriados.' },
  { id: 'nehemias', name: 'Nehemías', gender: 'm', era: 'exilio', role: 'Gobernador de Judá', year: -445, dates: 'c. 445 – 430 a.C.', places: ['Susa (Persia)', 'Jerusalén'], books: ['nehemias'], refs: 'Ne 1–13', summary: 'Copero del rey persa que volvió a Jerusalén para reconstruir sus murallas.' },

  // ---------------- MACABEOS ----------------
  { id: 'matatias', name: 'Matatías', gender: 'm', era: 'macabeos', role: 'Sacerdote rebelde', year: -167, dates: 'm. c. 166 a.C.', places: ['Modín'], books: ['1-macabeos'], refs: '1 M 2', summary: 'Sacerdote que se negó a sacrificar a los ídolos e inició la rebelión contra Antíoco IV.' },
  { id: 'judas-macabeo', name: 'Judas Macabeo', gender: 'm', era: 'macabeos', role: 'Caudillo', year: -164, dates: 'm. c. 160 a.C.', places: ['Modín', 'Jerusalén'], books: ['1-macabeos', '2-macabeos'], refs: '1 M 3–9; 2 M 8–15', summary: 'Hijo de Matatías. Recuperó Jerusalén y purificó el Templo (origen de la fiesta de Janucá).' },

  // ---------------- TIEMPO DE JESÚS ----------------
  { id: 'joaquin', name: 'Joaquín', gender: 'm', era: 'evangelios', role: 'Padre de María (tradición)', year: -40, dates: 's. I a.C.', places: ['Jerusalén / Séforis (trad.)'], books: [], refs: 'Protoevangelio de Santiago (s. II)', tradition: true, summary: 'Su nombre no aparece en la Biblia: lo transmite la tradición cristiana como padre de la Virgen María.' },
  { id: 'ana-madre-maria', name: 'Ana (madre de María)', gender: 'f', era: 'evangelios', role: 'Madre de María (tradición)', year: -40, dates: 's. I a.C.', places: ['Jerusalén (trad.)'], books: [], refs: 'Protoevangelio de Santiago (s. II)', tradition: true, summary: 'Conocida por la tradición como madre de la Virgen María y esposa de Joaquín.' },
  { id: 'zacarias', name: 'Zacarías', gender: 'm', era: 'evangelios', role: 'Sacerdote', year: -10, dates: 'finales del s. I a.C.', places: ['Montaña de Judea', 'Templo de Jerusalén'], books: ['lucas'], refs: 'Lc 1', summary: 'Sacerdote a quien el ángel Gabriel anunció el nacimiento de Juan. Autor del cántico Benedictus.' },
  { id: 'isabel', name: 'Isabel', gender: 'f', era: 'evangelios', role: 'Madre del Bautista', year: -10, dates: 'finales del s. I a.C.', places: ['Montaña de Judea (Ain Karim, trad.)'], books: ['lucas'], refs: 'Lc 1', summary: 'Pariente de María, de linaje sacerdotal. Concibió a Juan en su vejez y recibió la visita de María.' },
  { id: 'maria', name: 'María', gender: 'f', era: 'evangelios', role: 'Madre de Jesús', year: 0, dates: 'c. 20 a.C. – s. I d.C.', places: ['Nazaret', 'Belén', 'Jerusalén', 'Éfeso (trad.)'], books: ['mateo', 'lucas', 'juan', 'hechos-de-los-apostoles'], refs: 'Lc 1–2; Jn 2; 19; Hch 1,14', summary: 'Virgen de Nazaret elegida para ser Madre del Hijo de Dios. Presente al pie de la cruz y en Pentecostés.' },
  { id: 'jose', name: 'José de Nazaret', gender: 'm', era: 'evangelios', role: 'Esposo de María', year: 0, dates: 's. I a.C. – s. I d.C.', places: ['Belén', 'Nazaret', 'Egipto'], books: ['mateo', 'lucas'], refs: 'Mt 1–2; Lc 1–2', summary: 'Carpintero, "hombre justo", de la casa de David. Esposo de María y padre legal de Jesús.' },
  { id: 'jesus', name: 'Jesús de Nazaret', gender: 'm', era: 'evangelios', role: 'El Mesías, Hijo de Dios', year: 0, dates: 'c. 6/4 a.C. – c. 30 d.C.', places: ['Belén', 'Nazaret', 'Cafarnaúm', 'Jerusalén'], books: ['mateo', 'marcos', 'lucas', 'juan'], refs: 'Evangelios', summary: 'Nacido en Belén y criado en Nazaret, anunció el Reino de Dios en Galilea y Judea. Crucificado en Jerusalén bajo Poncio Pilato, resucitó al tercer día.' },
  { id: 'juan-bautista', name: 'Juan el Bautista', gender: 'm', era: 'evangelios', role: 'Precursor', year: 25, dates: 'c. 6 a.C. – c. 29 d.C.', places: ['Montaña de Judea', 'Desierto de Judea', 'Río Jordán', 'Maqueronte (muerte)'], books: ['mateo', 'marcos', 'lucas', 'juan'], refs: 'Lc 1; 3; Mc 1; 6', summary: 'Hijo de Zacarías e Isabel. Predicó la conversión y bautizó a Jesús en el Jordán. Decapitado por Herodes Antipas.' },
  { id: 'zebedeo', name: 'Zebedeo', gender: 'm', era: 'evangelios', role: 'Pescador de Galilea', year: 0, dates: 's. I d.C.', places: ['Mar de Galilea'], books: ['mateo', 'marcos'], refs: 'Mc 1,19-20', summary: 'Pescador, padre de los apóstoles Santiago y Juan.' },
  { id: 'pedro', name: 'Simón Pedro', gender: 'm', era: 'evangelios', role: 'Apóstol, cabeza de los Doce', year: 30, dates: 'm. c. 64–67 d.C. en Roma', places: ['Betsaida', 'Cafarnaúm', 'Jerusalén', 'Antioquía', 'Roma'], books: ['mateo', 'marcos', 'lucas', 'juan', 'hechos-de-los-apostoles', '1-pedro', '2-pedro'], refs: 'Mt 16,18; Jn 21; Hch 1–15', summary: 'Pescador de Galilea llamado por Jesús, que le dio el nombre de Pedro ("roca"). Guió a la Iglesia naciente y murió mártir en Roma.' },
  { id: 'andres', name: 'Andrés', gender: 'm', era: 'evangelios', role: 'Apóstol', year: 30, dates: 's. I d.C.', places: ['Betsaida', 'Cafarnaúm'], books: ['juan', 'marcos'], refs: 'Jn 1,35-42', summary: 'Primero fue discípulo de Juan el Bautista; luego siguió a Jesús y le llevó a su hermano Simón.' },
  { id: 'santiago-mayor', name: 'Santiago el Mayor', gender: 'm', era: 'evangelios', role: 'Apóstol', year: 30, dates: 'm. 44 d.C. en Jerusalén', places: ['Galilea', 'Jerusalén'], books: ['marcos', 'hechos-de-los-apostoles'], refs: 'Mc 1,19; 3,17; Hch 12,2', summary: 'Hijo de Zebedeo y hermano de Juan. Primer apóstol mártir, ejecutado por Herodes Agripa I.' },
  { id: 'juan-apostol', name: 'Juan, apóstol', gender: 'm', era: 'evangelios', role: 'Apóstol', year: 30, dates: 'm. c. 100 d.C. en Éfeso (trad.)', places: ['Galilea', 'Jerusalén', 'Éfeso', 'Patmos'], books: ['juan', '1-juan', '2-juan', '3-juan', 'apocalipsis'], refs: 'Mc 1,19; Jn 13,23; 19,26-27', summary: 'Hijo de Zebedeo. La tradición lo identifica con el "discípulo amado", a quien Jesús confió a su madre.' },
  { id: 'mateo-apostol', name: 'Mateo (Leví)', gender: 'm', era: 'evangelios', role: 'Apóstol y evangelista', year: 30, dates: 's. I d.C.', places: ['Cafarnaúm'], books: ['mateo'], refs: 'Mt 9,9', summary: 'Recaudador de impuestos llamado por Jesús. La tradición le atribuye el primer Evangelio.' },
  { id: 'tomas', name: 'Tomás', gender: 'm', era: 'evangelios', role: 'Apóstol', year: 30, dates: 's. I d.C.', places: ['Galilea', 'India (trad.)'], books: ['juan'], refs: 'Jn 11,16; 20,24-29', summary: 'Llamado "el Mellizo". Dudó de la resurrección hasta ver a Jesús: "¡Señor mío y Dios mío!".' },
  { id: 'judas-iscariote', name: 'Judas Iscariote', gender: 'm', era: 'evangelios', role: 'Apóstol que traicionó', year: 30, dates: 'm. c. 30 d.C.', places: ['Jerusalén'], books: ['mateo', 'juan', 'hechos-de-los-apostoles'], refs: 'Mt 26–27; Hch 1', summary: 'Uno de los Doce, encargado de la bolsa común. Entregó a Jesús por treinta monedas de plata.' },
  { id: 'maria-magdalena', name: 'María Magdalena', gender: 'f', era: 'evangelios', role: 'Discípula', year: 30, dates: 's. I d.C.', places: ['Magdala', 'Jerusalén'], books: ['lucas', 'juan'], refs: 'Lc 8,2; Jn 20,1-18', summary: 'Seguidora de Jesús desde Galilea, presente en la cruz. Primera testigo del Resucitado, "apóstol de los apóstoles".' },
  { id: 'lazaro', name: 'Lázaro', gender: 'm', era: 'evangelios', role: 'Amigo de Jesús', year: 30, dates: 's. I d.C.', places: ['Betania'], books: ['juan'], refs: 'Jn 11–12', summary: 'Hermano de Marta y María. Jesús lloró ante su tumba y lo resucitó.' },
  { id: 'marta', name: 'Marta', gender: 'f', era: 'evangelios', role: 'Amiga de Jesús', year: 30, dates: 's. I d.C.', places: ['Betania'], books: ['lucas', 'juan'], refs: 'Lc 10,38-42; Jn 11', summary: 'Hermana de María y Lázaro. Recibió a Jesús en su casa y confesó: "Tú eres el Cristo".' },
  { id: 'maria-betania', name: 'María de Betania', gender: 'f', era: 'evangelios', role: 'Amiga de Jesús', year: 30, dates: 's. I d.C.', places: ['Betania'], books: ['lucas', 'juan'], refs: 'Lc 10,39; Jn 11; 12,1-8', summary: 'Hermana de Marta y Lázaro. Escuchaba a los pies de Jesús y lo ungió con perfume.' },

  // ---------------- IGLESIA NACIENTE ----------------
  { id: 'santiago-hermano', name: 'Santiago, "hermano del Señor"', gender: 'm', era: 'iglesia', role: 'Líder de la Iglesia de Jerusalén', year: 45, dates: 'm. 62 d.C. en Jerusalén', places: ['Nazaret', 'Jerusalén'], books: ['hechos-de-los-apostoles', 'galatas', 'santiago'], refs: 'Mc 6,3; Hch 15; Ga 1,19', summary: 'Guía de la comunidad de Jerusalén. La Escritura lo llama "hermano del Señor"; la tradición católica lo entiende como pariente cercano.' },
  { id: 'esteban', name: 'Esteban', gender: 'm', era: 'iglesia', role: 'Diácono y primer mártir', year: 34, dates: 'm. c. 34–36 d.C.', places: ['Jerusalén'], books: ['hechos-de-los-apostoles'], refs: 'Hch 6–7', summary: 'Uno de los siete diáconos. Murió apedreado perdonando a sus verdugos.' },
  { id: 'gamaliel', name: 'Gamaliel', gender: 'm', era: 'iglesia', role: 'Maestro fariseo', year: 30, dates: 'activo c. 20 – 50 d.C.', places: ['Jerusalén'], books: ['hechos-de-los-apostoles'], refs: 'Hch 5,34-39; 22,3', summary: 'Doctor de la Ley muy respetado. Aconsejó prudencia ante los apóstoles; fue maestro de Pablo.' },
  { id: 'pablo', name: 'Pablo de Tarso', gender: 'm', era: 'iglesia', role: 'Apóstol de los gentiles', year: 50, dates: 'c. 5/10 – c. 64/67 d.C.', places: ['Tarso', 'Jerusalén', 'Damasco', 'Antioquía', 'Éfeso', 'Corinto', 'Roma'], books: ['hechos-de-los-apostoles', 'romanos', '1-corintios', 'galatas', 'filipenses'], refs: 'Hch 7–28; Cartas paulinas', summary: 'Fariseo de la tribu de Benjamín, perseguidor convertido camino de Damasco. Llevó el Evangelio por el Mediterráneo y murió mártir en Roma.' },
  { id: 'bernabe', name: 'Bernabé', gender: 'm', era: 'iglesia', role: 'Misionero', year: 45, dates: 's. I d.C.', places: ['Chipre', 'Jerusalén', 'Antioquía'], books: ['hechos-de-los-apostoles'], refs: 'Hch 4,36; 9,27; 13–15', summary: 'Levita de Chipre, "hijo de la consolación". Presentó a Pablo a los apóstoles y lo acompañó en su primer viaje.' },
  { id: 'marcos', name: 'Juan Marcos', gender: 'm', era: 'iglesia', role: 'Evangelista', year: 50, dates: 's. I d.C.', places: ['Jerusalén', 'Chipre', 'Roma', 'Alejandría (trad.)'], books: ['marcos', 'hechos-de-los-apostoles'], refs: 'Hch 12,12; 13,5; Col 4,10; 1 P 5,13', summary: 'Primo de Bernabé y colaborador de Pablo y de Pedro. La tradición le atribuye el segundo Evangelio.' },
  { id: 'silas', name: 'Silas (Silvano)', gender: 'm', era: 'iglesia', role: 'Misionero', year: 50, dates: 's. I d.C.', places: ['Jerusalén', 'Filipos', 'Tesalónica', 'Corinto'], books: ['hechos-de-los-apostoles', '1-tesalonicenses', '1-pedro'], refs: 'Hch 15,40 – 18,5', summary: 'Compañero de Pablo en su segundo viaje; encarcelado con él en Filipos.' },
  { id: 'timoteo', name: 'Timoteo', gender: 'm', era: 'iglesia', role: 'Discípulo y obispo', year: 55, dates: 's. I d.C.', places: ['Listra', 'Éfeso'], books: ['hechos-de-los-apostoles', '1-timoteo', '2-timoteo'], refs: 'Hch 16,1-3; 1 Tm 1,2', summary: 'Joven de Listra, "verdadero hijo en la fe" de Pablo. Guió la comunidad de Éfeso.' },
  { id: 'lucas-evangelista', name: 'Lucas', gender: 'm', era: 'iglesia', role: 'Médico y evangelista', year: 55, dates: 's. I d.C.', places: ['Antioquía (trad.)', 'Filipos', 'Roma'], books: ['lucas', 'hechos-de-los-apostoles'], refs: 'Col 4,14; 2 Tm 4,11', summary: '"El médico querido", compañero de Pablo. Autor del tercer Evangelio y de los Hechos.' },
  { id: 'aquila', name: 'Áquila', gender: 'm', era: 'iglesia', role: 'Matrimonio misionero', year: 50, dates: 's. I d.C.', places: ['Ponto', 'Roma', 'Corinto', 'Éfeso'], books: ['hechos-de-los-apostoles', 'romanos'], refs: 'Hch 18; Rm 16,3', summary: 'Judío del Ponto, fabricante de tiendas como Pablo, que se alojó en su casa en Corinto.' },
  { id: 'priscila', name: 'Priscila (Prisca)', gender: 'f', era: 'iglesia', role: 'Matrimonio misionero', year: 50, dates: 's. I d.C.', places: ['Roma', 'Corinto', 'Éfeso'], books: ['hechos-de-los-apostoles', 'romanos'], refs: 'Hch 18; Rm 16,3', summary: 'Esposa de Áquila. Juntos instruyeron a Apolo y acogieron a la Iglesia en su casa.' },

  // ---------------- DICCIONARIO: OTROS PERSONAJES ----------------
  { id: 'goliat', name: 'Goliat', gender: 'm', era: 'reyes', role: 'Guerrero filisteo', year: -1020, dates: 'c. 1020 a.C.', places: ['Gat', 'Valle de Elá'], books: ['1-samuel'], refs: '1 S 17', summary: 'Gigante filisteo de Gat que desafió a Israel y fue vencido por el joven David con una honda.' },
  { id: 'jonas', name: 'Jonás', gender: 'm', era: 'profetas', role: 'Profeta enviado a Nínive', year: -780, dates: 'situado en el s. VIII a.C. (2 R 14,25)', places: ['Gat-Jefer (Galilea)', 'Jope', 'Nínive'], books: ['jonas', '2-reyes', 'mateo'], refs: 'Jon 1–4; Mt 12,39-41', summary: 'Huyó de la misión de Dios y fue tragado por un gran pez durante tres días. Su predicación convirtió a Nínive; Jesús lo cita como "signo" de su resurrección.' },
  { id: 'job', name: 'Job', gender: 'm', era: 'relatos', role: 'Justo probado', year: null, dates: 'Relato sapiencial (época no fija)', places: ['Tierra de Us'], books: ['job', 'santiago'], refs: 'Jb 1–42; St 5,11', summary: 'Hombre íntegro que lo pierde todo y se pregunta por el sufrimiento del inocente. Modelo de paciencia y de fe que dialoga con Dios.' },
  { id: 'tobit', name: 'Tobit', gender: 'm', era: 'relatos', role: 'Israelita piadoso', year: null, dates: 'ambientado en el s. VIII a.C. (Nínive)', places: ['Nínive'], books: ['tobias'], refs: 'Tb 1–14', summary: 'Israelita deportado a Nínive, generoso con los pobres y con los muertos. Quedó ciego y fue sanado por su hijo Tobías.' },
  { id: 'tobias', name: 'Tobías', gender: 'm', era: 'relatos', role: 'Hijo de Tobit', year: null, dates: 'ambientado en el s. VIII a.C.', places: ['Nínive', 'Ecbátana (Media)'], books: ['tobias'], refs: 'Tb 4–14', summary: 'Viajó acompañado por el ángel Rafael, se casó con Sara y curó la ceguera de su padre.' },
  { id: 'sara-tobias', name: 'Sara (esposa de Tobías)', gender: 'f', era: 'relatos', role: 'Esposa de Tobías', year: null, dates: 'ambientado en el s. VIII a.C.', places: ['Ecbátana (Media)'], books: ['tobias'], refs: 'Tb 3; 6–8', summary: 'Joven liberada de un demonio por intercesión del ángel Rafael; esposa de Tobías. No confundir con Sara, esposa de Abraham.' },
  { id: 'judit', name: 'Judit', gender: 'f', era: 'relatos', role: 'Heroína de Betulia', year: null, dates: 'Relato edificante (época no fija)', places: ['Betulia'], books: ['judit'], refs: 'Jdt 8–16', summary: 'Viuda piadosa que, confiando en Dios, salvó a su ciudad venciendo al general Holofernes.' },
  { id: 'herodes-grande', name: 'Herodes el Grande', gender: 'm', era: 'evangelios', role: 'Rey de Judea', year: -10, dates: 'reinó 37 – 4 a.C.', places: ['Jerusalén', 'Belén'], books: ['mateo'], refs: 'Mt 2', summary: 'Rey vasallo de Roma que amplió el Templo. Al saber del nacimiento del Mesías ordenó la matanza de los inocentes en Belén.' },
  { id: 'herodes-antipas', name: 'Herodes Antipas', gender: 'm', era: 'evangelios', role: 'Tetrarca de Galilea', year: 25, dates: 'gobernó 4 a.C. – 39 d.C.', places: ['Tiberíades', 'Maqueronte'], books: ['marcos', 'lucas'], refs: 'Mc 6,14-29; Lc 23,6-12', summary: 'Hijo de Herodes el Grande. Mandó decapitar a Juan el Bautista e interrogó a Jesús durante la Pasión.' },
  { id: 'pilato', name: 'Poncio Pilato', gender: 'm', era: 'evangelios', role: 'Prefecto romano de Judea', year: 30, dates: 'gobernó 26 – 36 d.C.', places: ['Cesarea Marítima', 'Jerusalén'], books: ['mateo', 'marcos', 'lucas', 'juan'], refs: 'Jn 18–19', summary: 'Gobernador romano que, aun reconociendo la inocencia de Jesús, lo entregó para ser crucificado.' },
  { id: 'caifas', name: 'Caifás', gender: 'm', era: 'evangelios', role: 'Sumo sacerdote', year: 30, dates: 'sumo sacerdote c. 18 – 36 d.C.', places: ['Jerusalén'], books: ['mateo', 'juan'], refs: 'Jn 11,49-52; Mt 26,57-66', summary: 'Presidió el Sanedrín que juzgó a Jesús: "conviene que muera uno solo por el pueblo".' },
  { id: 'nicodemo', name: 'Nicodemo', gender: 'm', era: 'evangelios', role: 'Fariseo y magistrado', year: 30, dates: 's. I d.C.', places: ['Jerusalén'], books: ['juan'], refs: 'Jn 3; 7,50; 19,39', summary: 'Visitó a Jesús de noche y escuchó que hay que "nacer de nuevo". Ayudó a sepultarlo.' },
  { id: 'zaqueo', name: 'Zaqueo', gender: 'm', era: 'evangelios', role: 'Jefe de publicanos', year: 30, dates: 's. I d.C.', places: ['Jericó'], books: ['lucas'], refs: 'Lc 19,1-10', summary: 'Recaudador rico y de baja estatura que subió a un sicómoro para ver a Jesús; tras recibirlo en su casa, cambió de vida.' },
  { id: 'lazaro-parabola', name: 'Lázaro (parábola del rico y el pobre)', gender: 'm', era: 'parabolas', role: 'Mendigo de la parábola', year: null, dates: 'Personaje de una parábola', places: [], books: ['lucas'], refs: 'Lc 16,19-31', parable: true, summary: 'Pobre cubierto de llagas que yacía a la puerta de un rico. Al morir es llevado "al seno de Abraham". No confundir con Lázaro de Betania, amigo de Jesús.' },
  { id: 'rico-epulon', name: 'El rico (Epulón)', gender: 'm', era: 'parabolas', role: 'Rico de la parábola', year: null, dates: 'Personaje de una parábola', places: [], books: ['lucas'], refs: 'Lc 16,19-31', parable: true, summary: 'Hombre que banqueteaba cada día ignorando al pobre Lázaro. El nombre "Epulón" ("banqueteador") viene de la tradición latina, no del texto.' },
  { id: 'hijo-prodigo', name: 'El hijo pródigo', gender: 'm', era: 'parabolas', role: 'Hijo de la parábola', year: null, dates: 'Personaje de una parábola', places: [], books: ['lucas'], refs: 'Lc 15,11-32', parable: true, summary: 'Hijo menor que derrocha su herencia y vuelve arrepentido; su padre lo recibe con los brazos abiertos. Imagen de la misericordia de Dios.' },
  { id: 'buen-samaritano', name: 'El buen samaritano', gender: 'm', era: 'parabolas', role: 'Viajero de la parábola', year: null, dates: 'Personaje de una parábola', places: ['Camino de Jerusalén a Jericó'], books: ['lucas'], refs: 'Lc 10,25-37', parable: true, summary: 'Extranjero que se detiene a cuidar a un herido junto al camino. Responde a la pregunta "¿quién es mi prójimo?".' }
];

/**
 * Tipos de vínculo:
 *  parent   → a es padre/madre de b
 *  spouse   → a y b son esposos
 *  sibling  → a y b son hermanos (solo si no se deduce de padres comunes)
 *  ancestor → a es antepasado de b (varias generaciones de distancia)
 *  mentor   → a es maestro/guía de b (b es discípulo de a)
 *  friend   → amistad o compañeros de misión
 *  relative → otro parentesco; aLabel = lo que b es para a, bLabel = lo que a es para b
 *  other    → otro vínculo; mismo esquema de etiquetas que relative
 */
const makeRelation = (a, b, type, extra = {}) => ({ a, b, type, ...extra });

const RELATIONS = [
  // Orígenes
  makeRelation('adan', 'eva', 'spouse'),
  makeRelation('adan', 'cain', 'parent'), makeRelation('eva', 'cain', 'parent'),
  makeRelation('adan', 'abel', 'parent'), makeRelation('eva', 'abel', 'parent'),
  makeRelation('adan', 'set', 'parent'), makeRelation('eva', 'set', 'parent'),
  makeRelation('set', 'noe', 'ancestor', { note: 'Gn 5: genealogía de Set a Noé' }),
  makeRelation('noe', 'sem', 'parent'),
  makeRelation('sem', 'tare', 'ancestor', { note: 'Gn 11,10-26' }),

  // Patriarcas
  makeRelation('tare', 'abraham', 'parent'),
  makeRelation('abraham', 'sara', 'spouse'),
  makeRelation('abraham', 'agar', 'spouse', { note: 'Esposa secundaria (Gn 16,3)' }),
  makeRelation('abraham', 'lot', 'relative', { aLabel: 'Sobrino', bLabel: 'Tío' }),
  makeRelation('abraham', 'ismael', 'parent'), makeRelation('agar', 'ismael', 'parent'),
  makeRelation('abraham', 'isaac', 'parent'), makeRelation('sara', 'isaac', 'parent'),
  makeRelation('isaac', 'rebeca', 'spouse'),
  makeRelation('isaac', 'esau', 'parent'), makeRelation('rebeca', 'esau', 'parent'),
  makeRelation('isaac', 'jacob', 'parent'), makeRelation('rebeca', 'jacob', 'parent'),
  makeRelation('jacob', 'lia', 'spouse'), makeRelation('jacob', 'raquel', 'spouse'),
  makeRelation('jacob', 'levi', 'parent'), makeRelation('lia', 'levi', 'parent'),
  makeRelation('jacob', 'juda', 'parent'), makeRelation('lia', 'juda', 'parent'),
  makeRelation('jacob', 'jose-patriarca', 'parent'), makeRelation('raquel', 'jose-patriarca', 'parent'),
  makeRelation('jacob', 'benjamin', 'parent'), makeRelation('raquel', 'benjamin', 'parent'),

  // Éxodo
  makeRelation('levi', 'moises', 'ancestor', { note: 'Ex 6,16-20' }),
  makeRelation('levi', 'aaron', 'ancestor', { note: 'Ex 6,16-20' }),
  makeRelation('levi', 'miriam', 'ancestor'),
  makeRelation('moises', 'aaron', 'sibling'), makeRelation('moises', 'miriam', 'sibling'), makeRelation('aaron', 'miriam', 'sibling'),
  makeRelation('moises', 'sefora', 'spouse'),
  makeRelation('moises', 'josue', 'mentor', { aLabel: 'Ayudante y sucesor', bLabel: 'Maestro y predecesor' }),

  // Jueces / Rut
  makeRelation('juda', 'booz', 'ancestor', { note: 'Rt 4,18-21; Mt 1,3-5' }),
  makeRelation('noemi', 'rut', 'relative', { aLabel: 'Nuera', bLabel: 'Suegra' }),
  makeRelation('booz', 'noemi', 'relative', { aLabel: 'Pariente', bLabel: 'Pariente (redentor)' }),
  makeRelation('booz', 'rut', 'spouse'),
  makeRelation('booz', 'obed', 'parent'), makeRelation('rut', 'obed', 'parent'),
  makeRelation('obed', 'jese', 'parent'),
  makeRelation('jese', 'david', 'parent'),
  makeRelation('ana-madre-samuel', 'samuel', 'parent'),
  makeRelation('eli', 'samuel', 'mentor', { aLabel: 'Discípulo', bLabel: 'Maestro (lo crió en Siló)' }),

  // Monarquía
  makeRelation('benjamin', 'saul', 'ancestor', { note: '1 S 9,1-2' }),
  makeRelation('samuel', 'saul', 'other', { aLabel: 'Rey que ungió', bLabel: 'Profeta que lo ungió' }),
  makeRelation('samuel', 'david', 'other', { aLabel: 'Rey que ungió', bLabel: 'Profeta que lo ungió' }),
  makeRelation('saul', 'jonatan', 'parent'), makeRelation('saul', 'mical', 'parent'),
  makeRelation('david', 'mical', 'spouse'),
  makeRelation('saul', 'david', 'other', { aLabel: 'Yerno, servidor y luego rival', bLabel: 'Suegro, rey y perseguidor' }),
  makeRelation('david', 'jonatan', 'friend', { note: '1 S 18,1-4' }),
  makeRelation('david', 'betsabe', 'spouse'),
  makeRelation('david', 'salomon', 'parent'), makeRelation('betsabe', 'salomon', 'parent'),
  makeRelation('natan', 'david', 'other', { aLabel: 'Rey al que aconsejó y reprendió', bLabel: 'Profeta consejero' }),
  makeRelation('natan', 'salomon', 'other', { aLabel: 'Rey que ayudó a entronizar', bLabel: 'Profeta que lo apoyó' }),
  makeRelation('salomon', 'roboam', 'parent'),

  // Profetas
  makeRelation('elias', 'eliseo', 'mentor', { aLabel: 'Discípulo y sucesor', bLabel: 'Maestro' }),
  makeRelation('jeremias', 'baruc', 'mentor', { aLabel: 'Secretario y discípulo', bLabel: 'Maestro (le dictaba)' }),
  makeRelation('jeremias', 'ezequiel', 'other', { aLabel: 'Profeta contemporáneo (en Babilonia)', bLabel: 'Profeta contemporáneo (en Jerusalén)' }),

  // Exilio
  makeRelation('benjamin', 'mardoqueo', 'ancestor', { note: 'Est 2,5' }),
  makeRelation('mardoqueo', 'ester', 'relative', { aLabel: 'Prima (la crió como hija)', bLabel: 'Primo y tutor' }),
  makeRelation('esdras', 'nehemias', 'friend', { note: 'Colaboraron en la restauración (Ne 8)' }),
  makeRelation('aaron', 'esdras', 'ancestor', { note: 'Esd 7,1-5' }),

  // Macabeos
  makeRelation('matatias', 'judas-macabeo', 'parent'),
  makeRelation('aaron', 'matatias', 'ancestor', { note: 'Familia sacerdotal (1 M 2,1)' }),

  // Tiempo de Jesús
  makeRelation('salomon', 'jose', 'ancestor', { note: 'Genealogía de Mt 1,6-16' }),
  makeRelation('joaquin', 'ana-madre-maria', 'spouse'),
  makeRelation('joaquin', 'maria', 'parent', { note: 'Según la tradición' }), makeRelation('ana-madre-maria', 'maria', 'parent', { note: 'Según la tradición' }),
  makeRelation('jose', 'maria', 'spouse'),
  makeRelation('maria', 'jesus', 'parent'),
  makeRelation('jose', 'jesus', 'parent', { note: 'Padre legal y adoptivo (Mt 1,16-25)' }),
  makeRelation('aaron', 'isabel', 'ancestor', { note: '"De las hijas de Aarón" (Lc 1,5)' }),
  makeRelation('zacarias', 'isabel', 'spouse'),
  makeRelation('zacarias', 'juan-bautista', 'parent'), makeRelation('isabel', 'juan-bautista', 'parent'),
  makeRelation('maria', 'isabel', 'relative', { aLabel: 'Pariente', bLabel: 'Pariente', note: 'Lc 1,36' }),
  makeRelation('jesus', 'juan-bautista', 'relative', { aLabel: 'Pariente (precursor que lo bautizó)', bLabel: 'Pariente' }),
  makeRelation('juan-bautista', 'andres', 'mentor', { aLabel: 'Discípulo', bLabel: 'Primer maestro', note: 'Jn 1,35-40' }),
  makeRelation('pedro', 'andres', 'sibling'),
  makeRelation('zebedeo', 'santiago-mayor', 'parent'), makeRelation('zebedeo', 'juan-apostol', 'parent'),
  makeRelation('jesus', 'pedro', 'mentor', { aLabel: 'Apóstol', bLabel: 'Maestro' }),
  makeRelation('jesus', 'andres', 'mentor', { aLabel: 'Apóstol', bLabel: 'Maestro' }),
  makeRelation('jesus', 'santiago-mayor', 'mentor', { aLabel: 'Apóstol', bLabel: 'Maestro' }),
  makeRelation('jesus', 'juan-apostol', 'mentor', { aLabel: 'Apóstol ("discípulo amado")', bLabel: 'Maestro' }),
  makeRelation('jesus', 'mateo-apostol', 'mentor', { aLabel: 'Apóstol', bLabel: 'Maestro' }),
  makeRelation('jesus', 'tomas', 'mentor', { aLabel: 'Apóstol', bLabel: 'Maestro' }),
  makeRelation('jesus', 'judas-iscariote', 'mentor', { aLabel: 'Apóstol (lo traicionó)', bLabel: 'Maestro (lo traicionó)' }),
  makeRelation('jesus', 'maria-magdalena', 'mentor', { aLabel: 'Discípula', bLabel: 'Maestro' }),
  makeRelation('jesus', 'lazaro', 'friend', { note: 'Jn 11,5' }),
  makeRelation('jesus', 'marta', 'friend', { note: 'Jn 11,5' }),
  makeRelation('jesus', 'maria-betania', 'friend', { note: 'Jn 11,5' }),
  makeRelation('marta', 'maria-betania', 'sibling'), makeRelation('marta', 'lazaro', 'sibling'), makeRelation('maria-betania', 'lazaro', 'sibling'),
  makeRelation('juan-apostol', 'maria', 'other', { aLabel: 'Madre confiada a su cuidado', bLabel: 'Discípulo que la recibió en su casa', note: 'Jn 19,26-27' }),

  // Iglesia naciente
  makeRelation('jesus', 'santiago-hermano', 'relative', { aLabel: 'Pariente ("hermano del Señor")', bLabel: 'Pariente', note: 'Mc 6,3; Ga 1,19' }),
  makeRelation('benjamin', 'pablo', 'ancestor', { note: 'Flp 3,5' }),
  makeRelation('gamaliel', 'pablo', 'mentor', { aLabel: 'Discípulo', bLabel: 'Maestro', note: 'Hch 22,3' }),
  makeRelation('esteban', 'pablo', 'other', { aLabel: 'Aprobó su lapidación', bLabel: 'Mártir cuya muerte aprobó', note: 'Hch 7,58–8,1' }),
  makeRelation('pablo', 'bernabe', 'friend', { note: 'Compañeros del primer viaje (Hch 13–14)' }),
  makeRelation('pablo', 'silas', 'friend', { note: 'Compañeros del segundo viaje (Hch 15,40)' }),
  makeRelation('pablo', 'lucas-evangelista', 'friend', { note: 'Col 4,14' }),
  makeRelation('pablo', 'aquila', 'friend', { note: 'Hch 18,1-3' }),
  makeRelation('pablo', 'priscila', 'friend', { note: 'Rm 16,3' }),
  makeRelation('aquila', 'priscila', 'spouse'),
  makeRelation('pablo', 'timoteo', 'mentor', { aLabel: 'Discípulo ("hijo en la fe")', bLabel: 'Maestro y padre espiritual' }),
  makeRelation('bernabe', 'marcos', 'relative', { aLabel: 'Primo', bLabel: 'Primo', note: 'Col 4,10' }),
  makeRelation('pedro', 'marcos', 'mentor', { aLabel: 'Discípulo ("mi hijo")', bLabel: 'Maestro', note: '1 P 5,13' }),
  makeRelation('pedro', 'santiago-hermano', 'friend', { note: 'Líderes en Jerusalén (Ga 1,18-19; Hch 15)' }),
  makeRelation('lucas-evangelista', 'maria', 'other', { aLabel: 'Fuente de los relatos de la infancia (trad.)', bLabel: 'Evangelista que narró su historia' }),

  // Diccionario: otros personajes
  makeRelation('david', 'goliat', 'other', { aLabel: 'Gigante al que venció', bLabel: 'Joven que lo venció' }),
  makeRelation('tobit', 'tobias', 'parent'),
  makeRelation('tobias', 'sara-tobias', 'spouse'),
  makeRelation('herodes-grande', 'herodes-antipas', 'parent'),
  makeRelation('herodes-grande', 'jesus', 'other', { aLabel: 'Niño al que intentó matar', bLabel: 'Rey que lo persiguió al nacer' }),
  makeRelation('herodes-antipas', 'juan-bautista', 'other', { aLabel: 'Profeta al que mandó decapitar', bLabel: 'Gobernante que lo mandó ejecutar' }),
  makeRelation('herodes-antipas', 'jesus', 'other', { aLabel: 'Acusado al que interrogó', bLabel: 'Gobernante que lo interrogó' }),
  makeRelation('pilato', 'jesus', 'other', { aLabel: 'Acusado al que condenó', bLabel: 'Gobernador que lo condenó' }),
  makeRelation('caifas', 'jesus', 'other', { aLabel: 'Acusado ante el Sanedrín', bLabel: 'Sumo sacerdote que lo juzgó' }),
  makeRelation('jesus', 'nicodemo', 'mentor', { aLabel: 'Discípulo en secreto', bLabel: 'Maestro' }),
  makeRelation('jesus', 'zaqueo', 'other', { aLabel: 'Anfitrión en Jericó', bLabel: 'Huésped que cambió su vida' }),
  makeRelation('rico-epulon', 'lazaro-parabola', 'other', { aLabel: 'Pobre a su puerta (al que ignoró)', bLabel: 'Rico que lo ignoró' }),
  makeRelation('abraham', 'lazaro-parabola', 'other', { aLabel: 'Pobre acogido "en su seno"', bLabel: 'Patriarca que lo acoge' }),
  makeRelation('jesus', 'lazaro-parabola', 'other', { aLabel: 'Personaje de una de sus parábolas', bLabel: 'Narrador de la parábola' }),
  makeRelation('jesus', 'rico-epulon', 'other', { aLabel: 'Personaje de una de sus parábolas', bLabel: 'Narrador de la parábola' }),
  makeRelation('jesus', 'hijo-prodigo', 'other', { aLabel: 'Personaje de una de sus parábolas', bLabel: 'Narrador de la parábola' }),
  makeRelation('jesus', 'buen-samaritano', 'other', { aLabel: 'Personaje de una de sus parábolas', bLabel: 'Narrador de la parábola' }),
  makeRelation('jesus', 'jonas', 'other', { aLabel: 'Profeta que citó como "signo"', bLabel: 'Quien lo citó como signo (Mt 12,39-41)' })
];
