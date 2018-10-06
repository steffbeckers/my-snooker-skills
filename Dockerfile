FROM node:8

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

CMD NODE_ENV=production node server/server.js
# CMD NODE_ENV=production node --inspect=0.0.0.0 server/server.js

EXPOSE 3000
