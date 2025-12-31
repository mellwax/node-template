import chalk from "chalk";

export const levelColor = {
    error: chalk.red,
    warn: chalk.yellow,
    info: chalk.blue,
    http: chalk.cyan,
    verbose: chalk.magenta,
    debug: chalk.gray,
    silly: chalk.gray
} as const;
