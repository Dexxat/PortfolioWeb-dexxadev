import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PERFIL, linkWhatsapp } from '../datos/perfil';
import { Icono } from './icono';

@Component({
  selector: 'app-perfil-lateral',
  imports: [Icono],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <img
      class="foto"
      src="img/foto-perfil.jpg"
      [alt]="'Foto de ' + p.nombre"
      width="280"
      height="280"
    />
    <div>
      <h1>{{ p.nombre }}</h1>
      <p class="usuario mono">{{ p.usuario }}</p>
    </div>
    <span class="chip estado"><span class="punto"></span>{{ p.estado }}</span>
    <p class="bio">{{ p.bio }}</p>
    <a class="boton boton--primario" [href]="whatsapp" target="_blank" rel="noopener">
      <app-icono nombre="whatsapp" />Escribime por WhatsApp
    </a>
    <ul class="datos">
      <li><app-icono nombre="ubicacion" [tam]="16" />{{ p.ubicacion }}</li>
      <li><app-icono nombre="estudios" [tam]="16" />{{ p.estudios }}</li>
      <li>
        <app-icono nombre="codigo" [tam]="16" /><a [href]="p.github" target="_blank" rel="noopener"
          >github.com/{{ p.usuario }}</a
        >
      </li>
    </ul>

    <section aria-labelledby="t-tecnologias">
      <h2 id="t-tecnologias">Tecnologías que uso</h2>
      <div class="chips">
        @for (t of p.tecnologias; track t) {
          <span class="chip">{{ t }}</span>
        }
      </div>
    </section>

    <section aria-labelledby="t-ia">
      <h2 id="t-ia">Herramientas de IA</h2>
      <p class="nota">
        Las uso para desarrollar y para pruebas de punta a punta, siempre revisando el resultado.
      </p>
      <div class="chips">
        @for (h of p.herramientasIa; track h) {
          <span class="chip ia">{{ h }}</span>
        }
      </div>
    </section>

    <section aria-labelledby="t-logros">
      <h2 id="t-logros">Logros en GitHub</h2>
      <a class="logro" [href]="p.logro.link" target="_blank" rel="noopener">
        <span class="medalla"><app-icono nombre="tiburon" [tam]="24" /></span>
        <span>
          <strong>{{ p.logro.nombre }}</strong>
          <small>{{ p.logro.texto }}</small>
        </span>
      </a>
    </section>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .foto {
      width: 100%;
      max-width: 280px;
      height: auto;
      aspect-ratio: 1;
      object-fit: cover;
      border-radius: 50%;
      border: 2px solid var(--borde);
    }
    h1 {
      font-size: 26px;
      font-weight: 700;
      line-height: 1.2;
      color: var(--texto-fuerte);
    }
    .usuario {
      margin-top: 4px;
      font-size: 17px;
      color: var(--texto-4);
    }
    .estado {
      align-self: flex-start;
      background: var(--ok-fondo);
      color: var(--ok-texto);
    }
    .estado .punto {
      width: 8px;
      height: 8px;
      background: var(--ok-punto);
    }
    .bio {
      line-height: 1.55;
    }
    .datos {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
      font-size: 15px;
      color: var(--texto-2);
    }
    .datos li {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    section {
      border-top: 1px solid var(--borde);
      padding-top: 16px;
    }
    h2 {
      font-size: 15px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    .nota {
      margin: -6px 0 10px;
      font-size: 13px;
      color: var(--texto-3);
      line-height: 1.45;
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .ia {
      background: var(--ia-fondo);
      color: var(--ia-texto);
    }
    .logro {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: var(--texto);
      background: var(--tarjeta);
      border: 1px solid var(--borde);
      border-radius: 10px;
      padding: 12px 14px;
    }
    .logro:hover {
      color: var(--texto);
      border-color: var(--acento-linea);
    }
    .medalla {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--act-1);
      color: var(--act-4);
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 auto;
    }
    [data-tema='claro'] .medalla {
      background: var(--ia-fondo);
      color: var(--ia-texto);
    }
    .logro strong {
      display: block;
      font-size: 15px;
    }
    .logro small {
      display: block;
      font-size: 13px;
      color: var(--texto-3);
      line-height: 1.4;
    }
  `,
})
export class PerfilLateral {
  protected readonly p = PERFIL;
  protected readonly whatsapp = linkWhatsapp();
}
