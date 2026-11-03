import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GitHubDatos } from '../core/github';
import { ProyectoDestacado } from '../datos/modelos';
import { colorLenguaje, formatoPorcentaje } from '../datos/lenguajes';

@Component({
  selector: 'app-tarjeta-proyecto',
  imports: [RouterLink, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template #contenido>
      @if (p().banner; as b) {
        <div class="banner" [class.pixel]="b.src.endsWith('.gif')">
          <img [src]="b.src" [alt]="b.alt" loading="lazy" />
        </div>
      }
      <div class="cuerpo">
        <div class="cabecera">
          <span class="nombre mono">{{ p().nombre }}</span>
          <span class="etiqueta">{{ p().tipo }}</span>
        </div>
        <p class="descripcion">{{ p().descripcion }}</p>
        <div class="datos">
          @if (lenguaje(); as l) {
            <span class="lenguaje"
              ><span class="punto" [style.background]="l.color"></span>{{ l.texto }}</span
            >
          }
          @for (d of p().datos; track d) {
            <span [class.ok]="d === 'CI en verde'">
              @if (d === 'CI en verde') {
                <span class="punto verde"></span>
              }
              {{ d }}
            </span>
          }
        </div>
      </div>
    </ng-template>

    @if (p().ruta; as ruta) {
      <a class="card tarjeta" [routerLink]="ruta"
        ><ng-container [ngTemplateOutlet]="contenido"
      /></a>
    } @else if (p().link; as link) {
      <a class="card tarjeta" [href]="link" target="_blank" rel="noopener"
        ><ng-container [ngTemplateOutlet]="contenido"
      /></a>
    } @else {
      <div class="card tarjeta"><ng-container [ngTemplateOutlet]="contenido" /></div>
    }
  `,
  styles: `
    :host {
      display: flex;
    }
    .tarjeta {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      text-decoration: none;
      color: var(--texto);
    }
    a.tarjeta:hover {
      color: var(--texto);
      border-color: var(--acento-linea);
    }
    .banner {
      border-bottom: 1px solid var(--borde);
    }
    .banner img {
      display: block;
      width: 100%;
      height: auto;
      aspect-ratio: 16 / 7;
      object-fit: cover;
      object-position: top left;
    }
    .banner.pixel {
      background: var(--pixel);
      padding: 14px 20px;
    }
    .banner.pixel img {
      aspect-ratio: auto;
      object-fit: contain;
      image-rendering: pixelated;
    }
    .cuerpo {
      flex: 1;
      padding: 18px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .cabecera {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .nombre {
      font-weight: 600;
      font-size: 16px;
      color: var(--link);
      overflow-wrap: anywhere;
    }
    .descripcion {
      flex: 1;
      font-size: 14px;
      line-height: 1.5;
      color: var(--texto-2);
    }
    .datos {
      display: flex;
      flex-wrap: wrap;
      gap: 6px 14px;
      font-size: 13px;
      color: var(--texto-3);
    }
    .datos > span {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .ok {
      color: var(--ok-texto);
    }
    .verde {
      width: 8px;
      height: 8px;
      background: var(--ok-punto);
    }
  `,
})
export class TarjetaProyecto {
  readonly p = input.required<ProyectoDestacado>();
  private readonly github = inject(GitHubDatos);

  /** Lenguaje principal según GitHub. */
  protected readonly lenguaje = computed(() => {
    const l = this.github.repo(this.p().repo)?.lenguajes[0];
    return l
      ? { color: colorLenguaje(l.nombre), texto: `${l.nombre} ${formatoPorcentaje(l.porcentaje)}` }
      : undefined;
  });
}
