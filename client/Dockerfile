FROM node:alpine

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

COPY . .

RUN npm install


CMD ["npm", "run", "start"]
EXPOSE 3000
