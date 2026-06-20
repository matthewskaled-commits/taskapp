/** Configuracion de Tailwind CSS: aqui definimos la paleta de colores
 *  propia del proyecto en vez de usar los colores genericos por defecto. */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1B2230',      // azul-grisaceo muy oscuro (texto principal, fondo header)
        slate: '#3A4356',    // azul-grisaceo medio
        paper: '#F7F5F0',    // fondo tipo "papel" (no blanco puro)
        amber: '#D98E3F',    // acento calido (vence pronto / accion principal)
        sage: '#5E8C6A',     // verde (tarea completada)
      },
      fontFamily: {
        display: ['"Source Serif 4"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
