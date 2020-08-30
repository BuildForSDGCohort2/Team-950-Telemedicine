import config from '../config';
import authRouter from './auth.router';
import userRouter from './user.router';

const { API_VERSION } = config;

export default function routes(app) {
  app.use(`/${API_VERSION}/auth`, authRouter);
  app.use(`/${API_VERSION}/users`, userRouter);
}
