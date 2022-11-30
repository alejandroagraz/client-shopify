FROM node:16-alpine as build

LABEL "server"="Client-react-graphql"
LABEL maintainer="joseagraz29@gmail.com"
LABEL version="1.0"

RUN apk add nano

WORKDIR /usr/src/app
COPY . .
RUN yarn install

RUN yarn run build

FROM nginx:latest

COPY --from=build /usr/src/app/build/ /usr/share/nginx/html
COPY --from=build /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000:80
CMD ["nginx", "-g", "daemon off;"]


