FROM openjdk:17-jdk-alpine As builder

WORKDIR /work
COPY . /work

RUN chmod +x ./gradlew
RUN ./gradlew clean build

FROM openjdk:17-jdk-slim

# curl을 설치합니다.
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

WORKDIR /work
COPY --from=builder /work/build/libs/*.jar /work/app.jar
COPY ./devops/start-app.sh /work/start-app.sh

RUN chmod +x start-app.sh
ENTRYPOINT ["./start-app.sh"]