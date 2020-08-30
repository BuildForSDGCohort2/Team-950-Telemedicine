import config, { activateUserLink, passwordResetLink } from '../config';

/**
 *
 * @param {string} to
 * @param {string} from
 * @param {string} token
 */
export const createVerifyAccountEmailBody = async (to, token) => {
  if (to === null || to === undefined) throw new Error("please provide a valid email address");

  const link = `${activateUserLink}/${token}`;
  const subject = 'Verify your email address';
  const text = `Please click <a href="'${link}'"> here </a> to verify your email address`;
  const html = `Please click <a href="'${link}'"> here </a> to verify your email address`;
  return {
    to,
    from: config.mail.MAIL_FROM,
    subject,
    text,
    html,
  };
}

export const createPasswordResetEmailBody = async (to, token) => {
  if (to === null || to === undefined) throw new Error("please provide a valid email address");

  const link = `${passwordResetLink}/${token}`;
  const subject = 'Here is your password reset link';
  const text = `You received this message because a password reset request was made via your account.
  Please ignore if you did not make the request. Click <a href="'${link}'"> here </a> to reset your password`;
  const html = `You received this message because a password reset request was made via your account.
  Please ignore if you did not make the request. Click <a href="'${link}'"> here </a> to reset your password`;
  return {
    to,
    from: config.mail.MAIL_FROM,
    subject,
    text,
    html,
  };
}
