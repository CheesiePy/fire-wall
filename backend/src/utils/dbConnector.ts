import { db } from '../config/db';
import { sql } from 'drizzle-orm';
import logger from '../config/logger';
import env from '../config/env';

const connectionInterval = parseInt(env.DB_CONNECTION_INTERVAL as string, 10) || 5000;

export const connectWithRetry = async (): Promise<void> => {
    try {
        await db.execute(sql`SELECT 1`);
        logger.info('Database connection established successfully.✅');
    } catch (error) {
        logger.error('Database connection failed:', error, 'Retrying in', connectionInterval, 'ms...⏳');
        await new Promise(res => setTimeout(res, connectionInterval));
        await connectWithRetry();
    }
};
