import moment from 'moment';

import Model from './model';
import UserObserver from 'server/observers/user.observer';
import mailer from 'server/mail';
import { createVerifyAccountEmailBody } from '../mail/email.helper';


class User extends Model {
  constructor() {
    const tableName = 'users';
    super(tableName, [
      'id',
      'name',
      'email',
      'is_admin',
      'created_at',
      'updated_at'
    ], new UserObserver(tableName));
  }

  storeVerificationToken(id, token) {
    const data = { token, expires_at: moment().add(1, 'week').toDate() }
    this.update({ id }, data);
  }

  async activateUser(token){
    const user = await this.getByField('token', token);
    if(!user) return false;

    if(moment().toDate() > user.expires_at) return false;

    const data = { email_verified_at: moment().toDate(), expires_at: null, token: null };
    await this.update({ id: user.id }, data);
    return true;
  }

  sendMail(email, token) {
    const sendMail = mailer();
    createVerifyAccountEmailBody(email, token)
      .then((mailBody) => {
        sendMail(mailBody)
          .then((res) => console.log('Mail sent successfully ' + res))
          .catch(console.log);
      })
      .catch(console.log);
  }
}

module.exports = new User();
