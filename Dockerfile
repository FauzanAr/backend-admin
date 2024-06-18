FROM node:18.17.1-slim
WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y openssl

COPY package*.json ./
COPY prisma ./prisma
COPY . .

RUN npm install
RUN npm run build
RUN npx prisma generate

EXPOSE 5000

CMD ["npm", "run", "start:prod"]