import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import  env  from './env';
import logger from './logger';
import * as schema from '../types/schemas';


class Database {
    private static instance: NodePgDatabase<typeof schema>;
    private static pool: Pool;

    private constructor() { }

    public static getInstance(): NodePgDatabase<typeof schema> {
        if (!Database.instance) {
            Database.pool = new Pool({
                user: env.DB_USER,
                host: env.DB_HOST,
                database: env.DB_NAME,
                password: env.DB_PASSWORD,
                port: Number(env.DB_PORT)
            });

            logger.info('Database connection pool created ✅');

            Database.pool.on('connect', () => {
                logger.info('Connected to the database ✅');
            });
            Database.instance = drizzle(Database.pool, { schema });
        }
        return Database.instance;
    }

}

export const db = Database.getInstance();