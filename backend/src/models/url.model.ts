import pool from '../config/db';

// Function to get all URLs (this should not exist)
export const getAllUrlsService = async () => {
    const result = await pool.query('SELECT * FROM urls');
    return result;
};

export const addUrlService = async (values: string[], mode: string) => {
    const is_blacklisted = mode === 'blacklist';
    const is_whitelisted = mode === 'whitelist';

    for (const value of values) {
        await pool.query('INSERT INTO urls (url, is_blacklisted, is_whitelisted) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING', [value, is_blacklisted, is_whitelisted]);
    }

    return { type: 'url', mode: mode, values: values, status: 'success' };
};

export const deleteUrlService = async (values: string[], mode: string) => {
    const is_blacklisted = mode === 'blacklist';
    const is_whitelisted = mode === 'whitelist';

    for (const value of values) {
        await pool.query('DELETE FROM urls WHERE url = $1 AND is_blacklisted = $2 AND is_whitelisted = $3 RETURNING *', [value, is_blacklisted, is_whitelisted]);
    }

    return { type: 'url', mode: mode, values: values, status: 'success' };
};