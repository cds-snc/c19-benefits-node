FROM node:12-alpine
LABEL maintainer="-"

ARG GITHUB_SHA_ARG
ENV GITHUB_SHA=$GITHUB_SHA_ARG
ARG BUILD_DATE
ENV BUILD_DATE=$BUILD_DATE
ENV NODE_ENV=production

COPY . /src

WORKDIR /src

RUN npm install --quiet --production

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]