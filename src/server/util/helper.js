/* eslint-disable no-underscore-dangle */
import HttpException from '../exceptions/http-exception';

/**
 * Useful as a replacement for optional chaining
 * @param {*} value
 */
const isNullOrUndefined = (value) => value === null || value === undefined;

function nullCoalescingOperator(value, replacement) {
  return (value !== null && value !== undefined ? value : replacement);
}

const env = (key, defaultValue) => {
  if (key === '') throw new Error('key must not be an empty string');
  // const res = nullCoalescingOperator(process.env[key], defaultValue);
  const res = process.env[key] ?? defaultValue;
  if (res) return res;
  throw new Error('default value cannot be null or undefined');
};

const errorResponse = (err, res) => {
  if (err instanceof HttpException) return res.status(err.statusCode).json(err);
  return res.status(500).json(new HttpException(500, err.message, err.message));
};

const isPureObject = (item) => !Array.isArray(item) && typeof item === 'object' && item !== null;

module.exports = {
  env, errorResponse, isPureObject, isNullOrUndefined, nullCoalescingOperator
};
