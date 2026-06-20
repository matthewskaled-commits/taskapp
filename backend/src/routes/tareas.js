// Aqui viven las rutas de la API: Crear, Leer, Actualizar y Borrar tareas (CRUD).
// Cada funcion es "async" porque consulta la base de datos, lo cual toma tiempo.
const express = require('express');
const { pool } = require('../db');

const router = express.Router();

// Validacion simple de entrada (seguridad basica: no confiar en lo que envia el cliente)
function validarTarea(body) {
  const errores = [];
  if (!body.titulo || typeof body.titulo !== 'string' || body.titulo.trim().length === 0) {
    errores.push('El titulo es obligatorio.');
  }
  if (body.titulo && body.titulo.length > 150) {
    errores.push('El titulo no puede superar 150 caracteres.');
  }
  return errores;
}

// GET /api/tareas -> lista todas las tareas
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tareas ORDER BY creada_en DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener tareas', detalle: err.message });
  }
});

// GET /api/tareas/:id -> obtiene una tarea puntual
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tareas WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener la tarea', detalle: err.message });
  }
});

// POST /api/tareas -> crea una tarea nueva
router.post('/', async (req, res) => {
  const errores = validarTarea(req.body);
  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }
  const { titulo, descripcion, materia, fecha_entrega } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO tareas (titulo, descripcion, materia, fecha_entrega)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [titulo, descripcion || null, materia || null, fecha_entrega || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear la tarea', detalle: err.message });
  }
});

// PUT /api/tareas/:id -> actualiza una tarea (incluye marcar como completada)
router.put('/:id', async (req, res) => {
  const { titulo, descripcion, materia, fecha_entrega, completada } = req.body;
  try {
    const result = await pool.query(
      `UPDATE tareas SET
        titulo = COALESCE($1, titulo),
        descripcion = COALESCE($2, descripcion),
        materia = COALESCE($3, materia),
        fecha_entrega = COALESCE($4, fecha_entrega),
        completada = COALESCE($5, completada)
       WHERE id = $6 RETURNING *`,
      [titulo, descripcion, materia, fecha_entrega, completada, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar la tarea', detalle: err.message });
  }
});

// DELETE /api/tareas/:id -> elimina una tarea
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM tareas WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar la tarea', detalle: err.message });
  }
});

module.exports = router;
