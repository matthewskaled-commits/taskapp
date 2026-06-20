import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuracion de Vite: el "motor" que compila y sirve el frontend en desarrollo.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true, // necesario para que funcione dentro de un contenedor Docker
  },
});
