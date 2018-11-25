FROM node:alpine

# Install apk dependencies
RUN apk update && apk add --update imagemagick

# Install nodemon globally
RUN npm install -g nodemon

# Copy app and install node_modules
WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

# node_module im-resize fix
COPY server/lib/im-resize/index.js /app/node_modules/im-resize

# Start nodemon server
CMD NODE_ENV=production nodemon server/server.js
# CMD NODE_ENV=production node --inspect=0.0.0.0 server/server.js

EXPOSE 3000
