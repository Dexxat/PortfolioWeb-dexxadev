import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TemaService } from '../core/tema';
import { Icono } from '../componentes/icono';

@Component({
  selector: 'app-encabezado',
  imports: [RouterLink, Icono],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header>
      <div class="contenedor barra">
        <a routerLink="/" class="marca" aria-label="DexxaDev, inicio">
          <img src="img/logo-dexxadev.png" alt="" width="40" height="40" />
          <span class="mono">DexxaDev</span>
        </a>
        <nav aria-label="Secciones">
          <a routerLink="/" fragment="sobre-mi">Sobre mí</a>
          <a routerLink="/" fragment="proyectos">Proyectos</a>
          <a routerLink="/" fragment="comercios">Webs para comercios</a>
        </nav>
        <button
          type="button"
          class="tema"
          (click)="tema.alternar()"
          [attr.aria-label]="
            tema.tema() === 'oscuro' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
          "
        >
          <app-icono [nombre]="tema.tema() === 'oscuro' ? 'sol' : 'luna'" />
        </button>
      </div>
    </header>
  `,
  styles: `
    header {
      background: var(--fondo-barra);
      border-bottom: 1px solid var(--linea);
      color: #fff;
    }
    .barra {
      display: flex;
      align-items: center;
      gap: 8px 16px;
      flex-wrap: wrap;
      padding-block: 12px;
    }
    .marca {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #fff;
      text-decoration: none;
      font-weight: 600;
      font-size: 18px;
    }
    .marca img {
      border-radius: 50%;
      background: #fff;
    }
    nav {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-left: auto;
    }
    nav a {
      color: #c3cbd9;
      text-decoration: none;
      font-size: 15px;
      padding: 12px;
    }
    nav a:hover {
      color: #fff;
    }
    .tema {
      width: 44px;
      height: 44px;
      border-radius: 8px;
      border: 1px solid #2a3a57;
      background: transparent;
      color: #e6eaf2;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    @media (max-width: 640px) {
      nav {
        order: 3;
        width: 100%;
        margin-left: -12px;
      }
      .tema {
        margin-left: auto;
      }
    }
  `,
})
export class Encabezado {
  protected readonly tema = inject(TemaService);
}
