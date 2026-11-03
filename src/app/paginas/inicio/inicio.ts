import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GitHubDatos } from '../../core/github';
import { PERFIL, linkWhatsapp } from '../../datos/perfil';
import { DESTACADOS, WEBS } from '../../datos/proyectos';
import { PerfilLateral } from '../../componentes/perfil-lateral';
import { VideoOchobits } from '../../componentes/video-ochobits';
import { TarjetaProyecto } from '../../componentes/tarjeta-proyecto';
import { TarjetaWeb } from '../../componentes/tarjeta-web';
import { ListaRepos } from '../../componentes/lista-repos';
import { Actividad } from '../../componentes/actividad';
import { Icono } from '../../componentes/icono';

@Component({
  selector: 'app-inicio',
  imports: [
    RouterLink,
    PerfilLateral,
    VideoOchobits,
    TarjetaProyecto,
    TarjetaWeb,
    ListaRepos,
    Actividad,
    Icono,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
  protected readonly perfil = PERFIL;
  protected readonly destacados = DESTACADOS;
  protected readonly webs = WEBS;
  protected readonly whatsappLocal = linkWhatsapp('Hola Dexxa, tengo un local y quiero una web.');
  private readonly github = inject(GitHubDatos);
  protected readonly cantidadRepos = computed(() => this.github.repos().length);

  // Plegados por defecto; un link directo a #todos los muestra abiertos.
  protected readonly reposAbiertos = signal(inject(ActivatedRoute).snapshot.fragment === 'todos');

  protected alCambiarRepos(evento: Event) {
    this.reposAbiertos.set((evento.target as HTMLDetailsElement).open);
  }
}
