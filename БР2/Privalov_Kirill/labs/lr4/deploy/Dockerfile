FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --production=false

COPY . .

RUN npm run build

FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache bash

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

EXPOSE 3000

COPY wait-for-it.sh ./

CMD ["sh", "-c", "./wait-for-it.sh db:5432 -- node dist/index.js"]
