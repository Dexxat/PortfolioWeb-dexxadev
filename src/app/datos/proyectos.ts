import { DetalleProyecto, ProyectoDestacado, WebComercio } from './modelos';

/** Tarjetas de "Proyectos destacados" en el inicio. */
export const DESTACADOS: ProyectoDestacado[] = [
  {
    nombre: 'FreeDeli',
    tipo: 'Full stack',
    descripcion:
      'Envíos entre kioscos 24 hs, riders y vecinos. Cuatro apps y una API con pruebas de punta a punta.',
    repo: 'FreeDeli-app',
    datos: ['4 apps + API', '55 commits'],
    ruta: '/proyectos/freedeli',
  },
  {
    nombre: 'Mapaladar',
    tipo: 'App',
    descripcion:
      'Mapa gastronómico de Bella Vista, con filtros por rubro, "abierto ahora" y favoritos.',
    repo: 'Mapaladar',
    datos: ['MapLibre', 'En pausa'],
    link: 'https://github.com/Dexxat/Mapaladar',
    banner: {
      src: 'img/proyectos/mapaladar-iconos.gif',
      alt: 'Íconos en pixel art de Mapaladar: taza de café, porción de pizza, sushi y corazón',
    },
  },
  {
    nombre: 'QA-Automation--Playwright',
    tipo: 'Testing',
    descripcion:
      'Pruebas automáticas de una web y una API reales, en escritorio y celular. Encontró 3 bugs.',
    repo: 'QA-Automation--Playwright',
    datos: ['58 pruebas', 'CI en verde'],
    link: 'https://github.com/Dexxat/QA-Automation--Playwright',
  },
  {
    nombre: 'TermLearn',
    tipo: 'Educación',
    descripcion:
      'Plataforma simple y minimalista para aprender los comandos esenciales de la terminal.',
    repo: 'TermLearn',
    datos: ['Terminal Linux en el navegador'],
    link: 'https://github.com/Dexxat/TermLearn',
    banner: {
      src: 'img/proyectos/termlearn.jpg',
      alt: 'TermLearn: lección sobre el comando pwd junto a una terminal Linux en el navegador',
    },
  },
  {
    nombre: 'dossier-demo',
    tipo: 'Producto',
    descripcion:
      'Prueba judicial organizada en un solo lugar, con mapa de vínculos y línea de tiempo. Caso ficticio.',
    datos: ['Demo con caso ficticio, en preparación'],
  },
];

/** Tarjetas de "Webs para comercios". */
export const WEBS: WebComercio[] = [
  {
    nombre: 'Pizzería Valerio',
    lugar: 'Bella Vista',
    descripcion: 'Menú interactivo que arma el pedido y lo manda por WhatsApp.',
    url: 'https://dexxat.github.io/Proyecto-Web-Pizzeria-Valerio/',
    captura: 'img/webs/valerio.jpg',
    alt: 'Captura de la web de Pizzería Valerio',
  },
  {
    nombre: 'Pitsa',
    lugar: 'Muñiz · somospitsa.com',
    descripcion: 'Pizzería artesanal a la piedra, con dominio propio. Hecha en Angular.',
    url: 'https://www.somospitsa.com',
    captura: 'img/webs/pitsa.jpg',
    alt: 'Captura de la web de Pitsa',
  },
  {
    nombre: 'Gurí Cafetería',
    lugar: 'Bella Vista',
    descripcion: 'Panadería con masa madre y café de especialidad.',
    url: 'https://dexxat.github.io/Proyecto-Web-Guri-Cafe/',
    captura: 'img/webs/guri.jpg',
    alt: 'Captura de la web de Gurí Cafetería',
  },
  {
    nombre: 'Fuinyter',
    lugar: 'Carapachay',
    descripcion: 'Fábrica de iluminación. La lámpara del inicio cambia entre modo día y noche.',
    url: 'https://dexxat.github.io/FUINYTER-WEB/',
    captura: 'img/webs/fuinyter.jpg',
    alt: 'Captura de la web de Fuinyter en modo noche',
  },
  {
    nombre: 'GorDough Pizza',
    lugar: 'La Plata',
    descripcion: 'Pizza estilo Nueva York, con botón de pedido siempre a mano.',
    url: 'https://dexxat.github.io/Proyecto-Web-Gordough-Pizza/',
    captura: 'img/webs/gordough.jpg',
    alt: 'Captura de la web de GorDough Pizza',
  },
  {
    nombre: 'LegDay',
    lugar: 'Buenos Aires',
    descripcion: 'Web de una entrenadora personal, con planes y galería.',
    url: 'https://dexxat.github.io/Proyecto-Web-Personal-Trainer-LegDay/',
    captura: 'img/webs/legday.jpg',
    alt: 'Captura de la web de LegDay',
  },
];

/**
 * Descripciones en español para la lista de repositorios. Si un repo no está acá,
 * se usa la descripción que tiene en GitHub.
 */
