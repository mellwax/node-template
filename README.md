# Node Template

A production-ready Node.js + TypeScript API template with opinionated structure, strict typing, modular architecture, and operational best practices baked in.

Designed to be used as a starting point for scalable backend services.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Error Handling](#error-handling)
- [Logging](#logging)
- [Validation](#validation)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This repository is a template for building production-grade Node.js services using:

- TypeScript for strict type safety
- Express for HTTP transport
- Drizzle ORM for database access
- Layered modular architecture for scalability
- Structured logging, validation, and error handling by default

It enforces clear separation of concerns and predictable code organization to support long-term maintainability.

---

## Features

- Strict TypeScript configuration
- Modular domain-driven folder structure
- Typed environment configuration
- Centralized logging with severity levels and trace IDs
- Explicit error model (client vs server errors)
- Request validation middleware
- Repository / Service / Controller separation
- Drizzle ORM schema management
- ESLint configured for consistency

---

## Architecture

This template follows a layered architecture:

```
Request → Middleware → Routes → Controller → Service → Repository → Database
                                    ↓
                                  Mapper
                                    ↓
                                 Response
```

Each layer has a single responsibility and clear dependency direction.

---

## Project Structure

```
src/
├── config/
│   ├── logging/
│   │   ├── log-colors.ts        # ANSI color configuration for logs
│   │   ├── logger.ts            # Centralized application logger
│   │   └── severity.ts          # Log severity levels
│   ├── database.ts              # Database connection configuration
│   └── env.ts                   # Environment variable loading & validation
│
├── db/
│   ├── schema/
│   │   └── users.schema.ts      # Drizzle ORM schema definitions
│   └── schema.ts                # Schema registry / exports
│
├── errors/
│   ├── client.error.ts          # 4xx error types
│   ├── generic.error.ts         # Base application error
│   └── server.error.ts          # 5xx error types
│
├── middlewares/
│   ├── error.middleware.ts      # Global error handler
│   ├── trace-id.middleware.ts   # Request correlation / trace ID injection
│   └── validate.middleware.ts   # Request validation middleware
│
├── modules/
│   └── users/
│       ├── users.controller.ts  # HTTP request handlers
│       ├── users.mapper.ts      # DTO ↔ domain transformations
│       ├── users.repository.ts  # Database access layer
│       ├── users.routes.ts      # Express route definitions
│       ├── users.service.ts     # Business logic
│       └── users.validation.ts  # Input validation schemas
│
├── types/
│   └── express.d.ts             # Express type augmentation
│
├── utils/                       # Shared utility functions
│
├── app.ts                       # Express app configuration
├── routes.ts                    # Global route registration
└── server.ts                    # HTTP server bootstrap
│
tests/                           # Automated tests
.env                             # Environment variables
drizzle.config.ts                # Drizzle ORM configuration
eslint.config.ts                 # ESLint configuration
```

---

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Installation

```bash
git clone https://github.com/mellwax/node-template.git
cd node-template
npm install
```

### Running Locally

```bash
npm run dev
```

---

## Error Handling

Errors are modeled explicitly:

- `generic.error.ts` → base classes (`HttpError` and `HttpListError`)

- `client.error.ts` → 4xx response classes

- `server.error.ts` → 5xx response classes

All errors propagate to `error.middleware.ts` which formats responses and logs appropriately.

---

## Logging

Logging is centralized via config/logging/logger.ts and supports:

- Severity levels
- ANSI color formatting
- Trace ID correlation via middleware

This enables structured logs suitable for both local debugging and production observability.

---

## Validation

Incoming requests are validated using schemas defined in:

```
modules/*/*.validation.ts
```

The validate.middleware.ts ensures malformed requests never reach business logic.

---

## Testing

Tests live in the tests/ directory and should cover:

- Services
- Repositories
- Validation logic

Use:

```bash
npm test
```

---

## Contributing

1. Fork the repository 
2. Create a feature branch 
3. Commit changes 
4. Open a Pull Request

All contributions should include tests and pass linting.

---

## License

MIT License
