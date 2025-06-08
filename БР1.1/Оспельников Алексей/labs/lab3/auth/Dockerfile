FROM node:18-slim

WORKDIR /auth

COPY package*.json ./ 

RUN npm install

COPY . .

EXPOSE 9000

CMD ["npx", "ts-node", "src/index.ts"]