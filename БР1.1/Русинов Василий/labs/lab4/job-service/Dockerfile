# Используем официальный Node.js образ
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем зависимости
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальной код
COPY . .

# Компилируем TypeScript
RUN npm run build

# Указываем команду запуска
#CMD ["node", "dist/index.js"]

# Или если у тебя ts-node-dev в проде:
CMD ["npx", "ts-node", "index.ts"]

# Открываем порт (опционально)
EXPOSE 3000
