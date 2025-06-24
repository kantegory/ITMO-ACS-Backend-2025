FROM node:20 AS builder

WORKDIR /var/www/apps/video
COPY . /var/www/apps/video

RUN npm install --omit=optional

RUN npm run build

FROM node:20 AS prod

WORKDIR /var/www/apps/video
COPY --from=builder /var/www/apps/video/dist /var/www/apps/video
COPY --from=builder /var/www/apps/video/node_modules /var/www/apps/video/node_modules

CMD node /var/www/apps/video/index.js