import { bigint, boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().defaultNow(),
    locked: boolean().default(false).notNull(),
});

export type User = typeof users.$inferSelect;
