# user-service/Dockerfile
FROM node:24-alpine

WORKDIR /app

# Кешируем зависимости
COPY package*.json ./
RUN npm install --save-dev @esbuild/linux-x64

# Копируем исходный код
COPY . .

# Собираем проект (если используете TypeScript)
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]