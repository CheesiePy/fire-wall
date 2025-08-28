import { Pool } from 'pg';
import envConfig from './env';

const env_variables = envConfig.parsed; // Ensure environment variables are loaded and accessible


const pool = new Pool({
    user: env_variables?.DB_USER,
    host: env_variables?.DB_HOST,
    database: env_variables?.DB_NAME,
    password: env_variables?.DB_PASSWORD,
    port: Number(env_variables?.DB_PORT)
});

console.log('Database connection pool created');



pool.on('connect', () => {
    console.log('Connected to the database');
});

export default pool;