import jwt from 'jsonwebtoken';

import config from 'server/config';
import { userRepository } from '../repositories';
import { errorResponse } from '../util/helper';

/**
 * The authentication controller
 */
function AuthController() {
  /**
   *
   * @param {userRepository} user
   * @param {String} key
   * @param {number} duration
   */
  const createUserToken = (
    // use the async version of jwt
    user,
    key = config.APP_KEY,
    duration = '24h'
  ) => {
    const token = jwt.sign(
      {
        user,
      },
      key,
      {
        expiresIn: duration,
      }
    );
    return token;
  };

  /**
   * Returns the authenticated user data
   * @param {userRepository} user
   */
  const authsuccessData = (user) => {
    const data = user;
    data.token = createUserToken(user);
    data.auth = true;
    return {
      status: 'success',
      data,
    };
  };

  /**
   * Responsible for authenticating a user
   * @param {Request} req
   * @param {Response} res
   */
  const signIn = async (req, res) => {
    try {
      const { user, password } = req.body;
      const result = await userRepository.pwdMgr.compare(user.password, password)
      if(result) {
        delete user.password;
        return res.status(200).json(authsuccessData(user));
      }
      return res.status(401).json({ status: 'error', message: 'These credentials do not match our records' });
    } catch (err) {
      return errorResponse(err, res);
    }
  };

  /**
   * Registers a user
   * @param {Request} req
   * @param {Response} res
   */
  const signUp = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await userRepository.create({ name, email, password });
      return res.status(201).json(authsuccessData(user));
    } catch (err) {
      return errorResponse(err, res);
    }
  };

  const activateUser = async (req, res) => {
    try {
      const result = await userRepository.user.activateUser(req.params.token);
      if (result) {
        return res.status(200).json({ status: 'success', message: 'Account activation successful' });
      }
      return res.status(401).json({ status: 'error', message: 'Account activation failed' });
    } catch (err) {
      return errorResponse(err, res);
    }
  };

  return Object.freeze({
    signIn,
    signUp,
    activateUser
  });
}

module.exports = AuthController();
