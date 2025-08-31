import {db} from '../config/db';
import logger from '../config/logger';
import { isValidIp } from '../utils/validator';
import { ips } from '../types/schemas';
import { and, eq } from 'drizzle-orm';


// Function to get all IPs (this should not exist)
export const getAllIpsService = async () => {
    const result = await db.select().from(ips);
    return result;
};

export const addIpService = async (values : string[], mode: string) => {
    const is_blacklisted = mode === 'blacklist';
    const is_whitelisted = mode === 'whitelist';

    const valid_ips: string[] = []; // Array to hold valid IPs
    let status = 'success ✅';

    for (const value of values) {
        if(isValidIp(value)) {
            try {
                await db.insert(ips).values({ ip: value, is_blacklisted, is_whitelisted });
                valid_ips.push(value);
            } catch (error) {
                logger.error(`Error adding IP address: ${value} ❌`, error);
                status = 'partial'; // If any insertion fails, mark status as partial
            }
        }else{
            status = 'partial 🔎';
            logger.warn(`Invalid IP address: ${value} 🔎`);
        }
    }
    // if none of the values were valid turn status to error
    if (valid_ips.length === 0) {
        status = 'error ❌';
    }

    return { type: 'ip', mode: mode, values: valid_ips, status: status };
};

export const deleteIpService = async (values : string[], mode : string) => {
    const is_blacklisted = mode === 'blacklist';
    const is_whitelisted = mode === 'whitelist';

    const deleted_ips: string[] = [];
    let status = 'success ✅';

    for (const value of values) {
        logger.log('Deleting IP:', value, 'Mode:', mode, 'Status:', 'in progress ⏳');
        try {
            await db.delete(ips).where(
            and(
                eq(ips.ip, value),
                eq(ips.is_blacklisted, is_blacklisted),
                eq(ips.is_whitelisted, is_whitelisted)
            )
        ).returning();
        deleted_ips.push(value);
        } catch (error) {
            logger.error(`Error deleting IP address: ${value} ❌`, error);
            status = 'partial 🔎'; // If any deletion fails, mark status as partial
        }
    }
    if (deleted_ips.length === 0) { status = 'error ❌'; }

    return { type: 'ip', mode: mode, values: deleted_ips, status: status };
};

