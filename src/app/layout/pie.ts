import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PERFIL } from '../datos/perfil';

@Component({
  selector: 'app-pie',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer id="contacto">
      <div class="contenedor fila">
        <span>© {{ anio }} {{ perfil.nombre }} · DexxaDev</span>
        <span
          >Diseño inspirado en GitHub, como homenaje · Tux por Larry Ewing, hecho con The GIMP</span
        >
      </div>
    </footer>
  `,
  styles: `
    footer {
      border-top: 1px solid var(--linea);
      background: var(--fondo-barra);
      color: #95a1b5;
      font-size: 13px;
    }
    .fila {
      display: flex;
      flex-wrap: wrap;
      gap: 12px 24px;
      justify-content: space-between;
      padding-block: 24px;
    }
  `,
})
export class Pie {
  protected readonly perfil = PERFIL;
  protected readonly anio = new Date().getFullYear();
}
