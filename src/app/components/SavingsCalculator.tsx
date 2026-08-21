import { useState } from "react";
import { useLanguage } from "../../i18n/provider.tsx";
import { LANG_META } from "../../i18n/index.ts";

const INVERSORES_REFERENCIA = [
  { maxKwp: 4.5, inversor: "Inversor Híbrido 3 kW / 3.6 kW", bateria5kw: "Batería Litio 5,12 kWh", bateria16kw: "Batería Litio 10 kWh" },
  { maxKwp: 7.5, inversor: "Inversor Híbrido 5 kW / 6 kW", bateria5kw: "Batería Litio 5,12 kWh", bateria16kw: "Batería Litio 10 kWh" },
  { maxKwp: 11.0, inversor: "Inversor Híbrido 8 kW / 10 kW", bateria5kw: "Batería Litio 10 kWh", bateria16kw: "Batería Litio 16 kWh" },
  { maxKwp: 99.0, inversor: "Inversor Híbrido 12 kW / 15 kW", bateria5kw: "Batería Litio 16 kWh", bateria16kw: "Batería Litio 20+ kWh" }
];

const RENDIMIENTO_PROVINCIA_KWH_KWP = {
  Alicante: 1550,
  Murcia: 1600
};

const POTENCIA_PANEL_REFERENCIA_KW = 0.54;

function obtenerPrecioReferenciaKwh(gasto: number): number {
  if (gasto <= 70) return 0.44;
  if (gasto <= 160) return 0.24;
  return 0.20;
}

interface ResultadoCalculo {
  ahorroAnualEstimadoEuro: number;
  produccionAnualKwh: number;
  consumoEstimadoKwhMes: number;
  potenciaTotalKwp: number;
  numeroPanelesEstimado: number;
  amortizacionEstimadaAños: string;
  sistemaNombre: string;
  bateriaInfo: string;
  inversorInfo: string;
  porcentajeAhorroPct: number;
}

