FROM node:18-alpine

RUN apk add --no-cache wget

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3003
CMD ["npm", "start"] 