const { body } = require('express-validator');
const { userRepository } = require('../repositories');
const HttpException = require('../exceptions/http-exception');

const msg = 'These credentials do not match our records';

const validateSignin = () => [
  body('email')
    .isEmail()
    .normalizeEmail()
    .custom((value, { req }) =>
      userRepository.findUserByEmail(value).then((user) => {
        if (!user) {
          return Promise.reject(msg);
        } else {
          req.body.user = user;
        }
      }),
    ),
  body('password').isLength({ min: 8 }).withMessage(msg),
];

const validateSignUp = () => [
  body('name')
    .not()
    .isEmpty()
    .trim()
    .isLength({ min: 3 })
    .withMessage('The name field must contain at least 3 characters')
    .escape(),
  body('email')
    .isEmail()
    .normalizeEmail()
    .custom((value) =>
      userRepository.findUserByEmail(value).then((user) => {
        if (user) {
          return Promise.reject('oops!. E-mail already in use');
        }
      }),
    ),
  body('password').isLength({ min: 8 }),
  body('password_confirmation')
    .isLength({ min: 8 })
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new HttpException(
          422,
          'oops!. Password confirmation does not match password',
        );
      }
      return true;
    }),
];

module.exports = { validateSignin, validateSignUp };
