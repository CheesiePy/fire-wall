import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import  env  from './env';
import logger from './logger';
import * as schema from '../types/schemas';


const pool = new Pool({
    user: env.DB_USER,
    host: env.DB_HOST,
    database: env.DB_NAME,
    password: env.DB_PASSWORD,
    port: Number(env.DB_PORT)
});

logger.info('Database connection pool created ✅');

pool.on('connect', () => {
    logger.info('Connected to the database ✅');
});

export const db = drizzle(pool, { schema });