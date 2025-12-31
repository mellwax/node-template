import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware.ts";
import { createUserSchema, userIdSchema, updateUserSchema } from "./users.validation.ts";
import {
    createUserController,
    getAllUsersController,
    getUserController,
    updateUserController
} from "./users.controller.ts";

export const usersRoutes = Router();

usersRoutes.get("/", getAllUsersController);

usersRoutes.post("/", validate(createUserSchema), createUserController);

usersRoutes.get("/:id", validate(userIdSchema), getUserController);

usersRoutes.patch("/:id", validate(userIdSchema), validate(updateUserSchema), updateUserController);
