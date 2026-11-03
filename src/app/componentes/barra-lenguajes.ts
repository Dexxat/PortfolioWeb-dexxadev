import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Lenguaje } from '../datos/modelos';
import { colorLenguaje, formatoPorcentaje } from '../datos/lenguajes';

/** Barra de lenguajes como la de GitHub, con su leyenda. */
@Component({
  selector: 'app-barra-lenguajes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="barra" aria-hidden="true">
      @for (l of items(); track l.nombre) {
        <span [style.width.%]="l.porcentaje" [style.background]="l.color"></span>
      }
    </div>
    <ul [class.lista]="lista()">
      @for (l of items(); track l.nombre) {
        <li>
          <span class="punto" [style.background]="l.color"></span>{{ l.nombre
          }}<span class="pct">{{ l.texto }}</span>
        </li>
      }
    </ul>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .barra {
      display: flex;
      gap: 1px;
      height: 6px;
      border-radius: 999px;
      overflow: hidden;
      background: var(--borde);
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      gap: 6px 14px;
      font-size: 13px;
      color: var(--texto-3);
    }
    li {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .lista {
      flex-direction: column;
      font-size: 14px;
      color: var(--texto);
    }
    .lista .pct {
      margin-left: auto;
      color: var(--texto-3);
    }
  `,
})
export class BarraLenguajes {
  readonly lenguajes = input.required<{ nombre: string; porcentaje: number }[]>();
  /** Muestra la leyenda en columna (para barras laterales). */
  readonly lista = input(false);
  /** Lenguajes por debajo de este porcentaje se agrupan en "Otros". */
  readonly minimo = input(1);

  protected readonly items = computed(() => {
    const visibles: Lenguaje[] = [];
    let otros = 0;
    for (const l of this.lenguajes()) {
      if (l.porcentaje >= this.minimo()) visibles.push(l);
      else otros += l.porcentaje;
    }
    if (otros > 0) visibles.push({ nombre: 'Otros', porcentaje: Math.round(otros * 10) / 10 });
    return visibles.map((l) => ({
      ...l,
      color: colorLenguaje(l.nombre),
      texto: formatoPorcentaje(l.porcentaje),
    }));
  });
}
