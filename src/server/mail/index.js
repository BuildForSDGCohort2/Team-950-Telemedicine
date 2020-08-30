import nodemailer from 'nodemailer';

import { logger } from '../logger';
import config from "../config";

const { mail, isDev } = config;

const transporter = nodemailer.createTransport({
  host: mail.MAIL_HOST,
  port: mail.MAIL_PORT,
  auth: {
    user: mail.MAIL_USERNAME,
    pass: mail.MAIL_PASSWORD,
  },
  debug: isDev, // show debug output
  logger: isDev,
});


const MAILERS = {
  log: async (options) => logger.info(options, 'sending email'),
  smtp: async (options) => transporter.sendMail(options),
};


export default function mailer() {
  return MAILERS[mail.MAIL_MAILER];
}
