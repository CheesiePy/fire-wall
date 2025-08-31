import env from './src/config/env';
import { defineConfig } from 'drizzle-kit';
import logger from './src/config/logger';

const databaseUrl = env.DATABASE_URL;
if (!databaseUrl) {
  logger.error('DATABASE_URL is not defined in environment variables');
  throw new Error('DATABASE_URL is not defined in environment variables');
}

export default defineConfig({
  out: './drizzle',
  schema: './src/types/schemas.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: databaseUrl,
  },
  verbose: true,
  strict: true
});
