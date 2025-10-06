import HttpError from '../utils/HttpError.js';

const validateBody = schema => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      console.error('Validation error:', error.details);
      return next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

export default validateBody;