export const DESCRIPCIONES_REPOS: Record<string, string> = {
  'QA-Automation--Playwright':
    'Pruebas automáticas de UI y API con Playwright sobre la web de Valerio y la API de FreeDeli, en escritorio y celular.',
  TermLearn:
    'Plataforma para aprender los comandos esenciales de la terminal de Linux, con una terminal real en el navegador.',
  'FreeDeli-app':
    'Envíos entre kioscos 24 hs, riders y vecinos: cuatro apps en Angular y una API en NestJS con PostgreSQL.',
  'FUINYTER-WEB':
    'Sitio de Fuinyter en Angular 19, con modo día y noche que se activa desde la lámpara.',
  Mapaladar: 'Mapa gastronómico de Bella Vista con filtros por rubro, horarios y favoritos.',
  'Proyecto-Web-Pizzeria-Pitsa': 'Web de Pitsa, pizzería artesanal en Muñiz, con dominio propio.',
  'Proyecto-Web-Guri-Cafe':
    'Web de Gurí, panadería con masa madre y café de especialidad en Bella Vista.',
  'Proyecto-Web-Pizzeria-Valerio':
    'Menú interactivo que arma el pedido y lo envía por WhatsApp al local, sin necesidad de API.',
  'Proyecto-Web-Personal-Trainer-LegDay':
    'Landing de LegDay, entrenadora personal, con planes y galería.',
  'Proyecto-Web-Gordough-Pizza': 'Landing de GorDough, pizza estilo Nueva York en La Plata.',
};

/** Repos que no se muestran en la lista (por ejemplo, este mismo portfolio). */
export const REPOS_OCULTOS: string[] = ['Dexxat.github.io', 'portfolio-dexxadev'];

/** Páginas de detalle. Para sumar otro proyecto, agregá un objeto con su slug. */
export const DETALLES: DetalleProyecto[] = [
  {
    slug: 'freedeli',
    nombre: 'FreeDeli',
    repo: 'FreeDeli-app',
    tipo: 'Full stack',
    estado: 'En desarrollo',
    titulo: 'Envíos del kiosco del barrio, a cualquier hora',
    intro:
      'FreeDeli conecta kioscos 24 hs con riders y vecinos. El vecino pide desde el celular, el kiosco confirma el stock, un rider acepta el viaje y entrega con un PIN.',
    problema:
      'De madrugada, las apps de delivery grandes casi no cubren a los kioscos de barrio, y cobran comisiones altas. FreeDeli es una alternativa local, pensada para una zona chica.',
    incluye: [
      'App para quienes piden, en el celular',
      'App para kioscos, en tablet o computadora',
      'App para riders, con ofertas de viaje de 30 segundos',
      'Panel de administración para el dueño de la plataforma',
    ],
    capturas: [
      {
        src: 'img/proyectos/freedeli-usuarios.jpg',
        alt: 'App de FreeDeli para quienes piden, con un pedido en curso',
        texto: 'El vecino hace su pedido',
      },
      {
        src: 'img/proyectos/freedeli-kioscos.jpg',
        alt: 'Tablero en vivo de la app de FreeDeli para kioscos',
        texto: 'El kiosco sigue sus pedidos en vivo',
      },
      {
        src: 'img/proyectos/freedeli-riders.jpg',
        alt: 'App de FreeDeli para riders, con el estado y las zonas',
        texto: 'El rider se conecta y elige zonas',
      },
    ],
    comoFunciona: [
      {
        titulo: '4 apps en Angular',
        texto: 'PWA instalables, con una librería compartida de reglas del pedido.',
      },
      {
        titulo: 'API en NestJS',
        texto: 'PostgreSQL con Prisma, transacciones en cada paso del pedido y roles con JWT.',
      },
      {
        titulo: 'Pruebas de punta a punta',
        texto: 'Playwright abre las cuatro apps a la vez y recorre un pedido completo.',
      },
      {
        titulo: 'Despliegue con Docker',
        texto: 'Postgres, API y Caddy con HTTPS automático, en un solo servidor.',
      },
    ],
    avances: [
      { fecha: 'Dic 2026', texto: 'Demo en línea con kioscos y riders de prueba', proximo: true },
      { fecha: 'Oct 2026', texto: 'GPS, cancelaciones y pruebas de punta a punta' },
      { fecha: 'Oct 2026', texto: 'API, base de datos y las cuatro apps conectadas' },
    ],
    acerca: 'Plataforma de envíos entre kioscos 24 hs, riders y vecinos de una zona.',
    stack: ['Angular', 'NestJS', 'PostgreSQL', 'Prisma', 'Playwright', 'Docker', 'PWA'],
    numeros: [
      { etiqueta: 'Aplicaciones', valor: '4 + API' },
      { etiqueta: 'Zonas', valor: '3' },
      { etiqueta: 'Commits', valor: '55' },
      { etiqueta: 'Tiempo de oferta al rider', valor: '30 s' },
    ],
  },
];
