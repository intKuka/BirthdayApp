ARG EXPOSE_LISTEN_PORT

# develpment
FROM node:20 as dev

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --development

COPY tsconfig*.json ./
COPY src/ src/
COPY db/ db/

RUN npm run build

# builder
FROM node:20 as build

WORKDIR /app

ARG NODE_ENV=production

COPY package*.json ./

RUN npm ci --production

# production
FROM node:20 as prod

WORKDIR /app

COPY package*.json ./

COPY --from=build /app/node_modules ./node_modules
COPY --from=dev /usr/src/app/dist ./dist

EXPOSE ${EXPOSE_LISTEN_PORT}

CMD npm run migration:run && npm run seed && npm run start:prod
