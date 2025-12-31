import 'dotenv/config';
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { env } from "./env.ts";

export const pool = new Pool({
    connectionString: env.DATABASE_URL,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
    keepAlive: true
});

export const db = drizzle({ client: pool });
