FROM node:16-alpine As development

LABEL "server"="Client-api-express"
LABEL maintainer="joseagraz29@gmail.com"
LABEL version="1.0"

RUN apk add nano

WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
COPY . .

EXPOSE 4200
CMD ["yarn", "run", "start", "dev"]

