import dotenv from 'dotenv';

const envConfig = dotenv.config();

console.log('env was loaded');

if (envConfig.error) {
    throw envConfig.error;
}


export default envConfig;
