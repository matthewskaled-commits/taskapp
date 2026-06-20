// Punto de entrada del backend.
// Aqui se arma el servidor Express: middlewares, rutas, metricas, y arranque.
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initDb } = require('./db');
const tareasRouter = require('./routes/tareas');
const { register, metricsMiddleware } = require('./metrics');

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares globales
app.use(cors()); // Permite que el frontend (otro dominio/puerto) consuma la API
app.use(express.json()); // Permite leer JSON en el body de las peticiones
app.use(metricsMiddleware); // Cuenta cada peticion para Prometheus

// Ruta de salud (la usan Docker/Kubernetes para saber si el servicio esta vivo)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', servicio: 'taskapp-backend' });
});

// Ruta de metricas que Prometheus va a consultar periodicamente
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Rutas de la API
app.use('/api/tareas', tareasRouter);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Arranque: primero se asegura que la tabla exista, despues levanta el servidor.
// Reintenta la conexion a la base de datos por si Postgres tarda en estar listo
// (algo comun cuando todo arranca junto con docker-compose).
async function start() {
  let intentos = 0;
  while (intentos < 10) {
    try {
      await initDb();
      console.log('Conexion a la base de datos exitosa.');
      break;
    } catch (err) {
      intentos += 1;
      console.log(`Esperando a la base de datos... intento ${intentos}`);
      await new Promise((r) => setTimeout(r, 3000));
    }
  }
  app.listen(PORT, () => {
    console.log(`Backend escuchando en el puerto ${PORT}`);
  });
}

start();

module.exports = app;
