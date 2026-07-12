# Этап 1: Сборка проекта
FROM maven:3.9-eclipse-temurin-21 AS builder
WORKDIR /app
COPY .. .
RUN mvn clean package -DskipTests
# Этап 2: Финальный образ (легкий)
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
ENTRYPOINT ["java", "-Xmx350m", "-Xss512k", "-XX:MaxRAM=450m", "-jar", "app.jar"]