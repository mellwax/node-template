import { createLogger, format, transports } from "winston";
import { getTraceId } from "../../middlewares/trace-id.middleware.ts";
import chalk from "chalk";
import { levelColor } from "./log-colors.js";
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, printf, errors, json } = format;

// Inject traceId into every log automatically
const traceFormat = format((info) => {
    const traceId = getTraceId();
    if (traceId) {
        info.traceId = traceId;
    }
    return info;
});

// Console formatter with colors, stacks, and validation errors
const consoleFormat = printf(
    ({ level, message, timestamp, traceId, stack, errors }) => {
        const color =
            levelColor[level as keyof typeof levelColor] ?? chalk.white;

        const stackTrace =
            stack && (level === "error" || level === "fatal")
                ? "\n" + chalk.dim(stack)
                : "";

        const validationErrors = errors
            ? "\n" + chalk.dim(JSON.stringify(errors))
            : "";

        return [
            chalk.dim(timestamp),
            color(level.toUpperCase()),
            traceId ? chalk.dim(`[traceId=${traceId}]`) : "",
            message,
            validationErrors,
            stackTrace
        ]
            .filter(Boolean)
            .join(" ");
    }
);

const errorRotateTransport = new DailyRotateFile({
    dirname: "logs",
    filename: "error-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    level: "error",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
    format: combine(errors({ stack: true }), timestamp(), json())
});

const combinedRotateTransport = new DailyRotateFile({
    dirname: "logs",
    filename: "combined-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    level: "info",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
    format: combine(errors({ stack: true }), timestamp(), json())
});

// Main logger
export const logger = createLogger({
    level: "info",
    format: combine(
        errors({ stack: true }), // preserve stack traces for Error objects
        traceFormat(),
        timestamp()
    ),
    transports: [
        // Console transport: human-readable with colors and stacks
        new transports.Console({
            format: combine(consoleFormat)
        }),
        errorRotateTransport,
        combinedRotateTransport
    ],
    exitOnError: false
});

export const log = logger;
