import Joi from 'joi';

export const listParamsSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(50).default(12),
  sortBy: Joi.string().valid('title', 'time', 'createdAt').default('createdAt'),
  sortDir: Joi.string().valid('asc', 'desc').default('desc'),
});