import { app } from './app.ts';
import { env } from './config/env.ts';
import { logger } from './config/logging/logger.ts';
import { pool } from "./config/database.ts";

app.listen(env.PORT, () => {
    logger.info(`Server running on port ${env.PORT}`);
});

const shutdown = async (signal: string) => {
    console.log(`Received ${signal}, shutting down...`);
    await pool.end();
    process.exit(0);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
process.on('SIGHUP', shutdown);
