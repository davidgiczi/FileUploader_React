# syntax=docker/dockerfile:1

FROM node:current-alpine
WORKDIR /App

COPY package*.json ./
RUN yarn install

COPY . .
CMD ["yarn", "start"]