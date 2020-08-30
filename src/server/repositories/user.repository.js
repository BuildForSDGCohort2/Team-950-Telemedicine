import passwordMgr from '../util/password.manager';
import { user } from '../models';
// import redisCacheMgr from '../cache/cache.manager';
import generateToken from '../util/token.generator';


class UserRepository {
  #user;
  #pwdMgr;

  constructor(user, pwdMgr) {
    this.#user = Object.freeze(user);
    this.#pwdMgr = Object.freeze(pwdMgr);
  }

  async all() {
    return await this.#user.all();
  }

  get user() { return this.#user; }
  get pwdMgr() { return this.#pwdMgr; }

  async create(data) {
    data.password = await this.#pwdMgr.hash(data.password);
    const user = await this.#user.create(data);
    await this.initiateActivation(user);
    return user;
  }

  async findUserByEmail(email) {
    return await this.#user.getByField('email', email);
  }

  async exist(email) {
    return (await this.findUserByEmail(email)) !== undefined;
  }

  async initiateActivation(user) {
    const token = await generateToken();
    this.#user.storeVerificationToken(user.id, token);
    this.#user.sendMail(user.email, token);
  }

  async resetPassword(email, newPassword) {
    const password = await this.#pwdMgr.hash(newPassword);
    this.#user.update({ email }, { password });
  }


}

module.exports = new UserRepository(user, passwordMgr);
