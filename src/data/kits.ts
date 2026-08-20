export type Kit = {
  title: string;
  price: number;
  slug: string;
};

export const KITS: Kit[] = [
  {title: "Kit solar híbrido 3 kW", price: 6500, slug: "3kw-hibrido" },
  {title: "Kit solar 6 kW", price: 7800, slug: "6kw" },
  {title: "Kit solar off-grid 6 kW", price: 8400, slug: "6kw-offgrid" },
  {title: "Kit solar híbrido 8 kW", price: 10800, slug: "8kw-hibrido" },
  {title: "Kit solar híbrido 10 kW", price: 12000, slug: "10kw-hibrido" },
  {title: "Cargador de coche eléctrico", price: 1200, slug: "cargador" },
  {title: "Kit domótico", price: 2500, slug: "domotico" },
  {title: "Kit domótico pequeño", price: 2000, slug: "domotico-s" },
  {title: "Aerotermo Ariston Nuos Plus S2 110L Wi-Fi", price: 1500, slug: "aerotermo-110" },
  {title: "Aerotermo Ariston Híbrido 100L Wi-Fi", price: 850, slug: "aerotermo-100" }
]; 

export function formatPrice(value: number): string {
  return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €`;
}
