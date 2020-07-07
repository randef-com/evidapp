## Base node image for the project
FROM node:12.16.1-alpine as base

ENV APP_ENV=prod
ENV PROJECT_ROOT="/usr/src/app"

# set Node.JS timezone
# ENV TZ="Europe/Prague" (I'm not sure if this is needed, default DB timezone is UTC bud who knows how are the dates stored)

RUN apk add --no-cache bash

ADD .docker /

ENTRYPOINT ["/entrypoint.sh"]

## Image for build and tests (all 3rd party build dependencies should be here)
FROM base as test

ENV APP_ENV=test
ENV CONFIG_APP_RUN_INITIAL_LOAD=0
ENV CONFIG_APP_START_REPLICATION=0

WORKDIR $PROJECT_ROOT
ADD *.json ./
ADD *.js ./

# Curl is required by wait for script used by tests
RUN apk add --no-cache curl

RUN npm install --unsafe-perm

ADD apps/ apps/
ADD tools/ tools/
ADD libs/ libs/

RUN npm install -g @angular/cli
RUN npm install -g @nrwl/cli

RUN npm run build

## Image for local developlment
FROM test as development

ENV APP_ENV=dev

# Git is required by Jest watcher
RUN apk add --no-cache git

WORKDIR $PROJECT_ROOT

CMD ["nx", "serve", "api"]

## Image for production npm install (all prod 3rd party build dependencies should be here)
FROM base as prod-npm-deps

WORKDIR $PROJECT_ROOT
COPY package*.json ./

RUN npm install --unsafe-perm --production

## Image for production application (only built code and prod dependencies)
FROM base as application

WORKDIR $PROJECT_ROOT

ADD package*.json ./
ADD tsconfig*.json ./
ADD .eslintrc.json ./

COPY --from=test "$PROJECT_ROOT/build/" build/
COPY --from=test "$PROJECT_ROOT/resources/" resources/
COPY --from=prod-npm-deps $PROJECT_ROOT .

CMD ["npm", "run", "start"]
