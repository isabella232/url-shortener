FROM node:10-alpine

RUN mkdir /src
WORKDIR /src

RUN apk update && apk upgrade

COPY package.json /src/
COPY yarn.lock /src/
RUN yarn --pure-lockfile install

COPY . /src

EXPOSE 8080
ENTRYPOINT ["yarn"]
CMD ["start"]
