FROM node:18-alpine
WORKDIR /app

COPY content-service/package*.json ./
RUN npm ci

COPY shared ./shared

COPY content-service/src ./src
COPY content-service/tsconfig.json ./

RUN npm run build

EXPOSE 3002
CMD ["node", "dist/app.js"]