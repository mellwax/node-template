import type { UserCreateDto, UserUpdateDto } from "./users.validation.ts";
import { findAllUsers, findUserByEmail, findUserById, insertUser, updateUserById } from "./users.repository.ts";
import { ConflictError, NotFoundError } from "../../errors/client.error.ts";

export async function createUser(data: UserCreateDto) {
    const user = await findUserByEmail(data.email);
    if (user) {
        throw new ConflictError("User with email already exists");
    }

    return insertUser(data);
}

export async function getUser(id: number) {
    const user = await findUserById(id);

    if (!user) {
        throw new NotFoundError(`User with id ${id} not found`);
    }

    return user;
}

export async function getAllUsers() {
    return findAllUsers();
}

export async function updateUser(id: number, data: UserUpdateDto) {
    const toUpdate = await findUserById(id);

    if (!toUpdate) {
        throw new NotFoundError(`User with id ${id} does not exist`);
    }

    if (data.email !== toUpdate.email) {
        const users = await findUserByEmail(data.email);
        if (users !== null) {
            throw new ConflictError("User with email already exists");
        }
    }

    return updateUserById(id, data);
}
