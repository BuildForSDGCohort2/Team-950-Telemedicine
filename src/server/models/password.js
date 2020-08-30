import Model from './model';

export default class PasswordReset extends Model {

  constructor() {
    super('password_resets', [ 'email', 'token', 'created_at'])
  }

}
