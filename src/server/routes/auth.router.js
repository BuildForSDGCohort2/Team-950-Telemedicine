import express from 'express';
import { validationResult } from 'express-validator';

import AuthController from '../controllers/auth.controller';
import { storeToken, verifyToken, resetPassword } from '../controllers/passwords.controller';
import authValidationMidleware from '../middleware/auth.validation.middleware';

/**
 * Router Definition
 */
const authRouter = express.Router();

const errorFormatter = error => error.msg;

// // middlewares
authRouter.post('/signup', authValidationMidleware.validateSignUp(),
  (req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(422).json({ status: 'error', errors: errors.mapped() });
    }
    next();
  });

authRouter.post('/signin', authValidationMidleware.validateSignin(),
  (req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(422).json({ status: 'error', errors: errors.mapped() });
    }
    next();
  });

// routes
authRouter.post('/signin', AuthController.signIn);
authRouter.post('/signup', AuthController.signUp);
authRouter.get(`/activate/:token`, AuthController.activateUser);

authRouter.post('/password/email', storeToken);
authRouter.get('/password/reset/:token', verifyToken);
authRouter.post('/password/reset', resetPassword);

module.exports = authRouter;
