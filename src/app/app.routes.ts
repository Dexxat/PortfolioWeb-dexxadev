import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'José María Lago · DexxaDev',
    loadComponent: () => import('./paginas/inicio/inicio').then((m) => m.Inicio),
  },
  {
    path: 'proyectos/:slug',
    loadComponent: () => import('./paginas/proyecto/proyecto').then((m) => m.ProyectoPagina),
  },
  { path: '**', redirectTo: '' },
];
