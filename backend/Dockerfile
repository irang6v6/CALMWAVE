FROM openjdk:11-jdk
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
RUN pwd
RUN /script.sh
ENTRYPOINT ["java","-jar","-Duser.timezone=Asia/Seoul", "-Dspring.profiles.active=prod", "/app.jar"]
