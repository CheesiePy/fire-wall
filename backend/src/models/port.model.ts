import pool from '../config/db';

// Function to get all ports (this should not exist)
export const getAllPortsService = async () => {
    const result = await pool.query('SELECT * FROM ports');
    return result;
};

export const addPortService = async (values: number[], mode: string) => {
    const is_blacklisted = mode === 'blacklist';
    const is_whitelisted = mode === 'whitelist';

    for (const value of values) {
        await pool.query('INSERT INTO ports (port, is_blacklisted, is_whitelisted) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING', [value, is_blacklisted, is_whitelisted]);
    }

    return { type: 'port', mode: mode, values: values, status: 'success' };
};

export const deletePortService = async (values: number[], mode: string) => {
    const is_blacklisted = mode === 'blacklist';
    const is_whitelisted = mode === 'whitelist';

    for (const value of values) {
        console.log('Deleting Port:', value, 'Mode:', mode);
        await pool.query('DELETE FROM ports WHERE port = $1 AND is_blacklisted = $2 AND is_whitelisted = $3 RETURNING *', [value, is_blacklisted, is_whitelisted]);
    }

    return { type: 'port', mode: mode, values: values, status: 'success' };
};
