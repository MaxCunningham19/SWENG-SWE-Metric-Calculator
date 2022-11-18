FROM node:alpine
WORKDIR /client
COPY package.json ./
COPY package-lock.json ./
COPY . .
Run npm i

EXPOSE 3000
CMD ["npm", "run", "start"]