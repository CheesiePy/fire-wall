import { db } from '../config/db';
import { isValidUrl } from '../utils/validator';
import logger from '../config/logger';
import { urls } from '../types/schemas';
import { and, eq } from 'drizzle-orm';

// Function to get all URLs (this should not exist)
export const getAllUrlsService = async () => {
    return await db.select().from(urls);
};

export const addUrlService = async (values: string[], mode: string) => {
    const is_blacklisted = mode === 'blacklist';
    const is_whitelisted = mode === 'whitelist';

    const valid_urls: string[] = []; // Array to hold valid URLs
    let status = 'success ✅';

    for (const value of values) {
        if (isValidUrl(value)) {
            try {
                await db.insert(urls).values({ url: value, is_blacklisted, is_whitelisted });
                valid_urls.push(value);
            } catch (error) {
                logger.error(`Error adding URL address: ${value} ❌`, error);
                status = 'partial 🔎'; // If any insertion fails, mark status as partial
            }
        } else {
            status = 'partial 🔎';
            logger.warn(`Invalid URL address: ${value} 🔎`);
        }
    }

    if (valid_urls.length === 0) {status = 'error ❌';}

    return { type: 'url', mode: mode, values: valid_urls, status: status };
};

export const deleteUrlService = async (values: string[], mode: string) => {
    const is_blacklisted = mode === 'blacklist';
    const is_whitelisted = mode === 'whitelist';

    const deleted_urls: string[] = []; // Array to hold deleted URLs
    let status = 'success ✅';

    for (const value of values) {
        if (isValidUrl(value)) {
            await db.delete(urls).where(
                and(
                    eq(urls.url, value),
                    eq(urls.is_blacklisted, is_blacklisted),
                    eq(urls.is_whitelisted, is_whitelisted)
                )
            ).returning();
            deleted_urls.push(value);
            logger.log('Deleting URL:', value, 'Mode:', mode, 'Status:', 'in progress ⏳');
        } else {
            logger.warn(`Invalid URL address: ${value} 🔎`);
        }
    }

    if (deleted_urls.length === 0) { status = 'error ❌'; }

    return { type: 'url', mode: mode, values: deleted_urls, status: status };
};