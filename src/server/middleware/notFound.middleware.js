/* eslint-disable no-unused-vars */
/**
 *
 * @param {Request} request
 * @param {Response} response
 * @param {NextFunction} next
 */
const notFoundHandler = (
  request,
  response,
  next
) => {
  const message = 'Resource not found';

  response.redirect(301, '/');

  response.status(404).send(message);
};

module.exports = notFoundHandler;
