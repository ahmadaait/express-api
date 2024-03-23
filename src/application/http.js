import express from 'express';
import { errorMiddleware } from '../middleware/error-middleware.js';
import { protectedRouter } from '../routes/api.js';
import { publicRouter } from '../routes/public-api.js';

export const http = express();
http.use(express.json());

//* PUBLIC ROUTER FIRST *//
http.use(publicRouter);
http.use(protectedRouter);

http.use(errorMiddleware);
