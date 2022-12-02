# #Create the base OS image
# FROM python:3

# WORKDIR /app

# COPY ["package.json", "package-lock.json", "./"]

# #Update the OS ubuntu image
# RUN apt-get update 
# RUN pip3 install Pygithub

#Create another image layer on top of base to install requirements
FROM nikolaik/python-nodejs:latest

#Install the requirements
WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN ls
RUN npm cache clear --force
RUN npm install --production
RUN python3 -m pip install Pygithub

COPY . .

EXPOSE 8080
CMD ["npm", "run", "start"]