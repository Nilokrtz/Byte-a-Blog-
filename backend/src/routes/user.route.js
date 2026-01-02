import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import { validId, validUser } from '../middlewares/global.middlewares.js';

const route = Router();

route.post('/', userController.createController);
route.get('/', userController.findAllController);
route.get('/:id', validId, validUser, userController.findByIdController);
route.patch('/:id', validId, validUser, userController.updateController);

export default route;