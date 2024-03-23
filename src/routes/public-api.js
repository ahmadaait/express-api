import express from 'express';
import healthController from '../controllers/health-controller.js';
import userController from '../controllers/user-controller.js';

const publicRouter = new express.Router();

// auth
publicRouter.post('/api/register', userController.register);
publicRouter.post('/api/login', userController.login);

// health
publicRouter.get('/ping', healthController.ping);

export { publicRouter };
