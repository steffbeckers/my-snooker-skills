FROM node:8

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

WORKDIR /app/client

RUN npm install && npm run build

WORKDIR /app

CMD NODE_ENV=production node --inspect=0.0.0.0 server/server.js

EXPOSE 3000
