# Retrospectivas de Sprint

## Sprint 1 — Repositorio, backend y base de datos

- **Qué funcionó:** definir desde el inicio el modelo de datos (tabla `tareas`) evitó retrabajo después.
- **Qué no funcionó tan bien:** subestimar el tiempo de configurar correctamente las variables de entorno entre Docker y desarrollo local.
- **Ajuste para el siguiente sprint:** documentar cada variable de entorno en un archivo `.env.example` apenas se crea, no al final.

## Sprint 2 — Frontend e integración

- **Qué funcionó:** centralizar todas las llamadas a la API en un solo archivo (`api.js`) facilitó cambiar la URL del backend sin tocar componentes.
- **Qué no funcionó tan bien:** los primeros estilos eran demasiado genéricos y no reflejaban el caso de uso académico.
- **Ajuste para el siguiente sprint:** definir una paleta de colores y tipografía propias antes de maquetar componentes.

## Sprint 3 — Contenedores, Kubernetes, monitoreo y documentación

- **Qué funcionó:** usar `docker-compose` como referencia simplificó traducir los servicios a manifiestos de Kubernetes.
- **Qué no funcionó tan bien:** ajustar el dashboard de Grafana llevó más iteraciones de lo esperado hasta encontrar las métricas más representativas.
- **Ajuste para el siguiente sprint (de existir):** automatizar la creación de dashboards desde el primer sprint, no como tarea final.
