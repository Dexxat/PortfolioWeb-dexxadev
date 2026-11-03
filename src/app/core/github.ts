import { Injectable, computed } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { DatosActividad, DatosRepos, RepoGitHub } from '../datos/modelos';
import { DESCRIPCIONES_REPOS, REPOS_OCULTOS } from '../datos/proyectos';

/**
 * Lee los datos de GitHub que genera scripts/actualizar-github.mjs
 * (public/data/*.json). En GitHub Actions se regeneran antes de cada publicación.
 */
@Injectable({ providedIn: 'root' })
export class GitHubDatos {
  readonly actividad = httpResource<DatosActividad>(() => 'data/actividad.json');
  private readonly reposCrudos = httpResource<DatosRepos>(() => 'data/repos.json');

  /** Repos públicos con la descripción en español cuando la hay. */
  readonly repos = computed<RepoGitHub[]>(() =>
    (this.reposCrudos.value()?.repos ?? [])
      .filter((r) => !REPOS_OCULTOS.includes(r.nombre))
      .map((r) => ({ ...r, descripcion: DESCRIPCIONES_REPOS[r.nombre] ?? r.descripcion })),
  );

  repo(nombre: string | undefined) {
    return nombre ? this.repos().find((r) => r.nombre === nombre) : undefined;
  }
}
