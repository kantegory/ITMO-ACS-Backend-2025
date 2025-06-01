FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY ../.. .

RUN chmod +x node_modules/.bin/tsx

EXPOSE 3003

CMD ["npm", "start"]
