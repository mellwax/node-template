import { Severity } from "../config/logging/severity.ts";
import { HttpError } from "./generic.error.ts";

export class InternalServerError extends HttpError {
    public constructor(
        responseMessage: string = "Internal Server Error",
        internalMessage?: string,
        cause?: Error
    ) {
        super(500, responseMessage, Severity.CRITICAL, internalMessage, cause);

        this.name = "InternalServerError";
    }
}

export class UnimplementedError extends HttpError {
    public constructor(
        responseMessage: string = "Not implemented",
        internalMessage?: string,
        cause?: Error
    ) {
        super(501, responseMessage, Severity.WARN, internalMessage, cause);

        this.name = "UnimplementedError";
    }
}

export class BadGatewayError extends HttpError {
    public constructor(
        responseMessage: string = "Dependent service returned an invalid response",
        internalMessage?: string,
        cause?: Error
    ) {
        super(502, responseMessage, Severity.ERROR, internalMessage, cause);

        this.name = "BadGatewayError";
    }
}

export class ServiceUnavailableError extends HttpError {
    public constructor(
        responseMessage: string = "Service temporarily unavailable",
        internalMessage?: string,
        cause?: Error
    ) {
        super(503, responseMessage, Severity.ERROR, internalMessage, cause);
        this.name = "ServiceUnavailableError";
    }
}

export class PdfGenerationError extends InternalServerError {
    public constructor(
        responseMessage: string = "Failed to generate PDF",
        internalMessage?: string,
        cause?: Error
    ) {
        super(responseMessage, internalMessage, cause);

        this.name = "PdfGenerationError";
    }
}