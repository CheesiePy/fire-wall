import pool from '../config/db';
import { isValidUrl } from '../utils/validator';
import logger from '../config/logger';

// Function to get all URLs (this should not exist)
export const getAllUrlsService = async () => {
    const result = await pool.query('SELECT * FROM urls');
    return result;
};

export const addUrlService = async (values: string[], mode: string) => {
    const is_blacklisted = mode === 'blacklist';
    const is_whitelisted = mode === 'whitelist';

    const valid_urls: string[] = []; // Array to hold valid URLs

    for (const value of values) {
        if (isValidUrl(value)) {
            valid_urls.push(value);
            await pool.query('INSERT INTO urls (url, is_blacklisted, is_whitelisted) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING', [value, is_blacklisted, is_whitelisted]);
        } else {
            logger.warn(`Invalid URL address: ${value}`);
        }
    }

    return { type: 'url', mode: mode, values: valid_urls, status: 'success' };
};

export const deleteUrlService = async (values: string[], mode: string) => {
    const is_blacklisted = mode === 'blacklist';
    const is_whitelisted = mode === 'whitelist';

    const deleted_urls: string[] = []; // Array to hold deleted URLs
    let status = 'success';

    for (const value of values) {
        if (isValidUrl(value)) {
            await pool.query('DELETE FROM urls WHERE url = $1 AND is_blacklisted = $2 AND is_whitelisted = $3 RETURNING *', [value, is_blacklisted, is_whitelisted]);
            deleted_urls.push(value);
            logger.log('Deleting URL:', value, 'Mode:', mode);
        } else {
            logger.warn(`Invalid URL address: ${value}`);
        }
    }

    if (deleted_urls.length === 0) { status = 'error'; }

    return { type: 'url', mode: mode, values: deleted_urls, status: status };
};