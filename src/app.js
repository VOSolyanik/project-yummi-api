import express from 'express';
import morgan from 'morgan';
import setupCors from './config/cors.js';
import 'dotenv/config';
import errorHandler from './middlewares/errorHandler.js';
import { swaggerUi, swaggerDocument } from './config/swagger.js';
import routes from './routes/index.js';

const app = express();

// middleware
app.use(morgan('tiny'));
app.use(setupCors());
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', routes);

app.use((_, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(errorHandler);

app.use((err, req, res, _next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

export default app;
