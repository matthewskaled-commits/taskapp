import React, { useEffect, useState } from 'react';
import { api } from './api.js';
import FormularioTarea from './components/FormularioTarea.jsx';
import TarjetaTarea from './components/TarjetaTarea.jsx';

export default function App() {
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState('todas'); // todas | pendientes | completadas

  useEffect(() => {
    cargarTareas();
  }, []);

  async function cargarTareas() {
    setCargando(true);
    setError(null);
    try {
      const datos = await api.listarTareas();
      setTareas(datos);
    } catch (err) {
      setError('No se pudo conectar con la API. Verifica que el backend este corriendo.');
    } finally {
      setCargando(false);
    }
  }

  async function crearTarea(nuevaTarea) {
    const creada = await api.crearTarea(nuevaTarea);
    setTareas((prev) => [creada, ...prev]);
  }

  async function alternarCompletada(tarea) {
    const actualizada = await api.actualizarTarea(tarea.id, { completada: !tarea.completada });
    setTareas((prev) => prev.map((t) => (t.id === tarea.id ? actualizada : t)));
  }

  async function eliminarTarea(id) {
    await api.eliminarTarea(id);
    setTareas((prev) => prev.filter((t) => t.id !== id));
  }

  const tareasFiltradas = tareas.filter((t) => {
    if (filtro === 'pendientes') return !t.completada;
    if (filtro === 'completadas') return t.completada;
    return true;
  });

  const pendientes = tareas.filter((t) => !t.completada).length;

  return (
    <div className="min-h-screen bg-paper">
      <header className="bg-ink text-paper">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <h1 className="font-display text-3xl">TaskApp</h1>
          <p className="text-paper/70 mt-1">Gestion de tareas academicas</p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <FormularioTarea onCrear={crearTarea} />

        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl text-ink">
            Tus tareas{' '}
            <span className="text-slate font-body text-sm font-normal">
              ({pendientes} pendiente{pendientes !== 1 ? 's' : ''})
            </span>
          </h2>

          <div role="group" aria-label="Filtrar tareas" className="flex gap-1 bg-white rounded-lg border border-slate/15 p-1 text-sm">
            {[
              { id: 'todas', label: 'Todas' },
              { id: 'pendientes', label: 'Pendientes' },
              { id: 'completadas', label: 'Completadas' },
            ].map((opcion) => (
              <button
                key={opcion.id}
                onClick={() => setFiltro(opcion.id)}
                aria-pressed={filtro === opcion.id}
                className={`px-3 py-1 rounded-md transition-colors ${
                  filtro === opcion.id ? 'bg-ink text-paper' : 'text-slate hover:bg-paper'
                }`}
              >
                {opcion.label}
              </button>
            ))}
          </div>
        </div>

        {cargando && <p className="text-slate">Cargando tareas...</p>}

        {error && (
          <p role="alert" className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
            {error}
          </p>
        )}

        {!cargando && !error && tareasFiltradas.length === 0 && (
          <p className="text-slate text-center py-12">
            No hay tareas {filtro !== 'todas' ? filtro : ''} todavia.
          </p>
        )}

        <ul className="flex flex-col gap-3" aria-live="polite">
          {tareasFiltradas.map((tarea) => (
            <TarjetaTarea
              key={tarea.id}
              tarea={tarea}
              onToggle={alternarCompletada}
              onEliminar={eliminarTarea}
            />
          ))}
        </ul>
      </main>

      <footer className="text-center text-slate/60 text-sm py-8">
        TaskApp &mdash; Matthews Kaled Aguilar Espinoza &mdash; ISAM
      </footer>
    </div>
  );
}
