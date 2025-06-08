FROM node:20-alpine

WORKDIR /app

COPY shared/package*.json ./shared/

COPY user-service/package*.json ./user-service/

RUN npm install --prefix ./shared

RUN npm install --prefix ./user-service

COPY shared ./shared

COPY user-service ./user-service

WORKDIR /app/user-service

RUN npm run build

RUN ls -R build

CMD ["node", "build/server.js"]