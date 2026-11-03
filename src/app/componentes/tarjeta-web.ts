import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { WebComercio } from '../datos/modelos';

@Component({
  selector: 'app-tarjeta-web',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="card" [href]="w().url" target="_blank" rel="noopener">
      <img [src]="w().captura" [alt]="w().alt" loading="lazy" width="1200" height="588" />
      <span class="texto">
        <span class="nombre">{{ w().nombre }}</span>
        <span class="lugar">{{ w().lugar }}</span>
        <span class="descripcion">{{ w().descripcion }}</span>
      </span>
    </a>
  `,
  styles: `
    :host {
      display: flex;
    }
    a {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      text-decoration: none;
      color: var(--texto);
    }
    a:hover {
      color: var(--texto);
      border-color: var(--acento-linea);
    }
    img {
      display: block;
      width: 100%;
      height: auto;
      aspect-ratio: 16 / 10;
      object-fit: cover;
      object-position: top;
      border-bottom: 1px solid var(--borde);
    }
    .texto {
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .nombre {
      font-weight: 600;
    }
    .lugar {
      font-size: 13px;
      color: var(--link);
    }
    .descripcion {
      font-size: 14px;
      color: var(--texto-3);
      line-height: 1.45;
    }
  `,
})
export class TarjetaWeb {
  readonly w = input.required<WebComercio>();
}
