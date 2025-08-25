# Usa una imagen base de node
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos
COPY package*.json ./
RUN npm install

COPY . .

# Expone el puerto para que corra el backend
EXPOSE 3000

# Inicia el servidor
CMD ["npm", "start"]
