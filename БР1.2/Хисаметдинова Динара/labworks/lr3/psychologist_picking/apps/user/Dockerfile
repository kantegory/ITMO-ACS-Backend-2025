FROM node:20-alpine

WORKDIR /app

# Копируем package.json и package-lock.json из корня
COPY package*.json ./

# Копируем исходники
COPY apps ./apps
COPY libs ./libs
COPY nest-cli.json ./
COPY tsconfig.json ./

RUN npm install --legacy-peer-deps

# Собираем всё!
RUN npm run build

EXPOSE 3000

# Запуск нужного микросервиса
CMD ["node", "dist/apps/user/src/main.js"]
