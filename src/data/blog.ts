import { LANG_META, type Lang } from "../i18n/index.ts";

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  updated?: string;
  tags: string[];
  cover: string;
  readingMinutes: number;
}

const ARTICLES_ES: BlogArticle[] = [
  {
    slug: "eficiencia-energetica-residencial-levante",
    title: "Eficiencia Energética Residencial en el Levante",
    excerpt: "Te ayudamos a entender con cifras las estrategias, costes reales y amortización de las estrategias más importantes de eficiencia energética. ",
    date: "2026-06-15",
    tags: ["eficiencia energética", "autoconsumo"],
    cover: "images/blog/eficiencia-energetica-residencial-levante/casa-de-diseño-premium-eficientes-campoamor.webp",
    readingMinutes: 8,
  },
  {
    slug: "climatizacion-en-alicante-y-murcia-por-que-tiramos-dinero-en-verano-y-como-solucionarlo",
    title: "Climatización en Alicante y Murcia: por qué tiramos dinero en verano y cómo solucionarlo",
    excerpt: "Descubre dónde se pierde la energía en la climatización de tu vivienda y cuándo realmente se justifica un cambio de equipo.",
    date: "2026-08-12",
    tags: ["climatización", "eficiencia energética"],
    cover: "images/blog/climatizacion-en-alicante-y-murcia-por-que-tiramos-dinero-en-verano-y-como-solucionarlo/eficiencia-energetica-climatizacion-orihuela-costa.webp",
    readingMinutes: 9,
  },
  {
    slug: "cual-es-la-mejor-forma-de-producir-agua-caliente-en-una-vivienda",
    title: "¿Cuál es la mejor forma de producir agua caliente en una vivienda?",
    excerpt: "Comparativa entre las tecnologías más usadas para generar el agua caliente de los hogares, conoce cómo ahorrar energía y mejorar el confort.",
    date: "2026-08-12",
    tags: ["acs", "aerotermia", "eficiencia energética"],
    cover: "images/blog/cual-es-la-mejor-forma-de-producir-agua-caliente-en-una-vivienda/aerotermo-ariston-eficiente-cartagena.webp",
    readingMinutes: 9,
  },
  {
    slug: "como-convertir-una-instalacion-fotovoltaica-en-una-vivienda-inteligente",
    title: "Cómo convertir una instalación fotovoltaica en una vivienda inteligente",
    excerpt: "Descubre cómo la domótica sincroniza la producción solar con el consumo real para ahorrar más, mejorar el confort y hacer la casa más segura.",
    date: "2026-08-12",
    tags: ["domótica", "fotovoltaica", "eficiencia energética"],
    cover: "images/blog/como-convertir-una-instalacion-fotovoltaica-en-una-vivienda-inteligente/sistemas-domoticos-casas-de-lujo-inteligentes.webp",
    readingMinutes: 7,
  },
  {
    slug: "el-heroe-invisible-del-acs-la-valvula-mezcladora-termostatica",
    title: "El héroe invisible del ACS: la válvula mezcladora termostática",
    excerpt: "Descubre por qué una válvula mezcladora termostática mejora el sistema de ACS, ahorrando agua y energía en tu instalación.",
    date: "2026-08-12",
    tags: ["acs", "eficiencia energética", "aerotermia"],
    cover: "images/blog/el-heroe-invisible-del-acs-la-valvula-mezcladora-termostatica/termostatos-calefeccion-eficientes.webp",
    readingMinutes: 8,
  },
  {
    slug: "coche-electrico-consumo-real-mantenimiento-ahorro",
    title: "Coche Eléctrico: Consumo Real, Mantenimiento y Ahorro",
    excerpt: "Análisis técnico y financiero de un coche eléctrico frente a uno de combustión: consumo real, mantenimiento, impuestos y mucho más.",
    date: "2026-08-12",
    tags: ["movilidad eléctrica"],
    cover: "images/blog/coche-electrico-consumo-real-mantenimiento-ahorro/instalacion-cargador-vehiculo-electrico-elche.webp",
    readingMinutes: 6,
  },
  {
    slug: "cambio-ventanas-aislamiento-cajon-persianas",
    title: "Cambio de Ventanas y Aislamiento de Persianas: Soluciones Técnicas, Precios y Ahorro Real",
    excerpt: "Análisis de eficiencia para ventanas y persianas en el Mediterráneo: comparativa técnica y retorno económico.",
    date: "2026-08-13",
    tags: ["eficiencia energética", "envolvente", "aislamiento"],
    cover: "images/blog/cambio-ventanas-aislamiento-cajon-persianas/eficiencia-energetica-ventanas-vegabaja.webp",
    readingMinutes: 8,
  },
  {
    slug: "aislamiento-termico-de-tuberias-de-ppr",
    title: "Aislamiento Térmico de Tuberías de PPR: Ahorro y eficiencia",
    excerpt: "Conoce como un material barato puede ahorrate dinero evitando las perdidas térmicas: La coquilla.",
    date: "2026-08-17",
    tags: [ "acs", "aislamiento"],
    cover: "images/blog/aislamiento-termico-de-tuberias-de-ppr/aislamiento-tuberia-eficiencia-energetica.webp",
    readingMinutes: 6,
  },
  {
    slug: "soluciones-aislamiento-termico-tejados-cubiertas",
    title: "Aislar el Tejado o Cubierta: Soluciones Técnicas y Ahorro Real",
    excerpt: "El tejado puede concentrar hasta el 30% de las pérdidas térmicas de una vivienda. Comparamos diferentes alternativas  para solucionar este problema.",
    date: "2026-08-17",
    tags: ["aislamiento", "envolvente", "eficiencia energética"],
    cover: "images/blog/soluciones-aislamiento-termico-tejados-cubiertas/aislamiento-tejado-reduccion-consumo-electrico.webp",
    readingMinutes: 6,
  },
  {
    slug: "cargar-coche-electrico-sin-vs-con-fotovoltaica-murcia-alicante",
    title: "Cargar tu Coche Eléctrico con Fotovoltaica vs Red",
    excerpt: "AAnálisis comparativo entre alimentar tu vehículo eléctrico solo desde la red o mediante un sistema fotovoltaico. Descubriendo el ahorro real.",
    date: "2026-08-14",
    tags: ["movilidad eléctrica", "autoconsumo"],
    cover: "images/blog/cargar-coche-electrico-sin-vs-con-fotovoltaica-murcia-alicante/kit-solar-autoconsumo-más-cargador-coche-electrico.webp",
    readingMinutes: 8,
  },
  {
    slug: "uso-agua-estrategia-bioclimatica-fuentes-interior",
    title: "Uso del agua como estrategia bioclimática en el hogar",
    excerpt: "Uso de agua de condensados en fuentes interiores para climatización pasiva, regulación de humedad y calidad del aire. ¡Acierto bioclimático!.",
    date: "2026-08-14",
    tags: ["eficiencia energética", "climatización", "arquitectura bioclimática"],
    cover: "images/blog/uso-agua-estrategia-bioclimatica-fuentes-interior/fuente-de-agua-bioclimatica.webp",
    readingMinutes: 7,
  },
  {
    slug: "fachadas-vegetales-aislamiento-natural-calor",
    title: "Fachadas Vegetales: Aislamiento Natural para tu Vivienda",
    excerpt: "Descubre cómo las fachadas vegetales reducen la temperatura exterior y el gasto eléctrico en climas cálidos de levante y convierte tu hogar en uno de película.",
    date: "2026-08-14",
    tags: ["eficiencia energética", "arquitectura bioclimática", "aislamiento"],
    cover: "images/blog/fachadas-vegetales-aislamiento-natural-calor/jardin-bioclimatico.webp",
    readingMinutes: 8,
  },
  {
    slug: "ventajas-aislar-vivienda-sate-insuflado-trasdosado",
    title: "Aislar una Vivienda Unifamiliar: SATE, Insuflado o Trasdosado",
    excerpt: "Reduce hasta 450 €/año en el recibo de la luz aislando tu hogar. Comparamos las diferentes alternativas con datos reales para que tomes la mejor decisión.",
    date: "2026-08-13",
    tags: ["eficiencia energética", "aislamiento", "envolvente"],
    cover: "images/blog/ventajas-aislar-vivienda-sate-insuflado-trasdosado/aislamiento-envolvente-residencial.webp",
    readingMinutes: 5,
  },
  {
    slug: "el-mito-del-60-de-descuento-en-el-irpf",
    title: 'El mito del "60% de descuento" en el IRPF con placas solares',
    excerpt: "Hablemos un poco de las subvenciones por ahorro energético, “un hueso duro de roer” que se le atraganta a muchos profesionales del sector.",
    date: "2026-07-31",
    tags: ["fiscalidad", "autoconsumo", "fotovoltaica"],
    cover: "images/blog/el-mito-del-60-de-descuento-en-el-irpf/ayudas-subvenciones-placas-solares-san-javier.webp",
    readingMinutes: 10,
  },
  {
    slug: "cuantas-placas-solares-necesita-tu-casa",
    title: "¿Cuántas placas solares necesita tu casa? La fórmula, paso a paso",
    excerpt: "AAprende a dimensionar tu instalación fotovoltaica a partir de tu factura, horas de sol pico y una fórmula sencilla con un ejemplo real en Murcia.",
    date: "2026-07-28",
    tags: ["autoconsumo", "guías"],
    cover: "images/blog/cuantas-placas-solares-necesitas/placas-solares-residenciales-elche.webp",
    readingMinutes: 6,
  },
  {
    slug: "baterias-solares-como-elegir-capacidad",
    title: "Baterías solares: cómo elegir la capacidad correcta",
    excerpt: "kWh nominales vs. útiles, profundidad de descarga, litio y la fórmula para calcular cuánta batería necesitas de verdad.",
    date: "2026-07-21",
    tags: ["autoconsumo", "guías"],
    cover: "images/blog/baterias-solares-como-elegir-capacidad/instalacion-baterias-autoconsumo-elche.webp",
    readingMinutes: 7,
  },
];

