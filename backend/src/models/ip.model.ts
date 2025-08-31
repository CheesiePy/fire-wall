import pool from '../config/db';
import logger from '../config/logger';
import { isValidIp } from '../utils/validator';


// Function to get all IPs (this should not exist)
export const getAllIpsService = async () => {
    const result = await pool.query('SELECT * FROM ips');
    return result;
};

export const addIpService = async (values : string[], mode: string) => {
    const is_blacklisted = mode === 'blacklist';
    const is_whitelisted = mode === 'whitelist';

    const valid_ips: string[] = []; // Array to hold valid IPs
    let status = 'success';

    for (const value of values) {
        if(isValidIp(value)) {
            valid_ips.push(value);
            await pool.query('INSERT INTO ips (ip, is_blacklisted, is_whitelisted) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING', [value, is_blacklisted, is_whitelisted]);
        }else{
            logger.warn(`Invalid IP address: ${value}`);
        }
    }
    // if none of the values were valid turn status to error
    if (valid_ips.length === 0) {
        status = 'error';
    }

    return { type: 'ip', mode: mode, values: valid_ips, status: status };
};

export const deleteIpService = async (values : string[], mode : string) => {
    const is_blacklisted = mode === 'blacklist';
    const is_whitelisted = mode === 'whitelist';

    for (const value of values) {
        logger.log('Deleting IP:', value, 'Mode:', mode);
        await pool.query('DELETE FROM ips WHERE ip = $1 AND is_blacklisted = $2 AND is_whitelisted = $3 RETURNING *', [value, is_blacklisted, is_whitelisted]);
    }

    return { type: 'ip', mode: mode, values: values, status: 'success' };
};

