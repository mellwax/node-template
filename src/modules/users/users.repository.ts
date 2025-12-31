import { users } from "../../db/schema/users.schema.ts";
import { db } from "../../config/database.ts";
import { eq } from "drizzle-orm";
import type { UserCreateDto, UserUpdateDto } from "./users.validation.ts";

export async function insertUser(data: UserCreateDto) {
    const [row] = await db.insert(users).values(data).returning();

    return row ?? null;
}

export async function findUserById(id: number) {
    const [row] = await db.select().from(users).where(eq(users.id, id)).limit(1);

    return row ?? null;
}

export async function findAllUsers() {
    return db.select().from(users);
}

export async function updateUserById(id: number, data: UserUpdateDto) {
    const [row] = await db.update(users).set({
        ...data,
        updatedAt: new Date(),
    }).where(eq(users.id, id)).returning();

    return row ?? null;
}

export async function findUserByEmail(email: string) {
    const [row] = await db.select().from(users).where(eq(users.email, email));

    return row ?? null;
}
