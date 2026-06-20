# Manual de Usuario — TaskApp

## ¿Qué es TaskApp?

Una aplicación web para que un estudiante registre sus tareas académicas, las organice por materia y fecha de entrega, y marque cuáles ya completó.

## 1. Acceder a la aplicación

Abrir en el navegador la dirección de la aplicación (local: `http://localhost:8080`, o la URL pública si está desplegada en Vercel/Netlify).

## 2. Crear una tarea

1. En el formulario superior, escribir el **título** de la tarea (obligatorio).
2. Opcionalmente, completar la **materia** y la **fecha de entrega**.
3. Hacer clic en **"Agregar tarea"**.
4. La tarea aparece de inmediato en la lista, debajo del formulario.

## 3. Marcar una tarea como completada

Hacer clic en el **checkbox** a la izquierda de la tarea. El texto se tacha y la tarea se atenúa visualmente.

## 4. Filtrar tareas

Usar los botones **"Todas" / "Pendientes" / "Completadas"** ubicados junto al título "Tus tareas" para ver solo el grupo deseado.

## 5. Eliminar una tarea

Hacer clic en el botón **"Eliminar"** a la derecha de la tarea. La acción es inmediata y no se puede deshacer.

## 6. Mensajes de error

Si la aplicación no logra conectarse con el servidor (por ejemplo, el backend está apagado), se muestra un mensaje indicándolo en la parte superior de la lista.
