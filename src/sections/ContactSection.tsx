import emailjs from "@emailjs/browser";
import { useState, type FormEvent } from "react";
import {
  Phone, Mail, MapPin, Clock, ArrowRight, MessageCircle, Check, Lock, Loader2,
} from "lucide-react";
import { EMAIL, MAILTO_HREF, PHONE_DISPLAY, TEL_HREF, WHATSAPP } from "../lib/site.ts";
import { useLanguage } from "../i18n/provider.tsx";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function ContactSection() {
  const { t, path } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nombre: "", telefono: "", email: "", localidad: "", mensaje: "", privacidad: false,
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formData.privacidad) return;
    setSending(true);
    setError(null);
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          nombre: formData.nombre,
          telefono: formData.telefono,
          email: formData.email,
          localidad: formData.localidad,
          mensaje: formData.mensaje,
        },
        { publicKey: PUBLIC_KEY },
      );
      setSubmitted(true);
    } catch (err) {
      console.error("Error al enviar el email:", err);
      setError(t("sections.contact.form.error"));
    } finally {
      setSending(false);
    }
  }

  const req = t("sections.contact.form.required");
  return (
    <section id="contacto" className="py-24">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

          <div>
            <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">{t("sections.contact.eyebrow")}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-5">
              {t("sections.contact.titleBefore")}<span className="text-accent">{t("sections.contact.titleHighlight")}</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">{t("sections.contact.subtitle")}</p>

            <div className="space-y-4 mb-8">
              {[
                { Icon: Phone, label: PHONE_DISPLAY, href: TEL_HREF },
                { Icon: MessageCircle, label: `${t("sections.contact.whatsappPrefix")}${PHONE_DISPLAY}`, href: WHATSAPP },
                { Icon: Mail, label: EMAIL, href: MAILTO_HREF },
                { Icon: MapPin, label: t("sections.contact.areaCommaLine"), href: "#" },
                { Icon: Clock, label: t("sections.contact.hoursLine"), href: "#" },
              ].map(({ Icon, label, href }) => (
                <a key={label} href={href} className="flex items-center gap-3 text-sm text-foreground hover:text-accent transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={15} className="text-accent" />
                  </div>
                  {label}
                </a>
              ))}
            </div>

            <div className="rounded-xl border border-border p-4 bg-secondary text-xs text-muted-foreground">
              <p className="font-semibold text-foreground mb-1">{t("sections.contact.areasTitle")}</p>
              <p>{t("sections.contact.areasBody")}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border p-7 shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-center text-center gap-4 py-10">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                  <Check size={28} className="text-accent" />
                </div>
                <h3 className="text-xl font-bold">{t("sections.contact.form.successTitle")}</h3>
                <p className="text-muted-foreground text-sm max-w-xs">{t("sections.contact.form.successBody")}</p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ nombre: "", telefono: "", email: "", localidad: "", mensaje: "", privacidad: false }); }}
                  className="text-xs text-accent hover:underline mt-2"
                >
                  {t("sections.contact.form.successAgain")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-bold text-lg mb-5">{t("sections.contact.form.title")}</h3>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
                      {t("sections.contact.form.name")} {req}
                    </label>
                    <input
                      required
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      placeholder={t("sections.contact.form.namePlaceholder")}
                      className="w-full px-3 py-2.5 rounded-xl border border-border bg-secondary text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
                      {t("sections.contact.form.phone")} {req}
                    </label>
                    <input
                      required
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      placeholder={t("sections.contact.form.phonePlaceholder")}
                      className="w-full px-3 py-2.5 rounded-xl border border-border bg-secondary text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
                    {t("sections.contact.form.email")} {req}
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t("sections.contact.form.emailPlaceholder")}
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-secondary text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
                    {t("sections.contact.form.locality")}
                  </label>
                  <input
                    value={formData.localidad}
                    onChange={(e) => setFormData({ ...formData, localidad: e.target.value })}
                    placeholder={t("sections.contact.form.localityPlaceholder")}
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-secondary text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
                    {t("sections.contact.form.message")}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    placeholder={t("sections.contact.form.messagePlaceholder")}
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-secondary text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                  />
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.privacidad}
                    onChange={(e) => setFormData({ ...formData, privacidad: e.target.checked })}
                    className="mt-0.5 w-4 h-4 accent-accent flex-shrink-0"
                  />
                  <span className="text-xs text-muted-foreground leading-relaxed">
                    {t("sections.contact.form.privacyBefore")}
                    <a href={path("/politica-de-privacidad")} className="text-accent underline hover:no-underline">
                      {t("sections.contact.form.privacyLink")}
                    </a>
                    {t("sections.contact.form.privacyAfter")} {req}
                  </span>
                </label>
                {error && (
                  <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3.5 rounded-xl bg-accent text-white font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mt-1"
                >
                  {sending ? (
                    <>
                      <Loader2 size={14} className="animate-spin" /> {t("sections.contact.form.sending")}
                    </>
                  ) : (
                    <>
                      {t("sections.contact.form.submit")} <ArrowRight size={14} />
                    </>
                  )}
                </button>
                <p className="text-xs text-muted-foreground text-center">
                  {t("sections.contact.form.trustLine")}
                  <Lock size={10} className="inline ml-1 text-accent" />
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
