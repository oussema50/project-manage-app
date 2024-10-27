# Use Node.js image
FROM node:20

WORKDIR /app/backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm","run", "dev"]
