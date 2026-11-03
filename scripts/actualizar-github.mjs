// Descarga tu actividad y tus repositorios de GitHub y los guarda en public/data/.
// Lo corre GitHub Actions antes de cada publicación; también podés correrlo a mano:
//
//   GITHUB_TOKEN=tu_token npm run github
//
// Sin token se actualizan solo los repositorios (la API pública lo permite) y la
// actividad queda como estaba. Si algo falla, se conservan los datos anteriores
// y el sitio se publica igual.

import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const USUARIO = process.env.GITHUB_USUARIO || 'Dexxat';
const TOKEN = process.env.GITHUB_TOKEN || '';
const CARPETA = new URL('../public/data/', import.meta.url);

const NIVELES = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

/** Fecha de hoy en Buenos Aires, como AAAA-MM-DD. */
export const hoy = () =>
  new Date().toLocaleDateString('sv-SE', { timeZone: 'America/Argentina/Buenos_Aires' });

/** Calendario de la API GraphQL → formato de public/data/actividad.json. */
export function transformarCalendario(calendario, usuario = USUARIO, fecha = hoy()) {
  const dias = calendario.weeks.flatMap((s) =>
    s.contributionDays.map((d) => ({
      fecha: d.date,
      cantidad: d.contributionCount,
      nivel: NIVELES[d.contributionLevel] ?? 0,
    })),
  );
  return { usuario, actualizado: fecha, total: calendario.totalContributions, dias };
}

/** Bytes por lenguaje → porcentajes con un decimal, de mayor a menor. */
export function porcentajes(bytes) {
  const total = Object.values(bytes).reduce((a, b) => a + b, 0);
  if (!total) return [];
  return Object.entries(bytes)
    .map(([nombre, b]) => ({ nombre, porcentaje: Math.round((b * 1000) / total) / 10 }))
    .sort((a, b) => b.porcentaje - a.porcentaje);
}

async function api(url, opciones = {}) {
  const res = await fetch(url, {
    ...opciones,
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'portfolio-dexxadev',
      ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
      ...opciones.headers,
    },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} en ${url}`);
  return res.json();
}

async function actualizarActividad() {
  if (!TOKEN) {
    console.log('· Actividad: sin GITHUB_TOKEN, se mantiene la anterior.');
    return;
  }
  const query = `query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks { contributionDays { date contributionCount contributionLevel } }
        }
      }
    }
  }`;
  const r = await api('https://api.github.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { login: USUARIO } }),
  });
  if (r.errors?.length) throw new Error(r.errors.map((e) => e.message).join('; '));
  const datos = transformarCalendario(r.data.user.contributionsCollection.contributionCalendar);
  await writeFile(new URL('actividad.json', CARPETA), JSON.stringify(datos));
  console.log(`✓ Actividad: ${datos.total} contribuciones.`);
}

async function actualizarRepos() {
  const lista = await api(
    `https://api.github.com/users/${USUARIO}/repos?per_page=100&type=owner&sort=pushed`,
  );
  const repos = [];
  for (const r of lista.filter((r) => !r.fork && !r.private && !r.archived)) {
    const bytes = await api(r.languages_url);
    repos.push({
      nombre: r.name,
      descripcion: r.description,
      web:
        r.homepage ||
        (r.has_pages ? `https://${USUARIO.toLowerCase()}.github.io/${r.name}/` : null),
      actualizado: r.pushed_at.slice(0, 10),
      lenguajes: porcentajes(bytes),
    });
  }
  await writeFile(
    new URL('repos.json', CARPETA),
    JSON.stringify({ usuario: USUARIO, actualizado: hoy(), repos }, null, 1),
  );
  console.log(`✓ Repositorios: ${repos.length}.`);
}

async function seguro(nombre, tarea) {
  try {
    await tarea();
  } catch (e) {
    console.warn(
      `! ${nombre}: no se pudo actualizar (${e.message}). Se mantienen los datos anteriores.`,
    );
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await readFile(new URL('repos.json', CARPETA)); // confirma que la carpeta existe
  await seguro('Actividad', actualizarActividad);
  await seguro('Repositorios', actualizarRepos);
}
