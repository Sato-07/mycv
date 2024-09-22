FROM node:20.11.1-alpine

WORKDIR /mycv

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run dev

EXPOSE 3000

CMD ["npm", "run", "start"]
