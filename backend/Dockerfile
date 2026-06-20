# Imagen base liviana de Node.js
FROM node:20-alpine

WORKDIR /app

# Copiamos primero package.json para aprovechar el cache de Docker:
# si el codigo cambia pero las dependencias no, no se reinstalan.
COPY package*.json ./
RUN npm install --omit=dev

# Copiamos el resto del codigo
COPY . .

EXPOSE 4000

# Variable de entorno por defecto (se puede sobreescribir en docker-compose / k8s)
ENV PORT=4000

CMD ["node", "src/index.js"]
