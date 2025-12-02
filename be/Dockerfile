FROM eclipse-temurin:21-jdk

WORKDIR /app
COPY /src ./src
COPY /gradle ./gradle
COPY /build.gradle ./build.gradle
COPY /gradlew ./gradlew
COPY /gradlew.bat ./gradlew.bat
RUN ./gradlew clean build -x test && ls build/libs
EXPOSE 8080

CMD ["java", "-jar", "build/libs/backend.jar"]