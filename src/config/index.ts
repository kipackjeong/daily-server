import { config } from 'dotenv';

try {
  config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
} catch (error) {
  console.log('There is problem a with importing configs');
  console.log(error);
}
export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, DB_URL, DB_HOST, DB_PORT, DB_DATABASE, JWT_KEY: SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;
