import { Injectable, effect, signal } from '@angular/core';

export type Tema = 'oscuro' | 'claro';

/** Modo oscuro por defecto; recuerda la elección en el navegador. */
@Injectable({ providedIn: 'root' })
export class TemaService {
  readonly tema = signal<Tema>(this.leerGuardado());

  constructor() {
    effect(() => {
      const t = this.tema();
      document.documentElement.dataset['tema'] = t;
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', t === 'oscuro' ? '#0B1220' : '#F4F6F9');
      try {
        localStorage.setItem('tema', t);
      } catch {
        // Navegación privada o almacenamiento bloqueado: el tema vale solo para esta visita.
      }
    });
  }

  alternar() {
    this.tema.update((t) => (t === 'oscuro' ? 'claro' : 'oscuro'));
  }

  private leerGuardado(): Tema {
    const actual = document.documentElement.dataset['tema'];
    return actual === 'claro' ? 'claro' : 'oscuro';
  }
}
