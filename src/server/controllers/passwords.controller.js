import generateToken from '../util/token.generator';
import PasswordResets from '../models/password';
import mailer from '../mail';
import { userRepository } from '../repositories'
import { createPasswordResetEmailBody } from '../mail/email.helper';

const passwordResets = new PasswordResets();

const sendResetLink = async (email, token) => {
  const sendMail = mailer();
  sendMail(createPasswordResetEmailBody(email, token))
}

// ResetPasswordFlow
export const storeToken = async (req, res) => {
  try {
    const token = await generateToken();
    const { email } = req.body;
    await passwordResets.create({ token, email });
    await sendResetLink(email, token);
    return res.status(201).json({ status: 'success', message: 'A reset link has been sent to your email address' });
  } catch (error) {
    return res.status(401).json({ status: 'error', error: error.message });
  }
}

export const verifyToken = async (req, res) => {
  try {
    const token = req.params.token;
    const result = await passwordResets.getByField('token', token);
    if (result) {
      // check if the token has expired
      return res.status(200).json({ status: 'success', message: '' });
    }
  } catch (error) {
    return res.status(401).json({ status: 'error', error: '' });
  }
}


export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    await userRepository.resetPassword(email, password);
    return res.status(200).json({ status: 'success', message: 'Your password has been reset' });
  } catch (error) {
    return res.status(401).json({ status: 'error', error: error.message });
  }
}
