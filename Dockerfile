FROM openjdk:17
WORKDIR /pro
EXPOSE 8080
COPY target/*.jar /pro/app.jar
CMD ["java", "-jar", "app.jar"]
