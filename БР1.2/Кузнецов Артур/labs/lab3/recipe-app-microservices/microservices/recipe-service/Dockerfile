FROM node:22-alpine

WORKDIR /app

COPY recipe-service/package*.json ./
COPY recipe-service/tsconfig.json ./
COPY auth-service/.env ./
COPY common-service ./common-service

RUN npm install

COPY recipe-service/src ./src

RUN npm run build

ENV NODE_ENV=development

CMD ["npm", "run", "dev"]
