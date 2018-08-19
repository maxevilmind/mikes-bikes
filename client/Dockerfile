FROM node:9.4.0

WORKDIR /usr/app

COPY package*.json ./

# RUN npm install -qy
RUN ls
RUN npm run

COPY . .

EXPOSE 3000

CMD ["npm", "start"]