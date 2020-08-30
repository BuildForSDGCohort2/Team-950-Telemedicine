/* eslint-disable no-unused-vars */
// const express = require('express');
const HttpException = require('../exceptions/http-exception');

/**
 *
 * @param {HttpException} error
 * @param {Request} request
 * @param {Response} response
 * @param {NextFunction} next
 */
const errorHandler = (
  error,
  request,
  response,
  next
) => {
  const status = error.statusCode || 500;
  const message = error.message || "It's not you. It's us. We are having some problems.";

  response.status(status).send(message);
};

module.exports = errorHandler;
