FROM node:20-alpine

WORKDIR /app

COPY shared/package*.json ./shared/

COPY advertisement-service/package*.json ./advertisement-service/

RUN npm install --prefix ./shared

RUN npm install --prefix ./advertisement-service

COPY shared ./shared

COPY advertisement-service ./advertisement-service

WORKDIR /app/advertisement-service

RUN npm run build

RUN ls -R build

CMD ["node", "build/server.js"]
