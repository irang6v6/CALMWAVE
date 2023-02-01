FROM openjdk:11-jdk
ARG JAR_FILE=build/libs/*.jar
RUN chmod +x /home/ubuntu/run.sh
RUN /home/ubuntu/run.sh
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","-Duser.timezone=Asia/Seoul","/app.jar"]
