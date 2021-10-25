# stage 1 building the code
FROM node:latest as base

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .
