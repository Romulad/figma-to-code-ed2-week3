FROM node:22-alpine

WORKDIR /tokena

COPY package*.json ./

RUN npm i

COPY . ./

CMD [ "npm", "run", "dev" ]