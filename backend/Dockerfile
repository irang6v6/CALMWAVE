FROM openjdk:11-jdk
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
COPY script.sh script.sh
RUN chmod +x script.sh
RUN /script.sh
ENTRYPOINT ["java","-jar","-Duser.timezone=Asia/Seoul", "-Dspring.profiles.active=prod", "/app.jar"]
