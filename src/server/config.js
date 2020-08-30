import dotenv from 'dotenv';
import { env } from "./util/helper";

dotenv.config();

const APP_URL = env('APP_URL', 'http://localhost');
const PORT = Number.parseInt(env('PORT', 1234));
const API_VERSION = env('API_VERSION', 'api/v1');


const BASE_END_POINT = `${APP_URL}:${PORT}/${API_VERSION}`;

const AUTH_END_POINT = `${BASE_END_POINT}/auth`;
export const activateUserLink = token => `${AUTH_END_POINT}/activate/${token}`;
export const passwordResetLink = token => `${AUTH_END_POINT}/password/reset/${token}`;

export default {
  PORT,
  HOST: env('HOST', 'localhost'),
  isDev: env('NODE_ENV') !== 'production',
  isBrowser: typeof window !== 'undefined',
  mail: {
    MAIL_FROM: env('MAIL_FROM', '"Support Team" <support@example.com>'),
    MAIL_HOST: env('MAIL_HOST'),
    MAIL_PORT: env('MAIL_PORT'),
    MAIL_USERNAME: env('MAIL_USERNAME'),
    MAIL_PASSWORD: env('MAIL_PASSWORD'),
    MAIL_MAILER: env('MAIL_MAILER', 'log'),
  },
  APP_KEY: env('APP_KEY'),
  APP_URL,
  API_VERSION
};
