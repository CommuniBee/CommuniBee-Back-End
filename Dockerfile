FROM node:10-alpine

WORKDIR /app

COPY . .
RUN npm install

EXPOSE 3000

CMD npm start
