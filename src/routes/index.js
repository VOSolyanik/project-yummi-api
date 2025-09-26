import express from 'express';
import authRouter from './authRouter.js';
import areasRouter from './areasRouter.js';
import categoriesRouter from './categoriesRouter.js';
import ingredientsRouter from './ingredientsRouter.js';
import testimonialsRouter from './testimonialsRouter.js';
import recipeRouter from './recipeRouter.js';

const router = express.Router();

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

router.use('/auth', authRouter);

router.use('/recipes', recipeRouter);

router.use('/categories', categoriesRouter);

router.use('/areas', areasRouter);

router.use('/ingredients', ingredientsRouter);

router.use('/testimonials', testimonialsRouter);

export default router;