interface Translation { title: string; excerpt: string; tags: string[] }

const EN_TRANSLATIONS: Record<string, Translation> = {
  "eficiencia-energetica-residencial-levante": {
    title: "Residential Energy Efficiency in the Levante",
    excerpt: "We help you understand, through figures, the strategies, actual costs and payback periods of the most important energy efficiency measures.",
    tags: ["energy efficiency", "self-consumption", "insulation"],
  },
  "climatizacion-en-alicante-y-murcia-por-que-tiramos-dinero-en-verano-y-como-solucionarlo": {
    title: "Climate control in Alicante and Murcia: why we waste money in summer and how to fix it",
    excerpt: "Find out where energy is being wasted in your home’s heating and cooling system, and when it really is worth replacing your equipment.",
    tags: ["climate control", "energy efficiency"],
  },
  "cual-es-la-mejor-forma-de-producir-agua-caliente-en-una-vivienda": {
    title: "What is the best way to produce hot water in a home?",
    excerpt: "A comparison of the most commonly used technologies for domestic hot water; find out how to save energy and improve comfort.",
    tags: ["hot water", "heat pump", "energy efficiency"],
  },
  "como-convertir-una-instalacion-fotovoltaica-en-una-vivienda-inteligente": {
    title: "How to turn a photovoltaic installation into a smart home",
    excerpt: "Discover how home automation syncs solar production with real consumption to save more, boost comfort and make the house safer.",
    tags: ["home automation", "photovoltaic"],
  },
  "el-heroe-invisible-del-acs-la-valvula-mezcladora-termostatica": {
    title: "The invisible hero of hot water: the thermostatic mixing valve",
    excerpt: "Find out why a thermostatic mixing valve improves your DHW system, saving water and energy in your installation.",
    tags: ["hot water", "heat pump", "energy efficiency"],
  },
  "coche-electrico-consumo-real-mantenimiento-ahorro": {
    title: "A technical and financial comparison of an electric car versus a petrol car: real-world fuel consumption, maintenance, taxes and much more.",
    excerpt: "Technical and financial analysis of Total Cost of Ownership (TCO) of an electric car vs. a petrol one: real home-grid consumption, maintenance, taxes and Wallbox payback.",
    tags: ["e-mobility"],
  },
  "cambio-ventanas-aislamiento-cajon-persianas": {
    title: "Window replacement and roller-blind box insulation: technical solutions, prices and real savings",
    excerpt: "Efficiency analysis of windows and shutters in the Mediterranean: technical comparison and economic return.",
    tags: ["energy efficiency", "building envelope", "insulation"],
  },
  "aislamiento-termico-de-tuberias-de-ppr": {
    title: "Thermal insulation of PPR pipes: savings and efficiency",
    excerpt: "Learn how a cheap material can save you money by preventing thermal losses: the pipe insulation sleeve.",
    tags: ["hot water", "insulation"],
  },
  "soluciones-aislamiento-termico-tejados-cubiertas": {
    title: "Insulating the roof: technical solutions and real savings",
    excerpt: "The roof can account for up to 30 per cent of a home’s heat loss. We compare different options for tackling this problem.",
    tags: ["insulation", "building envelope", "energy efficiency"],
  },
  "cargar-coche-electrico-sin-vs-con-fotovoltaica-murcia-alicante": {
    title: "Charging your EV with photovoltaic vs. grid",
    excerpt: "A comparative analysis of charging your electric vehicle solely from the mains or via a solar power system. Discovering the real savings.",
    tags: ["e-mobility", "self-consumption"],
  },
  "uso-agua-estrategia-bioclimatica-fuentes-interior": {
    title: "Using water as a bioclimatic strategy at home",
    excerpt: "Using condensate water in indoor fountains for passive climate control, humidity regulation and air quality. A bioclimatic success!",
    tags: ["energy efficiency", "bioclimatic architecture", "climate control"],
  },
  "fachadas-vegetales-aislamiento-natural-calor": {
    title: "Discover how green facades reduce the outside temperature and electricity consumption in hot, sunny climates, and turn your home into something straight out of a film.",
    excerpt: "Discover how green façades reduce outdoor temperature and air-conditioning costs in warm climates like Murcia and Alicante.",
    tags: ["energy efficiency", "bioclimatic architecture", "insulation"],
  },
  "ventajas-aislar-vivienda-sate-insuflado-trasdosado": {
    title: "Insulating a single-family home: SATE, insufflated or dry-lining",
    excerpt: "Save up to €450 a year on your electricity bill by insulating your home. We compare the different options using real data to help you make the best decision.",
    tags: ["energy efficiency", "insulation", "building envelope"],
  },
  "el-mito-del-60-de-descuento-en-el-irpf": {
    title: 'The myth of the "60% income-tax discount whit solar panels"',
    excerpt: "Let’s talk a little about energy-saving grants – ‘a tough nut to crack’ that many professionals in the sector find difficult to get to grips with.",
    tags: ["taxation", "photovoltaic"],
  },
  "cuantas-placas-solares-necesita-tu-casa": {
    title: "How many solar panels does your home need? The step-by-step formula",
    excerpt: "Learn how to work out the size of your solar panel system based on your electricity bill, peak sunshine hours and a simple formula, using a real-life example from Murcia.",
    tags: [ "self-consumption", "guides"],
  },
  "baterias-solares-como-elegir-capacidad": {
    title: "Solar batteries: how to pick the right capacity",
    excerpt: "Nominal vs. usable kWh, depth of discharge, lithium and the formula for calculating how much battery capacity you actually need.",
    tags: ["self-consumption", "guides"],
  },
};

