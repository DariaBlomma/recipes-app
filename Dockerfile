# Этап 1: Сборка проекта
FROM eclipse-temurin:17-jdk-alpine AS builder
WORKDIR /app
COPY . .
RUN ./mvnw clean package -DskipTests

# Этап 2: Финальный образ (легкий)
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
ENTRYPOINT ["java", "-Xmx350m", "-Xss512k", "-XX:MaxRAM=450m", "-jar", "app.jar"]