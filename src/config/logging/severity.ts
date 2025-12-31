/**
 * Represents the impact level of a log entry or error.
 *
 * Levels are ordered by increasing priority:
 * INFO < WARN < ERROR < CRITICAL
 */
export enum Severity {
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR",
    CRITICAL = "CRITICAL"
}
