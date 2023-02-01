FROM openjdk:11-jdk
ARG JAR_FILE=build/libs/*.jar
RUN chmod +x /script.sh
RUN /script.sh
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","-Duser.timezone=Asia/Seoul", "-Dspring.profiles.active=prod", "/app.jar"]
