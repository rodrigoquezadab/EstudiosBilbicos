/**
 * Base de Datos Integral del Canon Bíblico Católico según la Biblia de Jerusalén
 * 73 Libros: 46 Antiguo Testamento (incluye 7 Deuterocanónicos) + 27 Nuevo Testamento
 */

const BIBLE_BOOKS = [
  // ==========================================
  // ANTIGUO TESTAMENTO - PENTATEUCO (5 libros)
  // ==========================================
  {
    id: "genesis",
    name: "Génesis",
    hebrewGreekName: "Bereshit (בְּרֵאשִׁית) / Génesis (Γένεσις)",
    abbr: "Gn",
    testament: "Antiguo Testamento",
    category: "Pentateuco",
    subCategory: "Torá / Ley de Moisés",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "Tradiciones Yahvista (J), Elohista (E), Deuteronomista (D) y Sacerdotal (P), atribución mosaica tradicional.",
    date: "Siglos X a V a.C. (Redacción final post-exilio s. V a.C.)",
    location: "Reino de Judá, Babilonia y Jerusalén",
    audience: "El pueblo de Israel en búsqueda de su identidad y fe en el Dios creador y de la promesa.",
    genre: "Narrativa de orígenes, sagas familiares patriarcales y relatos etiológicos.",
    chapters: 50,
    summary: "Narra los orígenes del mundo, la caída del hombre, las promesas a Abraham, Isaac y Jacob, culminando con la historia de José en Egipto.",
    keyThemes: ["Creación y caída", "Alianza y promesa", "Paternidad en la fe", "Providencia divina"],
    keyPassage: {
      reference: "Gn 12, 1-2",
      text: "Yahvé dijo a Abram: «Vete de tu tierra, de tu patria y de la casa de tu padre a la tierra que yo te mostraré. De ti haré una nación grande y te bendeciré»."
    },
    historicalNote: "La Escuela Bíblica de Jerusalén destaca que Génesis no es un tratado de ciencias naturales ni historia moderna, sino una confesión teológica sobre el Dios vivo que entra en alianza con la humanidad."
  },
  {
    id: "exodo",
    name: "Éxodo",
    hebrewGreekName: "Shemot (שְׁמוֹת) / Éxodos (Ἔξοδος)",
    abbr: "Ex",
    testament: "Antiguo Testamento",
    category: "Pentateuco",
    subCategory: "Torá / Ley de Moisés",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "Fusión de fuentes J, E y P en torno al recuerdo fundador de Moisés.",
    date: "Siglos XIII a V a.C. (Acontecimientos hacia 1250 a.C.)",
    location: "Desierto del Sinaí, Judá y Babilonia",
    audience: "Comunidad de Israel llamada a vivir como pueblo sacerdotal libre de la esclavitud.",
    genre: "Épica de liberación, legislación de la Alianza y descripciones cultuales.",
    chapters: 40,
    summary: "El acontecimiento central del Éxodo: liberación de la servidumbre egipcia por medio de Moisés, paso del Mar Rojo, teofanía en el Sinaí y entrega del Decálogo.",
    keyThemes: ["Liberación pascual", "Revelación del Nombre sagrado YHWH", "Alianza del Sinaí", "Presencia en la Tienda"],
    keyPassage: {
      reference: "Ex 3, 14",
      text: "Dijo Dios a Moisés: «Yo soy el que soy». Y añadió: «Así dirás a los israelitas: 'Yo soy' me ha enviado a vosotros»."
    },
    historicalNote: "Para la Biblia de Jerusalén, la Pascua de Éxodo es el modelo fundacional de toda la teología bíblica de la redención que culminará en la Pascua de Jesucristo."
  },
  {
    id: "levitico",
    name: "Levítico",
    hebrewGreekName: "Vayikrá (וַיִּקְרָא) / Leueitikón (Λευιτικόν)",
    abbr: "Lv",
    testament: "Antiguo Testamento",
    category: "Pentateuco",
    subCategory: "Torá / Código Sacerdotal",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "Círculos sacerdotales del Templo de Jerusalén (Tradición P).",
    date: "Siglos VI-V a.C. (Época del Exilio y retorno)",
    location: "Babilonia y Jerusalén",
    audience: "Los sacerdotes levíticos y el pueblo creyente llamado a la pureza y santidad.",
    genre: "Manual litúrgico, rituales sacrificiales, código de santidad y preceptos de pureza.",
    chapters: 27,
    summary: "Ordena los ritos sacrificiales, las normas de consagración del sacerdocio de Aarón, las leyes de pureza ritual y el célebre Código de Santidad (Lv 17-26).",
    keyThemes: ["Santidad de Dios", "Expiación del pecado", "Fiestas sagradas (Yom Kipur)", "Amor al prójimo"],
    keyPassage: {
      reference: "Lv 19, 18",
      text: "No te vengarás ni guardarás rencor a los hijos de tu pueblo; amarás a tu prójimo como a ti mismo. Yo, Yahvé."
    },
    historicalNote: "Subraya que la santidad no es un mero tabú cultual, sino una conducta moral inspirada en la infinita santidad de Dios: 'Sed santos, porque yo, Yahvé, soy santo'."
  },
  {
    id: "numeros",
    name: "Números",
    hebrewGreekName: "Bemidbar (בְּמִדְבַּר) / Arithmoí (Ἀριθμοί)",
    abbr: "Nm",
    testament: "Antiguo Testamento",
    category: "Pentateuco",
    subCategory: "Torá / Peregrinación",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "Tradición Sacerdotal combinada con narraciones Yahvistas y Elohistas.",
    date: "Siglos VI a IV a.C.",
    location: "Estrellado entre el desierto del Sinaí y las llanuras de Moab",
    audience: "Israel en marcha, peregrino en la prueba del desierto hacia la tierra prometida.",
    genre: "Censos demográficos, itinerarios militares, leyes sacerdotales e historias folclóricas.",
    chapters: 36,
    summary: "Los cuarenta años de marcha por el desierto: censos del campamento, murmuraciones del pueblo, rebelión de Coré, la serpiente de bronce y los oráculos de Balaam.",
    keyThemes: ["Paciencia pedagógica de Dios", "Incredulidad y castigo", "Intercesión mosaica", "Bendición sacerdotal"],
    keyPassage: {
      reference: "Nm 6, 24-26",
      text: "Yahvé te bendiga y te guarde; ilumine Yahvé su rostro sobre ti y te sea propicio; Yahvé te muestre su rostro y te conceda la paz."
    },
    historicalNote: "En la teología bíblica, el desierto es tanto tiempo de intimidad nupcial con Yahvé como lugar de tentación y maduración de la fe de un pueblo a menudo obstinado."
  },
  {
    id: "deuteronomio",
    name: "Deuteronomio",
    hebrewGreekName: "Devarim (דְּבָרִים) / Deuteronómion (Δευτερονόμιον)",
    abbr: "Dt",
    testament: "Antiguo Testamento",
    category: "Pentateuco",
    subCategory: "Torá / Tradición Deuteronomista",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "Círculos proféticos y levíticos del Reino del Norte y Judá (reforma de Josías, 622 a.C.).",
    date: "Siglo VII a.C. (622 a.C.) con adiciones exílicas (s. VI a.C.)",
    location: "Siquem, Jerusalén y Moab (escenario literario)",
    audience: "Israel frente al Jordán, exhortado a elegir entre la vida y la muerte, la fidelidad y la apostasía.",
    genre: "Discurso de despedida, sermón teológico, código legal y renovación de la alianza.",
    chapters: 34,
    summary: "Discursos solemnes de Moisés en las puertas de la Tierra Prometida, recalcando la elección gratuita de Israel, el amor al Señor con todo el corazón y la centralización del culto.",
    keyThemes: ["El Shemá Israel", "Elección por puro amor", "Un solo Dios, un solo Templo", "Justicia social con el huérfano y la viuda"],
    keyPassage: {
      reference: "Dt 6, 4-5",
      text: "Escucha, Israel: Yahvé nuestro Dios es el único Yahvé. Amarás a Yahvé tu Dios con todo tu corazón, con toda tu alma y con todas tus fuerzas."
    },
    historicalNote: "La Biblia de Jerusalén lo califica como el centro teológico del Antiguo Testamento, fuente directa del estilo y teología de los libros históricos deuteronomistas y profetas como Jeremías."
  },

  // ==========================================
  // ANTIGUO TESTAMENTO - LIBROS HISTÓRICOS (16 libros)
  // ==========================================
  {
    id: "josue",
    name: "Josué",
    hebrewGreekName: "Yehoshúa (יְהוֹשֻׁעַ) / Iesoús (Ἰησοῦς)",
    abbr: "Jos",
    testament: "Antiguo Testamento",
    category: "Históricos",
    subCategory: "Historia Deuteronomista",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "Escuela historiográfica deuteronomista basada en tradiciones de Benjamín y Efraín.",
    date: "Siglo VI a.C. (Hechos s. XIII a.C.)",
    location: "Reino de Judá y Jerusalén",
    audience: "Pueblo desterrado que necesita recordar la fidelidad de Yahvé a sus promesas de heredad.",
    genre: "Relato épico de conquistas militares, descripciones corográficas y asamblea litúrgica.",
    chapters: 24,
    summary: "Cruce milagroso del Jordán, caída de Jericó, conquista de Canaán bajo el liderazgo de Josué y distribución de la tierra entre las doce tribus de Israel.",
    keyThemes: ["Fidelidad a la promesa", "Guerra sagrada y tentación de idolatría", "La Alianza de Siquem"],
    keyPassage: {
      reference: "Jos 24, 15",
      text: "Si no os parece bien servir a Yahvé, elegid hoy a quién queréis servir... Pero yo y mi casa serviremos a Yahvé."
    },
    historicalNote: "La conquista se presenta teológicamente como un don incondicional de Yahvé a Israel, aunque la arqueología moderna y la BJ reconocen un proceso gradual de asentamiento."
  },
  {
    id: "jueces",
    name: "Jueces",
    hebrewGreekName: "Shofetim (שֹׁפְטִים) / Kritai (Κριταί)",
    abbr: "Jc",
    testament: "Antiguo Testamento",
    category: "Históricos",
    subCategory: "Historia Deuteronomista",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "Redactor deuteronomista integrando relatos tribales populares heroicos.",
    date: "Siglos VIII-VI a.C. (Hechos s. XII-XI a.C.)",
    location: "Territorios tribales del Norte y Sur de Canaán",
    audience: "Generaciones posteriores tentadas de olvidar al Dios de sus antepasados.",
    genre: "Leyendas heroicas y epopeyas guerreras en un marco teológico cíclico.",
    chapters: 21,
    summary: "El ciclo recurrente: pecado de idolatría, opresión extranjera, clamor a Dios y envío de un 'juez' o libertador carismático (Débora, Gedeón, Jefté, Sansón).",
    keyThemes: ["Ciclo de apostasía y perdón", "Fragilidad del ser humano", "Carisma del Espíritu de Dios"],
    keyPassage: {
      reference: "Jc 21, 25",
      text: "En aquel tiempo no había rey en Israel; cada cual hacía lo que le parecía bien ante sus ojos."
    },
    historicalNote: "Muestra la anarquía de la época pre-monárquica y prepara la necesidad espiritual y social del reinado de David bajo la soberanía de Dios."
  },
  {
    id: "rut",
    name: "Rut",
    hebrewGreekName: "Rut (רוּת) / Routh (Ῥούθ)",
    abbr: "Rut",
    testament: "Antiguo Testamento",
    category: "Históricos",
    subCategory: "Narrativa Edificante",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "Autor anónimo sabio de Judá.",
    date: "Siglos V-IV a.C. (Época post-exílica)",
    location: "Belén de Judá",
    audience: "La comunidad judía cerrada post-exilio tentada por el nacionalismo excluyente de Esdras y Nehemías.",
    genre: "Idilio pastoral, novela corta familiar y genealogía davídica.",
    chapters: 4,
    summary: "La historia conmovedora de la moabita Rut, quien por amor y lealtad a su suegra Noemí abraza al Dios de Israel, desposa a Booz y deviene bisabuela del rey David.",
    keyThemes: ["Piedad familiar (hésed)", "Universalismo de la salvación", "Linaje del Mesías davídico"],
    keyPassage: {
      reference: "Rut 1, 16",
      text: "Rut respondió: «No insistas en que te abandone... a donde tú vayas, iré yo; tu pueblo será mi pueblo y tu Dios será mi Dios»."
    },
    historicalNote: "Subraya con audacia que en la genealogía del rey David —y posteriormente de Jesús de Nazaret (Mt 1)— figura una mujer extranjera y virtuosa de Moab."
  },
  {
    id: "1-samuel",
    name: "1 Samuel",
    hebrewGreekName: "Shemuel Álef (שְׁמוּאֵל א׳) / Basileion A (Βασιλειῶν Αʹ)",
    abbr: "1 S",
    testament: "Antiguo Testamento",
    category: "Históricos",
    subCategory: "Historia Deuteronomista",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "Tradición profética y círculos deuteronomistas.",
    date: "Siglos X a VI a.C.",
    location: "Siló, Ramá, Guibeá y Judá",
    audience: "El pueblo que reflexiona sobre la monarquía terrenal frente a la realeza de Dios.",
    genre: "Biografía teológica, relatos cortesanos y narración profética.",
    chapters: 31,
    summary: "Transición de la era de los jueces a la monarquía: ministerio del profeta Samuel, trágica elección y caída de Saúl, y unción secreta del joven pastor David.",
    keyThemes: ["La mirada de Dios al corazón", "El peligro del poder desobediente", "Amistad de David y Jonatán"],
    keyPassage: {
      reference: "1 S 16, 7",
      text: "Yahvé no mira lo que mira el hombre: pues el hombre mira la apariencia, pero Yahvé mira el corazón."
    },
    historicalNote: "En la Septuaginta (LXX) y la Vulgata formaba un solo conjunto con 2 Samuel y los libros de Reyes bajo el nombre de 'Libros de los Reinos'."
  },
  {
    id: "2-samuel",
    name: "2 Samuel",
    hebrewGreekName: "Shemuel Bet (שְׁמוּאֵל ב׳) / Basileion B (Βασιλειῶν Βʹ)",
    abbr: "2 S",
    testament: "Antiguo Testamento",
    category: "Históricos",
    subCategory: "Historia Deuteronomista",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "Historiador de la corte davídica y redacción deuteronomista.",
    date: "Siglos X a VI a.C.",
    location: "Hebrón y Jerusalén",
    audience: "El reino de Judá que contempla la dinastía davídica como depositaria de la promesa mesiánica.",
    genre: "Crónica regia, novela de sucesión al trono y poesía elegíaca.",
    chapters: 24,
    summary: "Reinado de David en Jerusalén, traslado del Arca de la Alianza, la gran profecía mesiánica de Natán (2 S 7), el grave pecado con Betsabé y la dolorosa rebelión de Absalón.",
    keyThemes: ["Alianza dinástica mesiánica", "Pecado, arrepentimiento y perdón", "Humanidad vulnerable del rey"],
    keyPassage: {
      reference: "2 S 7, 12-13",
      text: "Suscitaré a tu linaje después de ti... y afirmaré el trono de su reino para siempre. Yo seré para él un padre y él será para mí un hijo."
    },
    historicalNote: "El oráculo de Natán es la piedra angular del mesianismo real del Antiguo Testamento, anunciando que la casa de David perdurará eternamente."
  },
  {
    id: "1-reyes",
    name: "1 Reyes",
    hebrewGreekName: "Melajim Álef (מְלָכִים א׳) / Basileion G (Βασιλειῶν Γʹ)",
    abbr: "1 R",
    testament: "Antiguo Testamento",
    category: "Históricos",
    subCategory: "Historia Deuteronomista",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "Círculo deuteronomista con acceso a los 'Anales de los Reyes de Israel y de Judá'.",
    date: "Siglos VII-VI a.C.",
    location: "Jerusalén y Samaría",
    audience: "Pueblo en crisis religiosa tentado de sincretismo con los dioses cananeos (Baal).",
    genre: "Crónica de reinados, relatos de maravillas y enfrentamientos proféticos.",
    chapters: 22,
    summary: "Esplendor, sabiduría y edificación del Templo por Salomón, la posterior división del reino (Israel al norte y Judá al sur), y el ministerio fogoso del profeta Elías contra Ajab y Jezabel.",
    keyThemes: ["Sabiduría y tentación de la riqueza", "Celo por el Dios verdadero", "La brisa tenue en el Horeb"],
    keyPassage: {
      reference: "1 R 19, 11-12",
      text: "No estaba Yahvé en el viento, ni en el terremoto, ni en el fuego. Después del fuego se oyó un susurro de brisa suave..."
    },
    historicalNote: "Destaca la confrontación entre el absolutismo de la monarquía secular y la voz crítica del profetismo que defiende los derechos de Dios y del humilde."
  },
  {
    id: "2-reyes",
    name: "2 Reyes",
    hebrewGreekName: "Melajim Bet (מְלָכִים ב׳) / Basileion D (Βασιλειῶν Δʹ)",
    abbr: "2 R",
    testament: "Antiguo Testamento",
    category: "Históricos",
    subCategory: "Historia Deuteronomista",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "Redacción deuteronomista final completada tras la caída de Jerusalén.",
    date: "Hacia el 550 a.C. (Exilio babilónico)",
    location: "Jerusalén y Babilonia",
    audience: "Exiliados que preguntan por qué Dios permitió la destrucción del Templo y de la Ciudad Santa.",
    genre: "Crónica dinástica y teología de la historia según la fidelidad a la Ley.",
    chapters: 25,
    summary: "Milagros de Eliseo, decadencia de ambos reinos, caída de Samaría ante los asirios (722 a.C.), reforma piadosa de Josías y el desastre final de la invasión de Nabucodonosor y el exilio (587 a.C.).",
    keyThemes: ["Retribución histórica por el pecado", "La caída de Samaría y Jerusalén", "La esperanza mesiánica que sobrevive"],
    keyPassage: {
      reference: "2 R 22, 11",
      text: "Cuando el rey oyó las palabras del libro de la Ley, rasgó sus vestiduras... e impulsó la mayor reforma de la fe de Judá."
    },
    historicalNote: "Explica teológicamente el exilio no como una derrota de Dios frente a los dioses de Babilonia, sino como el castigo justo por siglos de injusticia y culto a los ídolos."
  },
  {
    id: "1-cronicas",
    name: "1 Crónicas",
    hebrewGreekName: "Divrei Hayamim Álef (דִּבְרֵי הַיָּמִים א׳) / Paralipómena A (Παραλειπομένων Αʹ)",
    abbr: "1 Cro",
    testament: "Antiguo Testamento",
    category: "Históricos",
    subCategory: "Obra del Cronista",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "El 'Cronista' (un levita o sacerdote de Jerusalén).",
    date: "Siglos IV-III a.C. (Época persa o helenística temprana)",
    location: "Jerusalén",
    audience: "La pequeña comunidad judía post-exílica reconstruyendo su vida comunitaria alrededor del Segundo Templo.",
    genre: "Genealogías sagradas, crónica litúrgica e idealización teológica.",
    chapters: 29,
    summary: "Genealogías desde Adán hasta David, y una reinterpretación teológica del reinado davídico enfocada enteramente en la liturgia, los coros levíticos y los preparativos para el Templo.",
    keyThemes: ["El Templo como corazón del pueblo", "David como modelo del culto litúrgico", "La alabanza incesante"],
    keyPassage: {
      reference: "1 Cro 29, 11",
      text: "Tuya es, Yahvé, la grandeza, el poder, la gloria, la majestad y el esplendor, porque todo cuanto hay en los cielos y en la tierra es tuyo."
    },
    historicalNote: "En la Septuaginta se tituló 'Paralipómenos' ('cosas omitidas'). El Cronista omite las debilidades de David para presentarlo como el organizador ejemplar de la adoración divina."
  },
  {
    id: "2-cronicas",
    name: "2 Crónicas",
    hebrewGreekName: "Divrei Hayamim Bet (דִּבְרֵי הַיָּמִים ב׳) / Paralipómena B (Παραλειπομένων Βʹ)",
    abbr: "2 Cro",
    testament: "Antiguo Testamento",
    category: "Históricos",
    subCategory: "Obra del Cronista",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "El Cronista (medio sacerdotal y levítico).",
    date: "Siglos IV-III a.C.",
    location: "Jerusalén",
    audience: "Israel post-exílico necesitado de esperanza y santificación interior.",
    genre: "Historia religiosa y teología de la retribución inmediata.",
    chapters: 36,
    summary: "Reinado glorioso de Salomón y la consagración del Templo, historia de los reyes de Judá evaluados por su devoción cúltica, y el edicto de Ciro el Persa que autoriza el regreso.",
    keyThemes: ["La gloria del Santo Templo", "La plegaria de intercesión", "El edicto liberador de Ciro"],
    keyPassage: {
      reference: "2 Cro 7, 14",
      text: "Si mi pueblo, sobre el cual es invocado mi nombre, se humilla, ora, busca mi rostro y se convierte de sus malos caminos, yo escucharé desde los cielos y sanaré su tierra."
    },
    historicalNote: "Concluye con las palabras de Ciro permitiendo reconstruir el Templo de Dios en Jerusalén, abriendo la puerta a la restauración."
  },
  {
    id: "esdras",
    name: "Esdras",
    hebrewGreekName: "Ezra (עֶזְרָא) / Ésdras (Ἔσδρας)",
    abbr: "Esd",
    testament: "Antiguo Testamento",
    category: "Históricos",
    subCategory: "Restauración Post-exílica",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "El Cronista o el propio sacerdote-escriba Esdras con memorias de primera mano.",
    date: "Hacia 400-350 a.C.",
    location: "Babilonia y Jerusalén",
    audience: "Comunidad del retorno llamada a reconstruir su pureza religiosa según la Torá.",
    genre: "Documentos oficiales arameos, crónicas y memorias autobiográficas.",
    chapters: 10,
    summary: "Retorno de los cautivos bajo Zorobabel, reconstrucción del Templo ante la hostilidad de los samaritanos, y llegada de Esdras para enseñar y consolidar la Ley de Moisés.",
    keyThemes: ["Reconstrucción del Templo", "Estudio y obediencia a la Torá", "Identidad y renovación comunitaria"],
    keyPassage: {
      reference: "Esd 7, 10",
      text: "Porque Esdras había dedicado su corazón a escudriñar la Ley de Yahvé, a ponerla por obra y a enseñar en Israel los preceptos y las normas."
    },
    historicalNote: "Esdras es considerado por el judaísmo el 'segundo Moisés' y el fundador de la lectura pública y exegética de las Escrituras."
  },
  {
    id: "nehemias",
    name: "Nehemías",
    hebrewGreekName: "Nejemyá (נְחֶמְיָה) / Nehemías (Νεεμίας)",
    abbr: "Ne",
    testament: "Antiguo Testamento",
    category: "Históricos",
    subCategory: "Restauración Post-exílica",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "Memorias personales de Nehemías el copero real, editadas por el Cronista.",
    date: "Finales del siglo V a.C. (hacia 420 a.C.)",
    location: "Susa (Imperio Persa) y Jerusalén",
    audience: "Pobladores de Judá expuestos a la vulnerabilidad política y a abusos económicos.",
    genre: "Memorias administrativas, confesiones de oración y crónica de reconstrucción.",
    chapters: 13,
    summary: "Nehemías obtiene permiso del rey persa Artajerjes para viajar a Jerusalén y reconstruir las murallas en tan solo 52 días, frenando a los enemigos y defendiendo a los pobres frente a la usura.",
    keyThemes: ["Fortaleza y fe activa", "Justicia distributiva para los desposeídos", "La alegría en Yahvé como fuerza"],
    keyPassage: {
      reference: "Ne 8, 10",
      text: "No estéis tristes, porque el gozo de Yahvé es vuestra fortaleza."
    },
    historicalNote: "En la Biblia hebrea Esdras y Nehemías formaban un solo volumen continuo, testimonio de la restauración tanto material (murallas) como espiritual (la Ley)."
  },
  {
    id: "tobias",
    name: "Tobías",
    hebrewGreekName: "Tobit (טְוֹבִית) / Tobías (Τωβίας)",
    abbr: "Tb",
    testament: "Antiguo Testamento",
    category: "Históricos",
    subCategory: "Deuterocanónico / Narrativa Sapiencial",
    isDeuterocanonical: true,
    isSynoptic: false,
    author: "Autor judío piadoso anónimo de la diáspora.",
    date: "Hacia 200 a.C. (s. II a.C.)",
    location: "Palestina o Egipto / Diáspora oriental",
    audience: "Familias judías dispersas entre pueblos paganos que buscan perseverar en la fe.",
    genre: "Novela religiosa edificante, cuento sapiencial popular y folklore piadoso.",
    chapters: 14,
    summary: "Las pruebas del anciano Tobit en Nínive, el viaje de su hijo Tobías guiado en secreto por el arcángel San Rafael, el casamiento con Sara libre de un demonio y la curación de la ceguera paterna.",
    keyThemes: ["La limosna y la oración perseverante", "Acompañamiento angélico (Ángel de la Guarda)", "Fidelidad conyugal santa"],
    keyPassage: {
      reference: "Tb 12, 8",
      text: "Buena es la oración con ayuno, y la limosna con justicia es mejor que la riqueza con iniquidad."
    },
    historicalNote: "Libro Deuterocanónico. Formaba parte de la Septuaginta griega cristiana desde los orígenes y fue ratificado solemnemente en los Concilios de Hipona, Cartago y Trento."
  },
  {
    id: "judit",
    name: "Judit",
    hebrewGreekName: "Yehudit (יְהוּדִית) / Ioudith (Ἰουδίθ)",
    abbr: "Jdt",
    testament: "Antiguo Testamento",
    category: "Históricos",
    subCategory: "Deuterocanónico / Épica Heroica",
    isDeuterocanonical: true,
    isSynoptic: false,
    author: "Autor anónimo piadoso durante el fervor nacional de la época macabea.",
    date: "Hacia 150-100 a.C.",
    location: "Judea",
    audience: "Pueblo judío amenazado por el totalitarismo y la aniquilación de su culto.",
    genre: "Parábola histórica edificante, relato de resistencia y cántico triunfal.",
    chapters: 16,
    summary: "El temible asedio de Betulia por el general asirio Holofernes; la valiente viuda Judit, mujer de intensa oración y belleza, se infiltra en el campamento enemigo y decapita al tirano, salvando a su nación.",
    keyThemes: ["Dios derriba a los poderosos por medio de los débiles", "El poder de la oración y la pureza", "Heroísmo femenino de fe"],
    keyPassage: {
      reference: "Jdt 13, 18-19",
      text: "¡Bendita seas tú, hija, por el Dios Altísimo, más que todas las mujeres de la tierra!... Jamás decaerá de los corazones humanos el recuerdo de tu confianza."
    },
    historicalNote: "Libro Deuterocanónico. La Biblia de Jerusalén advierte que los anacronismos históricos intencionales señalan que es una obra con valor teológico y no una crónica periodística."
  },
  {
    id: "ester",
    name: "Ester",
    hebrewGreekName: "Ester (אֶסְתֵּר) / Esthēr (Ἐσθήρ)",
    abbr: "Est",
    testament: "Antiguo Testamento",
    category: "Históricos",
    subCategory: "Narrativa con Suplementos Deuterocanónicos",
    isDeuterocanonical: true,
    isSynoptic: false,
    author: "Autor judío de la diáspora persa con ampliaciones griegas piadosas.",
    date: "Siglos IV-II a.C. (Adiciones griegas hacia 114 a.C.)",
    location: "Susa (Persia) y Jerusalén / Alejandría",
    audience: "Judíos de la diáspora expuestos al exterminio por intrigas antisemitas.",
    genre: "Novela dramática de corte y leyenda etiológica de la fiesta de Purim.",
    chapters: 10, // Más los capítulos griegos A-F incluidos en BJ
    summary: "La joven huérfana judía Ester se convierte en reina de Persia y, guiada por su tío Mardoqueo, intercede ante Jerjes para frustrar la conspiración genocida de Amán. En la versión católica incluye las conmovedoras plegarias griegas.",
    keyThemes: ["Providencia oculta de Dios", "Salvación en la adversidad extrema", "Institución de la fiesta de Purim"],
    keyPassage: {
      reference: "Est 4, 14 (y adición C)",
      text: "«¿Y quién sabe si para una hora como ésta has llegado al reino?» Señor, Dios de Abraham, ¡ayúdame a mí, que estoy sola y no tengo otro defensor fuera de ti!"
    },
    historicalNote: "El texto católico de la Biblia de Jerusalén conserva las 6 adiciones griegas deuterocanónicas (sueño de Mardoqueo, decretos y oraciones explícitas a Dios) ausentes en el texto masorético hebreo."
  },
  {
    id: "1-macabeos",
    name: "1 Macabeos",
    hebrewGreekName: "Makabim Álef (מַכַּבִּים א׳) / Makkabaion A (Μακκαβαίων Αʹ)",
    abbr: "1 M",
    testament: "Antiguo Testamento",
    category: "Históricos",
    subCategory: "Deuterocanónico / Resistencia Asmonea",
    isDeuterocanonical: true,
    isSynoptic: false,
    author: "Historiador patriota judío contemporáneo de los acontecimientos.",
    date: "Hacia 100 a.C.",
    location: "Judea (Jerusalén)",
    audience: "Judíos fieles que defendían su religión contra la helenización forzosa de Antíoco IV Epífanes.",
    genre: "Historiografía sobria y militar al estilo de los antiguos libros de los Reyes.",
    chapters: 16,
    summary: "La violenta persecución de Antíoco Epífanes, la sublevación del anciano sacerdote Matatías, y las gloriosas batallas de Judas Macabeo para purificar el Templo (origen de Janucá), sucedido por Jonatán y Simón.",
    keyThemes: ["Defensa innegociable de la Ley de Dios", "Martirio por la fe", "Purificación y dedicación del Templo"],
    keyPassage: {
      reference: "1 M 3, 19",
      text: "La victoria en la guerra no depende de la multitud del ejército, sino de la fuerza que viene del Cielo."
    },
    historicalNote: "Libro Deuterocanónico de excepcional valor histórico. Su testimonio preserva con precisión los orígenes de la fiesta bíblica de la Dedicación (Janucá)."
  },
  {
    id: "2-macabeos",
    name: "2 Macabeos",
    hebrewGreekName: "Makabim Bet (מַכַּבִּים ב׳) / Makkabaion B (Μακκαβαίων Βʹ)",
    abbr: "2 M",
    testament: "Antiguo Testamento",
    category: "Históricos",
    subCategory: "Deuterocanónico / Teología del Martirio",
    isDeuterocanonical: true,
    isSynoptic: false,
    author: "Compendio redactado en griego por un autor que resume la obra de Jasón de Cirene.",
    date: "Hacia 124-60 a.C.",
    location: "Alejandría o Jerusalén",
    audience: "Judíos helenistas de Alejandría e Israel.",
    genre: "Historia patética y oratoria helenística ('historia trágica') cargada de dramatismo.",
    chapters: 15,
    summary: "No es una continuación de 1 Macabeos sino una visión paralela centrada en Judas Macabeo; célebre por sus teofanías y los martirios heroicos del anciano Eleazar y de la madre con sus siete hijos.",
    keyThemes: ["Resurrección de los muertos de los cuerpos", "Creación de la nada (creatio ex nihilo)", "Oración e intercesión por los difuntos"],
    keyPassage: {
      reference: "2 M 7, 9; 12, 45",
      text: "«Tú, criminal, nos quitas la vida presente, pero el Rey del universo nos resucitará para una vida eterna». Es un pensamiento santo y piadoso rezar por los difuntos."
    },
    historicalNote: "Libro Deuterocanónico de central trascendencia dogmática: formula explícitamente la fe en la resurrección corporal, la creación de la nada (2 M 7, 28) y el sufragio por las almas de los difuntos."
  },

  // ==========================================
  // ANTIGUO TESTAMENTO - SAPIENCIALES Y POÉTICOS (7 libros)
  // ==========================================
  {
    id: "job",
    name: "Job",
    hebrewGreekName: "Iyyov (אִיּוֹב) / Iōb (Ἰώβ)",
    abbr: "Jb",
    testament: "Antiguo Testamento",
    category: "Sapienciales",
    subCategory: "Poesía Dialógica Sapiencial",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "Un genio poético anónimo de Israel con vasto conocimiento teológico y humano.",
    date: "Siglos V-IV a.C.",
    location: "Judea o tierra de Hus",
    audience: "Creyentes que sufren y cuestionan la teoría simplista de que el dolor es castigo directo de faltas personales.",
    genre: "Drama sapiencial filosófico, marco narrativo en prosa y extensos diálogos poéticos en verso.",
    chapters: 42,
    summary: "El drama del inocente Job que pierde hijos, salud y riquezas; debate ardientemente con sus amigos defensores de la retribución mecánica, hasta que Dios le responde desde el torbellino.",
    keyThemes: ["El misterio insondable del sufrimiento inocente", "Crítica a la teología fría", "Soberanía creadora de Dios"],
    keyPassage: {
      reference: "Jb 19, 25; 42, 5",
      text: "Yo sé que mi Redentor vive y que al final se levantará sobre el polvo... Sólo de oídas te conocía, mas ahora mis ojos te ven."
    },
    historicalNote: "Obra cumbre de la literatura universal. Para la Biblia de Jerusalén representa el quiebre definitivo del dogma tradicional de la retribución terrena de la antigua sabiduría."
  },
  {
    id: "salmos",
    name: "Salmos",
    hebrewGreekName: "Tehilim (תְּהִלִּים) / Psalmoi (Ψαλμοί)",
    abbr: "Sal",
    testament: "Antiguo Testamento",
    category: "Sapienciales",
    subCategory: "Himnario Litúrgico",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "Colecciones líricas atribuidas tradicionalmente a David, Asaf, los hijos de Coré y otros sabios.",
    date: "Siglos X a II a.C. (Recopilados a lo largo de 800 años)",
    location: "Jerusalén y el Templo",
    audience: "La asamblea orante del Templo, la sinagoga y la Iglesia universal.",
    genre: "Poesía lírica sacra: himnos de alabanza, súplicas individuales y colectivas, cantos de acción de gracias, salmos reales y sapienciales.",
    chapters: 150,
    summary: "El salterio contiene 150 poemas inspirados divididos en cinco libros, que abarcan todo el abanico del alma humana ante Dios: desde el clamor del abismo hasta el cántico de júbilo más sublime.",
    keyThemes: ["Alabanza permanente al Creador", "Confianza en la prueba", "El Buen Pastor", "Anhelo mesiánico"],
    keyPassage: {
      reference: "Sal 23, 1-3",
      text: "Yahvé es mi pastor, nada me falta; en verdes praderas me hace reposar, a las aguas de descanso me conduce, reconforta mi alma."
    },
    historicalNote: "Es el libro más citado en el Nuevo Testamento por Jesús y los Apóstoles, y constituye la base perpetua de la Liturgia de las Horas y de la Misa católica."
  },
  {
    id: "proverbios",
    name: "Proverbios",
    hebrewGreekName: "Mishlei (מִשְׁלֵי) / Paroimiai (Παροιμίαι)",
    abbr: "Pr",
    testament: "Antiguo Testamento",
    category: "Sapienciales",
    subCategory: "Sentencias de Sabiduría",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "Escuelas de sabios cortesanos bajo el patrocinio tradicional del sabio rey Salomón.",
    date: "Siglos X a V a.C. (Recopilación final s. V a.C.)",
    location: "Jerusalén",
    audience: "Jóvenes y discípulos en formación para una vida prudente, justa y grata a Dios.",
    genre: "Máximas breves, aforismos morales, antítesis y personificaciones poéticas.",
    chapters: 31,
    summary: "Colecciones de consejos prácticos para la vida diaria sobre el trabajo, la templanza, la honradez, el uso de la lengua, y la personificación majestuosa de la Sabiduría preexistente (Pr 8).",
    keyThemes: ["El temor de Dios como principio de la ciencia", "Prudencia y autodominio", "La Sabiduría engendrada antes de los siglos"],
    keyPassage: {
      reference: "Pr 1, 7; 8, 22",
      text: "El temor de Yahvé es el principio de la sabiduría... Yahvé me creó al principio de su camino, antes de sus obras más antiguas."
    },
    historicalNote: "El himno a la Sabiduría de Proverbios 8 fue contemplado por los Santos Padres y la teología cristiana como un anuncio profético del Logos / Verbo encarnado."
  },
  {
    id: "eclesiastes",
    name: "Eclesiastés (Qohélet)",
    hebrewGreekName: "Qohélet (קֹהֶלֶת) / Ekklēsiastēs (Ἐκκλησιαστής)",
    abbr: "Ec (Qo)",
    testament: "Antiguo Testamento",
    category: "Sapienciales",
    subCategory: "Crítica Sapiencial",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "Un pensador y maestro judío independiente que asume el seudónimo de 'Hijo de David, rey en Jerusalén'.",
    date: "Hacia 250 a.C. (s. III a.C.)",
    location: "Jerusalén bajo dominio helenístico",
    audience: "Creyentes perplejos ante la fugacidad de las glorias humanas y la muerte inevitable.",
    genre: "Reflexiones filosóficas existenciales, soliloquios y aforismos críticos.",
    chapters: 12,
    summary: "Una investigación implacable sobre la condición humana: la vanidad de las vanidades, las riquezas que no sacian y el misterio del tiempo; exhorta a gozar modestamente del presente como don de Dios.",
    keyThemes: ["La caducidad terrena (Hével / Vanidad)", "Todo tiene su momento bajo el cielo", "Vivir agradecido en el presente"],
    keyPassage: {
      reference: "Ec 3, 1-2; 12, 13",
      text: "Todo tiene su momento, y cada cosa su tiempo bajo el cielo: tiempo de nacer y tiempo de morir... Teme a Dios y guarda sus mandamientos, porque esto es todo para el hombre."
    },
    historicalNote: "La Biblia de Jerusalén elogia el coraje de Qohélet al despojar al ser humano de falsas seguridades terrenas para anclarlo en la reverencia humilde al misterio divino."
  },
  {
    id: "cantar-de-los-cantares",
    name: "Cantar de los Cantares",
    hebrewGreekName: "Shir Hashirim (שִׁיר הַשִּׁירִים) / Asma Asmatōn (ᾎσμα ᾈσμάτων)",
    abbr: "Ct",
    testament: "Antiguo Testamento",
    category: "Sapienciales",
    subCategory: "Poesía Lírica Nupcial",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "Poeta magistral de Israel inspirado en canciones populares nupciales.",
    date: "Siglo IV o III a.C. (Época post-exílica)",
    location: "Judea / Jerusalén",
    audience: "Los esposos humanos y la comunidad creyente en diálogo de amor con Dios.",
    genre: "Canto lírico amoroso, diálogos erótico-nupciales y alegoría mística.",
    chapters: 8,
    summary: "Poema de amor apasionado entre un Amado y su Amada, que se buscan, se pierden, se admiran mutuamente y celebran que el amor verdadero es invencible como la muerte.",
    keyThemes: ["Dignidad santa del amor conyugal", "El amor de Yahvé por su pueblo", "La unión mística del alma y de la Iglesia con Cristo"],
    keyPassage: {
      reference: "Ct 8, 6",
      text: "Grábame como un sello en tu corazón, como un sello en tu brazo; porque fuerte es el amor como la muerte... Las muchas aguas no podrán apagar el amor ni los ríos ahogarlo."
    },
    historicalNote: "En la exégesis católica tradicional (San Bernardo, San Juan de la Cruz), el Cantar es el 'Sancta Sanctorum' de las Escrituras, símbolo del connubio de Dios con la Iglesia y el alma."
  },
  {
    id: "sabiduria",
    name: "Sabiduría",
    hebrewGreekName: "Jojmat Shlomó (חָכְמַת שְׁלֹמֹה) / Sophia Salomōntos (Σοφία Σαλομῶντος)",
    abbr: "Sab",
    testament: "Antiguo Testamento",
    category: "Sapienciales",
    subCategory: "Deuterocanónico / Helenismo Alejandrino",
    isDeuterocanonical: true,
    isSynoptic: false,
    author: "Un judío alejandrino brillante y piadoso instruido en la filosofía griega.",
    date: "Hacia 50-30 a.C. (El libro más tardío del Antiguo Testamento)",
    location: "Alejandría de Egipto",
    audience: "La juventud judía de Alejandría seducida por el paganismo y la cultura grecorromana.",
    genre: "Discurso retórico ensayístico griego (encomio) y relectura teológica del Éxodo.",
    chapters: 19,
    summary: "Contrasta el destino de los impíos con la gloriosa inmortalidad de las almas de los justos en manos de Dios; canta la naturaleza divina de la Sabiduría creadora y redime la historia de salvación.",
    keyThemes: ["Inmortalidad del alma del justo", "Emanación de la gloria divina", "Falsedad de los ídolos fabricados por manos humanas"],
    keyPassage: {
      reference: "Sab 3, 1-3; 7, 26",
      text: "Las almas de los justos están en las manos de Dios y no las rozará tormento alguno... Ella es reflejo de la luz eterna, espejo sin mancha de la actividad de Dios."
    },
    historicalNote: "Libro Deuterocanónico. Es el puente directo con la cristología de San Juan (Prólogo) y de San Pablo (Colosenses 1), al describir a la Sabiduría como efluvio de la gloria divina."
  },
  {
    id: "eclesiastico",
    name: "Eclesiástico (Sirácida)",
    hebrewGreekName: "Ben Sira (בֶּן סִירָא) / Siraj (Σειράχ) / Ecclesiasticus",
    abbr: "Si (Eclo)",
    testament: "Antiguo Testamento",
    category: "Sapienciales",
    subCategory: "Deuterocanónico / Sabiduría Tradicional",
    isDeuterocanonical: true,
    isSynoptic: false,
    author: "Jesús, hijo de Eleazar, hijo de Sirá (Ben Sira), traducido al griego por su nieto.",
    date: "Hacia 190-180 a.C. en hebreo; traducido hacia 132 a.C. en Egipto",
    location: "Jerusalén (texto original) y Alejandría",
    audience: "Judíos fieles que defendían sus raíces y tradiciones frente a la invasión cultural griega.",
    genre: "Tratado moral sapiencial, antología de preceptos, oraciones e himno de elogio a los antepasados.",
    chapters: 51,
    summary: "Extensa enciclopedia de piedad y buen comportamiento: la relación filial con los padres, la elección de amigos leales, la prudencia económica, y la gloriosa identificación de la Sabiduría divina con la Ley de Moisés.",
    keyThemes: ["Honra a padre y madre", "El valor del amigo verdadero", "La Sabiduría acampa en Sión"],
    keyPassage: {
      reference: "Si 24, 8; 3, 3",
      text: "El Creador de todas las cosas me dijo: «Acampa en Jacob, y sea Israel tu heredad»... Quien honra a su padre expía sus pecados, y quien respeta a su madre acumula tesoros."
    },
    historicalNote: "Libro Deuterocanónico. Se llamó 'Ecclesiasticus' en la Iglesia latina porque era el libro de cabecera más empleado por la Iglesia ('ecclesia') para la catequesis de los catecúmenos."
  },

  // ==========================================
  // ANTIGUO TESTAMENTO - PROFETAS MAYORES (6 libros)
  // ==========================================
  {
    id: "isaias",
    name: "Isaías",
    hebrewGreekName: "Yeshayahu (יְשַׁעְיָהוּ) / Ēsaias (Ἠσαΐας)",
    abbr: "Is",
    testament: "Antiguo Testamento",
    category: "Proféticos",
    subCategory: "Profeta Mayor",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "Tres etapas proféticas según la crítica bíblica: Proto-Isaías (caps. 1-39, s. VIII a.C.), Déutero-Isaías (caps. 40-55, exilio s. VI a.C.) y Trito-Isaías (caps. 56-66, post-exilio).",
    date: "Siglos VIII a V a.C.",
    location: "Jerusalén y Babilonia",
    audience: "Reyes y pueblo de Judá, exiliados en Babilonia y retornados a Sión.",
    genre: "Poesía profética excelsa, oráculos de juicio y consolación, cánticos del Siervo de Yahvé.",
    chapters: 66,
    summary: "El 'Quinto Evangelio' del AT. Anuncia la santidad excelsa de Dios, el nacimiento virginal del Emmanuel (Is 7), la luz que brilla en tinieblas, y la redención por los dolores del Siervo Sufriente (Is 53).",
    keyThemes: ["El Santo de Israel", "Profecía del Emmanuel", "Los cuatro Cánticos del Siervo Sufriente", "Cielos nuevos y tierra nueva"],
    keyPassage: {
      reference: "Is 9, 5; 53, 5",
      text: "Un niño nos ha nacido, un hijo se nos ha dado... Él fue traspasado por nuestras rebeliones, triturado por nuestros crímenes. Por sus llagas hemos sido curados."
    },
    historicalNote: "En la Biblia de Jerusalén se analiza detalladamente la tripartición del libro, fundamental para entender la evolución de la profecía y la revelación del Mesías humilde y sufriente."
  },
  {
    id: "jeremias",
    name: "Jeremías",
    hebrewGreekName: "Yirmeyahu (יִרְמְיָהוּ) / Ieremias (Ἱερεμίας)",
    abbr: "Jr",
    testament: "Antiguo Testamento",
    category: "Proféticos",
    subCategory: "Profeta Mayor",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "El profeta Jeremías de Anatot y su fiel secretario y escriba Baruc.",
    date: "Hacia 627-580 a.C.",
    location: "Jerusalén, Judá y Egipto",
    audience: "Reyes indolentes de Judá, falsos profetas y el pueblo cegado ante el inminente desastre.",
    genre: "Oráculos conminatorios, confesiones íntimas de dolor, acciones simbólicas y promesas de Alianza.",
    chapters: 52,
    summary: "Ministerio trágico del profeta llamado desde el seno materno para extirpar y plantar; predica la rendición ante Babilonia como castigo divino, sufre persecución y cárceles, y proclama la 'Nueva Alianza' interior.",
    keyThemes: ["Llamada y vocación desgarradora", "La Nueva Alianza en el corazón", "Religión interior frente al formalismo vacío"],
    keyPassage: {
      reference: "Jr 31, 31-33",
      text: "He aquí que vienen días —oráculo de Yahvé— en que sellaré con la casa de Israel una Nueva Alianza... Pondré mi Ley en su interior y la escribiré en su corazón."
    },
    historicalNote: "El texto de la Nueva Alianza de Jr 31 es la única vez en el Antiguo Testamento donde aparece explícitamente dicha expresión, consumada por Jesús en la Última Cena."
  },
  {
    id: "lamentaciones",
    name: "Lamentaciones",
    hebrewGreekName: "Eijá (אֵיכָה) / Thrēnoi (Θρῆνοι)",
    abbr: "Lm",
    testament: "Antiguo Testamento",
    category: "Proféticos",
    subCategory: "Elegía Sagrada",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "Testigos oculares de la destrucción de Jerusalén atribuidos piadosamente a Jeremías.",
    date: "Hacia 586-575 a.C.",
    location: "Las ruinas de Jerusalén",
    audience: "La comunidad desolada que contempla la destrucción de la Ciudad Santa y el Templo.",
    genre: "Cantos fúnebres acrósticos y trenos poéticos de inmenso desgarro.",
    chapters: 5,
    summary: "Cinco poemas acrósticos que lloran la trágica caída de Jerusalén, el hambre de los niños huérfanos, la humillación de los sacerdotes y la súplica final de conversión a Dios.",
    keyThemes: ["Dolor por el desastre y el pecado", "La fidelidad inagotable de Dios que se renueva cada mañana", "Súplica de restauración"],
    keyPassage: {
      reference: "Lm 3, 22-23",
      text: "Que los favores de Yahvé no se han agotado, ni se ha acabado su compasión; se renuevan cada mañana. ¡Grande es tu fidelidad!"
    },
    historicalNote: "En la liturgia católica ha acompañado tradicionalmente las solemnes lecturas de 'Tinieblas' de la Semana Santa ante la Pasión de Cristo."
  },
  {
    id: "baruc",
    name: "Baruc",
    hebrewGreekName: "Baruj (בָּרוּךְ) / Barouj (Βαρούχ)",
    abbr: "Ba",
    testament: "Antiguo Testamento",
    category: "Proféticos",
    subCategory: "Deuterocanónico / Profeta Mayor",
    isDeuterocanonical: true,
    isSynoptic: false,
    author: "Puesto bajo el patrocinio del escriba Baruc, discípulo de Jeremías.",
    date: "Siglos IV a I a.C.",
    location: "Babilonia y Jerusalén",
    audience: "Judíos desterrados y dispersos entre naciones paganas.",
    genre: "Confesión de pecados penitencial, poema sapiencial de la Torá y consuelo a Sión (incluye la Carta de Jeremías en cap. 6).",
    chapters: 6,
    summary: "Los cautivos en Babilonia envían ofrendas a Jerusalén reconociendo con humildad que el desastre fue fruto de su infidelidad; alaba a la Sabiduría que se manifestó en la tierra y profetiza el retorno alegre.",
    keyThemes: ["Confesión comunitaria sincera", "La Sabiduría que bajó y conversó con los hombres", "El ridículo de los ídolos inertes"],
    keyPassage: {
      reference: "Ba 3, 38; 4, 21",
      text: "Después de esto apareció en la tierra y conversó con los hombres... ¡Ánimo, hijos míos, clamad a Dios, que Él os librará del poder de los enemigos!"
    },
    historicalNote: "Libro Deuterocanónico preservado en la Septuaginta. Baruc 3, 38 fue interpretado tempranamente por San Ireneo y los Padres como profecía de la Encarnación."
  },
  {
    id: "ezequiel",
    name: "Ezequiel",
    hebrewGreekName: "Yejezquel (יְחֶזְקֵאל) / Iezekiēl (Ἰεζεκιήλ)",
    abbr: "Ez",
    testament: "Antiguo Testamento",
    category: "Proféticos",
    subCategory: "Profeta Mayor",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "El sacerdote y profeta Ezequiel, hijo de Buzí.",
    date: "Hacia 593-571 a.C.",
    location: "Tel Abib, junto al río Quebar (Babilonia)",
    audience: "Los deportados de la primera oleada babilónica que se resistían a creer el fin de Jerusalén.",
    genre: "Visiones místicas, alegorías dramáticas, acciones mímicas proféticas y proyectos cultuales.",
    chapters: 48,
    summary: "La visión deslumbrante de la Gloria divina en el carro celeste (Merkabá), la partida dolorosa de la presencia divina del Templo corrompido, la visión de los huesos secos que reviven por el Espíritu y el nuevo Templo.",
    keyThemes: ["La majestad de la Gloria de Yahvé", "Responsabilidad moral individual", "Corazón de carne por corazón de piedra", "Resurrección del pueblo (huesos secos)"],
    keyPassage: {
      reference: "Ez 36, 26; 37, 4-5",
      text: "Os daré un corazón nuevo y pondré en vosotros un espíritu nuevo; quitaré de vuestra carne el corazón de piedra y os daré un corazón de carne."
    },
    historicalNote: "Ezequiel es el padre espiritual del judaísmo post-exílico y una de las fuentes visuales más ricas de la literatura apocalíptica del Nuevo Testamento."
  },
  {
    id: "daniel",
    name: "Daniel",
    hebrewGreekName: "Daniyel (דָּנִיֵּאל) / Daniēl (Δανιήλ)",
    abbr: "Dn",
    testament: "Antiguo Testamento",
    category: "Proféticos",
    subCategory: "Profeta Mayor / Apocalíptica con Deuterocanónicos",
    isDeuterocanonical: true, // Contiene secciones deuterocanónicas mayores
    isSynoptic: false,
    author: "Círculo apocalíptico de los 'Hasidim' (piadosos) en tiempos de persecución de Antíoco IV.",
    date: "Siglo II a.C. (hacia 165 a.C., ambientado literariamente en el s. VI a.C.)",
    location: "Babilonia (marco histórico) y Judea",
    audience: "Fieles perseguidos a muerte por negarse a comer carne prohibida o postrarse ante estatuas.",
    genre: "Relatos de milagros cortesanos y visiones apocalípticas escatológicas.",
    chapters: 14, // Capítulos 1-12 hebreo/arameo + caps. 13-14 griegos deuterocanónicos (Susana y Bel/dragón, cántico de los tres jóvenes)
    summary: "Daniel y sus compañeros en la corte de Babilonia (horno de fuego ardiente y foso de los leones), visiones de las cuatro bestias y del 'Hijo del Hombre', junto a los relatos deuterocanónicos de la casta Susana y los sacerdotes de Bel.",
    keyThemes: ["El Reino eterno de Dios sobre todos los imperios", "La figura del Hijo del Hombre", "La resurrección para la vida eterna"],
    keyPassage: {
      reference: "Dn 7, 13-14; 12, 2",
      text: "Miraba en las visiones de la noche, y he aquí que en las nubes del cielo venía como un Hijo de Hombre... Su dominio es un dominio eterno que no pasará."
    },
    historicalNote: "En el canon católico Daniel incluye las extensas adiciones deuterocanónicas en griego: la oración de Azarías, el Cántico de las criaturas (Dn 3), la historia de Susana (Dn 13) y Bel y el dragón (Dn 14)."
  },

  // ==========================================
  // ANTIGUO TESTAMENTO - PROFETAS MENORES (12 libros)
  // ==========================================
  {
    id: "oseas",
    name: "Oseas",
    hebrewGreekName: "Hoshea (הוֹשֵׁעַ) / Ōsēe (Ὡσηέ)",
    abbr: "Os",
    testament: "Antiguo Testamento",
    category: "Proféticos",
    subCategory: "Profeta Menor",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "El profeta Oseas, hijo de Beerí, del Reino del Norte.",
    date: "Hacia 750-725 a.C.",
    location: "Reino de Israel (Samaría)",
    audience: "Pueblo del Reino del Norte sumido en la apostasía y el culto a Baal.",
    genre: "Drama conyugal profético, oráculos de reproche y efusiones de ternura divina.",
    chapters: 14,
    summary: "Llamado a desposar a una mujer adúltera (Gómer) como símbolo viviente del amor fiel de Dios hacia un pueblo que se prostituye con ídolos, prometiendo desposarla de nuevo en el desierto.",
    keyThemes: ["Dios como Esposo amante y fiel", "Misericordia quiero y no sacrificios", "Retorno al amor primero"],
    keyPassage: {
      reference: "Os 6, 6; 2, 21",
      text: "Porque yo quiero amor del bueno y no sacrificios, conocimiento de Dios más que holocaustos... Te desposaré conmigo para siempre."
    },
    historicalNote: "Jesús cita textualmente a Oseas en los Evangelios ('Misericordia quiero y no sacrificios') para definir la esencia del Reino frente al legalismo."
  },
  {
    id: "joel",
    name: "Joel",
    hebrewGreekName: "Yoel (יוֹאֵל) / Iōēl (Ἰωήλ)",
    abbr: "Jl",
    testament: "Antiguo Testamento",
    category: "Proféticos",
    subCategory: "Profeta Menor",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "El profeta Joel, hijo de Petuel.",
    date: "Hacia el 400 a.C. (Época post-exílica)",
    location: "Jerusalén y el Templo",
    audience: "La asamblea litúrgica de Judá tras una devastadora plaga de langostas.",
    genre: "Lamento litúrgico, oráculo apocalíptico y profecía escatológica.",
    chapters: 4, // 3 o 4 según división de capítulos
    summary: "La plaga de langostas como signo premonitorio del temible 'Día de Yahvé'; convoca a sacerdotes y ancianos a un ayuno de penitencia y anuncia la efusión universal del Espíritu Santo.",
    keyThemes: ["El Día de Yahvé", "Rasgad los corazones y no las vestiduras", "La efusión universal del Espíritu"],
    keyPassage: {
      reference: "Jl 3, 1-2 (o 2, 28)",
      text: "Sucederá después de esto que derramaré mi Espíritu sobre toda carne: vuestros hijos y vuestras hijas profetizarán, vuestros ancianos soñarán sueños."
    },
    historicalNote: "San Pedro en el discurso de Pentecostés (Hch 2) proclama solemnemente que la profecía de Joel se ha cumplido en el nacimiento de la Iglesia."
  },
  {
    id: "amos",
    name: "Amós",
    hebrewGreekName: "Amos (עָמוֹס) / Amōs (Ἀμώς)",
    abbr: "Am",
    testament: "Antiguo Testamento",
    category: "Proféticos",
    subCategory: "Profeta Menor",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "Amós, pastor y cultivador de higos de Técoa (Judá).",
    date: "Hacia 760-750 a.C.",
    location: "Betel y Samaría (Reino del Norte)",
    audience: "La élite adinerada y corrupta de Samaría que oprimía al desvalido.",
    genre: "Clamor por la justicia social, oráculos contra las naciones paganas y visiones.",
    chapters: 9,
    summary: "El primer profeta escritor. Denuncia con valentía demoledora las liturgias fastuosas de quienes explotan al pobre y falsean las balanzas, advirtiendo que el juicio de Dios no perdonará la hipocresía.",
    keyThemes: ["Justicia social como exigencia religiosa", "Falso culto sin caridad", "El león ha rugido"],
    keyPassage: {
      reference: "Am 5, 24",
      text: "¡Que fluya el juicio como las aguas, y la justicia como un torrente inagotable!"
    },
    historicalNote: "Es el adalid profético de los derechos humanos y de la indivisibilidad entre la adoración a Dios y la defensa del prójimo oprimido."
  },
  {
    id: "abdias",
    name: "Abdías",
    hebrewGreekName: "Ovadyá (עֹבַדְיָה) / Obdiou (Ὀβδιού)",
    abbr: "Ab",
    testament: "Antiguo Testamento",
    category: "Proféticos",
    subCategory: "Profeta Menor",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "El profeta Abdías ('Siervo de Yahvé').",
    date: "Poco después del 586 a.C. (Caída de Jerusalén)",
    location: "Judea",
    audience: "El pueblo de Edom (descendientes de Esaú) y los sobrevivientes de Jerusalén.",
    genre: "Oráculo de indignación profética y sentencia judicial divina.",
    chapters: 1,
    summary: "El libro más breve del Antiguo Testamento (un solo capítulo con 21 versículos); condena la soberbia y la traición de Edom, que se burló y colaboró en el saqueo de Jerusalén cuando sus hermanos caían.",
    keyThemes: ["Castigo a la soberbia altanera", "Solidaridad fraternal quebrantada", "El Reino será de Yahvé"],
    keyPassage: {
      reference: "Ab 1, 15",
      text: "Porque cercano está el Día de Yahvé contra todas las naciones. Como hiciste tú, así se te hará: tu merecido caerá sobre tu cabeza."
    },
    historicalNote: "Contiene una severa advertencia teológica contra la crueldad entre pueblos hermanos y la falsa seguridad de quienes habitan en 'las hendiduras de la roca'."
  },
  {
    id: "jonas",
    name: "Jonás",
    hebrewGreekName: "Yoná (יוֹנָה) / Iōnas (Ἰωνᾶς)",
    abbr: "Jon",
    testament: "Antiguo Testamento",
    category: "Proféticos",
    subCategory: "Profeta Menor / Parábola Profética",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "Un sabio maestro satírico de mentalidad universalista.",
    date: "Siglo V o IV a.C. (Época post-exílica)",
    location: "Jope, el mar Mediterráneo y Nínive (Asiria)",
    audience: "Judíos post-exílicos que querían el exterminio de los gentiles extranjeros.",
    genre: "Parábola didáctica teológica con toques de humor e ironía santa.",
    chapters: 4,
    summary: "Jonás huye en barco para no predicar la conversión a los asirios enemigos; tragado por un gran pez, ora y es devuelto a tierra; predica en Nínive, los paganos se convierten y Dios les perdona, enojando al mezquino profeta.",
    keyThemes: ["La universalidad infinita de la misericordia divina", "El 'Signo de Jonás' (tres días en el vientre)", "El ridículo del nacionalismo religioso egoísta"],
    keyPassage: {
      reference: "Jon 4, 11",
      text: "«¿Y no voy yo a tener lástima de Nínive, la gran ciudad, donde hay más de ciento veinte mil personas que no distinguen su derecha de su izquierda?»."
    },
    historicalNote: "Jesús presenta a Jonás en el vientre del pez como el gran signo profético de su propia muerte, sepultura de tres días y resurrección (Mt 12, 39-40)."
  },
  {
    id: "miqueas",
    name: "Miqueas",
    hebrewGreekName: "Mijá (מִיכָה) / Mijaias (Μιχαίας)",
    abbr: "Mi",
    testament: "Antiguo Testamento",
    category: "Proféticos",
    subCategory: "Profeta Menor",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "Miqueas de Moréset, profeta rural contemporáneo de Isaías.",
    date: "Hacia 735-700 a.C.",
    location: "Sefelá y Jerusalén",
    audience: "Campesinos despojados de sus tierras por los magnates de la capital.",
    genre: "Juicio profético (Rib), oráculos de amenaza y anuncios mesiánicos de esperanza.",
    chapters: 7,
    summary: "Ataca con pasión a los terratenientes codiciosos que devoran a su pueblo; predice la ruina del Templo pero anuncia que de la pequeña aldea de Belén de Judá nacerá el Pastor de la Paz eterna.",
    keyThemes: ["Nacimiento del Mesías en Belén", "Práctica de la justicia, ternura y humildad", "Dios que arroja los pecados al fondo del mar"],
    keyPassage: {
      reference: "Mi 5, 1; 6, 8",
      text: "Y tú, Belén de Efratá, pequeña para estar entre las familias de Judá, de ti me saldrá el que ha de ser dominador en Israel... Se te ha hecho saber lo que pide Yahvé: sólo practicar la justicia, amar la ternura y caminar humildemente con tu Dios."
    },
    historicalNote: "El texto de Mi 5, 1 es la cita canónica dada por los sumos sacerdotes a Herodes para señalar el lugar de nacimiento del Mesías Jesús (Mt 2, 6)."
  },
  {
    id: "nahum",
    name: "Nahúm",
    hebrewGreekName: "Najum (נַחוּם) / Naoum (Ναούμ)",
    abbr: "Na",
    testament: "Antiguo Testamento",
    category: "Proféticos",
    subCategory: "Profeta Menor",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "El profeta Nahúm de Elcós.",
    date: "Entre 663 y 612 a.C. (Año de la caída de Nínive)",
    location: "Judá",
    audience: "Pueblos oprimidos por la brutal maquinaria de guerra del Imperio Asirio.",
    genre: "Poema bélico triunfal, cántico de venganza divina y júbilo liberador.",
    chapters: 3,
    summary: "Canto lírico de impresionante fuerza sobre la caída y destrucción de Nínive, la 'ciudad sanguinaria', celebrando el derrocamiento de los tiranos que atormentaron al mundo conocido.",
    keyThemes: ["Juicio soberano de Dios sobre los opresores", "Fin del terror imperial", "Buenas noticias de paz sobre los montes"],
    keyPassage: {
      reference: "Na 2, 1; 1, 7",
      text: "¡Mira por los montes los pies del que trae buenas nuevas, del que proclama la paz!... Bueno es Yahvé, refugio en el día de la angustia."
    },
    historicalNote: "Posee una de las poesías más vivas y plásticas de la Biblia hebrea al describir el asalto militar a la capital asiria."
  },
  {
    id: "habacuc",
    name: "Habacuc",
    hebrewGreekName: "Jabaquq (חֲבַקּוּק) / Ambakoum (Ἀμβακούμ)",
    abbr: "Ha",
    testament: "Antiguo Testamento",
    category: "Proféticos",
    subCategory: "Profeta Menor",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "El profeta Habacuc, probablemente un cantor levítico del Templo.",
    date: "Hacia 605-600 a.C. (Aparición de los caldeos)",
    location: "Jerusalén",
    audience: "Creyentes afligidos al ver triunfar a invasores extranjeros despiadados.",
    genre: "Diálogo atrevido con Dios, ayes contra el injusto y teofanía hímnica.",
    chapters: 3,
    summary: "Habacuc se planta en su atalaya para interpelar a Dios: ¿por qué toleras la violencia de los caldeos? Dios le responde que el malvado se desvanecerá pero el justo vivirá por su fe fidelísima.",
    keyThemes: ["El justo vivirá por su fe", "El silencio desconcertante de Dios", "Cántico de alabanza gozosa en la adversidad"],
    keyPassage: {
      reference: "Ha 2, 4; 3, 17-18",
      text: "El justo por su fe vivirá... Aunque la higuera no eche brotes ni haya fruto en las viñas, yo me alegraré en Yahvé, saltaré de gozo en el Dios de mi salvación."
    },
    historicalNote: "El lema 'El justo vivirá por su fe' (Ha 2, 4) se convertirá en la columna vertebral de la teología paulina de la justificación (Rm 1, 17; Ga 3, 11)."
  },
  {
    id: "sofonias",
    name: "Sofonías",
    hebrewGreekName: "Tsefanyá (צְפַנְיָה) / Sophonias (Σοφονίας)",
    abbr: "So",
    testament: "Antiguo Testamento",
    category: "Proféticos",
    subCategory: "Profeta Menor",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "Sofonías, tataranieto del piadoso rey Ezequías.",
    date: "Hacia 630 a.C. (Reinado juvenil de Josías)",
    location: "Jerusalén",
    audience: "Nobles y comerciantes de Jerusalén contaminados por cultos asirios.",
    genre: "Oráculos apocalípticos de purificación y cantos de júbilo mesiánico.",
    chapters: 3,
    summary: "Anuncia el sobrecogedor 'Día de la ira' (Dies Irae) que arrasará el orgullo mundano, para salvar a un 'Resto humilde y pobre' (los Anawim) que se refugiará únicamente en el Nombre de Yahvé.",
    keyThemes: ["El Gran Día de la ira purificadora", "La espiritualidad de los 'Pobres de Yahvé' (Anawim)", "La alegría de la Hija de Sión"],
    keyPassage: {
      reference: "So 3, 12.14",
      text: "Dejaré en medio de ti un pueblo humilde y pobre, que buscará refugio en el nombre de Yahvé... ¡Lanza gritos de gozo, hija de Sión! El Señor está en medio de ti."
    },
    historicalNote: "La invitación a la Hija de Sión (So 3, 14) es el trasfondo directo del saludo del Ángel Gabriel a la Virgen María en la Anunciación ('Alégrate, llena de gracia')."
  },
  {
    id: "ageo",
    name: "Ageo",
    hebrewGreekName: "Jagái (חַגַּי) / Angaios (Ἁγγαῖος)",
    abbr: "Ag",
    testament: "Antiguo Testamento",
    category: "Proféticos",
    subCategory: "Profeta Menor / Post-exílico",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "El profeta Ageo.",
    date: "Año 520 a.C. (Meses de agosto a diciembre)",
    location: "Jerusalén",
    audience: "Zorobabel, el sumo sacerdote Josué y los repatriados que descuidaban la Casa de Dios.",
    genre: "Sermones proféticos fechados con precisión y exhortaciones a la obra.",
    chapters: 2,
    summary: "Reprende a los judíos que viven en casas artesonadas mientras el Templo del Señor sigue en ruinas; los anima a retomar los trabajos prometiendo que la gloria futura de esa Casa superará a la primera.",
    keyThemes: ["Prioridad de Dios en la vida civil", "Reconstrucción del Segundo Templo", "La gloria venidera"],
    keyPassage: {
      reference: "Ag 2, 9",
      text: "Mayor será la gloria de esta segunda Casa que la de la primera, dice Yahvé Sebaot; y en este lugar daré la paz."
    },
    historicalNote: "En cuatro discursos breves pronunciados en solo cuatro meses, logró reactivar con éxito histórico la reconstrucción paralizada del Santuario de Jerusalén."
  },
  {
    id: "zacarias",
    name: "Zacarías",
    hebrewGreekName: "Zejaryá (זְכַרְיָה) / Zakarias (Ζαχαρίας)",
    abbr: "Za",
    testament: "Antiguo Testamento",
    category: "Proféticos",
    subCategory: "Profeta Menor / Visionario",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "Proto-Zacarías (caps. 1-8, hacia 520 a.C.) y Déutero-Zacarías (caps. 9-14, autor anónimo posterior hacia s. III a.C.).",
    date: "Siglos VI a III a.C.",
    location: "Jerusalén",
    audience: "Comunidad restaurada que necesita una visión mesiánica y sacerdotal.",
    genre: "Visiones nocturnas con ángeles intérpretes y oráculos escatológicos.",
    chapters: 14,
    summary: "Ocho visiones simbólicas nocturnas (los cuatro jinetes, el candelabro, el rollo que vuela), y anuncios mesiánicos célebres: el Rey humilde que entra en un asnillo, las treinta monedas de plata y el Traspasado.",
    keyThemes: ["El Mesías pacífico y humilde", "Las treinta monedas arrojadas en el Templo", "Mirarán al que traspasaron"],
    keyPassage: {
      reference: "Za 9, 9; 12, 10",
      text: "¡Alégrate mucho, hija de Sión! He aquí que tu rey viene a ti, justo y victorioso, humilde y montado sobre un asno... Y mirarán hacia mí, al que traspasaron."
    },
    historicalNote: "Es el libro profético menor más citado en el relato de la Pasión de Jesús (el Domingo de Ramos, el precio de Judas, el costado abierto en la Cruz)."
  },
  {
    id: "malaquias",
    name: "Malaquías",
    hebrewGreekName: "Malakjí (מַלְאָכִי) / Malajias (Μαλαχίας)",
    abbr: "Ml",
    testament: "Antiguo Testamento",
    category: "Proféticos",
    subCategory: "Profeta Menor / Cierre del AT",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "Anónimo (Malaquías significa literalmente 'Mi mensajero').",
    date: "Hacia 450 a.C. (Previo a las reformas de Nehemías)",
    location: "Jerusalén",
    audience: "Sacerdotes displicentes y fieles desilusionados que ofrecían animales ciegos y se divorciaban fácilmente.",
    genre: "Disputa dialéctica (pregunta-respuesta) y oráculo de purificación escatológica.",
    chapters: 3,
    summary: "Denuncia la decadencia del culto y los divorcios injustos; anuncia el envío del mensajero de la Alianza para purificar a los levitas como plata en el crisol, y la venida de Elías antes del Día del Señor.",
    keyThemes: ["La oblación pura ofrecida en todo lugar de oriente a occidente", "Fidelidad matrimonial", "Venida de Elías precursor"],
    keyPassage: {
      reference: "Ml 1, 11; 3, 20",
      text: "Pues desde el sol levante hasta el poniente, grande es mi Nombre entre las naciones, y en todo lugar se ofrece a mi Nombre un sacrificio de incienso y una oblación pura."
    },
    historicalNote: "El versículo Ml 1, 11 ha sido interpretado por la Iglesia Católica desde la Didajé y Trento como la profecía universal del Sacrificio Eucarístico de la Santa Misa."
  },

  // ==========================================
  // NUEVO TESTAMENTO - EVANGELIOS (4 libros)
  // ==========================================
  {
    id: "mateo",
    name: "San Mateo",
    hebrewGreekName: "Mataí (מַתִּי) / Kata Maththaion (Κατὰ Μαθθαῖον)",
    abbr: "Mt",
    testament: "Nuevo Testamento",
    category: "Evangelios",
    subCategory: "Evangelio Sinóptico",
    isDeuterocanonical: false,
    isSynoptic: true,
    author: "Tradicionalmente atribuido al apóstol Leví-Mateo el publicano; redacción final en griego por un maestro judeocristiano de la escuela de Antioquía.",
    date: "Hacia 80-85 d.C.",
    location: "Antioquía de Siria",
    audience: "Cristianos de origen judío que conocen a fondo las Escrituras y debaten con el judaísmo rabínico naciente.",
    genre: "Evangelio kerygmático estructurado en 5 grandes discursos que emulan la Torá de Moisés.",
    chapters: 28,
    summary: "Presenta a Jesús como el nuevo Moisés y el Mesías prometido que cumple minuciosamente todas las profecías del Antiguo Testamento. Estructurado en cinco discursos: de la Montaña, Misionero, Parabólico, Comunitario y Escatológico.",
    keyThemes: ["El Sermón de la Montaña y las Bienaventuranzas", "Cumplimiento de las Escrituras", "La Iglesia y las Llaves de Pedro", "Mandato misionero universal"],
    keyPassage: {
      reference: "Mt 5, 3; 16, 18",
      text: "Bienaventurados los pobres en el espíritu, porque de ellos es el Reino de los Cielos... Y yo a mi vez te digo que tú eres Pedro, y sobre esta piedra edificaré mi Iglesia."
    },
    historicalNote: "Es un Evangelio Sinóptico. En la tradición católica ocupa el primer lugar del Nuevo Testamento por su eminente valor eclesiológico y litúrgico."
  },
  {
    id: "marcos",
    name: "San Marcos",
    hebrewGreekName: "Marqos (מרקוס) / Kata Markon (Κατὰ Μᾶρκον)",
    abbr: "Mc",
    testament: "Nuevo Testamento",
    category: "Evangelios",
    subCategory: "Evangelio Sinóptico / El más antiguo",
    isDeuterocanonical: false,
    isSynoptic: true,
    author: "Juan Marcos de Jerusalén, discípulo y 'secretario/intérprete' de San Pedro según testimonio de Papías.",
    date: "Hacia 65-70 d.C. (Primer evangelio escrito)",
    location: "Roma",
    audience: "Cristianos de origen gentil (grecorromanos) perseguidos bajo el emperador Nerón.",
    genre: "Narrativa evangélica rápida, viva, de estilo directo y gran dramatismo teológico.",
    chapters: 16,
    summary: "El evangelio más dinámico y breve. Centrado en el 'Secreto Mesiánico' y la pregunta permanente: '¿Quién es este hombre?'. Conduce al lector hasta el Calvario donde el centurión pagano confiesa la divinidad de Cristo.",
    keyThemes: ["El Secreto Mesiánico", "Jesús el Siervo doliente", "El discipulado de la Cruz"],
    keyPassage: {
      reference: "Mc 10, 45; 15, 39",
      text: "Porque el Hijo del hombre no ha venido a ser servido, sino a servir y a dar su vida en rescate por muchos... Al ver el centurión que había muerto de este modo, dijo: «Verdaderamente este hombre era Hijo de Dios»."
    },
    historicalNote: "Evangelio Sinóptico fundacional. La crítica moderna de la Escuela de Jerusalén reconoce que Marcos es la fuente narrativa principal utilizada por Mateo y Lucas (Teoría de las dos fuentes)."
  },
  {
    id: "lucas",
    name: "San Lucas",
    hebrewGreekName: "Loukas (לוּקָס) / Kata Loukan (Κατὰ Λουκᾶν)",
    abbr: "Lc",
    testament: "Nuevo Testamento",
    category: "Evangelios",
    subCategory: "Evangelio Sinóptico / Díptico de Lucas",
    isDeuterocanonical: false,
    isSynoptic: true,
    author: "Lucas, el médico amado y fiel compañero de viajes de San Pablo.",
    date: "Hacia 80-85 d.C.",
    location: "Grecia, Roma o Antioquía",
    audience: "Teófilo y los cristianos procedentes del paganismo de cultura helenística.",
    genre: "Historiografía sagrada helenística culta, evangelio biográfico y de la ternura.",
    chapters: 24,
    summary: "El evangelio de la misericordia, la alegría y la oración. Incluye el hermoso Evangelio de la Infancia (contado desde la perspectiva de María), las parábolas exclusivas del Hijo Pródigo y el Buen Samaritano, y el camino de Emaús.",
    keyThemes: ["Misericordia hacia los pecadores y marginados", "Papel primordial de las mujeres y de María", "Acción permanente del Espíritu Santo", "El camino y la Eucaristía en Emaús"],
    keyPassage: {
      reference: "Lc 1, 46-47; 15, 20",
      text: "Dijo María: «Proclama mi alma la grandeza del Señor, se alegra mi espíritu en Dios mi salvador»... Estando él todavía lejos, le vio su padre y, conmovido, corrió, se echó a su cuello y le besó efusivamente."
    },
    historicalNote: "Evangelio Sinóptico. Forma la primera parte de una obra en dos volúmenes (Lc y Hch), concebida como la historia ordenada de la salvación que pasa de Jerusalén a los confines del mundo."
  },
  {
    id: "juan",
    name: "San Juan",
    hebrewGreekName: "Yojanan (יוֹחָנָן) / Kata Iōannēn (Κατὰ Ἰωάννην)",
    abbr: "Jn",
    testament: "Nuevo Testamento",
    category: "Evangelios",
    subCategory: "Evangelio Teológico / Círculo Joánico",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "San Juan el Apóstol, el discípulo amado, y su comunidad o escuela de Éfeso.",
    date: "Hacia 90-100 d.C.",
    location: "Éfeso (Asia Menor)",
    audience: "Comunidades cristianas maduras confrontadas con el gnosticismo incipiente y la expulsión de la sinagoga.",
    genre: "Evangelio contemplativo y teológico-simbólico; libro de los Signos (1-12) y libro de la Hora/Gloria (13-21).",
    chapters: 21,
    summary: "No es un evangelio sinóptico. Comienza con el solemne Prólogo del Verbo encarnado, relata siete grandes 'Signos' milagrosos (Caná, ciego de nacimiento, resurrección de Lázaro), el discurso del Pan de Vida y los discursos de despedida en el Cenáculo.",
    keyThemes: ["La divinidad preexistente del Verbo (Logos)", "La 'Hora' de la glorificación en la Cruz", "El Mandamiento Nuevo del Amor", "El Espíritu Paráclito Consolador"],
    keyPassage: {
      reference: "Jn 1, 1.14; 3, 16",
      text: "En el principio existía la Palabra y la Palabra estaba con Dios, y la Palabra era Dios... Y la Palabra se hizo carne, y puso su Morada entre nosotros... Porque tanto amó Dios al mundo que dio a su Hijo único."
    },
    historicalNote: "Para la Escuela Bíblica de Jerusalén, San Juan es la cima de la teología neotestamentaria: una profunda meditación sacramental y mística sobre el misterio de Cristo."
  },

  // ==========================================
  // NUEVO TESTAMENTO - HISTÓRICO (1 libro)
  // ==========================================
  {
    id: "hechos-de-los-apostoles",
    name: "Hechos de los Apóstoles",
    hebrewGreekName: "Maasei Hashlijim (מַעֲשֵׂי הַשְּׁלִיחִים) / Praxeis Apostolōn (Πράξεις Ἀποστόλων)",
    abbr: "Hch",
    testament: "Nuevo Testamento",
    category: "Históricos del NT",
    subCategory: "Historia de la Iglesia Primitiva",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "San Lucas el evangelista (segundo volumen de su obra dedicada a Teófilo).",
    date: "Hacia 80-90 d.C.",
    location: "Roma o Grecia",
    audience: "Teófilo y las comunidades de gentiles que necesitaban ver la expansión legítima del Evangelio desde Jerusalén hasta Roma.",
    genre: "Historiografía teológica antigua, discursos doctrinales apostólicos y diario de viajes marítimos.",
    chapters: 28,
    summary: "La Ascensión de Jesús, Pentecostés y el nacimiento de la Iglesia en Jerusalén guiada por Pedro; el martirio de San Esteban, la conversión fulgurante de Saulo en el camino a Damasco, el Concilio de Jerusalén y los tres grandes viajes misioneros de San Pablo hasta llegar encadenado a Roma.",
    keyThemes: ["El Evangelio del Espíritu Santo", "Universalidad de la Iglesia abierta a los paganos", "La fracción del pan y la comunidad fraterna"],
    keyPassage: {
      reference: "Hch 1, 8; 2, 42",
      text: "Recibiréis la fuerza del Espíritu Santo que vendrá sobre vosotros, y seréis mis testigos en Jerusalén, en toda Judea y Samaría, y hasta los confines de la tierra... Acudían asiduamente a la enseñanza de los apóstoles, a la comunión, a la fracción del pan y a las oraciones."
    },
    historicalNote: "Conocido como el 'Evangelio del Espíritu Santo', documenta la transición del cristianismo de ser una pequeña secta judía a convertirse en la Iglesia católica universal."
  },

  // ==========================================
  // NUEVO TESTAMENTO - CARTAS PAULINAS (14 libros)
  // ==========================================
  {
    id: "romanos",
    name: "Romanos",
    hebrewGreekName: "Igueret el Haromim (אִגֶּרֶת אֶל הָרוֹמִים) / Pros Rōmaious (Πρὸς Ῥωμαίους)",
    abbr: "Rm",
    testament: "Nuevo Testamento",
    category: "Epístolas Paulinas",
    subCategory: "Epístola Doctrinal Mayor",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "San Pablo apóstol (dictada a Tercio).",
    date: "Invierno del 57-58 d.C.",
    location: "Corinto",
    audience: "La prestigiosa comunidad cristiana de Roma, compuesta por creyentes de origen judío y gentil.",
    genre: "Tratado teológico en forma epistolar solemne.",
    chapters: 16,
    summary: "La obra maestra dogmática de Pablo: la justificación por la gracia mediante la fe en Jesucristo independiente de las obras de la ley mosaica, el misterio de Adán y el Nuevo Adán, la vida en el Espíritu Santo y el destino escatológico del pueblo judío.",
    keyThemes: ["Justificación por la fe", "La filiación divina por el Espíritu", "Nada podrá separarnos del amor de Cristo"],
    keyPassage: {
      reference: "Rm 1, 16; 8, 38-39",
      text: "No me avergüenzo del Evangelio, que es poder de Dios para salvación de todo el que cree... Porque estoy convencido de que ni la muerte, ni la vida... podrá separarnos del amor de Dios manifestado en Cristo Jesús."
    },
    historicalNote: "Es el escrito más influyente en la teología de la gracia de Occidente (San Agustín, Santo Tomás de Aquino, Concilio de Trento)."
  },
  {
    id: "1-corintios",
    name: "1 Corintios",
    hebrewGreekName: "Qorintim Álef (קוֹרִינְתִּים א׳) / Pros Korinthious A (Πρὸς Κορινθίους Αʹ)",
    abbr: "1 Co",
    testament: "Nuevo Testamento",
    category: "Epístolas Paulinas",
    subCategory: "Carta Pastoral Comunitaria",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "San Pablo apóstol con Sóstenes.",
    date: "Primavera del 56 d.C.",
    location: "Éfeso",
    audience: "La vibrante y turbulenta comunidad de Corinto, expuesta a divisiones, escándalos y desórdenes carismáticos.",
    genre: "Carta pastoral de corrección fraterna, directrices éticas y litúrgicas.",
    chapters: 16,
    summary: "Responde a consultas concretas: condena de facciones, pureza moral, litigios ante jueces paganos, matrimonio y celibato, la cena del Señor (institución de la Eucaristía en 1 Co 11), el himno a la caridad (cap. 13) y la resurrección de los muertos (cap. 15).",
    keyThemes: ["La sabiduría de la Cruz como locura para el mundo", "La Iglesia como Cuerpo místico de Cristo", "El himno al Amor (Ágape)", "La certeza de la Resurrección corporal"],
    keyPassage: {
      reference: "1 Co 13, 4.13; 15, 20",
      text: "El amor es paciente, es servicial; el amor no es envidioso... Ahora subsisten la fe, la esperanza y el amor, estas tres. Pero la mayor de todas ellas es el amor."
    },
    historicalNote: "Contiene el relato escrito más antiguo de la institución de la Santa Eucaristía (1 Co 11, 23-26), anterior incluso a la redacción de los cuatro Evangelios."
  },
  {
    id: "2-corintios",
    name: "2 Corintios",
    hebrewGreekName: "Qorintim Bet (קוֹרִינְתִּים ב׳) / Pros Korinthious B (Πρὸς Κορινθίους Βʹ)",
    abbr: "2 Co",
    testament: "Nuevo Testamento",
    category: "Epístolas Paulinas",
    subCategory: "Apología Apostólica",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "San Pablo y Timoteo.",
    date: "Otoño del 57 d.C.",
    location: "Macedonia",
    audience: "La comunidad de Corinto tras una dolorosa crisis de autoridad agitada por 'superapóstoles'.",
    genre: "Confesión apostólica autobiográfica apasionada y colecta solidaria.",
    chapters: 13,
    summary: "La carta más íntima y conmovedora de Pablo: abre su corazón sobre sus tribulaciones, naufragios y el 'aguijón en la carne', defendiendo la legitimidad de su ministerio como embajador de Cristo y organizando la colecta para los pobres de Jerusalén.",
    keyThemes: ["El consuelo en medio de la tribulación", "Tesoro en vasijas de barro", "La fuerza que se perfecciona en la debilidad"],
    keyPassage: {
      reference: "2 Co 12, 9",
      text: "Él me dijo: «Te basta mi gracia, porque mi fuerza se realiza en la flaqueza». Por tanto, muy gustosamente me gloriaré más bien en mis flaquezas, para que habite en mí la fuerza de Cristo."
    },
    historicalNote: "Muestra la teología viva del apóstol: el poder de Dios resplandece con mayor brillo en la fragilidad física y humana de sus ministros."
  },
  {
    id: "galatas",
    name: "Gálatas",
    hebrewGreekName: "Galatim (גָּלָטִים) / Pros Galatas (Πρὸς Γαλάτας)",
    abbr: "Ga",
    testament: "Nuevo Testamento",
    category: "Epístolas Paulinas",
    subCategory: "La Carta de la Libertad Cristiana",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "San Pablo apóstol.",
    date: "Hacia 54-55 d.C.",
    location: "Éfeso o Corinto",
    audience: "Comunidades de Galacia (centro de Asia Menor) infiltradas por judaizantes que exigían la circuncisión a los paganos.",
    genre: "Carta polémica, invectiva vehemente y apología de la libertad evangélica.",
    chapters: 6,
    summary: "Con un tono enérgico sin el habitual agradecimiento inicial, Pablo defiende que el hombre es justificado por la fe en Cristo y no por la circuncisión ni las obras de la Ley; describe el fruto del Espíritu frente a las obras de la carne.",
    keyThemes: ["La Carta Magna de la libertad cristiana", "Hijos libres y no esclavos", "Los frutos del Espíritu Santo"],
    keyPassage: {
      reference: "Ga 2, 20; 5, 22-23",
      text: "Con Cristo estoy crucificado: y no vivo yo, sino que es Cristo quien vive en mí... En cambio, el fruto del Espíritu es amor, alegría, paz, paciencia, afabilidad, bondad, fidelidad, mansedumbre, dominio de sí."
    },
    historicalNote: "Fue redactada en un momento decisivo de la historia eclesial donde se jugaba si el cristianismo sería una rama del judaísmo o la Buena Nueva universal."
  },
  {
    id: "efesios",
    name: "Efesios",
    hebrewGreekName: "Efesim (אֶפֶסִים) / Pros Ephesious (Πρὸς Ἐφεσίους)",
    abbr: "Ef",
    testament: "Nuevo Testamento",
    category: "Epístolas Paulinas",
    subCategory: "Epístola de la Cautividad",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "San Pablo desde la prisión (o discípulo muy cercano de su escuela que condensa su pensamiento).",
    date: "Hacia 61-63 d.C. (Prisión en Roma)",
    location: "Roma (o Éfeso)",
    audience: "Comunidades de Asia Menor en torno a Éfeso.",
    genre: "Himno meditativo, liturgia solemne y exhortación moral y familiar.",
    chapters: 6,
    summary: "Contempla el designio eterno de Dios de recapitular todas las cosas en Cristo. Desarrolla la teología de la Iglesia como Cuerpo y Esposa de Cristo, la reconciliación entre judíos y gentiles que derribó el muro divisorio, y la armadura de Dios.",
    keyThemes: ["Bendición en los cielos en Cristo", "La Iglesia Esposa sin mancha ni arruga", "Un solo Señor, una sola fe, un solo bautismo", "La armadura espiritual"],
    keyPassage: {
      reference: "Ef 2, 8-9; 4, 4-5",
      text: "Pues habéis sido salvados por la gracia mediante la fe; y esto no viene de vosotros, sino que es don de Dios... Un solo Cuerpo y un solo Espíritu, como una sola es la esperanza de vuestra vocación."
    },
    historicalNote: "En la Biblia de Jerusalén se resalta su lenguaje litúrgico y majestuoso, considerado la cumbre de la teología eclesiológica paulina."
  },
  {
    id: "filipenses",
    name: "Filipenses",
    hebrewGreekName: "Filipim (פִילִיפִּים) / Pros Philippēsious (Πρὸς Φιλιππησίους)",
    abbr: "Flp",
    testament: "Nuevo Testamento",
    category: "Epístolas Paulinas",
    subCategory: "Epístola del Gozo Cristiano",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "San Pablo y Timoteo desde la prisión.",
    date: "Hacia 56 d.C. (Éfeso) o 61-62 d.C. (Roma)",
    location: "Prisión de Roma o Éfeso",
    audience: "La querida comunidad de Filipos (primera iglesia fundada en suelo europeo).",
    genre: "Carta de afecto fraterno, agradecimiento por ayuda material y cántico cristológico.",
    chapters: 4,
    summary: "Conocida como la 'carta del gozo', rebosa serenidad y ternura a pesar de las cadenas del apóstol. Contiene el célebre himno cristológico de la 'Kénosis' (Flp 2): Cristo no retuvo codiciosamente su condición divina sino que se abajó hasta la muerte de cruz.",
    keyThemes: ["El gozo irreductible en el Señor", "La Kénosis y exaltación del Nombre de Jesús", "Todo lo puedo en Aquel que me conforta"],
    keyPassage: {
      reference: "Flp 2, 6-8; 4, 13",
      text: "Él, siendo de condición divina, no retuvo ávidamente el ser igual a Dios, sino que se despojó de sí mismo tomando condición de siervo... Todo lo puedo en Aquel que me conforta."
    },
    historicalNote: "El himno cristológico de Filipenses 2 es uno de los credos poéticos más primitivos del cristianismo, proclamado antes de que existiera cualquier concilio ecuménico."
  },
  {
    id: "colosenses",
    name: "Colosenses",
    hebrewGreekName: "Qolosim (קוֹלוֹסִים) / Pros Kolossaeis (Πρὸς Κολοσσαεῖς)",
    abbr: "Col",
    testament: "Nuevo Testamento",
    category: "Epístolas Paulinas",
    subCategory: "Epístola de la Cautividad",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "San Pablo (o tradición de su escuela apostólica).",
    date: "Hacia 61-63 d.C.",
    location: "Roma (o Éfeso)",
    audience: "Comunidad de Colosas amenazada por una filosofía sincretista de cultos a poderes angélicos.",
    genre: "Cántico sapiencial cristológico y directrices éticas para el hombre nuevo.",
    chapters: 4,
    summary: "Proclama la soberanía cósmica absoluta de Cristo: primogénito de toda la creación y cabeza del Cuerpo que es la Iglesia, en quien habita corporalmente toda la plenitud de la divinidad.",
    keyThemes: ["Primacía absoluta de Cristo sobre toda potestad", "Plenitud divina encarnada", "Despojarse del hombre viejo"],
    keyPassage: {
      reference: "Col 1, 15-17; 2, 9",
      text: "Él es imagen de Dios invisible, primogénito de toda la creación, porque en él fueron creadas todas las cosas... En él reside corporalmente toda la plenitud de la divinidad."
    },
    historicalNote: "Desmantela cualquier herejía que pretendiera subordinar a Jesucristo a intermediarios angélicos o sabidurías esotéricas."
  },
  {
    id: "1-tesalonicenses",
    name: "1 Tesalonicenses",
    hebrewGreekName: "Taslonikim Álef (תַּסְלוֹנִיקִים א׳) / Pros Thessalonikeis A (Πρὸς Θεσσαλονικεῖς Αʹ)",
    abbr: "1 Ts",
    testament: "Nuevo Testamento",
    category: "Epístolas Paulinas",
    subCategory: "El Escrito Más Antiguo del NT",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "San Pablo, Silvano (Silas) y Timoteo.",
    date: "Año 50-51 d.C. (El texto más antiguo de todo el Nuevo Testamento)",
    location: "Corinto",
    audience: "La joven comunidad de Tesalónica (Macedonia), recién convertida del paganismo.",
    genre: "Carta misionera de consuelo, aliento y catequesis escatológica.",
    chapters: 5,
    summary: "Pablo expresa su inmensa alegría por la perseverancia de la comunidad frente a la persecución, y responde a sus angustias sobre la suerte de los hermanos difuntos antes de la Parusía (segunda venida de Cristo).",
    keyThemes: ["La Parusía y la esperanza de resurrección", "Vigilancia en la fe y santificación", "Orad sin cesar"],
    keyPassage: {
      reference: "1 Ts 4, 13-14; 5, 16-18",
      text: "Hermanos, no queremos que estéis en la ignorancia respecto de los muertos, para que no os entristezcáis como los demás que no tienen esperanza... Estad siempre alegres. Orad constantemente. En todo dad gracias."
    },
    historicalNote: "Documento histórico extraordinario: es cronológicamente el texto cristiano más antiguo conservado, escrito unos 20 años después de la Resurrección de Jesús."
  },
  {
    id: "2-tesalonicenses",
    name: "2 Tesalonicenses",
    hebrewGreekName: "Taslonikim Bet (תַּסְלוֹנִיקִים ב׳) / Pros Thessalonikeis B (Πρὸς Θεσσαλονικεῖς Βʹ)",
    abbr: "2 Ts",
    testament: "Nuevo Testamento",
    category: "Epístolas Paulinas",
    subCategory: "Carta Escatológica",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "San Pablo (o discípulo de su círculo con su firma personal).",
    date: "Hacia 51-52 d.C. (o posterior)",
    location: "Corinto",
    audience: "Comunidad de Tesalónica confundida por falsas cartas que aseguraban que el 'Día del Señor' ya había llegado.",
    genre: "Apocalíptica epistolar y corrección de la pereza comunitaria.",
    chapters: 3,
    summary: "Aclara que antes de la Parusía debe manifestarse la apostasía y el 'hombre impío'; reprende severamente a los ociosos que usaban la inminencia del fin para no trabajar: 'El que no quiera trabajar, que no coma'.",
    keyThemes: ["El misterio de la iniquidad", "Firmeza en la sana tradición recibida", "Dignidad del trabajo cotidiano"],
    keyPassage: {
      reference: "2 Ts 2, 15; 3, 10",
      text: "Así pues, hermanos, manteneos firmes y conservad las tradiciones que habéis aprendido de nosotros... Si alguno no quiere trabajar, que tampoco coma."
    },
    historicalNote: "Pone freno al entusiasmo desmedido y al fanatismo milenarista, orientando la esperanza cristiana a una fidelidad madura en la historia presente."
  },
  {
    id: "1-timoteo",
    name: "1 Timoteo",
    hebrewGreekName: "Timotiyos Álef (טִימוֹתִיוֹס א׳) / Pros Timotheon A (Πρὸς Τιμόθεον Αʹ)",
    abbr: "1 Tm",
    testament: "Nuevo Testamento",
    category: "Epístolas Paulinas",
    subCategory: "Epístola Pastoral",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "San Pablo apóstol (corpus de Cartas Pastorales; redacción final por escuela paulina).",
    date: "Hacia 65-67 d.C. (o finales de siglo I)",
    location: "Macedonia",
    audience: "Timoteo, joven obispo y delegado apostólico en la Iglesia de Éfeso.",
    genre: "Manual eclesiástico de orden pastoral, directrices ministeriales y combate a falsas doctrinas.",
    chapters: 6,
    summary: "Instrucciones de gobierno eclesial: requisitos y virtudes morales para los obispos (epíscopos), presbíteros y diáconos; combate a fábulas gnósticas y defensa de la creación divina contra el ascetismo desordenado.",
    keyThemes: ["Estructura y ministerios de la Iglesia", "Dios quiere que todos los hombres se salven", "Un solo mediador: Cristo Jesús"],
    keyPassage: {
      reference: "1 Tm 2, 4-5; 3, 15",
      text: "Dios quiere que todos los hombres se salven y lleguen al conocimiento de la verdad. Porque hay un solo Dios, y también un solo mediador entre Dios y los hombres, Cristo Jesús... La Iglesia de Dios vivo, columna y fundamento de la verdad."
    },
    historicalNote: "Junto con 2 Timoteo y Tito forma el grupo de las 'Cartas Pastorales', esenciales para la teología del sacramento del Orden sacerdotal y la sucesión apostólica."
  },
  {
    id: "2-timoteo",
    name: "2 Timoteo",
    hebrewGreekName: "Timotiyos Bet (טִימוֹתִיוֹס ב׳) / Pros Timotheon B (Πρὸς Τιμόθεον Βʹ)",
    abbr: "2 Tm",
    testament: "Nuevo Testamento",
    category: "Epístolas Paulinas",
    subCategory: "Epístola Pastoral / Testamento de Pablo",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "San Pablo apóstol en su segundo y definitivo encarcelamiento en Roma.",
    date: "Hacia 67 d.C.",
    location: "Cárcel Mamertina de Roma (vísperas de su martirio)",
    audience: "Timoteo, su 'hijo queridísimo'.",
    genre: "Testamento espiritual conmovedor, exhortación a la valentía ministerial y despedida apostólica.",
    chapters: 4,
    summary: "El emotivo adiós de Pablo consciente de su muerte inminente: exhorta a Timoteo a reavivar el fuego del carisma recibido por la imposición de manos, a anunciar la Palabra a tiempo y a destiempo, y declara haber combatido el noble combate.",
    keyThemes: ["Fidelidad hasta el martirio", "Inspiración divina de la Sagrada Escritura", "La corona merecida de la justicia"],
    keyPassage: {
      reference: "2 Tm 3, 16-17; 4, 7-8",
      text: "Toda la Escritura es inspirada por Dios y útil para enseñar, para argüir, para corregir y para educar en la justicia... He combatido el noble combate, he alcanzado la meta, he guardado la fe."
    },
    historicalNote: "Es el testamento espiritual de San Pablo apóstol antes de ser decapitado en Roma bajo Nerón; contiene el testimonio clásico sobre la inspiración bíblica (theópneustos)."
  },
  {
    id: "tito",
    name: "Tito",
    hebrewGreekName: "Titos (טִיטוֹס) / Pros Titon (Πρὸς Τίτον)",
    abbr: "Tt",
    testament: "Nuevo Testamento",
    category: "Epístolas Paulinas",
    subCategory: "Epístola Pastoral",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "San Pablo apóstol.",
    date: "Hacia 65-66 d.C.",
    location: "Macedonia o Éfeso",
    audience: "Tito, delegado apostólico encargado de organizar la Iglesia en la isla de Creta.",
    genre: "Instrucción pastoral y catequesis moral para las diversas edades y estados de vida.",
    chapters: 3,
    summary: "Instrucciones para ordenar presbíteros en cada ciudad de Creta, combatir charlatanes y educar a ancianos, jóvenes y siervos en la sobriedad, fundamentado en la manifestación de la gracia salvadora de Dios.",
    keyThemes: ["Sana doctrina y buenas obras", "La manifestación de la benignidad de Dios", "El baño del nuevo nacimiento en el Espíritu"],
    keyPassage: {
      reference: "Tt 2, 11; 3, 4-5",
      text: "Se ha manifestado la gracia salvadora de Dios a todos los hombres... Él nos salvó no por obras de justicia que hubiésemos hecho nosotros, sino según su misericordia, por medio del baño de la regeneración y renovación del Espíritu Santo."
    },
    historicalNote: "En la liturgia católica de Nochebuena y Navidad, los pasajes de Tito (Tt 2 y 3) son proclamados solemnemente para anunciar el misterio de la Encarnación salvífica."
  },
  {
    id: "filemon",
    name: "Filemón",
    hebrewGreekName: "Filemon (פִילֵימוֹן) / Pros Philēmona (Πρὸς Φιλήμονα)",
    abbr: "Flm",
    testament: "Nuevo Testamento",
    category: "Epístolas Paulinas",
    subCategory: "Epístola de la Cautividad / Billete Personal",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "San Pablo prisionero.",
    date: "Hacia 61-63 d.C.",
    location: "Roma (o Éfeso)",
    audience: "Filemón, cristiano acomodado de Colosas, junto a Apia y Arquipo.",
    genre: "Carta privada de mediación, persuasión diplomática y exquisita caridad cristiana.",
    chapters: 1,
    summary: "El escrito más breve de Pablo (25 versículos). Intercede por Onésimo, un esclavo fugitivo que se convirtió en la prisión con Pablo, pidiendo a su amo Filemón que lo reciba ya no como siervo, sino como un hermano amadísimo en Cristo.",
    keyThemes: ["La fraternidad cristiana supera la esclavitud", "Reconciliación y perdón generoso", "Delicadeza y respeto a la libertad"],
    keyPassage: {
      reference: "Flm 1, 15-16",
      text: "Quizá fue separado de ti por un momento para que lo recobres para siempre, no ya como esclavo, sino como algo mejor que un esclavo: como un hermano amado."
    },
    historicalNote: "Sin hacer un manifiesto revolucionario político armado, la levadura evangélica de Filemón dinamitó desde adentro los cimientos morales de la esclavitud en el Imperio Romano."
  },
  {
    id: "hebreos",
    name: "Hebreos",
    hebrewGreekName: "Ivrim (עִבְרִים) / Pros Hebraious (Πρὸς Ἑβραίους)",
    abbr: "Hb",
    testament: "Nuevo Testamento",
    category: "Epístolas Paulinas",
    subCategory: "Tratado Teológico Sacerdotal",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "Maestro cristiano brillante de cultura helenística (propuestos: Apolo, Bernabé o escuela paulina; tradición antigua lo vinculó a San Pablo).",
    date: "Hacia 65-70 d.C. (Antes de la destrucción del Templo en 70 d.C.)",
    location: "Roma o Alejandría",
    audience: "Cristianos de procedencia judía tentados de volver a los antiguos ritos y sacrificios del Templo por desánimo.",
    genre: "Homilía solemne ('palabra de exhortación') y tratado teológico del sacerdocio de Cristo.",
    chapters: 13,
    summary: "Desarrolla la absoluta superioridad de la Nueva Alianza: Cristo es superior a los ángeles y a Moisés; es el Sumo Sacerdote eterno según el orden de Melquisedec, cuyo único sacrificio perfecto en la Cruz canceló para siempre todos los sacrificios antiguos.",
    keyThemes: ["Sacerdocio eterno de Cristo", "La fe como garantía de lo que se espera (Hb 11)", "Jesucristo es el mismo ayer, hoy y siempre"],
    keyPassage: {
      reference: "Hb 1, 1-2; 4, 14-15; 13, 8",
      text: "Muchas veces y de muchos modos habló Dios en el pasado a nuestros padres por los profetas; en estos últimos días nos ha hablado por medio del Hijo... Jesús se compadece de nuestras flaquezas porque fue probado en todo menos en el pecado... Jesucristo es el mismo ayer, hoy y por los siglos."
    },
    historicalNote: "En la Biblia de Jerusalén se resalta su estilo griego pulido (el más elevado de todo el NT) y su aporte dogmático insustituible sobre el sacerdocio eterno de Cristo mediador."
  },

  // ==========================================
  // NUEVO TESTAMENTO - EPÍSTOLAS CATÓLICAS (7 libros)
  // ==========================================
  {
    id: "santiago",
    name: "Santiago",
    hebrewGreekName: "Yaaqov (יַעֲקֹב) / Iakōbou (Ἰακώβου)",
    abbr: "St",
    testament: "Nuevo Testamento",
    category: "Epístolas Católicas",
    subCategory: "Carta Católica Universal",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "Santiago, 'hermano del Señor', obispo venerable de la Iglesia madre de Jerusalén.",
    date: "Hacia 58-62 d.C. (Antes de su martirio en 62 d.C.)",
    location: "Jerusalén",
    audience: "Las doce tribus de la diáspora (comunidades judeocristianas dispersas).",
    genre: "Homilía sapiencial moral al estilo de Proverbios y el Sermón de la Montaña.",
    chapters: 5,
    summary: "Tratado directo y vigoroso sobre la fe práctica: la fe sin obras está muerta; el control moral de la lengua; denuncia implacable contra los ricos explotadores que retienen el jornal de los obreros; y el sacramento de la Unción de los enfermos.",
    keyThemes: ["La fe que actúa por las obras", "El pecado del dominio de la lengua", "La oración ferviente y la Unción de los enfermos"],
    keyPassage: {
      reference: "St 2, 17.26; 5, 14",
      text: "Así también la fe, si no tiene obras, está realmente muerta en sí misma... ¿Está enfermo alguno de vosotros? Llame a los presbíteros de la Iglesia, y oren sobre él, ungiéndole con óleo en el nombre del Señor."
    },
    historicalNote: "Es el fundamento bíblico explícito definido por el Concilio de Trento para el sacramento de la Santa Unción de los enfermos (St 5, 14-15)."
  },
  {
    id: "1-pedro",
    name: "1 Pedro",
    hebrewGreekName: "Petros Álef (פֶּטְרוֹס א׳) / Petrou A (Πέτρου Αʹ)",
    abbr: "1 P",
    testament: "Nuevo Testamento",
    category: "Epístolas Católicas",
    subCategory: "Carta Católica Universal",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "San Pedro apóstol, con la asistencia de Silvano (Silas) como secretario.",
    date: "Hacia 63-64 d.C.",
    location: "Roma (designada simbólicamente como 'Babilonia')",
    audience: "Cristianos dispersos en el Ponto, Galacia, Capadocia, Asia y Bitinia que sufrían discriminación y pruebas.",
    genre: "Homilía bautismal, exhortación a la esperanza y carta pastoral.",
    chapters: 5,
    summary: "Alienta a los creyentes a mantenerse firmes en medio del sufrimiento como piedras vivas del Templo de Dios, recordando el rescate pagado no con plata ni oro, sino con la sangre preciosa de Cristo Cordero inmaculado.",
    keyThemes: ["Pueblo adquirido, sacerdocio real", "Rescatados por la sangre de Cristo", "Estar siempre dispuestos a dar razón de nuestra esperanza"],
    keyPassage: {
      reference: "1 P 2, 9; 3, 15",
      text: "Vosotros sois linaje elegido, sacerdocio real, nación santa, pueblo adquirido por Dios para anunciar sus grandezas... Estad siempre dispuestos a dar razón de vuestra esperanza a todo el que os la pidiere, con mansedumbre y respeto."
    },
    historicalNote: "Enseña el 'sacerdocio común de todos los fieles' bautizados, rescatado de manera preeminente por el Concilio Vaticano II en la constitución 'Lumen Gentium'."
  },
  {
    id: "2-pedro",
    name: "2 Pedro",
    hebrewGreekName: "Petros Bet (פֶּטְרוֹס ב׳) / Petrou B (Πέτρου Βʹ)",
    abbr: "2 P",
    testament: "Nuevo Testamento",
    category: "Epístolas Católicas",
    subCategory: "Testamento Apostólico",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "Puesta bajo la autoridad de Simón Pedro (redactada por círculos petrinos en estilo de testamento).",
    date: "Hacia 67 d.C. o finales del siglo I",
    location: "Roma",
    audience: "La Iglesia universal amenazada por herejes inmorales y escépticos de la Parusía.",
    genre: "Carta circular de combate a las herejías y defensa de la escatología.",
    chapters: 3,
    summary: "Combate a los falsos maestros libertinos; defiende la certeza de la Transfiguración como testimonio ocular; explica que el retraso del Día del Señor es paciencia divina para que todos se conviertan, y atestigua la autoridad de las cartas de Pablo como Sagrada Escritura.",
    keyThemes: ["Partícipes de la naturaleza divina", "La paciencia de Dios como salvación", "Reconocimiento canónico de las cartas de San Pablo"],
    keyPassage: {
      reference: "2 P 1, 4; 3, 8-9",
      text: "Por medio de ellas nos han sido concedidas las preciosas y sublimes promesas, para que por ellas llegaseis a ser partícipes de la naturaleza divina... Para el Señor un día es como mil años, y mil años como un día. El Señor no retarda la promesa... sino que es paciente para con vosotros."
    },
    historicalNote: "Contiene la primera mención bíblica explícita que equipara los escritos de San Pablo con el resto de las 'Escrituras' sagradas (2 P 3, 16)."
  },
  {
    id: "1-juan",
    name: "1 Juan",
    hebrewGreekName: "Yojanan Álef (יוֹחָנָן א׳) / Iōannou A (Ἰωάννου Αʹ)",
    abbr: "1 Jn",
    testament: "Nuevo Testamento",
    category: "Epístolas Católicas",
    subCategory: "Carta Joánica / 'Dios es Amor'",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "San Juan el Apóstol y Evangelista.",
    date: "Hacia 90-100 d.C.",
    location: "Éfeso",
    audience: "Comunidades joánicas desgarradas por herejías docetas (que negaban la verdadera carne humana de Cristo).",
    genre: "Tratado teológico espiritual circular sobre la comunión, la luz y el amor fraterno.",
    chapters: 5,
    summary: "Proclama con fuerza apostólica lo que contemplaron sus ojos y palparon sus manos tocando al Verbo de la Vida; define de manera inigualable que 'Dios es Amor', enseña que quien dice amar a Dios pero odia a su hermano es un mentiroso, y alienta la certeza de la salvación.",
    keyThemes: ["Dios es Luz y Dios es Amor (Agape)", "El amor fraterno como prueba de la fe", "Victoria sobre el mundo mediante la fe"],
    keyPassage: {
      reference: "1 Jn 1, 1; 4, 8.16",
      text: "Lo que existía desde el principio, lo que hemos oído, lo que hemos visto con nuestros ojos, lo que contemplamos y palparon nuestras manos acerca de la Palabra de vida... Dios es amor, y quien permanece en el amor permanece en Dios y Dios en él."
    },
    historicalNote: "La solemne definición 'Dios es Amor' (Deus Caritas Est, 1 Jn 4, 8) es considerada el corazón de toda la Revelación cristiana del Nuevo Testamento."
  },
  {
    id: "2-juan",
    name: "2 Juan",
    hebrewGreekName: "Yojanan Bet (יוֹחָנָן ב׳) / Iōannou B (Ἰωάννου Βʹ)",
    abbr: "2 Jn",
    testament: "Nuevo Testamento",
    category: "Epístolas Católicas",
    subCategory: "Billete Joánico",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "«El Presbítero» (San Juan el Apóstol / Juan el Anciano).",
    date: "Hacia 90-100 d.C.",
    location: "Éfeso",
    audience: "«A la Señora Elegida y a sus hijos» (representación personificada de una comunidad eclesial local).",
    genre: "Carta breve de comunión eclesial y advertencia contra falsos maestros.",
    chapters: 1,
    summary: "Con solo 13 versículos, alaba a los hijos que caminan en la verdad, exhorta a vivir en el mandamiento del amor mutuo y previene contra los anticristos que no confiesan que Jesucristo vino en carne humana.",
    keyThemes: ["Caminar en la verdad y el amor", "Confesión de la Encarnación real", "Hospitalidad vigilante"],
    keyPassage: {
      reference: "2 Jn 1, 6-7",
      text: "Y en esto consiste el amor: en que vivamos conforme a sus mandamientos... Porque muchos seductores han salido al mundo, los cuales no confiesan que Jesucristo ha venido en carne."
    },
    historicalNote: "Destaca el término 'Señora Elegida' (eklektē kyria), una de las más bellas personificaciones bíblicas de la Iglesia como comunidad amada por Cristo."
  },
  {
    id: "3-juan",
    name: "3 Juan",
    hebrewGreekName: "Yojanan Guímel (יוֹחָנָן ג׳) / Iōannou G (Ἰωάννου Γʹ)",
    abbr: "3 Jn",
    testament: "Nuevo Testamento",
    category: "Epístolas Católicas",
    subCategory: "Carta Privada Joánica",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "«El Presbítero» (San Juan el Apóstol).",
    date: "Hacia 90-100 d.C.",
    location: "Éfeso",
    audience: "A Gayo, cristiano fiel y hospitalario.",
    genre: "Nota personal de recomendación, encomio de la hospitalidad y censura de la ambición de poder.",
    chapters: 1,
    summary: "La carta más corta del canon (14 versículos). Elogia la acogida fraterna que Gayo da a los misioneros itinerantes, denuncia la soberbia de Diótrefes que ambiciona mandar y rechaza a los hermanos, y recomienda el testimonio de Demetrio.",
    keyThemes: ["Hospitalidad cristiana con los evangelizadores", "Rechazo del afán de dominio clerical en la Iglesia", "El testimonio de la verdad"],
    keyPassage: {
      reference: "3 Jn 1, 4.11",
      text: "No tengo mayor alegría que ésta: oír que mis hijos caminan en la verdad... Querido, no imites lo malo, sino lo bueno. Quien hace el bien es de Dios; quien hace el mal no ha visto a Dios."
    },
    historicalNote: "Brinda una ventana viva y realista sobre las relaciones cotidianas, los desafíos y los problemas de autoridad en las comunidades eclesiales del siglo I."
  },
  {
    id: "judas",
    name: "Judas",
    hebrewGreekName: "Yehudá (יְהוּדָה) / Iouda (Ἰούδα)",
    abbr: "Jds",
    testament: "Nuevo Testamento",
    category: "Epístolas Católicas",
    subCategory: "Carta Católica Universal",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "Judas, hermano de Santiago (pariente de Jesús en sentido bíblico semita).",
    date: "Hacia 65-80 d.C.",
    location: "Palestina o Antioquía",
    audience: "Comunidades cristianas infiltradas por libertinos que convertían la gracia de Dios en libertinaje moral.",
    genre: "Exhortación polémica urgente, uso de tradiciones apócrifas y doxología solemne.",
    chapters: 1,
    summary: "Un solo capítulo de 25 versículos que llama a luchar ardientemente por la fe transmitida a los santos de una vez para siempre; advierte sobre el castigo divino a los rebeldes citando ejemplos del AT (Sodoma, Coré, Caín), y culmina con una de las doxologías más grandiosas del Nuevo Testamento.",
    keyThemes: ["La fe confiada a los santos de una vez para siempre", "Juicio a la soberbia y al libertinaje", "Doxología triunfal de alabanza a Dios"],
    keyPassage: {
      reference: "Jds 1, 3.24-25",
      text: "Me he visto en la necesidad de escribiros para exhortaros a combatir por la fe que de una vez para siempre ha sido entregada a los santos... Al único Dios, nuestro Salvador por medio de Jesucristo nuestro Señor, gloria, majestad, fuerza y poder."
    },
    historicalNote: "En la Biblia de Jerusalén se analiza su audaz cita de tradiciones judías intertestamentarias (como la Asunción de Moisés y el libro de Enoc) puestas al servicio de la defensa de la ortodoxia cristiana."
  },

  // ==========================================
  // NUEVO TESTAMENTO - PROFÉTICO / APOCALIPSIS (1 libro)
  // ==========================================
  {
    id: "apocalipsis",
    name: "Apocalipsis de San Juan",
    hebrewGreekName: "Jizayon (חִזָּיוֹן) / Apokalypsis Iōannou (Ἀποκάλυψις Ἰωάννου)",
    abbr: "Ap",
    testament: "Nuevo Testamento",
    category: "Apocalipsis",
    subCategory: "Profecía y Liturgia Escatológica",
    isDeuterocanonical: false,
    isSynoptic: false,
    author: "San Juan el Apóstol y Profeta desterrado en la isla de Patmos.",
    date: "Hacia 95 d.C. (Bajo la persecución sanguinaria de Domiciano)",
    location: "Isla de Patmos (Mar Egeo)",
    audience: "Las siete Iglesias de Asia Menor (Éfeso, Esmirna, Pérgamo, Tiatira, Sardes, Filadelfia y Laodicea) y la Iglesia universal perseguida.",
    genre: "Apocalíptica cristiana, teología litúrgica, cartas proféticas y visiones cósmicas.",
    chapters: 22,
    summary: "El único libro enteramente profético del NT. Mediante un simbolismo deslumbrante de colores, números y animales, consuela a la Iglesia mártir: Jesucristo, el Cordero degollado de pie, vence al Dragón antiguo y a la Bestia de Roma; desciende la Jerusalén celestial y Dios enjugará toda lágrima de sus ojos.",
    keyThemes: ["El Cordero degollado que es el León de Judá", "Victoria final sobre el mal y la Bestia", "La Jerusalén Celestial y las Bodas del Cordero", "«¡Ven, Señor Jesús! Marana tha»"],
    keyPassage: {
      reference: "Ap 1, 8; 21, 4-5; 22, 20",
      text: "«Yo soy el Alfa y la Omega, dice el Señor Dios, Aquel que es, que era y que ha de venir, el Todopoderoso»... Y enjugará toda lágrima de sus ojos, y no habrá ya muerte ni llanto... «¡Sí, vengo pronto!». Amén. ¡Ven, Señor Jesús!"
    },
    historicalNote: "Para la Escuela Bíblica de Jerusalén, Apocalipsis no es una agenda de catástrofes futuras para atemorizar, sino un cántico supremo de esperanza cristiana y de victoria pascual sobre todos los imperios opresores."
  }
];

