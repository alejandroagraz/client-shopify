FROM node:16-alpine As development

LABEL "server"="Server-api-graphql"
LABEL maintainer="joseagraz29@gmail.com"
LABEL version="1.0"

RUN apk add nano

WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn run build

EXPOSE 4000
CMD ["yarn", "run", "start" , "dev"]
