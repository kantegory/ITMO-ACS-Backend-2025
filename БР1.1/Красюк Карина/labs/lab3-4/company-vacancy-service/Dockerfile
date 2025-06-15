FROM node:20-alpine as development

WORKDIR /app

COPY package*.json ./
RUN npm install --include=dev

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3002

CMD ["yarn", "start"]