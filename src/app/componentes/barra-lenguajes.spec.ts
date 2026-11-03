import { describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { BarraLenguajes } from './barra-lenguajes';

describe('BarraLenguajes', () => {
  it('agrupa los lenguajes chicos en "Otros"', async () => {
    const f = TestBed.createComponent(BarraLenguajes);
    f.componentRef.setInput('lenguajes', [
      { nombre: 'TypeScript', porcentaje: 72.1 },
      { nombre: 'HTML', porcentaje: 21 },
      { nombre: 'SCSS', porcentaje: 6.1 },
      { nombre: 'JavaScript', porcentaje: 0.6 },
      { nombre: 'Dockerfile', porcentaje: 0.2 },
    ]);
    await f.whenStable();
    const items = [...(f.nativeElement as HTMLElement).querySelectorAll('li')].map((li) =>
      li.textContent?.trim(),
    );
    expect(items).toEqual(['TypeScript72 %', 'HTML21 %', 'SCSS6,1 %', 'Otros0,8 %']);
  });
});
