# --- Etapa 1: build ---
# Compilamos la app React con Node, generando archivos estaticos optimizados.
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- Etapa 2: produccion ---
# Servimos los archivos estaticos con NGINX (imagen final mucho mas liviana,
# no incluye Node ni dependencias de desarrollo).
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.frontend.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
