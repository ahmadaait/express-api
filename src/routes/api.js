import express from 'express';
import userController from '../controllers/user-controller.js';
import { authMiddleware } from '../middleware/auth-middleware.js';

const protectedRouter = new express.Router();
protectedRouter.use(authMiddleware);

// users
protectedRouter.get('/api/users/current', userController.get);
protectedRouter.patch('/api/users/current', userController.update);
protectedRouter.delete('/api/logout', userController.logout);

export { protectedRouter };
