const { userRepository } = require('../repositories');
const { errorResponse } = require('../util/helper');

/**
 * Returns a list of all users
 * @param {Request} req
 * @param {Response} res
 */
const index = async (req, res) => {
  try {
    return res.status(200).json(await userRepository.all());
  } catch (error) {
    return errorResponse(error, res);
  }
};

/**
 * Returns a single user
 * @param {Request} req
 * @param {Response} res
 */
const show = async (req, res) => {
  try {
    return res.status(200).json(await userRepository.get(+req.params.id));
  } catch (error) {
    return errorResponse(error, res);
  }
};

/**
 * creates a user (accessible only by the admins)
 * @param {Request} req
 * @param {Response} res
 */
const create = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userRepository.create({ name, email, password });
    return res.status(201).json(user);
  } catch (err) {
    return errorResponse(err, res);
  }
};

/**
 * updates a given user
 * @param {Request} req
 * @param {Response} res
 */
const update = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await userRepository.user.update({ id: +req.params.id }, { name });
    return res.status(201).json(user);
  } catch (err) {
    return errorResponse(err, res);
  }
};

/**
 * deletes a user from the database
 * @param {Request} req
 * @param {Response} res
 */
const destroy = async (req, res) => {
  try {
    const result = await userRepository.destroy(+req.params.id);
    return res.status(201).json(result);
  } catch (err) {
    return errorResponse(err, res);
  }
};

module.exports = Object.freeze({
  index, create, show, update, destroy
});
