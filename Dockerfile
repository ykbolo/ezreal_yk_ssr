FROM node:8.2.1

RUN mkdir -p /app
COPY . /app
WORKDIR /app
EXPOSE 8080
EXPOSE 9003
RUN npm install
RUN npm run build

CMD [ "npm", "start" ]