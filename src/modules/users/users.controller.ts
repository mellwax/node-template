import type { NextFunction, Request, Response } from 'express';
import { createUser, getAllUsers, getUser, updateUser } from "./users.service.ts";
import { toDto } from "./users.mapper.ts";

export async function createUserController(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await createUser(req.body);
        res.status(201).json(toDto(user));
    } catch (e) {
        next(e);
    }
}

export async function getUserController(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const user = await getUser(id);

        res.json(toDto(user));
    } catch (e) {
        next(e);
    }
}

export async function getAllUsersController(req: Request, res: Response, next: NextFunction) {
    try {
        const users = await getAllUsers();

        res.json(users.map(toDto));
    } catch (e) {
        next(e);
    }
}

export async function updateUserController(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const user = await updateUser(id, req.body);

        res.json(toDto(user));
    } catch (e) {
        next(e);
    }
}
