import React from 'react';

export default function TarjetaTarea({ tarea, onToggle, onEliminar }) {
  const vencida =
    tarea.fecha_entrega && !tarea.completada && new Date(tarea.fecha_entrega) < new Date();

  return (
    <li
      className={`bg-white rounded-xl border border-slate/10 p-4 flex items-start gap-3 shadow-sm transition-opacity ${
        tarea.completada ? 'opacity-60' : ''
      }`}
    >
      <input
        type="checkbox"
        checked={tarea.completada}
        onChange={() => onToggle(tarea)}
        aria-label={`Marcar "${tarea.titulo}" como ${tarea.completada ? 'pendiente' : 'completada'}`}
        className="mt-1 h-5 w-5 accent-sage cursor-pointer"
      />

      <div className="flex-1 min-w-0">
        <p className={`font-medium text-ink ${tarea.completada ? 'line-through' : ''}`}>
          {tarea.titulo}
        </p>
        <div className="flex flex-wrap gap-2 mt-1 text-xs">
          {tarea.materia && (
            <span className="bg-paper border border-slate/15 text-slate px-2 py-0.5 rounded-full">
              {tarea.materia}
            </span>
          )}
          {tarea.fecha_entrega && (
            <span
              className={`px-2 py-0.5 rounded-full border ${
                vencida
                  ? 'bg-red-50 border-red-200 text-red-700'
                  : 'bg-amber/10 border-amber/30 text-amber'
              }`}
            >
              Entrega: {tarea.fecha_entrega.slice(0, 10)}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={() => onEliminar(tarea.id)}
        aria-label={`Eliminar tarea "${tarea.titulo}"`}
        className="text-slate/50 hover:text-red-600 transition-colors text-sm px-2 py-1"
      >
        Eliminar
      </button>
    </li>
  );
}
