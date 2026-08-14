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

export const ARTICLES: BlogArticle[] = [
  {
    slug: "climatizacion-en-alicante-y-murcia-por-que-tiramos-dinero-en-verano-y-como-solucionarlo",
    title: "Climatización en Alicante y Murcia: por qué tiramos dinero en verano y cómo solucionarlo",
    excerpt:
      "Descubre dónde se pierde la energía en la climatización de tu vivienda y qué opción de inversión te ayuda a ahorrar real en Alicante y Murcia.",
    date: "2026-08-12",
    tags: ["climatización", "ahorro energético", ],
    cover: "images/blog/climatizacion-en-alicante-y-murcia-por-que-tiramos-dinero-en-verano-y-como-solucionarlo/portada.webp",
    readingMinutes: 9,
  },
  {
    slug: "cual-es-la-mejor-forma-de-producir-agua-caliente-en-una-vivienda",
    title: "¿Cuál es la mejor forma de producir agua caliente en una vivienda?",
    excerpt:
      "Comparativa entre termo eléctrico, calentador de butano, aerotermo híbrido y aerotermo de bomba de calor para ahorrar energía y mejorar el confort.",
    date: "2026-08-12",
    tags: ["acs", "aerotermia", "ahorro energético"],
    cover: "images/blog/cual-es-la-mejor-forma-de-producir-agua-caliente-en-una-vivienda/portada.webp", 
    readingMinutes: 9,
  },
  {
    slug: "como-convertir-una-instalacion-fotovoltaica-en-una-vivienda-inteligente",
    title: "Cómo convertir una instalación fotovoltaica en una vivienda inteligente",
    excerpt:
      "Descubre cómo la domótica sincroniza la producción solar con el consumo real para ahorrar más, mejorar el confort y hacer la casa más segura.",
    date: "2026-08-12",
    tags: ["domótica", "fotovoltaica", "ahorro energético"],
    cover: "images/blog/como-convertir-una-instalacion-fotovoltaica-en-una-vivienda-inteligente/portada.webp",
    readingMinutes: 8,
  },
  {
    slug: "el-heroe-invisible-del-acs-la-valvula-mescladora-termostatica",
    title: "El héroe invisible del ACS: la válvula mezcladora termostática",
    excerpt:
      "Descubre por qué una válvula mezcladora termostática mejora la seguridad, aumenta la autonomía del acumulador y ahorra agua y energía en tu instalación de ACS.",
    date: "2026-08-12",
    tags: ["acs", "ahorro energético", "fontanería"],
    cover: "images/cargador.webp",
    readingMinutes: 8,
  },
  {
    slug: "beneficios-del-coche-electrico-vs-combustion",
    title: "Beneficios del coche eléctrico frente al de combustión en Alicante y Murcia",
    excerpt:
      "Descubre cómo un cargador doméstico y unas placas solares reducen el coste real del coche eléctrico frente a un térmico, con cifras para Alicante, Murcia y la Vega Baja del Segura.",
    date: "2026-08-12",
    tags: ["coche eléctrico", "placas solares", "autoconsumo"],
    cover: "images/cargador.webp",
    readingMinutes: 8,
  },
  {
    slug: "el-mito-del-60-de-descuento-en-el-irpf",
    title: 'El mito del "60% de descuento" en el IRPF',
    excerpt:
      "Destripamos una instalación de 11.500 € llave en mano en Alicante: qué te llevas, cómo funcionan de verdad las deducciones estatal y autonómica, quién puede aprovecharlas y cómo se compara con un depósito bancario.",
    date: "2026-07-31",
    tags: ["fiscalidad", "autoconsumo"],
    cover: "images/cargador_chalet.webp",
    readingMinutes: 10,
  },
  {
    slug: "cuantas-placas-solares-necesita-tu-casa",
    title: "¿Cuántas placas solares necesita tu casa? La fórmula, paso a paso",
    excerpt:
      "Aprende a dimensionar tu instalación fotovoltaica a partir de tu factura: consumo diario, horas de sol pico y una fórmula sencilla con ejemplo real en Murcia.",
    date: "2026-07-28",
    tags: ["placas solares", "autoconsumo", "guías"],
    cover: "images/placas.webp",
    readingMinutes: 6,
  },
  {
    slug: "baterias-solares-como-elegir-capacidad",
    title: "Baterías solares: cómo elegir la capacidad correcta",
    excerpt:
      "kWh nominales vs. útiles, profundidad de descarga, litio frente a plomo-ácido y la fórmula para calcular cuánta batería necesitas de verdad.",
    date: "2026-07-21",
    tags: ["autoconsumo", "guías"],
    cover: "images/bateria.webp",
    readingMinutes: 7,
  },
];

export const sortedArticles = [...ARTICLES].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export const ALL_TAGS = [...new Set(ARTICLES.flatMap((a) => a.tags))].sort();

export function articleBySlug(slug: string): BlogArticle | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}T00:00:00`));
}
