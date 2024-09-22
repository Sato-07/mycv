FROM node:20.11.1-alpine

WORKDIR /mycv

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
