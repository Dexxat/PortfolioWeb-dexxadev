import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** Íconos de línea propios del portfolio (sin librerías externas). */
const TRAZOS: Record<string, string> = {
  whatsapp: 'M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.4 8.4 0 1 1 21 11.5z',
  ubicacion:
    'M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zM12 7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z',
  estudios: 'M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5',
  codigo: 'M16 18l6-6-6-6M8 6l-6 6 6 6',
  externo: 'M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5',
  luna: 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z',
  sol: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  tiburon:
    'M3 17c2.5 0 3.5-1.5 6-1.5s3.5 1.5 6 1.5 3.5-1.5 6-1.5M6 13.5C8 9 11 5.5 15 4c-.8 3.2-.6 6.5.8 9.5',
  sonido: 'M11 5L6 9H2v6h4l5 4zM15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14',
  silencio: 'M11 5L6 9H2v6h4l5 4zM22 9l-6 6M16 9l6 6',
  menu: 'M4 6h16M4 12h16M4 18h16',
};

@Component({
  selector: 'app-icono',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      [attr.width]="tam()"
      [attr.height]="tam()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path [attr.d]="trazo()" />
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
      flex: 0 0 auto;
    }
  `,
})
export class Icono {
  readonly nombre = input.required<string>();
  readonly tam = input(18);
  protected readonly trazo = computed(() => TRAZOS[this.nombre()] ?? '');
}
