import { describe, expect, it } from 'vitest';
import { armarSemanas, fechaCorta } from './calendario';
import { DiaActividad } from '../datos/modelos';

const dia = (fecha: string, cantidad = 0, nivel: DiaActividad['nivel'] = 0): DiaActividad => ({
  fecha,
  cantidad,
  nivel,
});

describe('armarSemanas', () => {
  it('arma columnas de domingo a sábado', () => {
    // 26/10/2025 es domingo
    const dias = Array.from({ length: 7 }, (_, i) =>
      dia(new Date(Date.UTC(2025, 9, 26 + i)).toISOString().slice(0, 10)),
    );
    const semanas = armarSemanas(dias);
    expect(semanas).toHaveLength(1);
    expect(semanas[0].dias).toHaveLength(7);
    expect(semanas[0].dias[0]?.fecha).toBe('2025-10-26');
  });

  it('deja huecos si el primer día no es domingo', () => {
    // 29/10/2025 es miércoles
    const semanas = armarSemanas([dia('2025-10-29'), dia('2025-10-30')]);
    expect(semanas[0].dias.slice(0, 3)).toEqual([null, null, null]);
    expect(semanas[0].dias[3]?.fecha).toBe('2025-10-29');
    expect(semanas[0].dias).toHaveLength(7);
  });

  it('marca el mes solo cuando cambia, y nunca en la primera columna', () => {
    const dias: DiaActividad[] = [];
    for (let i = 0; i < 21; i++) {
      const f = new Date(Date.UTC(2025, 9, 26 + i)).toISOString().slice(0, 10);
      dias.push(dia(f));
    }
    const meses = armarSemanas(dias).map((s) => s.mes);
    expect(meses).toEqual(['', 'nov', '']);
  });

  it('describe cada día para el tooltip', () => {
    const [s] = armarSemanas([
      dia('2026-10-25', 0),
      dia('2026-10-26', 38, 4),
      dia('2026-10-27', 1, 1),
    ]);
    expect(s.dias[0]?.etiqueta).toBe('Sin actividad el 25 oct 2026');
    expect(s.dias[1]?.etiqueta).toBe('38 contribuciones el 26 oct 2026');
    expect(s.dias[2]?.etiqueta).toBe('1 contribución el 27 oct 2026');
  });
});

describe('fechaCorta', () => {
  it('formatea en español', () => {
    expect(fechaCorta('2026-10-31')).toBe('31 oct 2026');
    expect(fechaCorta('2026-01-05')).toBe('5 ene 2026');
  });
});
