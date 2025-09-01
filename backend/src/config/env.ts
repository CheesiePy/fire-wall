import * as dotenv from 'dotenv';
import logger from './logger';

dotenv.config();
logger.info('Environment variables loaded from .env file ✅');

const getEnvVariables = (name: string, defaultValue?: string) => {
    const value = process.env[name] || defaultValue;
    if (!value) {
        logger.error(`Environment variable ${name} is not defined ❌`);
    }
    return value;
};

const env = Object.freeze({
    PORT: getEnvVariables('PORT'),
    LOG_LEVEL: getEnvVariables('LOG_LEVEL'),
    DB_USER: getEnvVariables('DB_USER'),
    DB_PASSWORD: getEnvVariables('DB_PASSWORD'),
    DB_HOST: getEnvVariables('DB_HOST'),
    DB_PORT: getEnvVariables('DB_PORT'),
    DB_NAME: getEnvVariables('DB_NAME'),
    ENV: getEnvVariables('ENV'),
    DATABASE_URL: getEnvVariables('DATABASE_URL'),
    DB_CONNECTION_INTERVAL: getEnvVariables('DB_CONNECTION_INTERVAL', '5000'),
});

export default env;
