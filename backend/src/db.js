// Conexion a la base de datos PostgreSQL.
// Usamos "pg" (node-postgres) y un "Pool" para reutilizar conexiones,
// en vez de abrir/cerrar una conexion en cada consulta (mas eficiente).
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'taskapp',
  password: process.env.DB_PASSWORD || 'taskapp123',
  database: process.env.DB_NAME || 'taskapp_db',
});

// Crea la tabla "tareas" si todavia no existe.
// Esto permite que el contenedor "arranque listo" sin pasos manuales.
async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tareas (
      id SERIAL PRIMARY KEY,
      titulo VARCHAR(150) NOT NULL,
      descripcion TEXT,
      materia VARCHAR(100),
      fecha_entrega DATE,
      completada BOOLEAN DEFAULT FALSE,
      creada_en TIMESTAMP DEFAULT NOW()
    );
  `);
}

module.exports = { pool, initDb };
