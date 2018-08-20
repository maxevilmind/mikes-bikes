FROM node:9.4.0

WORKDIR /usr/app

COPY package*.json ./
COPY webpack.config.*.js ./
COPY tools ./tools
COPY src ./src

RUN npm install -qy

RUN npm run build

COPY . .

EXPOSE 3000

CMD ["npm", "run", "build"]
