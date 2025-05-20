FROM node:23-alpine

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

COPY . .

ENV NODE_ENV=development

CMD ["pnpm", "dev"]
