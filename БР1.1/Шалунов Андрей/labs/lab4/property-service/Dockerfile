FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY tsconfig*.json ./
COPY src ./src
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --production
COPY --from=builder /app/node_modules ./node_modules
COPY .env ./
ARG PORT=3000
ENV PORT=${PORT}
EXPOSE ${PORT}
CMD ["node","dist/app.js"]