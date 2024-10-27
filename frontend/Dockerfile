FROM node:20

WORKDIR /app/frontend

ENV ELSINT_NO_DEV_ERRORS true

COPY package*.json ./

RUN npm install

COPY . .

# RUN npm run build
EXPOSE 3000



CMD ["npm", "run", "start"]