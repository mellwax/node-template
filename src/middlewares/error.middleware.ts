import type { NextFunction, Request, Response } from "express";
import { HttpError, HttpListError } from "../errors/generic.error.js";
import { STATUS_CODES } from "http";
import { ValidationError } from "../errors/client.error.js";
import { ZodError } from "zod";
import { log } from "../config/logging/logger.js";
import { InternalServerError } from "../errors/server.error.js";

export interface ApiErrorResponse {
    status: number;
    error: string;
    message: string;
    timestamp: string;
    path: string;
    errors?: string[] | null;
}

export function errorMiddleware(
    err: unknown,
    req: Request,
    res: Response,
    _next: NextFunction
) {
    const httpError = parseUnknownError(err);

    const errorData: ApiErrorResponse = {
        status: httpError.status,
        error: getStatusCodeName(httpError.status),
        message: httpError.responseMessage,
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
        errors: getErrorsList(httpError)
    };

    if (getStatusCodeClass(httpError.status) === 4) {
        log.warn(httpError);
    } else {
        log.error(httpError);
    }

    res.status(errorData.status).json(errorData);
}

function parseUnknownError(err: unknown): HttpError {
    let httpError: HttpError;

    if (err instanceof ZodError) {
        log.warn(err.cause);
        httpError = new ValidationError(err.issues.map((i) => `[${i.path.join(".")}]: ${i.message}`));
    } else if (!(err instanceof HttpError)) {
        httpError = new InternalServerError(
            undefined,
            err instanceof Error ? err.message : JSON.stringify(err)
        );

        if (err instanceof Error && err.stack) {
            httpError.stack = err.stack;
        }
    } else {
        httpError = err;
    }

    return httpError;
}

function getStatusCodeClass(code: number): number {
    return Math.floor(code / 100);
}

function getStatusCodeName(code: number): string {
    return STATUS_CODES[code] ?? "Unknown Error";
}

function getErrorsList(error: HttpError): string[] | null | undefined {
    if (error instanceof HttpListError) {
        return error.errors;
    }

    return undefined;
}