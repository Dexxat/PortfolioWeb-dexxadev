import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Encabezado } from './layout/encabezado';
import { Pie } from './layout/pie';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Encabezado, Pie],
  template: `
    <a class="saltar" href="#contenido">Saltar al contenido</a>
    <app-encabezado />
    <div id="contenido">
      <router-outlet />
    </div>
    <app-pie />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    #contenido {
      flex: 1;
    }
    .saltar {
      position: absolute;
      left: 16px;
      top: -60px;
      z-index: 50;
      padding: 10px 14px;
      background: var(--acento);
      color: #fff;
      border-radius: 8px;
    }
    .saltar:focus {
      top: 12px;
    }
  `,
})
export class App {}
