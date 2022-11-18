FROM node:alpine
WORKDIR /server
COPY package.json ./
COPY package-lock.json ./
COPY . .
Run npm install 
Run npm install express
EXPOSE 5000
CMD ["npm", "run", "start"]