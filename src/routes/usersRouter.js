import express from 'express';
import authenticate from '../middlewares/authenticate.js';
import { getCurrentUserController, getUserByIdController, uploadAvatarController } from '../controllers/usersControllers.js';
import { upload } from '../middlewares/uploadAvatar.js';
import express from 'express';
import { getUserRecipes, getUserFavoriteRecipes } from '../controllers/usersController.js';
import validateQuery from '../middlewares/validateQuery.js';
import { listParamsSchema } from '../schemas/userRecipesSchemas.js';


const usersRouter = express.Router();

usersRouter.get('/me', authenticate, getCurrentUserController);

usersRouter.get('/:id', getUserByIdController);

usersRouter.patch('/avatar', authenticate, upload.single('avatar'), uploadAvatarController);

usersRouter.get('/:id/recipes', validateQuery(listParamsSchema), getUserRecipes);

usersRouter.get('/:id/favorites', validateQuery(listParamsSchema), getUserFavoriteRecipes);

export default usersRouter;