# develop stage
FROM node:14-alpine as develop-stage
RUN apk add --update --no-cache python2 && ln -sf python2 /usr/bin/python
WORKDIR /src
COPY package*.json ./
RUN npm i -g @quasar/cli@latest
RUN npm rebuild node-sass
COPY . .

# local-deps
FROM develop-stage as local-deps-stage
RUN npm i

# build stage (spa)
FROM local-deps-stage as build-stage-spa
RUN quasar build -m spa

# production stage (spa)
FROM nginx:stable-alpine as production-stage-spa
COPY --from=build-stage-spa /src/dist/spa /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# build stage (ssr)
FROM local-deps-stage as build-stage-ssr
RUN quasar build -m ssr

#production stage (ssr)
FROM node:lts-alpine as production-stage-ssr
WORKDIR /app
COPY --from=build-stage-ssr /src/dist/ssr .
RUN npm i
EXPOSE 3000
CMD ["node", "index.js"]