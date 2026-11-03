import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GitHubDatos } from '../core/github';
import { PERFIL } from '../datos/perfil';
import { armarSemanas, fechaCorta } from './calendario';

@Component({
  selector: 'app-actividad',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (datos(); as d) {
      <div>
        <h2>{{ d.total }} contribuciones en el último año</h2>
        <p class="bajada">
          Mi actividad real en GitHub: commits, pull requests e issues. Cada cuadrado es un día;
          cuanto más brillante, más trabajo ese día.
        </p>
      </div>
      <div class="scroll">
        <div class="calendario" role="img" [attr.aria-label]="resumen()">
          <div class="meses" aria-hidden="true">
            @for (s of semanas(); track $index) {
              <span>{{ s.mes }}</span>
            }
          </div>
          <div class="grilla">
            @for (s of semanas(); track $index) {
              <div class="columna">
                @for (dia of s.dias; track $index) {
                  @if (dia) {
                    <span
                      class="cuadro"
                      [class]="'cuadro n' + dia.nivel"
                      [title]="dia.etiqueta"
                    ></span>
                  } @else {
                    <span class="cuadro vacio"></span>
                  }
                }
              </div>
            }
          </div>
        </div>
      </div>
      <div class="pie">
        <a [href]="github" target="_blank" rel="noopener">Ver mi perfil en GitHub</a>
        <span class="escala" aria-hidden="true">
          Menos
          <span class="cuadro n0"></span><span class="cuadro n1"></span
          ><span class="cuadro n2"></span><span class="cuadro n3"></span
          ><span class="cuadro n4"></span>
          Más
        </span>
      </div>
      <p class="actualizado">Actualizado el {{ fecha(d.actualizado) }}</p>
    } @else if (estado.error()) {
      <p class="bajada">No se pudo cargar la actividad de GitHub.</p>
    } @else {
      <p class="bajada">Cargando actividad…</p>
    }
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: 20px 24px;
    }
    h2 {
      font-size: 17px;
      font-weight: 600;
      margin-bottom: 4px;
    }
    .bajada {
      font-size: 14px;
      line-height: 1.5;
    }
    .scroll {
      overflow-x: auto;
    }
    .calendario {
      display: flex;
      flex-direction: column;
      gap: 6px;
      width: max-content;
    }
    .meses,
    .grilla {
      display: flex;
      gap: 3px;
    }
    .meses span {
      width: 11px;
      height: 14px;
      font-size: 11px;
      color: var(--texto-3);
      white-space: nowrap;
      overflow: visible;
    }
    .columna {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .cuadro {
      display: inline-block;
      width: 11px;
      height: 11px;
      border-radius: 2px;
    }
    .vacio {
      background: transparent;
    }
    .n0 {
      background: var(--act-0);
    }
    .n1 {
      background: var(--act-1);
    }
    .n2 {
      background: var(--act-2);
    }
    .n3 {
      background: var(--act-3);
    }
    .n4 {
      background: var(--act-4);
    }
    .pie {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px;
      font-size: 13px;
    }
    .escala {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: var(--texto-3);
    }
    .actualizado {
      font-size: 12px;
      color: var(--texto-4);
    }
  `,
})
export class Actividad {
  protected readonly estado = inject(GitHubDatos).actividad;
  protected readonly github = PERFIL.github;
  protected readonly fecha = fechaCorta;
  protected readonly datos = computed(() =>
    this.estado.hasValue() ? this.estado.value() : undefined,
  );
  protected readonly semanas = computed(() => armarSemanas(this.datos()?.dias ?? []));
  protected readonly resumen = computed(() => {
    const d = this.datos();
    if (!d) return '';
    const activos = d.dias.filter((x) => x.cantidad > 0).length;
    return `Calendario de actividad en GitHub: ${d.total} contribuciones en ${activos} días del último año.`;
  });
}
