// Centralizamos aqui todas las llamadas a la API.
// Si manana cambia la URL del backend, solo se edita en un lugar (.env).
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

async function manejarRespuesta(res) {
  if (!res.ok) {
    const cuerpo = await res.json().catch(() => ({}));
    throw new Error(cuerpo.error || `Error ${res.status}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  listarTareas: () => fetch(`${API_URL}/api/tareas`).then(manejarRespuesta),

  crearTarea: (tarea) =>
    fetch(`${API_URL}/api/tareas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tarea),
    }).then(manejarRespuesta),

  actualizarTarea: (id, cambios) =>
    fetch(`${API_URL}/api/tareas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cambios),
    }).then(manejarRespuesta),

  eliminarTarea: (id) =>
    fetch(`${API_URL}/api/tareas/${id}`, { method: 'DELETE' }).then(manejarRespuesta),
};
