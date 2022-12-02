FROM node:alpine

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

COPY . .

RUN npm install
RUN npm install recharts
RUN npm install --save recharts --legacy-peer-deps

EXPOSE 3000
CMD ["npm", "run", "start"]

