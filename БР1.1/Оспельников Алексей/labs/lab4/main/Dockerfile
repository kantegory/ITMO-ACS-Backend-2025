FROM node:18-slim

WORKDIR /main

COPY package*.json ./ 

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]