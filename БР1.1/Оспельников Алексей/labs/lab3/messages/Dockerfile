FROM node:18-slim

WORKDIR /messages

COPY package*.json ./ 

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]