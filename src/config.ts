import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(
    (process.env.NODE_ENV === 'production')
      ? '.env'
      : '.env.development',
  ),
});

function required<T>(key: string, defaultValue = ''): T {
  if (!process.env[key] && typeof defaultValue === 'undefined') {
    throw new Error('Missing required environment variable: ' + key);
  }
  return process.env[key] as T || defaultValue as T;
}

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export const config = {
  NODE_ENV: required<string>('NODE_ENV'),
  MYSQL: {
    HOST: required<string>('MYSQL_HOST'),
    PORT: required<number>('MYSQL_PORT'),
    USER: required<string>('MYSQL_USER'),
    PASSWORD: required<string>('MYSQL_PASSWORD'),
    DATABASE: required<string>('MYSQL_DATABASE'),
  },
  JWT_SECRET: required<string>('JWT_SECRET'),
};
