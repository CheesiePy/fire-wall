import pool from '../config/db';


// Function to get all IPs (this should not exist)
export const getAllIpsService = async () => {
    const result = await pool.query('SELECT * FROM ips');
    return result;
};

export const addIpService = async (values : string[], mode: string) => {
    const is_blacklisted = mode === 'blacklist';
    const is_whitelisted = mode === 'whitelist';

    for (const value of values) {
        await pool.query('INSERT INTO ips (ip, is_blacklisted, is_whitelisted) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING', [value, is_blacklisted, is_whitelisted]);
    }

    return { type: 'ip', mode: mode, values: values, status: 'success' };
};

export const deleteIpService = async (values : string[], mode : string) => {
    const is_blacklisted = mode === 'blacklist';
    const is_whitelisted = mode === 'whitelist';

    for (const value of values) {
        console.log('Deleting IP:', value, 'Mode:', mode);
        await pool.query('DELETE FROM ips WHERE ip = $1 AND is_blacklisted = $2 AND is_whitelisted = $3 RETURNING *', [value, is_blacklisted, is_whitelisted]);
    }

    return { type: 'ip', mode: mode, values: values, status: 'success' };
};

