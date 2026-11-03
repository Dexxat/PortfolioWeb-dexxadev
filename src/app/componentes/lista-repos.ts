import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GitHubDatos } from '../core/github';
import { PERFIL } from '../datos/perfil';
import { BarraLenguajes } from './barra-lenguajes';
import { Icono } from './icono';

import { fechaCorta } from './calendario';

@Component({
  selector: 'app-lista-repos',
  imports: [BarraLenguajes, Icono],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="card">
      @for (r of github.repos(); track r.nombre) {
        <li>
          <div class="fila">
            <a
              class="nombre mono"
              [href]="perfil.github + '/' + r.nombre"
              target="_blank"
              rel="noopener"
              >{{ r.nombre }}</a
            >
            <span class="meta">
              @if (r.web) {
                <a class="vivo" [href]="r.web" target="_blank" rel="noopener"
                  >Ver en vivo <app-icono nombre="externo" [tam]="14"
                /></a>
              }
              <span class="fecha">Actualizado el {{ fecha(r.actualizado) }}</span>
            </span>
          </div>
          @if (r.descripcion) {
            <p>{{ r.descripcion }}</p>
          }
          @if (r.lenguajes.length) {
            <app-barra-lenguajes [lenguajes]="r.lenguajes" />
          }
        </li>
      } @empty {
        <li><p>Cargando repositorios…</p></li>
      }
    </ul>
  `,
  styles: `
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      overflow: hidden;
    }
    li {
      padding: 16px 20px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    li + li {
      border-top: 1px solid var(--linea);
    }
    .fila {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px 16px;
    }
    .meta {
      display: flex;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 4px 16px;
    }
    .nombre {
      font-weight: 600;
      font-size: 15px;
      text-decoration: none;
      overflow-wrap: anywhere;
    }
    .fecha {
      font-size: 13px;
      color: var(--texto-4);
      white-space: nowrap;
    }
    p {
      font-size: 14px;
      line-height: 1.5;
      color: var(--texto-2);
    }
    .vivo {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
    }
  `,
})
export class ListaRepos {
  protected readonly github = inject(GitHubDatos);
  protected readonly perfil = PERFIL;

  protected readonly fecha = fechaCorta;
}
