FROM node:8

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

WORKDIR /app/client

RUN npm install && npm run build

WORKDIR /app

CMD NODE_ENV=production node --inspect server/server.js

EXPOSE 3000

EXPOSE 9229
