import express from 'express';
import authenticate from '../middlewares/authenticate.js';
import { getCurrentUserController, getUserByIdController, uploadAvatarController } from '../controllers/usersControllers.js';
import upload  from '../middlewares/uploadAvatar.js';

const usersRouter = express.Router();

usersRouter.get('/me', authenticate, getCurrentUserController);

usersRouter.get('/:id', getUserByIdController);

usersRouter.patch('/avatar', authenticate, upload.single('avatar'), uploadAvatarController);

export default usersRouter;