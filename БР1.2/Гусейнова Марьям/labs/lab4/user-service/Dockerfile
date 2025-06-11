# Этап сборки (Build Stage)
FROM node:20-slim AS builder

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Этап выполнения (Production Stage)
FROM node:20-slim

WORKDIR /app

# Копируем только скомпилированный код из этапа сборки
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

EXPOSE 3001

CMD [ "node", "dist/index.js" ]