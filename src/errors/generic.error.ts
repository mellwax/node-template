import { Severity } from "../config/logging/severity.ts";

export abstract class HttpError extends Error {
    public readonly status: number;
    public readonly responseMessage: string;
    public readonly severity: Severity;

    protected constructor(
        status: number = 500,
        responseMessage: string = "An unexpected error has occurred",
        severity: Severity = Severity.ERROR,
        internalMessage?: string,
        cause?: Error
    ) {
        super(!internalMessage ? responseMessage : internalMessage, { cause: cause });

        this.status = status;
        this.responseMessage = responseMessage;
        this.severity = severity;

        this.name = "HttpError";
    }
}

export abstract class HttpListError extends HttpError {
    public readonly errors: string[];

    protected constructor(
        status: number,
        responseMessage: string,
        errors: string[],
        severity: Severity = Severity.ERROR,
        internalMessage?: string,
        cause?: Error
    ) {
        super(status, responseMessage, severity, internalMessage, cause);

        this.errors = errors;

        this.name = "HttpListError";
    }
}