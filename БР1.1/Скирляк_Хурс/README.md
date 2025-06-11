# Movie Matching Platform

A microservice-based movie matching platform built with NestJS, TypeORM, Redis, and RabbitMQ.

## Features

- User Authentication with JWT
- Friend System
- Movie Matching with Redis Sessions
- Microservice Architecture
- RabbitMQ Message Queue
- Docker Containerization
- CI/CD Pipeline

## Prerequisites

- Node.js 18 or later
- Docker and Docker Compose
- PostgreSQL
- Redis
- RabbitMQ

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd movie-matching-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Environment Setup:
   Create a `.env` file in the root directory with the following variables:
   ```env
   # App
   NODE_ENV=development
   PORT=3001

   # Database
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=password
   POSTGRES_DB=movieapp

   # Redis
   REDIS_HOST=localhost
   REDIS_PORT=6379

   # RabbitMQ
   RABBITMQ_URL=amqp://localhost:5672
   ```

4. Run with Docker:
   ```bash
   docker-compose up -d
   ```

Or run locally:
   ```bash
   npm run start:dev
   ```

## Testing

Run unit tests:
   ```bash
   npm test
   ```

Run tests with coverage:
   ```bash
   npm run test:cov
   ```

## API Documentation

Once the application is running, you can access the Swagger documentation at:
   ```
   http://localhost:3001/api
   ```

## Contributing

1. Create a feature branch
2. Commit changes
3. Push to the branch
4. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
