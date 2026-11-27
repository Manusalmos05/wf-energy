const FACETS =
  "M175.5 42.3L156.5 237.3L204.5 516.3L85.5 810.3L360.5 947.3L485.5 1172.3L566.5 1216.3L654.5 1172.3L760.5 959.8L1054.5 810.3L916.5 522.3L979.5 241.3L955.5 42.3L704.5 322.3L429.5 322.3L175.5 42.3M429.5 322.3L204.5 516.3M704.5 322.3L916.5 522.3M447.8 322.3L403.5 703.3L485.5 1172.3M204.5 516.3L403.5 703.3M85.5 810.3L403.5 703.3M916.5 522.3L776.2 647M1032.1 803.2L736.9 705.1M690.2 322.3L619.5 553.3L835.5 553.3L505.5 1057.3L579.5 703.3L403.5 703.3M699.3 762.4L658.4 1164.8";

const NOSE = "484.2,1112.9 565.2,1079.7 654.5,1113 653.2,1173.7 565.2,1217.7 484.2,1173.7";

export default function BrandLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="70 27 1000 1206" className={className} aria-hidden="true" focusable="false">
      <path d={FACETS} fill="none" stroke="currentColor" strokeWidth={30} strokeLinecap="round" strokeLinejoin="round" />
      <polygon points={NOSE} fill="currentColor" />
    </svg>
  );
}
