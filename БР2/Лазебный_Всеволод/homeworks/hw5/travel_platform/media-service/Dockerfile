FROM node:18-alpine
WORKDIR /app

COPY media-service/package*.json ./
RUN npm ci

COPY shared ./shared

COPY media-service/src ./src
COPY media-service/tsconfig.json ./

RUN npm run build

EXPOSE 3003
CMD ["node", "dist/app.js"]