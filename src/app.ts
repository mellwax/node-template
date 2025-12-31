import express from 'express';
import { routes } from './routes.ts';
import { errorMiddleware } from './middlewares/error.middleware.ts';
import { traceIdMiddleware } from "./middlewares/trace-id.middleware.ts";

export const app = express();

app.use(express.json());
app.use(traceIdMiddleware);
app.use('/api', routes);
app.use(errorMiddleware);
