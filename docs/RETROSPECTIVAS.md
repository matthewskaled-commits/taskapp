# Retrospectivas de Sprint

## Sprint 1 — Repositorio, backend y base de datos

- **Qué funcionó: El aislamiento y aprovisionamiento automatizado del entorno mediante Docker Compose. Definir el modelo de datos relacional de manera temprana (tabla tareas) garantizó la integridad referencial y evitó refactorizaciones costosas en las capas superiores del backend.
- **Qué no funcionó tan bien: Conflictos de autenticación y asignación de privilegios en el contenedor de PostgreSQL con el usuario específico de la aplicación (taskapp), lo que generó interrupciones temporales en la persistencia de datos durante la fase de desarrollo local.
- **Acción correctiva implementada: Validar y estructurar de forma estricta los scripts de inicialización de la base de datos (init.sql) junto con el mapeo de variables de entorno de red antes de levantar la pila de contenedores.

## Sprint 2 — Frontend e integración

- **Qué funcionó: Desacoplamiento eficiente de la arquitectura del cliente mediante una SPA (Single Page Application) basada en React y Vite. Centralizar las solicitudes asíncronas en un módulo único (api.js) agilizó la inyección dinámica de cambios y la personalización institucional obligatoria en los componentes visuales del pie de página.
- **Qué no funcionó tan bien: La falta de un manejo predictivo en la interfaz de usuario ante la pérdida de conectividad con la API REST local (localhost), lo que inicialmente provocaba excepciones no controladas en lugar de alertas amigables al usuario (mensajes de validación de backend offline).
- **Acción correctiva implementada: Implementar bloques de captura de errores (try/catch) en el flujo de renderizado y estandarizar las hojas de estilo según los requerimientos académicos antes de proceder con el ensamblaje de la UI.

## Sprint 3 — Contenedores, despliegue continuo y observabilidad

- **Qué funcionó: Éxito absoluto en la implementación del pipeline de Despliegue Continuo (CD) en Vercel mediante la integración nativa con GitHub. Asimismo, se consolidó la estrategia de Observabilidad del sistema a través de un stack de monitoreo (Grafana), logrando la telemetría en tiempo real de métricas críticas: tasa de peticiones HTTP por segundo, distribución de códigos de estado (200 OK), consumo de memoria en bytes (Node.js) y el indicador binario de disponibilidad del servidor (liveness gauge).
- **Qué no funcionó tan bien: El motor de compilación de Vercel intentó procesar el repositorio bajo una arquitectura monolítica multiservicio (solicitando un archivo vercel.json), debido a la coexistencia de las carpetas de infraestructura, backend y frontend en la raíz.
- **Acción correctiva implementada: Reconfigurar el Application Preset hacia entornos Vite y segmentar estrictamente el contexto del despliegue apuntando el Root Directory de forma exclusiva hacia la carpeta del /frontend, garantizando compilaciones limpias en la nube con cada git push.
