FROM node:20 AS builder

WORKDIR /var/www/apps/channel
COPY . /var/www/apps/channel

RUN npm install --omit=optional

RUN npm run build

FROM node:20 AS prod

WORKDIR /var/www/apps/channel
COPY --from=builder /var/www/apps/channel/dist /var/www/apps/channel
COPY --from=builder /var/www/apps/channel/node_modules /var/www/apps/channel/node_modules

CMD node /var/www/apps/channel/index.js