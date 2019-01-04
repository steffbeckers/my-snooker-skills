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

# Start nodemon server
CMD nodemon server/server.js

EXPOSE 3000
