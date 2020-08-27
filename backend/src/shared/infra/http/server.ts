import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import rateLimiter from './middlewares/rateLimiter';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(rateLimiter);

app.use(cors());

app.use(express.json());

app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes); // middleware deixando todas as rotas passando por aqui antes

app.use(errors());
// Global exception hand
// No local onde seria o Next substituimos pelo underline que esta sendo
// ignorado pelo eslint
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    // No local onde seria o Next substituimos pelo underline que esta
    // verifica se o erro foi gerado pela NOSSA classe AppError
    // (se este erro é um erro gerado pela nossa aplicação)
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333');
});
