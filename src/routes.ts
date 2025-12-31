import { Router } from "express";
import { usersRoutes } from "./modules/users/users.routes.ts";

export const routes = Router();

routes.use("/v1/users", usersRoutes);
