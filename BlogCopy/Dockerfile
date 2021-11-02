FROM node:14
WORKDIR index.js
COPY package*.json ./
RUN npm install
COPY . . 
EXPOSE 8080
CMD [ "node", "index.js" ]
