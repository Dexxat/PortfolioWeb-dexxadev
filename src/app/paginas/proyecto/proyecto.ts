import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { GitHubDatos } from '../../core/github';
import { DETALLES } from '../../datos/proyectos';
import { PERFIL } from '../../datos/perfil';
import { BarraLenguajes } from '../../componentes/barra-lenguajes';
import { Icono } from '../../componentes/icono';

@Component({
  selector: 'app-proyecto',
  imports: [RouterLink, BarraLenguajes, Icono],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './proyecto.html',
  styleUrl: './proyecto.css',
})
export class ProyectoPagina {
  /** Viene de la ruta /proyectos/:slug. */
  readonly slug = input.required<string>();

  private readonly github = inject(GitHubDatos);
  private readonly router = inject(Router);
  private readonly titulo = inject(Title);

  protected readonly perfil = PERFIL;
  protected readonly p = computed(() => DETALLES.find((d) => d.slug === this.slug()));
  protected readonly repo = computed(() => this.github.repo(this.p()?.repo));

  constructor() {
    effect(() => {
      const p = this.p();
      if (!p) {
        this.router.navigateByUrl('/');
        return;
      }
      this.titulo.setTitle(`${p.nombre} · DexxaDev`);
    });
  }
}
