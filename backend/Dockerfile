FROM maven:3.9.6-eclipse-temurin-21-alpine

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn clean package -DskipTests

# Створюємо папку для завантажених файлів
RUN mkdir -p /app/uploads

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "target/loomi-0.0.1-SNAPSHOT.jar"]