const bcrypt = require('bcrypt');

class PasswordManager {
  #saltRounds = 10;

  hash(password) {
    return bcrypt.hash(password, this.#saltRounds);
  }

  compare(hash, password) {
    return bcrypt.compare(password, hash);
  }

}

module.exports = new PasswordManager;
