import { useEffect, useRef, useState } from "react";
import { readArticleHtml } from "../../../lib/articleHtml.ts";
// @ts-ignore
import "../../../styles/blog.css";

interface ArticleContentProps {
  slug: string;
}

export default function ArticleContent({ slug }: ArticleContentProps) {
  const [html, setHtml] = useState<string | null>(() => readArticleHtml(slug));
  const [error, setError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    const seeded = readArticleHtml(slug);
    if (seeded !== null) {
      setHtml(seeded);
      setError(false);
      return;
    }

    setHtml(null);
    setError(false);

    fetch(`${import.meta.env.BASE_URL}blog/articles/${slug}.html`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((text) => {
        if (!cancelled) setHtml(text);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (!html || !containerRef.current) return;
    let cancelled = false;

    (async () => {
      // @ts-ignore
      await import("katex/dist/katex.min.css");
      const { default: renderMathInElement } = await import(
        // @ts-ignore
        "katex/contrib/auto-render"
      );
      if (!cancelled && containerRef.current) {
        renderMathInElement(containerRef.current, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "\\(", right: "\\)", display: false },
          ],
          throwOnError: false,
        });
      }
    })();

    if (containerRef.current) {
      const calculators = containerRef.current.querySelectorAll(".clima-calculator");
      calculators.forEach((calculator) => {
        const equipo = calculator.querySelector("#clima-equipo") as HTMLSelectElement | null;
        const horas = calculator.querySelector("#clima-horas") as HTMLInputElement | null;
        const temp = calculator.querySelector("#clima-temp") as HTMLInputElement | null;
        const aislamiento = calculator.querySelector("#clima-aislamiento") as HTMLSelectElement | null;
        const precio = calculator.querySelector("#clima-precio") as HTMLInputElement | null;
        const tempLabel = calculator.querySelector("#clima-temp-label") as HTMLDivElement | null;
        const kwhEl = calculator.querySelector("#result-kwh") as HTMLSpanElement | null;
        const costEl = calculator.querySelector("#result-cost") as HTMLSpanElement | null;
        const savingEl = calculator.querySelector("#result-savings") as HTMLSpanElement | null;
        const wasteEl = calculator.querySelector("#result-waste") as HTMLSpanElement | null;
        const totalGastoEl = calculator.querySelector("#clima-total-gasto") as HTMLElement | null;
        const wasteBarEl = calculator.querySelector("#clima-cost-waste") as HTMLElement | null;
        const usefulBarEl = calculator.querySelector("#clima-cost-useful") as HTMLElement | null;
        const wasteLabelEl = calculator.querySelector("#clima-cost-waste-label") as HTMLElement | null;
        const usefulLabelEl = calculator.querySelector("#clima-cost-useful-label") as HTMLElement | null;
        const headlineEl = calculator.querySelector(".clima-cost-compare__header h3") as HTMLElement | null;

        if (!equipo || !horas || !temp || !aislamiento || !precio || !tempLabel || !kwhEl || !costEl || !savingEl || !wasteEl) {
          return;
        }

        const calculate = () => {
          const seer = Number(equipo.value || 3);
          const horasDia = Number(horas.value || 8);
          const temperatura = Number(temp.value || 21);
          const factorAislamiento = Number(aislamiento.value || 1.35);
          const precioKwh = Number(precio.value || 0.22);

          tempLabel.textContent = `${temperatura} °C`;

          const demanda = 3.5 * factorAislamiento;
          let factorTemp = 1;
          if (temperatura < 24) {
            factorTemp = 1 + (24 - temperatura) * 0.08;
          } else if (temperatura > 24) {
            factorTemp = 1 - (temperatura - 24) * 0.05;
          }

          const consumo = ((demanda / seer) * factorTemp) * horasDia * 30;
          const consumoOptimo = ((demanda / 9) * 1) * horasDia * 30;
          const gasto = consumo * precioKwh;
          const gastoOptimo = consumoOptimo * precioKwh;
          const ahorro = Math.max(0, gasto - gastoOptimo);
          const desperdicio = Math.max(0, ((consumo - consumoOptimo) / consumo) * 100);
          const gastoDesperdiciado = gasto * (desperdicio / 100);
          const gastoUtil = Math.max(0, gasto - gastoDesperdiciado);

          kwhEl.textContent = `${consumo.toFixed(1)} kWh`;
          costEl.textContent = `${gasto.toFixed(2)} €`;
          savingEl.textContent = `${ahorro.toFixed(2)} €`;
          wasteEl.textContent = `${desperdicio.toFixed(1)}%`;

          if (totalGastoEl) totalGastoEl.textContent = `${gasto.toFixed(2)} €`;
          if (wasteBarEl) wasteBarEl.style.width = `${Math.min(100, Math.max(0, desperdicio))}%`;
          if (usefulBarEl) usefulBarEl.style.width = `${Math.min(100, Math.max(0, 100 - desperdicio))}%`;
          if (wasteLabelEl) wasteLabelEl.innerHTML = `<i class="clima-dot clima-dot--waste"></i> Desperdicio: ${gastoDesperdiciado.toFixed(2)} €`;
          if (usefulLabelEl) usefulLabelEl.innerHTML = `<i class="clima-dot clima-dot--useful"></i> Uso útil: ${gastoUtil.toFixed(2)} €`;

          if (headlineEl) {
            if (desperdicio > 55) {
              headlineEl.textContent = 'La mayor parte del dinero se pierde en ineficiencias';
            } else if (desperdicio > 30) {
              headlineEl.textContent = 'Una parte importante del gasto se va por ineficiencias';
            } else if (desperdicio > 15) {
              headlineEl.textContent = 'El gasto sigue siendo razonable, pero hay margen de mejora';
            } else {
              headlineEl.textContent = 'La eficiencia ya está bastante controlada';
            }
          }
        };

        [equipo, horas, temp, aislamiento, precio].forEach((input) => {
          input.addEventListener("input", calculate);
          input.addEventListener("change", calculate);
        });

        calculate();
      });
    }

    return () => {
      cancelled = true;
    };
  }, [html]);

  if (error) {
    return (
      <p className="text-center text-muted-foreground py-12">
        No se pudo cargar el contenido del artículo. Inténtalo de nuevo más tarde.
      </p>
    );
  }

  if (html === null) {
    return (
      <div className="space-y-4 py-8 animate-pulse">
        <div className="h-4 bg-secondary rounded w-3/4" />
        <div className="h-4 bg-secondary rounded" />
        <div className="h-4 bg-secondary rounded w-5/6" />
        <div className="h-48 bg-secondary rounded-2xl" />
        <div className="h-4 bg-secondary rounded w-2/3" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="article-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
