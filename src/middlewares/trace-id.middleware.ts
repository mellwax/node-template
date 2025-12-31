import { AsyncLocalStorage } from "node:async_hooks";
import type { Request, Response, NextFunction } from "express";
import { v4 } from "uuid";

export interface TraceContext {
    traceId: string;
}

export const traceStorage = new AsyncLocalStorage<TraceContext>();

export function getTraceId(): string | undefined {
    return traceStorage.getStore()?.traceId;
}

const TRACE_HEADER = "x-trace-id";

export function traceIdMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const incomingTraceId =
        req.header(TRACE_HEADER) ?? req.header(TRACE_HEADER.toUpperCase());

    const traceId =
        incomingTraceId || getUniqueId().split("-").pop() || getUniqueId();

    traceStorage.run({ traceId }, () => {
        // Expose trace ID to clients
        res.setHeader(TRACE_HEADER, traceId);
        next();
    });
}

function getUniqueId(): string {
    return v4();
}