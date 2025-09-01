import {db} from '../config/db';
import logger from '../config/logger';
import { isValidPort } from '../utils/validator';
import {ports} from '../types/schemas';
import { and, eq } from 'drizzle-orm';

// Function to get all ports (this should not exist)
export const getAllPortsService = async () => {
    const result = await db.select().from(ports);
    return result;
};

export const addPortService = async (values: string[], mode: string) => {
    const is_blacklisted = mode === 'blacklist';
    const is_whitelisted = mode === 'whitelist';

    const valid_ports: string[] = []; // Array to hold valid ports
    let status = 'success ✅';

    for (const value of values) {
        if (isValidPort(value)) {
            try {
                await db.insert(ports).values({ port: value, is_blacklisted, is_whitelisted });
                valid_ports.push(value);
            } catch (error) {
                logger.error(`Error adding port: ${value} 🔎`, error);
                status = 'partial 🔎'; // If any insertion fails, mark status as partial
            }
        }else{
            status = 'partial 🔎';
            logger.warn(`Invalid port: ${value} 🔎`);
        }
    }

    if (valid_ports.length === 0) {
        status = 'error ❌ No valid ports found';
    }

    return { type: 'port', mode: mode, values: valid_ports, status: status };
};

export const deletePortService = async (values: string[], mode: string) => {
    const is_blacklisted = mode === 'blacklist';
    const is_whitelisted = mode === 'whitelist';

    const deleted_ports: string[] = []; // Array to hold deleted ports
    let status = 'success ';

    for (const value of values) {
        if (isValidPort(value)) {
            await db.delete(ports).where(
                and(
                    eq(ports.port, value),
                    eq(ports.is_blacklisted, is_blacklisted),
                    eq(ports.is_whitelisted, is_whitelisted)
                )
            ).returning();
            deleted_ports.push(value);
            logger.log('Deleting Port:', value, 'Mode:', mode);
        }
    }
    if (deleted_ports.length === 0) { status = 'error ❌ No valid ports found'; }

    return { type: 'port', mode: mode, values: deleted_ports, status: status };
};
