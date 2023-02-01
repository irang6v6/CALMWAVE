FROM openjdk:11-jdk
ARG JAR_FILE=build/libs/*.jar
COPY /home/ubuntu/run.sh run.sh
RUN chmod +x run.sh
RUN run.sh
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","-Duser.timezone=Asia/Seoul", "-Dspring.profiles.active=prod", "/app.jar"]
