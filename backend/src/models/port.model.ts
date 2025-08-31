import pool from '../config/db';
import logger from '../config/logger';
import { isValidPort } from '../utils/validator';
// Function to get all ports (this should not exist)
export const getAllPortsService = async () => {
    const result = await pool.query('SELECT * FROM ports');
    return result;
};

export const addPortService = async (values: string[], mode: string) => {
    const is_blacklisted = mode === 'blacklist';
    const is_whitelisted = mode === 'whitelist';

    const valid_ports: string[] = []; // Array to hold valid ports
    let status = 'success';

    for (const value of values) {
        if (isValidPort(value)) {
            valid_ports.push(value);
            await pool.query('INSERT INTO ports (port, is_blacklisted, is_whitelisted) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING', [value, is_blacklisted, is_whitelisted]);
        }
    }

    if (valid_ports.length === 0) {
        status = 'error';
    }

    return { type: 'port', mode: mode, values: valid_ports, status: status };
};

export const deletePortService = async (values: string[], mode: string) => {
    const is_blacklisted = mode === 'blacklist';
    const is_whitelisted = mode === 'whitelist';

    const deleted_ports: string[] = []; // Array to hold deleted ports
    let status = 'success';

    for (const value of values) {
        if (isValidPort(value)) {
            await pool.query('DELETE FROM ports WHERE port = $1 AND is_blacklisted = $2 AND is_whitelisted = $3 RETURNING *', [value, is_blacklisted, is_whitelisted]);
            deleted_ports.push(value);
            logger.log('Deleting Port:', value, 'Mode:', mode);
        }
    }
    if (deleted_ports.length === 0) { status = 'error'; }

    return { type: 'port', mode: mode, values: deleted_ports, status: status };
};
