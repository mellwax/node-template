import { Severity } from "../config/logging/severity.ts";
import { HttpError, HttpListError } from "./generic.error.ts";

export class BadRequestError extends HttpError {
    public constructor(
        responseMessage: string = "Bad request",
        internalMessage?: string,
        cause?: Error
    ) {
        super(400, responseMessage, Severity.INFO, internalMessage, cause);

        this.name = "BadRequestError";
    }
}

export class UnauthenticatedError extends HttpError {
    public constructor(
        responseMessage: string = "Authentication required",
        internalMessage?: string,
        cause?: Error
    ) {
        super(401, responseMessage, Severity.INFO, internalMessage, cause);

        this.name = "UnauthenticatedError";
    }
}

export class AccessDeniedError extends HttpError {
    public constructor(
        responseMessage: string = "Access denied",
        internalMessage?: string,
        cause?: Error
    ) {
        super(403, responseMessage, Severity.WARN, internalMessage, cause);

        this.name = "AccessDeniedError";
    }
}

export class NotFoundError extends HttpError {
    public constructor(
        responseMessage: string = "Resource not found",
        internalMessage?: string,
        cause?: Error
    ) {
        super(404, responseMessage, Severity.INFO, internalMessage, cause);

        this.name = "NotFoundError";
    }
}

export class ConflictError extends HttpError {
    public constructor(
        responseMessage: string = "Resource conflict",
        internalMessage?: string,
        cause?: Error
    ) {
        super(409, responseMessage, Severity.WARN, internalMessage, cause);

        this.name = "ConflictError";
    }
}

export class ValidationError extends HttpListError {
    public constructor(
        errors: string[],
        responseMessage: string = "Validation failed",
        internalMessage?: string,
        cause?: Error
    ) {
        super(
            422,
            responseMessage,
            errors,
            Severity.INFO,
            internalMessage,
            cause
        );

        this.name = "ValidationError";
    }
}

export class RateLimitError extends HttpError {
    public constructor(
        responseMessage: string = "Too many requests",
        internalMessage?: string,
        cause?: Error
    ) {
        super(429, responseMessage, Severity.WARN, internalMessage, cause);

        this.name = "RateLimitError";
    }
}