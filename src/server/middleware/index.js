const errorHandler = require('./error.middleware');
const notFoundHandler = require('./notFound.middleware');
const authMiddleware = require('./auth.middleware');
const authValidatorMiddleware = require('./auth.validation.middleware');

module.exports = {
  errorHandler, notFoundHandler, authMiddleware, authValidatorMiddleware
};
