# Portfolio · DexxaDev

Portfolio de José María Lago (Dexxa), desarrollador web full stack. Diseño inspirado en GitHub, como homenaje, en modo oscuro con opción de modo claro.

Hecho con **Angular 22** (componentes standalone, signals, `httpResource`, control de flujo `@if` / `@for`) y sin librerías de UI.

## Qué tiene

- **Inicio:** perfil, LEEME con la imagen 8 bits que se convierte en video al pasar el cursor, proyectos destacados, todos los repositorios con sus lenguajes, webs para comercios, calendario de actividad y "Sobre mí".
- **Página de proyecto** (`/proyectos/freedeli`): descripción, capturas, cómo funciona, avances, stack y lenguajes.
- **Datos reales de GitHub:** la actividad y los repositorios se descargan con `scripts/actualizar-github.mjs` y se actualizan solos todos los días al publicar.
- **Modo claro y oscuro**, recordado en el navegador.
- **Accesible:** navegación con teclado, textos alternativos, contraste suficiente y diseño adaptable a celular.

## Correrlo en tu compu

Requiere Node 22 o superior.

```bash
npm install
npm start          # http://localhost:4200
npm test           # pruebas unitarias
npm run build      # versión de producción en dist/
```

## Publicarlo en GitHub Pages

1. Creá un repo en GitHub. Si lo llamás **`Dexxat.github.io`**, el sitio queda en `https://dexxat.github.io`. Con otro nombre (por ejemplo `portfolio`), queda en `https://dexxat.github.io/portfolio/`. El workflow ajusta la ruta solo.
2. Subí el proyecto:
   ```bash
   git init -b main
   git add .
   git commit -m "Portfolio en Angular"
   git remote add origin https://github.com/Dexxat/Dexxat.github.io.git
   git push -u origin main
   ```
3. En el repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. En la pestaña **Actions** vas a ver el workflow "Publicar portfolio". Cuando termine en verde, el sitio está en línea.

A partir de ahí se publica en cada `git push` y, además, todos los días a las 3 AM para actualizar la actividad. También se puede correr a mano desde **Actions → Publicar portfolio → Run workflow**.

### Actividad privada (opcional)

Con el token que trae GitHub Actions, el calendario cuenta tu actividad pública. Para que también sume la privada:

1. Creá un token en **GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens**, con acceso de solo lectura a tu perfil.
2. Guardalo en el repo en **Settings → Secrets and variables → Actions → New repository secret** con el nombre `ACTIVIDAD_TOKEN`.

El token queda guardado en GitHub y nunca llega a la página.

## Dónde editar cada cosa

| Qué | Archivo |
|---|---|
| Nombre, bio, links, WhatsApp, tecnologías, herramientas de IA, logro | `src/app/datos/perfil.ts` |
| Proyectos destacados, webs para comercios, descripciones de repos | `src/app/datos/proyectos.ts` |
| Páginas de detalle de proyectos | `DETALLES` en `src/app/datos/proyectos.ts` |
| Colores y tipografía (modo oscuro y claro) | `src/styles.css` |
| Imágenes y video | `public/img/`, `public/video/` |
| Datos de GitHub (se regeneran solos) | `public/data/` |

Para sumar otra página de proyecto, agregá un objeto a `DETALLES` con su `slug` y poné `ruta: '/proyectos/<slug>'` en su tarjeta de `DESTACADOS`.

## Estructura

```
src/app/
├── core/          Servicios: datos de GitHub y tema claro/oscuro
├── datos/         Textos y datos del portfolio (lo que más vas a editar)
├── layout/        Encabezado y pie
├── componentes/   Perfil, tarjetas, actividad, repos, video 8 bits, barra de lenguajes
└── paginas/       Inicio y página de proyecto
scripts/           Descarga de datos de GitHub
.github/workflows/ Publicación en GitHub Pages
```

## Créditos

- Tipografías IBM Plex Sans e IBM Plex Mono (SIL Open Font License), incluidas con `@fontsource`.
- El logo usa a Tux, creado por Larry Ewing con The GIMP.
- Diseño inspirado en GitHub, como homenaje. No está afiliado a GitHub.
