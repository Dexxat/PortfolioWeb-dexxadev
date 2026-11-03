/** Tipos de los datos del portfolio. */

export interface Lenguaje {
  nombre: string;
  porcentaje: number;
}

export interface RepoGitHub {
  nombre: string;
  descripcion: string | null;
  web: string | null;
  actualizado: string; // AAAA-MM-DD
  lenguajes: Lenguaje[];
}

export interface DatosRepos {
  usuario: string;
  actualizado: string;
  repos: RepoGitHub[];
}

export interface DiaActividad {
  fecha: string; // AAAA-MM-DD
  cantidad: number;
  nivel: 0 | 1 | 2 | 3 | 4;
}

export interface DatosActividad {
  usuario: string;
  actualizado: string;
  total: number;
  dias: DiaActividad[];
}

export interface ProyectoDestacado {
  nombre: string;
  tipo: string;
  descripcion: string;
  /** Nombre del repo en GitHub, para tomar su lenguaje principal. */
  repo?: string;
  datos: string[];
  /** Ruta interna (página propia) o link externo. */
  ruta?: string;
  link?: string;
  banner?: { src: string; alt: string };
}

export interface WebComercio {
  nombre: string;
  lugar: string;
  descripcion: string;
  url: string;
  captura: string;
  alt: string;
}

export interface DetalleProyecto {
  slug: string;
  nombre: string;
  repo: string;
  tipo: string;
  estado: string;
  titulo: string;
  intro: string;
  problema: string;
  incluye: string[];
  capturas: { src: string; alt: string; texto: string }[];
  comoFunciona: { titulo: string; texto: string }[];
  avances: { fecha: string; texto: string; proximo?: boolean }[];
  acerca: string;
  demo?: string;
  stack: string[];
  numeros: { etiqueta: string; valor: string }[];
}
