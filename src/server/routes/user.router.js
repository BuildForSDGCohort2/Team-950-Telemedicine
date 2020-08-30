const express = require('express');
const userController = require('../controllers/user.controller');

const userRouter = express.Router();

// const myValidationResult = validationResult.withDefaults({
//   formatter: (error) => {
//     return error.msg;
//   }
// });

// // // middlewares
// userRouter.post('/signup', authValidationMidleware.validateSignUp(),
//   (req: Request, res: Response, next: NextFunction) => {
//     const errors = myValidationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(422).json({ status: "error", errors: errors.mapped() });
//     }
//     next();
//   });

// userRouter.post('/signin', authValidationMidleware.validateSignin(),
//   (req: Request, res: Response, next: NextFunction) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(422).json({ errors: errors.mapped() });
//     }
//     next();
//   });

// routes
userRouter.get('/', userController.index);
userRouter.get('/:id', userController.show);
userRouter.post('/', userController.create);
userRouter.put('/:id', userController.update);
userRouter.delete('/:id', userController.destroy);

module.exports = userRouter;
