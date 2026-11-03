import { DiaActividad } from '../datos/modelos';

export interface CeldaDia extends DiaActividad {
  etiqueta: string;
}

export interface Semana {
  mes: string; // nombre corto del mes cuando empieza uno nuevo, o ''
  dias: (CeldaDia | null)[]; // 7 posiciones, de domingo a sábado
}

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

/**
 * Agrupa los días en columnas de semana (domingo a sábado), como el calendario de GitHub.
 * Las fechas se tratan en UTC para que no se corran un día según el huso horario.
 */
export function armarSemanas(dias: DiaActividad[]): Semana[] {
  const semanas: Semana[] = [];
  let actual: (CeldaDia | null)[] = [];
  let mesAnterior = -1;

  const cerrar = () => {
    const primero = actual.find((d) => d !== null);
    const mes = primero ? new Date(primero.fecha + 'T00:00:00Z').getUTCMonth() : -1;
    const etiqueta = semanas.length > 0 && mes !== mesAnterior ? MESES[mes] : '';
    while (actual.length < 7) actual.push(null);
    semanas.push({ mes: etiqueta, dias: actual });
    mesAnterior = mes;
    actual = [];
  };

  for (const d of dias) {
    const fecha = new Date(d.fecha + 'T00:00:00Z');
    const diaSemana = fecha.getUTCDay();
    if (actual.length === 0) for (let i = 0; i < diaSemana; i++) actual.push(null);
    actual.push({ ...d, etiqueta: etiquetaDia(d.cantidad, fecha) });
    if (diaSemana === 6) cerrar();
  }
  if (actual.length > 0) cerrar();
  return semanas;
}

/** "2026-10-31" → "31 oct 2026". */
export function fechaCorta(iso: string) {
  const [a, m, d] = iso.split('-').map(Number);
  return `${d} ${MESES[m - 1]} ${a}`;
}

function etiquetaDia(n: number, f: Date) {
  const cuando = `${f.getUTCDate()} ${MESES[f.getUTCMonth()]} ${f.getUTCFullYear()}`;
  if (n === 0) return `Sin actividad el ${cuando}`;
  return `${n} ${n === 1 ? 'contribución' : 'contribuciones'} el ${cuando}`;
}
