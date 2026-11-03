/** Datos personales. Editá acá tus textos, links y tecnologías. */
export const PERFIL = {
  nombre: 'José María Lago',
  usuario: 'Dexxat',
  apodo: 'Dexxa',
  estado: 'Disponible para proyectos',
  bio: 'Desarrollador web full stack. Hago sitios para comercios y sistemas completos con Angular, NestJS y .NET.',
  ubicacion: 'Bella Vista, Buenos Aires',
  estudios: 'Tec. en Programación · UTN',
  github: 'https://github.com/Dexxat',
  // Número en formato internacional, sin "+" ni espacios.
  whatsapp: '5491159558216',
  mensajeWhatsapp: 'Hola Dexxa, vi tu portfolio y quería consultarte por una web.',
  tecnologias: [
    'Angular',
    'TypeScript',
    'NestJS',
    'C# / .NET',
    'PostgreSQL',
    'Playwright',
    'Docker',
    'C++',
  ],
  herramientasIa: ['Claude Code', 'Antigravity'],
  logro: {
    nombre: 'Pull Shark',
    texto: 'Insignia de GitHub por pull requests aceptados · desde el 16 oct 2026',
    link: 'https://github.com/Dexxat?tab=achievements',
  },
  saludo: 'Hola, soy José María, me dicen Dexxa',
  presentacion: [
    'Desarrollo webs para comercios gastronómicos y marcas locales, con menús interactivos y pedidos por WhatsApp, y productos propios de punta a punta: frontend, API, base de datos, pruebas y despliegue.',
  ],
  sobreMi: [
    'Estudio la Tecnicatura en Programación en la UTN. Trabajo con principios SOLID, patrones de diseño y código limpio, y pruebo cada proyecto de punta a punta antes de entregarlo.',
    'Me importa que cada sitio funcione bien y tenga identidad propia: una base sólida y un detalle que lo haga memorable.',
  ],
};

export const linkWhatsapp = (texto = PERFIL.mensajeWhatsapp) =>
  `https://wa.me/${PERFIL.whatsapp}?text=${encodeURIComponent(texto)}`;