// Metadatos globales y estadísticas
const BIBLE_STATS = {
  totalBooks: 73,
  oldTestamentCount: 46,
  newTestamentCount: 27,
  deuterocanonicalCount: 7, // 7 libros íntegros + suplementos en Ester y Daniel
  totalChapters: 1334,
  categories: [
    { name: "Pentateuco", testament: "Antiguo Testamento", count: 5, icon: "scroll" },
    { name: "Históricos", testament: "Antiguo Testamento", count: 16, icon: "landmark" },
    { name: "Sapienciales", testament: "Antiguo Testamento", count: 7, icon: "feather" },
    { name: "Proféticos", testament: "Antiguo Testamento", count: 18, icon: "flame" },
    { name: "Evangelios", testament: "Nuevo Testamento", count: 4, icon: "book-open" },
    { name: "Históricos del NT", testament: "Nuevo Testamento", count: 1, icon: "compass" },
    { name: "Epístolas Paulinas", testament: "Nuevo Testamento", count: 14, icon: "mail" },
    { name: "Epístolas Católicas", testament: "Nuevo Testamento", count: 7, icon: "globe" },
    { name: "Apocalipsis", testament: "Nuevo Testamento", count: 1, icon: "sun" }
  ]
};

// Explicaciones exegéticas y teológicas por categoría según la Biblia de Jerusalén
const CATEGORY_INFO = {
  "Pentateuco": {
    name: "Pentateuco",
    title: "El Pentateuco (La Torá / La Ley)",
    testament: "Antiguo Testamento",
    bookCount: 5,
    etymology: "Del griego πεντάτευχος (pentáteuchos): «cinco estuches o rollos». En hebreo תּוֹרָה (Torá): «instrucción, enseñanza o camino de vida».",
    description: "Constituye el corazón y fundamento insustituible de la fe bíblica y de la historia de la salvación. Abarca desde los orígenes cósmicos del universo y la creación del hombre, la elección de los patriarcas (Abraham, Isaac y Jacob) y la gesta pascual del Éxodo liberando al pueblo de la esclavitud en Egipto, hasta la alianza irrevocable en el monte Sinaí y la peregrinación por el desierto a las puertas de la Tierra Prometida.",
    historicalContext: "La Escuela Bíblica de Jerusalén destaca que el Pentateuco no fue redactado de un solo trazo por Moisés, sino que es el fruto maduro de cuatro grandes corrientes y tradiciones teológicas fundidas a lo largo de los siglos: la Tradición Yahvista (J, s. X a.C.), la Elohista (E, s. VIII a.C.), la Deuteronomista (D, s. VII a.C.) y la Sacerdotal (P, s. VI-V a.C. durante y tras el exilio en Babilonia).",
    keyPoints: [
      "Génesis: Orígenes cósmicos, caída, promesas divinas y sagas de los patriarcas.",
      "Éxodo: La liberación pascual, revelación del Nombre YHWH y entrega del Decálogo en el Sinaí.",
      "Levítico: La infinita santidad de Dios («Sed santos como Yo soy santo») y las normas del perdón.",
      "Números: La prueba del desierto, las murmuraciones y la paciencia pedagógica de Dios.",
      "Deuteronomio: El testamento solemne de Moisés llamando a amar a Dios con todo el corazón (Shemá)."
    ]
  },
  "Históricos": {
    name: "Históricos",
    title: "Los Libros Históricos del Antiguo Testamento",
    testament: "Antiguo Testamento",
    bookCount: 16,
    etymology: "Narraciones que abarcan más de ocho siglos de historia, desde el cruce del Jordán (s. XIII a.C.) hasta la resistencia judía frente a la helenización en el s. I a.C.",
    description: "No pretenden ser una crónica aséptica en el sentido periodístico o científico moderno, sino una 'Historia Sagrada' o 'Teología de la Historia'. Israel reflexiona en ellos sobre sus triunfos, derrotas militares, la gloria de la monarquía davídica, el cisma de los reinos de Judá e Israel y el colapso del exilio babilónico, leyendo cada suceso a la luz de la fidelidad o infidelidad a la Alianza con Yahvé.",
    historicalContext: "Abarca la monumental 'Historia Deuteronomista' (Josué, Jueces, 1-2 Samuel, 1-2 Reyes), la 'Obra del Cronista' (1-2 Crónicas, Esdras, Nehemías centradas en el Templo y el culto) y novelas edificantes de fe. En el canon católico incluye los valiosos libros deuterocanónicos de Tobías, Judit y 1-2 Macabeos conservados en la Septuaginta griega.",
    keyPoints: [
      "Conquista y asentamiento tribal en la tierra prometida con Josué y los Jueces.",
      "Nacimiento del mesianismo real: el pacto eterno de Dios con la dinastía de David (2 S 7).",
      "La caída de Samaría (722 a.C.) y de Jerusalén (587 a.C.) entendidas como juicio al pecado y a la idolatría.",
      "Retorno y restauración de las murallas y del Segundo Templo con Esdras y Nehemías.",
      "Firmeza heroica ante la persecución y fe en la resurrección corporal en 1 y 2 Macabeos."
    ]
  },
  "Sapienciales": {
    name: "Sapienciales",
    title: "Los Libros Sapienciales y Poéticos",
    testament: "Antiguo Testamento",
    bookCount: 7,
    etymology: "Del hebreo חָכְמָה (Jojmá) y del griego Σοφία (Sophía): la búsqueda humana y religiosa del arte de vivir rectamente, el sentido del dolor y la comunión con Dios.",
    description: "Representan la maduración filosófica y espiritual de Israel. A diferencia de las leyes o relatos de reyes, los libros sapienciales exploran las preguntas universales de la condición humana: el enigma del sufrimiento inocente (Job), la oración y alabanza continua ante el Creador (Salmos), la prudencia moral cotidiana (Proverbios), la fugacidad de las riquezas terrenas (Qohélet), la santidad del amor conyugal (Cantar de los Cantares) y el destino eterno de los justos (Sabiduría y Sirácida).",
    historicalContext: "La Biblia de Jerusalén resalta la asombrosa evolución teológica de este conjunto: desde la antigua moral de retribución terrena hasta la contemplación de la inmortalidad del alma y la personificación de la Sabiduría divina que asiste a Dios en la creación (Pr 8; Sab 7), preludio directo del prólogo joánico sobre el Verbo encarnado.",
    keyPoints: [
      "Job: Ruptura con las teorías simplistas sobre el dolor humano ante el misterio divino.",
      "Salmos: El himnario sagrado y la escuela permanente de oración de Jesús y de la Iglesia.",
      "Proverbios: Máximas de conducta recta fundadas en el «temor de Yahvé».",
      "Qohélet (Eclesiastés): Crítica implacable a la ilusión mundana («vanidad de vanidades»).",
      "Sabiduría y Eclesiástico: La glorificación de la sabiduría divina en diálogo con el mundo helenístico."
    ]
  },
  "Proféticos": {
    name: "Proféticos",
    title: "Los Libros Proféticos (Mayores y Menores)",
    testament: "Antiguo Testamento",
    bookCount: 18,
    etymology: "Del hebreo נָבִיא (Naví): «el llamado, el portavoz enviado por Dios». En griego προφήτης (prophētēs): «el que proclama la palabra divina en nombre de otro».",
    description: "Los profetas bíblicos no son adivinos del porvenir, sino hombres inspirados por el Espíritu de Dios con una mirada penetrante sobre su tiempo. Denuncian con vehemencia el culto vacío sin justicia social, el olvido del huérfano y de la viuda, y llaman incansablemente a la conversión interior del corazón. En medio de las ruinas nacionales, mantienen viva la promesa de una Nueva Alianza y la venida del Mesías de paz.",
    historicalContext: "La tradición católica divide este corpus en Profetas Mayores (Isaías, Jeremías, Lamentaciones, Baruc, Ezequiel y Daniel; denominados 'mayores' por la longitud de sus escritos) y los Doce Profetas Menores (Oseas hasta Malaquías). Incluye textos deuterocanónicos de alto relieve como Baruc y los capítulos griegos de Daniel.",
    keyPoints: [
      "Prioridad de la justicia: Dios rechaza los holocaustos si van acompañados de opresión al prójimo.",
      "Isaías: Las profecías del Emmanuel, el niño prometido y los Cánticos del Siervo Sufriente.",
      "Jeremías: La promesa de la «Nueva Alianza» grabada en el interior de los corazones (Jr 31).",
      "Ezequiel: La sustitución del corazón de piedra por un corazón de carne mediante el Espíritu.",
      "Los Doce Menores: Desde el amor nupcial de Oseas hasta el mensajero precursor en Malaquías."
    ]
  },
  "Evangelios": {
    name: "Evangelios",
    title: "Los Cuatro Santos Evangelios",
    testament: "Nuevo Testamento",
    bookCount: 4,
    etymology: "Del griego εὐαγγέλιον (euangélion): «Buena Noticia» o proclamación victoriosa de la salvación.",
    description: "Constituyen la cumbre y el corazón de toda la Sagrada Escritura (Dei Verbum 18). Son el testimonio inspirado de la vida, predicación, signos milagrosos, pasión redentora, muerte en la cruz y resurrección gloriosa de Jesucristo, Hijo de Dios hecho hombre. Proclaman la misma fe pascual apostólica transmitida a través de cuatro retratos teológicos complementarios.",
    historicalContext: "Se dividen en los tres Evangelios Sinópticos (Marcos: el más primitivo, centrado en el Secreto Mesiánico y la Cruz; Mateo: escrito para judeocristianos, mostrando a Jesús como el nuevo Moisés; Lucas: el evangelio de la misericordia, la ternura y los marginados) y el Evangelio de San Juan (escrito al final del siglo I, de naturaleza teológico-sacramental y contemplativa sobre el Verbo eterno encarnado).",
    keyPoints: [
      "La inauguración del Reino de Dios y el Sermón de las Bienaventuranzas.",
      "El Secreto Mesiánico y la revelación del Hijo del Hombre servidor doliente.",
      "El misterio pascual: Pasión, Muerte y Resurrección como redención universal del pecado.",
      "La Eucaristía, el mandamiento nuevo del Amor fraterno y el envío misionero al mundo entero."
    ]
  },
  "Históricos del NT": {
    name: "Históricos del NT",
    title: "Hechos de los Apóstoles (Historia de la Iglesia Primitiva)",
    testament: "Nuevo Testamento",
    bookCount: 1,
    etymology: "En griego Πράξεις Ἀποστόλων (Práxeis Apostólōn). Segundo volumen del díptico redactado por San Lucas dirigido a Teófilo.",
    description: "Narra con pulcritud y fervor teológico el nacimiento de la Iglesia en Pentecostés y la expansión impetuosa del Evangelio desde Jerusalén, pasando por Judea y Samaría, hasta alcanzar Roma, el corazón del Imperio. Muestra la vida de las primeras comunidades cristianas guiadas por Pedro y la fulgurante epopeya misionera de San Pablo.",
    historicalContext: "Llamado con justicia por la Escuela de Jerusalén el 'Evangelio del Espíritu Santo', atestigua el paso de una pequeña comunidad en el Cenáculo a una Iglesia verdaderamente católica y universal, consagrada en el histórico Concilio de Jerusalén (año 49 d.C.) que liberó a los gentiles de la ley ritual judía.",
    keyPoints: [
      "Pentecostés: El Espíritu Santo desciende como fuego consagrando a los apóstoles como testigos.",
      "El estilo de vida cristiano primitivo: comunión fraterna, fracción del pan (Eucaristía) y oración.",
      "La conversión de San Pablo en el camino a Damasco y sus tres grandes viajes misioneros.",
      "El Concilio de Jerusalén: confirmación de la salvación por la gracia de Cristo sin cargas de la antigua ley."
    ]
  },
  "Epístolas Paulinas": {
    name: "Epístolas Paulinas",
    title: "El Corpus Epistolar Paulino (14 Cartas)",
    testament: "Nuevo Testamento",
    bookCount: 14,
    etymology: "Cartas apostólicas dirigidas por San Pablo o formuladas en el seno de su escuela misionera a diversas comunidades y pastores.",
    description: "Representa el corpus teológico dogmático más profundo e influyente del Nuevo Testamento. En él se despliega la doctrina de la justificación gratuita por la fe en Cristo independiente de las obras de la ley mosaica, la Iglesia concebida como Cuerpo Místico de Cristo, la filiación divina por el Espíritu Santo, la teología del sufrimiento apostólico y el sacerdocio eterno de Jesucristo según el orden de Melquisedec (Hebreos).",
    historicalContext: "Agrupa las Grandes Cartas Doctrinales (Romanos, 1-2 Corintios, Gálatas), las Cartas de la Cautividad escritas desde prisión (Efesios, Filipenses, Colosenses, Filemón), las Cartas Escatológicas (1-2 Tesalonicenses, que son cronológicamente los escritos más antiguos del NT) y las Cartas Pastorales (1-2 Timoteo, Tito) esenciales para el ministerio y orden eclesiástico.",
    keyPoints: [
      "Justificación por la gracia mediante la fe: nadie se salva por méritos propios, sino por el don pascual de Cristo.",
      "La Iglesia como Cuerpo de Cristo: unidad en la diversidad de carismas y ministerios.",
      "El himno sublime a la Caridad en 1 Corintios 13 y el himno a la Kénosis en Filipenses 2.",
      "La armadura de Dios, la libertad del cristiano frente a la servidumbre y el sacerdocio eterno de Cristo."
    ]
  },
  "Epístolas Católicas": {
    name: "Epístolas Católicas",
    title: "Las Epístolas Católicas o Universales (7 Cartas)",
    testament: "Nuevo Testamento",
    bookCount: 7,
    etymology: "Del griego καθολικός (katholikós): «universal o general». Se denominan así porque no están dirigidas a una comunidad local exclusiva sino a la Iglesia entera.",
    description: "Siete escritos apostólicos puestos bajo la autoridad venerable de las columnas de la Iglesia: Santiago, Simón Pedro, Juan y Judas. Abordan los desafíos éticos, comunitarios y espirituales cotidianos: la necesidad de que la fe se verifique en las obras de misericordia, el aguante pacífico en medio de la persecución y marginación social, el rechazo al docetismo y la solemne confesión de que 'Dios es Amor' (1 Jn 4, 8).",
    historicalContext: "Muestran la riqueza polifónica y la complementariedad de la Tradición Apostólica en el último tercio del siglo I, complementando el énfasis doctrinal paulino con una vivencia práctica, comunitaria y fraterna de la salvación.",
    keyPoints: [
      "Santiago: La fe auténtica es inseparable de las obras de misericordia hacia el necesitado.",
      "1 y 2 Pedro: El pueblo de Dios como sacerdocio real y piedras vivas, llamados a dar razón de su esperanza.",
      "1, 2 y 3 Juan: La confesión de la carne real de Cristo, el mandamiento supremo del amor y la comunión en la luz.",
      "Judas: La defensa valiente de la fe entregada a los santos de una vez para siempre."
    ]
  },
  "Apocalipsis": {
    name: "Apocalipsis",
    title: "El Apocalipsis de San Juan (La Revelación Escatológica)",
    testament: "Nuevo Testamento",
    bookCount: 1,
    etymology: "Del griego ἀποκάλυψις (apokálypsis): «descorrer el velo, manifestación o revelación divina».",
    description: "Es el único libro enteramente profético del Nuevo Testamento. Lejos de ser un manual de terrores futuros, es un majestuoso poema litúrgico de esperanza inquebrantable para los cristianos perseguidos por el absolutismo imperial de Roma. Revela que las fuerzas de la historia están en manos del Cordero degollado de pie (Jesucristo resucitado), vencedor definitivo de la Bestia, del Dragón y de la muerte.",
    historicalContext: "Escrito por el apóstol Juan en su destierro en la isla de Patmos hacia el año 95 d.C. bajo la persecución de Domiciano. Mediante una profusión de símbolos numéricos (7, 12, 144.000), colores y visiones cósmicas, proclama el triunfo final del Reino de Dios y el descenso de la Jerusalén celestial como Esposa radiante.",
    keyPoints: [
      "Las cartas a las siete Iglesias de Asia Menor: Aliento pastoral a la fidelidad y perseverancia.",
      "El trono celestial y el Cordero digno de abrir los sellos de la historia humana.",
      "La caída de Babilonia (la Roma idolátrica y opresora) y el juicio soberano de Dios.",
      "La Jerusalén Celeste: «Cielos nuevos y tierra nueva», donde Dios habitará con los hombres y enjugará toda lágrima."
    ]
  }
};

