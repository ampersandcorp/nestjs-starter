import dotenv from 'dotenv';
import path from 'path';

function getEnvironmentFilePath(): string {
  switch (process.env.NODE_ENV) {
    case 'production':
    case 'development':
      return '.env';
    case 'local_development':
      return '.env.local_development';
    case 'local_production':
      return '.env.local_production';
    case 'local':
      return '.env.local';
    default:
      return '.env';
  }
}

dotenv.config({
  path: path.resolve(getEnvironmentFilePath()),
});

function required<T>(key: string, defaultValue = ''): T {
  if (!process.env[key] && typeof defaultValue === 'undefined') {
    throw new Error('Missing required environment variable: ' + key);
  }
  return process.env[key] as T || defaultValue as T;
}

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const IS_TEST = process.env.NODE_ENV === 'test';
export const IS_LOCAL = process.env.NODE_ENV ? process.env.NODE_ENV.toString().startsWith('local') : false;

export const config = {
  NODE_ENV: required<string>('NODE_ENV'),
  JWT_SECRET: required<string>('JWT_SECRET'),
  AES_SECRET: required<string>('AES_SECRET'),
};

console.log(`[CONFIGURATION] Initialized from ${getEnvironmentFilePath()}`);
console.log(`[CONFIGURATION] RUNNING NODE ENV: ${config.NODE_ENV}`);
