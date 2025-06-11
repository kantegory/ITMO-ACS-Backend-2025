FROM node:20 AS builder

WORKDIR /auth

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine as prod 

WORKDIR /auth

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=builder /auth/dist ./dist

EXPOSE 8001

CMD ["node", "dist/index.js"]
