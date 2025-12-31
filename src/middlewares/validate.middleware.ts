import type { NextFunction, Request, Response } from 'express';
import { InternalServerError } from "../errors/server.error.ts";

export const validate =
    (schema: unknown) =>
        (req: Request, _res: Response, next: NextFunction) => {
            if (!schema || typeof schema !== 'object' || !('parse' in schema)) {
                throw new InternalServerError(undefined, 'validate() requires a Zod schema');
            }

            (schema as { parse: (val: unknown) => unknown }).parse({
                body: req.body,
                params: req.params,
                query: req.query,
            });

            next();
        };
