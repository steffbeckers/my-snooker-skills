# build stage
FROM node:alpine as build-stage

ARG vue_build_mode

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build.${vue_build_mode}

# production stage
FROM nginx:alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY --from=build-stage /app/nginx.default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