export function hasTranslation(lang: Lang, slug: string): boolean {
  if (lang === "es") return ARTICLES_ES.some((a) => a.slug === slug);
  return slug in EN_TRANSLATIONS;
}

function localize(article: BlogArticle, lang: Lang): BlogArticle {
  if (lang === "es") return article;
  const t = EN_TRANSLATIONS[article.slug];
  if (!t) return article;
  return { ...article, title: t.title, excerpt: t.excerpt, tags: t.tags };
}

export function getArticles(lang: Lang): BlogArticle[] {
  const source = lang === "es" ? ARTICLES_ES : ARTICLES_ES.filter((a) => a.slug in EN_TRANSLATIONS);
  return source.map((a) => localize(a, lang));
}

export function getSortedArticles(lang: Lang): BlogArticle[] {
  return [...getArticles(lang)].sort((a, b) => b.date.localeCompare(a.date));
}

export function getAllTags(lang: Lang): string[] {
  return [...new Set(getArticles(lang).flatMap((a) => a.tags))].sort();
}

export function getArticleBySlug(lang: Lang, slug: string): BlogArticle | undefined {
  return getArticles(lang).find((a) => a.slug === slug);
}

export function formatDate(iso: string, lang: Lang): string {
  return new Intl.DateTimeFormat(LANG_META[lang].intlLocale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}T00:00:00`));
}

export const ARTICLES = ARTICLES_ES;
export const sortedArticles = getSortedArticles("es");
export const ALL_TAGS = getAllTags("es");
export function articleBySlug(slug: string): BlogArticle | undefined {
  return getArticleBySlug("es", slug);
}
