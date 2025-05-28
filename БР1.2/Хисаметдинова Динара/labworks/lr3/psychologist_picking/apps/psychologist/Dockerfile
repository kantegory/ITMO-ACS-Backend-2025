FROM node:20-alpine

WORKDIR /app

# 1. Копируем package.json и package-lock.json
COPY package*.json ./

# 2. Копируем исходники apps и libs целиком
COPY apps ./apps
COPY libs ./libs

# 3. Устанавливаем зависимости из корня
RUN npm install --legacy-peer-deps

# 4. Переходим в директорию микросервиса
WORKDIR /app/apps/psechologist

# 5. Билдим сервис (предполагается что у тебя есть tsconfig в корне)
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
