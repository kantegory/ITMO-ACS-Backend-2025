# travel-service/Dockerfile
FROM node:24-alpine

WORKDIR /app

# Кешируем зависимости
COPY package*.json ./
RUN npm install --save-dev @esbuild/linux-x64

# Копируем исходный код
COPY . .

# Собираем проект
RUN npm run build

EXPOSE 3002

CMD ["npm", "start"]