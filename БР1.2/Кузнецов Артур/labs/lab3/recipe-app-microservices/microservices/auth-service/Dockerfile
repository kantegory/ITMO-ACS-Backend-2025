FROM node:22-alpine

WORKDIR /app

COPY auth-service/package*.json ./
COPY auth-service/tsconfig.json ./
COPY auth-service/.env ./
COPY common-service ./common-service

RUN npm install

COPY auth-service/src ./src

RUN npm run build

ENV NODE_ENV=development

CMD ["npm", "run", "dev"]
