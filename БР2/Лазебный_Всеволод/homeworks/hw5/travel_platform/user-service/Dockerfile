FROM node:18-alpine
WORKDIR /app

# Копируем зависимости и устанавливаем их
COPY user-service/package*.json ./
RUN npm ci

# Копируем общий модуль из корня проекта
COPY shared ./shared

# Копируем только исходный код user-service
COPY user-service/src ./src
COPY user-service/tsconfig.json ./

# Сборка проекта
RUN npm run build

EXPOSE 3001
CMD ["node", "dist/app.js"]