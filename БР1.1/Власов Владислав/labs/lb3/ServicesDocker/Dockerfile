FROM node:23-alpine

WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./
COPY .env ./

RUN npm ci --include=dev

COPY src ./src

RUN npm install -g ts-node

CMD ["ts-node", "src/index.ts"]