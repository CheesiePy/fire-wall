import {pgTable, serial, text, timestamp, boolean, jsonb} from 'drizzle-orm/pg-core'

export const ips = pgTable('ips', {
    id: serial('id').primaryKey(),
    ip: text('ip').notNull().unique(),
    is_blacklisted: boolean('is_blacklisted').notNull().default(false),
    is_whitelisted: boolean('is_whitelisted').notNull().default(false),
    createdAt: timestamp('created_at').defaultNow(),
  });


export const ports = pgTable('ports', {
    id: serial('id').primaryKey(),
    port: text('port').notNull().unique(),
    is_blacklisted: boolean('is_blacklisted').notNull().default(false),
    is_whitelisted: boolean('is_whitelisted').notNull().default(false),
    createdAt: timestamp('created_at').defaultNow(),
  });

export const urls =  pgTable('urls', {
    id: serial('id').primaryKey(),
    url: text('url').notNull().unique(),
    is_blacklisted: boolean('is_blacklisted').notNull().default(false),
    is_whitelisted: boolean('is_whitelisted').notNull().default(false),
    createdAt: timestamp('created_at').defaultNow(),
  });

export const rules = pgTable('rules', {
    id: serial('id').primaryKey(),
    rule_set: jsonb('rule_set').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
  });

