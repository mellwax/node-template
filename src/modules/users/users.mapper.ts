import type { User } from "../../db/schema/users.schema.ts";

export interface UserDto {
    id: number;
    name: string;
    email: string;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export function toDto(user: User | null): UserDto | null {
    if (!user) return null;

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }
}
