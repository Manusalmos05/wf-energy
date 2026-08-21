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
    excerpt: "Análisis técnico de eficiencia energética en Alicante y Murcia: estrategias, costes reales, impacto en factura y amortización.",
    date: "2026-06-15",
    tags: ["eficiencia energética", "autoconsumo", "aislamiento"],
    cover: "images/blog/eficiencia-energetica-residencial-levante/portada.webp",
    readingMinutes: 8,
  },
  {
    slug: "climatizacion-en-alicante-y-murcia-por-que-tiramos-dinero-en-verano-y-como-solucionarlo",
    title: "Climatización en Alicante y Murcia: por qué tiramos dinero en verano y cómo solucionarlo",
    excerpt: "Descubre dónde se pierde la energía en la climatización de tu vivienda y qué opción de inversión te ayuda a ahorrar real en Alicante y Murcia.",
    date: "2026-08-12",
    tags: ["climatización", "ahorro energético"],
    cover: "images/blog/climatizacion-en-alicante-y-murcia-por-que-tiramos-dinero-en-verano-y-como-solucionarlo/portada.webp",
    readingMinutes: 9,
  },
  {
    slug: "cual-es-la-mejor-forma-de-producir-agua-caliente-en-una-vivienda",
    title: "¿Cuál es la mejor forma de producir agua caliente en una vivienda?",
    excerpt: "Comparativa entre termo eléctrico, calentador de butano, aerotermo híbrido y aerotermo de bomba de calor para ahorrar energía y mejorar el confort.",
    date: "2026-08-12",
    tags: ["acs", "aerotermia", "ahorro energético"],
    cover: "images/blog/cual-es-la-mejor-forma-de-producir-agua-caliente-en-una-vivienda/portada.webp",
    readingMinutes: 9,
  },
  {
    slug: "como-convertir-una-instalacion-fotovoltaica-en-una-vivienda-inteligente",
    title: "Cómo convertir una instalación fotovoltaica en una vivienda inteligente",
    excerpt: "Descubre cómo la domótica sincroniza la producción solar con el consumo real para ahorrar más, mejorar el confort y hacer la casa más segura.",
    date: "2026-08-12",
    tags: ["domótica", "fotovoltaica", "ahorro energético"],
    cover: "images/blog/como-convertir-una-instalacion-fotovoltaica-en-una-vivienda-inteligente/portada.webp",
    readingMinutes: 8,
  },
  {
    slug: "el-heroe-invisible-del-acs-la-valvula-mezcladora-termostatica",
    title: "El héroe invisible del ACS: la válvula mezcladora termostática",
    excerpt: "Descubre por qué una válvula mezcladora termostática mejora la seguridad, aumenta la autonomía del acumulador y ahorra agua y energía en tu instalación de ACS.",
    date: "2026-08-12",
    tags: ["acs", "ahorro energético", "fontanería"],
    cover: "images/blog/el-heroe-invisible-del-acs-la-valvula-mezcladora-termostatica/portada.webp",
    readingMinutes: 8,
  },
  {
    slug: "coche-electrico-consumo-real-mantenimiento-ahorro",
    title: "Coche Eléctrico: Consumo Real, Mantenimiento y Ahorro",
    excerpt: "Análisis técnico y financiero del Coste Total de Propiedad (TCO) de un coche eléctrico frente a uno de gasolina: consumo real en red doméstica, mantenimiento, impuestos y amortización del Wallbox.",
    date: "2026-08-12",
    tags: ["movilidad eléctrica"],
    cover: "images/blog/coche-electrico-consumo-real-mantenimiento-ahorro/portada.webp",
    readingMinutes: 6,
  },
  {
    slug: "cambio-ventanas-aislamiento-cajon-persianas",
    title: "Cambio de Ventanas y Aislamiento de Persianas: Soluciones Técnicas, Precios y Ahorro Real",
    excerpt: "Análisis detallado sobre cómo optimizar las ventanas y el cajón de persiana en climas mediterráneos como Murcia y Alicante. Comparativa PVC vs. Aluminio RPT, vidrios de Control Solar y cálculo de retorno de inversión.",
    date: "2026-08-13",
    tags: ["eficiencia energética", "ventanas", "aislamiento"],
    cover: "images/blog/cambio-ventanas-aislamiento-cajon-persianas/portada.webp",
    readingMinutes: 8,
  },
  {
    slug: "aislamiento-térmico-de-tuberías-de-PPR",
    title: "Aislamiento Térmico de Tuberías de PPR: Ahorro y eficiencia",
    excerpt: "Conoce como un material barato puede ahorrate dinero evitando las perdidas térmicas: La coquilla.",
    date: "2026-08-17",
    tags: ["fontanería", "acs", "coquilla", "aislamiento"],
    cover: "images/blog/aislamiento-térmico-de-tuberías-de-PPR/portada.webp",
    readingMinutes: 6,
  },
  {
    slug: "soluciones-aislamiento-termico-tejados-cubiertas",
    title: "Aislar el Tejado o Cubierta: Soluciones Técnicas y Ahorro Real",
    excerpt: "El tejado concentra hasta el 30% de las pérdidas térmicas de una vivienda. Comparamos numéricamente el retorno de inversión (payback) de soplado, insuflado, trasdosado, cubierta invertida y SATE.",
    date: "2026-08-17",
    tags: ["aislamiento", "tejados", "eficiencia energética"],
    cover: "images/blog/soluciones-aislamiento-termico-tejados-cubiertas/portada.webp",
    readingMinutes: 6,
  },
  {
    slug: "cargar-coche-electrico-sin-vs-con-fotovoltaica-murcia-alicante",
    title: "Cargar tu Coche Eléctrico con Fotovoltaica vs Red",
    excerpt: "Análisis comparativo real entre alimentar tu vehículo eléctrico solo desde la red o mediante un sistema fotovoltaico WFEnergy (9,7 kWp + 16 kWh + Batería Virtual). Descubre el ahorro real de ~700 €/año",
    date: "2026-08-14",
    tags: ["movilidad eléctrica", "autoconsumo"],
    cover: "images/blog/cargar-coche-electrico-sin-vs-con-fotovoltaica-murcia-alicante/portada.webp",
    readingMinutes: 8,
  },
  {
    slug: "uso-agua-estrategia-bioclimatica-fuentes-interior",
    title: "Uso del agua como estrategia bioclimática en el hogar",
    excerpt: "Usa fuentes de agua interiores y agua de condensados para climatización pasiva, regulación de humedad y calidad del aire en Alicante y Murcia.",
    date: "2026-08-14",
    tags: ["eficiencia energética", "ahorro energético"],
    cover: "images/blog/uso-agua-estrategia-bioclimatica-fuentes-interior/portada.webp",
    readingMinutes: 6,
  },
  {
    slug: "fachadas-vegetales-aislamiento-natural-calor",
    title: "Fachadas Vegetales: Aislamiento Natural para tu Vivienda",
    excerpt: "Descubre cómo las fachadas vegetales reducen la temperatura exterior y el gasto en aire acondicionado en climas cálidos como Murcia y Alicante.",
    date: "2026-08-14",
    tags: ["eficiencia energética", "arquitectura bioclimática", "aislamiento"],
    cover: "images/blog/fachadas-vegetales-aislamiento-natural-calor/portada.webp",
    readingMinutes: 6,
  },
  {
    slug: "ventajas-aislar-vivienda-sate-insuflado-trasdosado",
    title: "Aislar una Vivienda Unifamiliar: SATE, Insuflado o Trasdosado",
    excerpt: "Reduce hasta 450 €/año en el recibo de la luz aislando tu chalet. Comparamos SATE, insuflado y trasdosado con datos reales en Alicante y Murcia.",
    date: "2026-08-13",
    tags: ["eficiencia energética", "aislamiento", "ahorro"],
    cover: "images/blog/ventajas-aislar-vivienda-sate-insuflado-trasdosado/portada.webp",
    readingMinutes: 5,
  },
  {
    slug: "el-mito-del-60-de-descuento-en-el-irpf",
    title: 'El mito del "60% de descuento" en el IRPF',
    excerpt: "Destripamos una instalación de 11.500 € llave en mano en Alicante: qué te llevas, cómo funcionan de verdad las deducciones estatal y autonómica, quién puede aprovecharlas y cómo se compara con un depósito bancario.",
    date: "2026-07-31",
    tags: ["fiscalidad", "autoconsumo"],
    cover: "images/blog/el-mito-del-60-de-descuento-en-el-irpf/portada.webp",
    readingMinutes: 10,
  },
  {
    slug: "cuantas-placas-solares-necesita-tu-casa",
    title: "¿Cuántas placas solares necesita tu casa? La fórmula, paso a paso",
    excerpt: "Aprende a dimensionar tu instalación fotovoltaica a partir de tu factura: consumo diario, horas de sol pico y una fórmula sencilla con ejemplo real en Murcia.",
    date: "2026-07-28",
    tags: ["placas solares", "autoconsumo", "guías"],
    cover: "images/blog/cuantas-placas-solares-necesitas/portada.webp",
    readingMinutes: 6,
  },
  {
    slug: "baterias-solares-como-elegir-capacidad",
    title: "Baterías solares: cómo elegir la capacidad correcta",
    excerpt: "kWh nominales vs. útiles, profundidad de descarga, litio frente a plomo-ácido y la fórmula para calcular cuánta batería necesitas de verdad.",
    date: "2026-07-21",
    tags: ["autoconsumo", "guías"],
    cover: "images/blog/baterias-solares-como-elegir-capacidad/portada.webp",
    readingMinutes: 7,
  },
];

interface Translation { title: string; excerpt: string; tags: string[] }

const EN_TRANSLATIONS: Record<string, Translation> = {
  "el-mito-del-60-de-descuento-en-el-irpf": {
    title: 'The myth of the "60% income-tax discount"',
    excerpt: "We unpack an €11,500 turn-key installation in Alicante: what you actually get, how the state and regional tax deductions really work, who can use them and how it compares against a bank deposit.",
    tags: ["taxation", "self-consumption"],
  },
  "cuantas-placas-solares-necesita-tu-casa": {
    title: "How many solar panels does your home need? The step-by-step formula",
    excerpt: "Learn how to size your PV installation from your bill: daily consumption, peak sun hours and a simple formula with a real example in Murcia.",
    tags: ["solar panels", "self-consumption", "guides"],
  },
  "baterias-solares-como-elegir-capacidad": {
    title: "Solar batteries: how to pick the right capacity",
    excerpt: "Nominal vs. useful kWh, depth of discharge, lithium vs. lead-acid and the formula to work out how much battery you really need.",
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
