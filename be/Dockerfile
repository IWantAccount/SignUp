FROM eclipse-temurin:24-jdk AS build
WORKDIR /workspace
COPY gradlew ./
COPY gradle gradle
COPY build.gradle settings.gradle ./
RUN chmod +x gradlew

# (volitelný warmup cache wrapperu — nevadí, když nic nestáhne)
RUN ./gradlew --no-daemon --version

COPY src src

RUN ./gradlew --no-daemon clean build -x test

FROM eclipse-temurin:24-jre

RUN useradd -u 1000 -m appuser
USER appuser

WORKDIR /app

RUN mkdir -p /uploads/sign-videos

COPY --from=build /workspace/build/libs/*.jar /app/app.jar

ENV SPRING_APPLICATION_JSON='{"storage":{"location":"/uploads/sign-videos"}}'

EXPOSE 8080

ENTRYPOINT ["java","-jar","/app/app.jar"]
