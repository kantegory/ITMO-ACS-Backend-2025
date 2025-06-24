FROM node:20-alpine

WORKDIR /app

COPY shared/package*.json ./shared/

COPY rental-service/package*.json ./rental-service/

RUN npm install --prefix ./shared

RUN npm install --prefix ./rental-service

COPY shared ./shared

COPY rental-service ./rental-service

WORKDIR /app/rental-service

RUN npm run build

RUN ls -R build

CMD ["node", "build/server.js"]
