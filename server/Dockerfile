FROM node:alpine

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN ls
RUN npm install --production
RUN pip install Pygithub

COPY . .

EXPOSE 5000
CMD ["npm", "run", "start"]