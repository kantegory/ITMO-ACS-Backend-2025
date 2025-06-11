FROM node:20 AS builder

WORKDIR /rent

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine as prod 

WORKDIR /rent

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=builder /rent/dist ./dist

EXPOSE 8003

CMD ["node", "dist/index.js"]