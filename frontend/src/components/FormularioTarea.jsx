import React, { useState } from 'react';

export default function FormularioTarea({ onCrear }) {
  const [titulo, setTitulo] = useState('');
  const [materia, setMateria] = useState('');
  const [fecha, setFecha] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState(null);

  async function manejarEnvio(e) {
    e.preventDefault();
    if (!titulo.trim()) {
      setError('Escribe un titulo para la tarea.');
      return;
    }
    setEnviando(true);
    setError(null);
    try {
      await onCrear({ titulo, materia, fecha_entrega: fecha || null });
      setTitulo('');
      setMateria('');
      setFecha('');
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form
      onSubmit={manejarEnvio}
      className="bg-white rounded-xl shadow-sm border border-slate/10 p-5 mb-8"
      aria-label="Crear nueva tarea"
    >
      <h2 className="font-display text-lg text-ink mb-4">Nueva tarea</h2>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="sm:col-span-3">
          <label htmlFor="titulo" className="block text-sm font-medium text-slate mb-1">
            Titulo
          </label>
          <input
            id="titulo"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ej. Leer capitulo 4 de Bases de Datos"
            className="w-full rounded-lg border border-slate/20 px-3 py-2 text-ink focus:outline-none focus:ring-2 focus:ring-amber"
          />
        </div>

        <div>
          <label htmlFor="materia" className="block text-sm font-medium text-slate mb-1">
            Materia
          </label>
          <input
            id="materia"
            type="text"
            value={materia}
            onChange={(e) => setMateria(e.target.value)}
            placeholder="Ej. Desarrollo Web"
            className="w-full rounded-lg border border-slate/20 px-3 py-2 text-ink focus:outline-none focus:ring-2 focus:ring-amber"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="fecha" className="block text-sm font-medium text-slate mb-1">
            Fecha de entrega
          </label>
          <input
            id="fecha"
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="w-full rounded-lg border border-slate/20 px-3 py-2 text-ink focus:outline-none focus:ring-2 focus:ring-amber"
          />
        </div>
      </div>

      {error && (
        <p role="alert" className="text-red-600 text-sm mt-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="mt-4 bg-ink text-paper px-4 py-2 rounded-lg font-medium hover:bg-slate transition-colors disabled:opacity-50"
      >
        {enviando ? 'Guardando...' : 'Agregar tarea'}
      </button>
    </form>
  );
}
