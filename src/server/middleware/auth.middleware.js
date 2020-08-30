/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import config from 'server/config';

// Check to make sure header is not undefined, if so, return Forbidden (403)
const checkToken = (req, res, next) => {
  const header = req.headers.authorization;
  if (typeof header !== 'undefined') {
    const bearer = header.split(' ');
    const token = bearer[1];
    req.body.token = token;
    next();
  } else {
    return res.status(401).send('Token not present or invalid token');
  }
};

// verify the token and check if user is admin
const verifyToken = (req, res, next) => {
  jwt.verify(
    req.body.token,
    config.APP_KEY,
    (err, decoded) => {
      if (err) {
        return res.status(401).send(err.message);
      }
      if (decoded.user.is_admin) {
        req.body.is_admin = true;
      } else {
        req.body.is_admin = false;
      }
      next();
    }
  );
};

const isAdmin = (req, res, next) => {
  if (req.body.is_admin) {
    next();
  } else {
    return res.status(403).send('Forbidden');
  }
};

module.exports = function applyAuthMiddlewares(
  checkAdminStatus = false
) {
  if (checkAdminStatus) return [checkToken, verifyToken, isAdmin];
  return [checkToken, verifyToken];
};
