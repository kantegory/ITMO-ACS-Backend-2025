FROM node:22-alpine

WORKDIR /app

COPY social-service/package*.json ./
COPY social-service/tsconfig.json ./
COPY auth-service/.env ./
COPY common-service ./common-service

RUN npm install

COPY social-service/src ./src

RUN npm run build

ENV NODE_ENV=development

CMD ["npm", "run", "dev"]