export default function Calculator() {
  const { t, lang, path } = useLanguage();
  const numberLocale = LANG_META[lang].intlLocale;
  const [gasto, setGasto] = useState(100);
  const [provincia, setProvincia] = useState("Alicante");
  const [incluyeBateriaFisica, setIncluyeBateriaFisica] = useState(true);
  const [incluyeBateriaVirtual, setIncluyeBateriaVirtual] = useState(true);
  const [resultado, setResultado] = useState<ResultadoCalculo | null>(null);
  const [vistaResultado, setVistaResultado] = useState(false);


  function calcular() {
    const gastoValido = Math.max(0, Number(gasto) || 0);
    if (gastoValido === 0) {
      setResultado(null);
      return;
    }

    const precioKwhAplicado = obtenerPrecioReferenciaKwh(gastoValido);
    const consumoEstimadoKwhMes = Math.round(gastoValido / precioKwhAplicado);
    const consumoAnualKwh = consumoEstimadoKwhMes * 12;

    let factorCoberturaPotencia = 0.80;
    let porcentajeAhorroFactura = 0.80;

    if (incluyeBateriaFisica && incluyeBateriaVirtual) {
      factorCoberturaPotencia = 0.95;
      porcentajeAhorroFactura = 0.95;
    } else if (incluyeBateriaFisica) {
      factorCoberturaPotencia = 0.90;
      porcentajeAhorroFactura = 0.90;
    } else if (incluyeBateriaVirtual) {
      factorCoberturaPotencia = 0.85;
      porcentajeAhorroFactura = 0.85;
    }

    const rendimientoLocal = RENDIMIENTO_PROVINCIA_KWH_KWP[provincia as keyof typeof RENDIMIENTO_PROVINCIA_KWH_KWP];
    const kwpBrutosBase = (consumoAnualKwh * factorCoberturaPotencia) / rendimientoLocal;
    const margenTecnicoKwp = 1.5 * POTENCIA_PANEL_REFERENCIA_KW;
    const potenciaTotalKwp = Math.max(2.16, Math.round((kwpBrutosBase + margenTecnicoKwp) * 100) / 100);
    const numeroPanelesEstimado = Math.round(potenciaTotalKwp / POTENCIA_PANEL_REFERENCIA_KW);

    const gastoAnualFactura = gastoValido * 12;
    const ahorroAnualEstimadoEuro = Math.round(gastoAnualFactura * porcentajeAhorroFactura);
    const porcentajeAhorroPct = Math.round(porcentajeAhorroFactura * 100);

    const equipoMatcheado = INVERSORES_REFERENCIA.find((e) => potenciaTotalKwp <= e.maxKwp) || INVERSORES_REFERENCIA[3];
    const inversorSugerido = equipoMatcheado.inversor;
    const bateriaSugerida = incluyeBateriaFisica
      ? (potenciaTotalKwp > 7.5 ? equipoMatcheado.bateria16kw : equipoMatcheado.bateria5kw)
      : t("sections.calculator.form.noBattery");

    const produccionAnualKwh = Math.round(potenciaTotalKwp * rendimientoLocal);
    const amortizacionEstimadaAños = incluyeBateriaFisica
      ? t("sections.calculator.form.paybackWithBattery")
      : t("sections.calculator.form.paybackNoBattery");
    const sistemaNombre = incluyeBateriaFisica
      ? t("sections.calculator.form.systemBattery", { kwp: potenciaTotalKwp })
      : t("sections.calculator.form.systemDirect", { kwp: potenciaTotalKwp });

    setResultado({
      ahorroAnualEstimadoEuro,
      produccionAnualKwh,
      consumoEstimadoKwhMes,
      potenciaTotalKwp,
      numeroPanelesEstimado,
      amortizacionEstimadaAños,
      sistemaNombre,
      bateriaInfo: bateriaSugerida,
      inversorInfo: inversorSugerido,
      porcentajeAhorroPct
    });

    setVistaResultado(true);
  }

  function modificarDatos() {
    setVistaResultado(false);
  }

  return (
    <div className="bg-white rounded-2xl border border-border p-6 md:p-8 shadow-sm">
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          vistaResultado ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
        }`}
      >
        <div className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="calc-factura" className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                {t("sections.calculator.form.billLabel")}
              </label>
              <input
                id="calc-factura"
                type="number"
                min={30}
                max={2000}
                value={gasto}
                onChange={(e) => setGasto(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground text-sm focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label htmlFor="calc-provincia" className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                {t("sections.calculator.form.provinceLabel")}
              </label>
              <select
                id="calc-provincia"
                value={provincia}
                onChange={(e) => setProvincia(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground text-sm focus:outline-none focus:border-accent transition-colors"
              >
                <option value="Alicante">Alicante</option>
                <option value="Murcia">Murcia</option>
              </select>
            </div>
          </div>

          <div className="mb-2 p-3.5 rounded-xl bg-secondary/40 border border-border">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={incluyeBateriaFisica}
                onChange={(e) => setIncluyeBateriaFisica(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-accent flex-shrink-0"
              />
              <span className="text-muted-foreground text-xs md:text-sm font-medium">
                {t("sections.calculator.form.batteryPhysical")}
              </span>
            </label>
          </div>

          <div className="mb-4 p-3.5 rounded-xl bg-secondary/40 border border-border">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={incluyeBateriaVirtual}
                onChange={(e) => setIncluyeBateriaVirtual(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-accent flex-shrink-0"
              />
              <span className="text-muted-foreground text-xs md:text-sm font-medium">
                {t("sections.calculator.form.batteryVirtual")}
              </span>
            </label>
          </div>

          <p className="text-xs text-muted-foreground mb-6">
            <b>
              {t("sections.calculator.form.estimate", {
                bill: gasto,
                consumption: Math.round(gasto / obtenerPrecioReferenciaKwh(gasto)),
                price: obtenerPrecioReferenciaKwh(gasto),
              })}
            </b>
          </p>

          <button
            onClick={calcular}
            className="w-full py-3.5 rounded-xl bg-accent text-accent-foreground font-semibold text-sm hover:opacity-90 transition-opacity mb-6"
          >
            {t("sections.calculator.form.calculate")}
          </button>
        </div>
      </div>


      {resultado && (
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            vistaResultado ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="space-y-4">
              <button
                onClick={modificarDatos}
                className="text-xs text-accent font-semibold flex items-center gap-1 hover:underline"
              >
                {t("sections.calculator.form.edit")}
              </button>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-xl bg-accent/5 border border-accent/20">
                <div className="text-center col-span-2 md:col-span-1">
                  <div className="text-2xl md:text-3xl font-bold text-accent mb-1">
                    {resultado.ahorroAnualEstimadoEuro.toLocaleString(numberLocale)} €
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {t("sections.calculator.form.annualSaving", { pct: resultado.porcentajeAhorroPct })}
                  </div>
                </div>

                <div className="text-center md:border-l border-accent/20 pt-3 md:pt-0">
                  <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                    {resultado.produccionAnualKwh.toLocaleString(numberLocale)} kWh
                  </div>
                  <div className="text-xs text-muted-foreground">{t("sections.calculator.form.annualProduction")}</div>
                </div>

                <div className="text-center border-t md:border-t-0 md:border-l border-accent/20 pt-3 md:pt-0">
                  <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                    {resultado.potenciaTotalKwp} kWp
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {t("sections.calculator.form.panels", { count: resultado.numeroPanelesEstimado })}
                  </div>
                </div>

                <div className="text-center border-t md:border-t-0 md:border-l border-accent/20 pt-3 md:pt-0">
                  <div className="text-2xl md:text-3xl font-bold text-accent mb-1">
                    {resultado.amortizacionEstimadaAños}
                  </div>
                  <div className="text-xs text-muted-foreground">{t("sections.calculator.form.paybackLabel")}</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-accent/10 border border-accent/30 text-center space-y-2">
                <p className="text-xs text-foreground font-medium">{t("sections.calculator.form.guidance")}</p>

                <a href={`${path("/")}#contacto`}
                  className="inline-block w-full md:w-auto px-6 py-2.5 rounded-lg bg-accent text-accent-foreground font-semibold text-xs transition-transform active:scale-95"
                >
                  {t("sections.calculator.form.requestExact")}
                </a>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-secondary/50 border border-border text-xs text-muted-foreground space-y-1.5">
                  <div className="flex justify-between font-semibold text-foreground pb-1 border-b border-border/50">
                    <span>{t("sections.calculator.form.specTitle")}</span>
                    <span>{resultado.sistemaNombre}</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span>{t("sections.calculator.form.specPanels")}</span>
                    <span className="text-foreground font-medium">
                      {t("sections.calculator.form.specPanelsValue", { count: resultado.numeroPanelesEstimado })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("sections.calculator.form.specInverter")}</span>
                    <span className="text-foreground font-medium">{resultado.inversorInfo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("sections.calculator.form.specBattery")}</span>
                    <span className="text-foreground font-medium">{resultado.bateriaInfo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("sections.calculator.form.specVirtual")}</span>
                    <span className="text-foreground font-medium">
                      {incluyeBateriaVirtual ? t("sections.calculator.form.virtualOn") : t("sections.calculator.form.virtualOff")}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200/60 text-xs text-slate-700 space-y-1">
                  <p className="font-semibold text-slate-900">{t("sections.calculator.form.grantsTitle")}</p>
                  <p dangerouslySetInnerHTML={{ __html: t("sections.calculator.form.grantsBody") }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <p className="text-[11px] text-muted-foreground text-center mt-3">
        {t("sections.calculator.form.disclaimer", { province: provincia })}
      </p>
    </div>
  );
}
