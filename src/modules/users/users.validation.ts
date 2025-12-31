import { z } from 'zod';

export const createUserSchema = z.object({
    body: z.object({
        name: z.string().min(1),
        email: z.email(),
    }),
});

export type UserCreateDto = z.infer<typeof createUserSchema>['body'];

export const userIdSchema = z.object({
    params: z.object({
        id: z.string().regex(/^[1-9]\d*$/, 'ID must be a positive integer').transform(Number),
    })
});

export const updateUserSchema = z.object({
    body: z.object({
        name: z.string().min(1),
        email: z.email(),
    })
});

export type UserUpdateDto = z.infer<typeof updateUserSchema>['body'];
