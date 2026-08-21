import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { getKits } from "../../data/kits.ts";
import { getKitSpecs } from "../../data/kitSpecs.ts";
import KitInfographic from "./KitInfographic.tsx";
import { useLanguage } from "../../i18n/provider.tsx";

export default function KitsCarousel() {
  const { t, lang, path } = useLanguage();
  const kits = getKits(lang);
  const specs = getKitSpecs(lang);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    dragFree: false,
  });

  const [selected, setSelected] = useState(0);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const syncSelected = () => setSelected(emblaApi.selectedScrollSnap());
    syncSelected();
    emblaApi.on("select", syncSelected).on("reInit", syncSelected);
    return () => {
      emblaApi.off("select", syncSelected).off("reInit", syncSelected);
    };
  }, [emblaApi]);

  return (
    <div>

      <div className="relative pb-10 lg:pb-8">

        <button
          onClick={scrollPrev}
          aria-label={t("sections.kits.prev")}
          className="group absolute bottom-0 left-0 z-20 rounded-full bg-primary p-2.5 shadow-lg transition-colors hover:bg-white lg:bottom-auto lg:top-[calc(50%-1.5rem)] lg:-translate-y-1/2 lg:p-3"
        >
          <ChevronLeft aria-hidden="true" className="text-white transition-colors group-hover:text-primary" />
        </button>

        <div
          className="overflow-hidden"
          ref={emblaRef}
          role="region"
          aria-roledescription="carrusel"
          aria-label={t("sections.kits.carouselLabel")}
        >
          <div className="flex">
          {kits.map((k, i) => {
            const spec = specs[k.slug];
            return (
              <div
                key={k.slug}
                role="group"
                aria-roledescription="slide"
                aria-label={t("sections.kits.slideAria", { index: i + 1, total: kits.length, title: k.title })}
                aria-hidden={i !== selected}
                className="flex-[0_0_100%] px-1 sm:px-4 lg:px-12"
              >
                <KitInfographic spec={spec} price={k.price} />
              </div>
            );
          })}
          </div>
        </div>

        <button
          onClick={scrollNext}
          aria-label={t("sections.kits.next")}
          className="group absolute bottom-0 right-0 z-20 rounded-full bg-primary p-2.5 shadow-lg transition-colors hover:bg-white lg:bottom-auto lg:top-[calc(50%-1.5rem)] lg:-translate-y-1/2 lg:p-3"
        >
          <ChevronRight aria-hidden="true" className="text-white transition-colors group-hover:text-primary" />
        </button>

      </div>

      <div className="mt-[-20px] flex flex-col items-center gap-1">

        <div aria-label={t("sections.kits.pickerLabel")} className="flex justify-center gap-2.5">
          {kits.map((k, i) => (
            <button
              key={k.slug}
              aria-current={i === selected}
              aria-label={t("sections.kits.pickerAria", { index: i + 1, total: kits.length, title: k.title })}
              onClick={() => scrollTo(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === selected ? "w-6 bg-accent" : "w-2.5 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>


        <a href={`${path("/")}#contacto`}
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl bg-accent-deep px-6 py-3 font-semibold text-accent-deep-foreground shadow-lg transition hover:bg-accent-deep/90 lg:py-2.5"
        >
          {t("sections.kits.requestQuote")} <ArrowRight size={18} aria-hidden="true" />
        </a>

      </div>

    </div>
  );
}
