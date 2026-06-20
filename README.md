# TaskApp - Gestión de Tareas Académicas 

Proyecto Integrado desarrollado para la plataforma de gestión y monitoreo de tareas.

## Integrantes
* **Matthews Kaled Aguilar Espinoza** — ISAM

## Tecnologías Utilizadas
* **Frontend:** React + Vite (Desplegado en [Vercel](https://taskapp-dun-tau.vercel.app/))
* **Backend:** Node.js / Express
* **Base de Datos:** PostgreSQL (Dockerizada)
* **Monitoreo y Observabilidad:** Grafana + Prometheus

## Arquitectura y Despliegue Local

El proyecto está completamente contenedorizado utilizando **Docker Desktop**.

### Requisitos Previos
* Docker y Docker Compose instalados.

### Instrucciones para encender el proyecto:
1. Clonar el repositorio.
2. Ejecutar el siguiente comando en la raíz del proyecto:
```bash
   docker compose up --build
 