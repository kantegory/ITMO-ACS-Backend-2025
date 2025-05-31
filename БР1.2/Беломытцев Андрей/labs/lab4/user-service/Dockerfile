FROM node:20 AS builder

WORKDIR /var/www/apps/user
COPY . /var/www/apps/user

RUN npm install --omit=optional

RUN npm run build

FROM node:20 AS prod

WORKDIR /var/www/apps/user
COPY --from=builder /var/www/apps/user/dist /var/www/apps/user
COPY --from=builder /var/www/apps/user/node_modules /var/www/apps/user/node_modules

CMD node /var/www/apps/user/index.js