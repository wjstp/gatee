FROM openjdk:17-jdk-alpine As builder

WORKDIR /work
COPY . /work

RUN set -a \
    source ./devops/.env \
    set +a

RUN chmod +x ./gradlew
RUN ./gradlew clean build

FROM openjdk:17-jdk-slim

WORKDIR /work
COPY --from=builder /work/build/libs/*.jar /work/app.jar
COPY ./devops/.env /work/.env
COPY ./devops/start-app.sh /work/start-app.sh

RUN chmod +x start-app.sh
ENTRYPOINT ["./start-app.sh"]