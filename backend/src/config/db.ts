import { Pool } from 'pg';
import dotenv from 'dotenv';


const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: Number(process.env.PORT),
})


export default pool;