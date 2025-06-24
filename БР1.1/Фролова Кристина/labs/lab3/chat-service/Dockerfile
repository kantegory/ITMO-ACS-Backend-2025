FROM node:20-alpine

WORKDIR /app

COPY shared/package*.json ./shared/

COPY chat-service/package*.json ./chat-service/

RUN npm install --prefix ./shared
RUN npm install --prefix ./chat-service

COPY shared ./shared

COPY chat-service ./chat-service

WORKDIR /app/chat-service

RUN npm run build

RUN ls -R build

CMD ["node", "build/server.js"]
