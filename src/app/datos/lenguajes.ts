/** Colores de lenguajes, los mismos que usa GitHub (Linguist). */
const COLORES: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F1E05A',
  HTML: '#E34C26',
  CSS: '#7B5BC9',
  SCSS: '#C6538C',
  Java: '#B07219',
  'C#': '#178600',
  'C++': '#F34B7D',
  Python: '#3572A5',
  Dockerfile: '#384D54',
  Shell: '#89E051',
};

export const colorLenguaje = (nombre: string) => COLORES[nombre] ?? '#6E7B92';

/** "72.1" → "72 %"; los menores a 10 conservan un decimal. */
export const formatoPorcentaje = (p: number) =>
  (p >= 10 ? Math.round(p).toString() : p.toFixed(1).replace('.', ',')) + ' %';
