// Pruebas automatizadas basicas de la API.
// Validan que las rutas respondan lo que deberian, sin necesidad de
// levantar el servidor manualmente ni hacer clic en nada.
const request = require('supertest');

// Mockeamos la base de datos para que las pruebas no dependan
// de tener Postgres corriendo (mas simples y rapidas de ejecutar en CI).
jest.mock('../src/db', () => ({
  pool: {
    query: jest.fn(),
  },
  initDb: jest.fn().mockResolvedValue(),
}));

const { pool } = require('../src/db');
const app = require('../src/index');

describe('API de tareas', () => {
  test('GET /health responde ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('GET /api/tareas devuelve un arreglo', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1, titulo: 'Tarea de prueba' }] });
    const res = await request(app).get('/api/tareas');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/tareas sin titulo devuelve error 400', async () => {
    const res = await request(app).post('/api/tareas').send({});
    expect(res.statusCode).toBe(400);
  });

  test('POST /api/tareas con datos validos crea la tarea', async () => {
    pool.query.mockResolvedValueOnce({
      rows: [{ id: 2, titulo: 'Estudiar para el parcial' }],
    });
    const res = await request(app)
      .post('/api/tareas')
      .send({ titulo: 'Estudiar para el parcial', materia: 'Bases de Datos' });
    expect(res.statusCode).toBe(201);
    expect(res.body.titulo).toBe('Estudiar para el parcial');
  });

  test('GET /ruta-inexistente devuelve 404', async () => {
    const res = await request(app).get('/ruta-inexistente');
    expect(res.statusCode).toBe(404);
  });
});
