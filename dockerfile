FROM node:lts-alpine as build-stage

WORKDIR /app
COPY ./client/package.json ./
COPY ./client/vue.config.js ./
RUN npm install
COPY ./client/ ./
RUN npm run build

FROM node:lts-alpine as app-stage

WORKDIR /app
COPY ./server/* ./
RUN npm install

ENV PORT=8000
EXPOSE 8000

RUN mkdir -p /app/dist
COPY --from=build-stage /app/dist ./dist

CMD [ "npm", "start" ]

