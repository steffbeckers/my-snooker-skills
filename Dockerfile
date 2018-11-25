FROM node:8

RUN apk --update add imagemagick

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

# node_module im-resize fix
COPY server/lib/im-resize/index.js /app/node_modules/im-resize

CMD NODE_ENV=production node server/server.js
# CMD NODE_ENV=production node --inspect=0.0.0.0 server/server.js

EXPOSE 3000
