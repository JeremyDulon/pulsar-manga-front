# develop stage
FROM node:18-bullseye as develop-stage
WORKDIR /src
COPY package*.json ./
RUN npm i -g @quasar/cli
COPY . .

# local-deps
FROM develop-stage as local-deps-stage
RUN npm i

# build stage (spa)
FROM local-deps-stage as build-stage-spa
RUN quasar build -m spa

# production stage (spa)
FROM nginx:stable-bullseye as production-stage-spa
COPY --from=build-stage-spa /src/dist/spa /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# build stage (ssr)
FROM local-deps-stage as build-stage-ssr
RUN quasar build -m ssr

#production stage (ssr)
FROM node:18-bullseye as production-stage-ssr
WORKDIR /app
COPY --from=build-stage-ssr /src/dist/ssr .
RUN npm i
EXPOSE 3000
CMD ["node", "index.js"]
